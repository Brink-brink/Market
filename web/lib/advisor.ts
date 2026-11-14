// The requirements advisor in the live window: what it asks about and what it sends back each turn.

// The order is the order the advisor asks in and the order the overview shows them.
export const requirementKeys = [
  "industry",
  "problem",
  "tasks",
  "channel",
  "budget",
  "systems",
  "volume",
  "languages",
  "hours",
  "handover",
  "sensitiveData",
  "timing",
  "area",
] as const;

export type RequirementKey = (typeof requirementKeys)[number];

export const solutionTypes = ["phone", "chatbot", "booking", "reviews", "undecided"] as const;
export const extraKinds = ["setup", "training"] as const;
export const budgetFits = ["within", "partly", "over", "unknown"] as const;

export type ExtraKind = (typeof extraKinds)[number];

// One way to buy: a listing, alone or with some of its optional extras. The price follows from the two.
export type AdvisorAlternative = {
  id: string;
  extras: ExtraKind[];
  // 1 to 5: how well this alternative meets the visitor's requirements.
  stars: number;
  // Worked out from the listing's prices and the visitor's budget, never taken from the model.
  // "partly": the lowest price fits the budget but the highest does not.
  budget: (typeof budgetFits)[number];
  fits: string[];
  gaps: string[];
};

export type AdvisorState = {
  // Short answers the visitor can click for the question just asked.
  options: string[];
  requirements: { key: RequirementKey; value: string }[];
  solution: {
    agentType: (typeof solutionTypes)[number];
    why: string;
    tools: { name: string; why: string }[];
  };
  alternatives: AdvisorAlternative[];
};

export const emptyAdvisorState: AdvisorState = {
  options: [],
  requirements: [],
  solution: { agentType: "undecided", why: "", tools: [] },
  alternatives: [],
};

// What the parser needs to know about a listing: its prices and the extras it offers.
export type ListingFacts = Record<
  string,
  { extras: Partial<Record<ExtraKind, number>>; setup: [number, number]; monthly: [number, number] | null }
>;

const stringList = { type: "array", items: { type: "string" } };
const numberOrNull = { anyOf: [{ type: "number" }, { type: "null" }] };

// JSON schema for the advisor's reply. The listing ids are fixed so it can only point at real listings.
export const advisorSchema = (listingIds: string[]) => ({
  type: "object",
  additionalProperties: false,
  required: ["reply", "options", "requirements", "budgetLimit", "solution", "alternatives"],
  properties: {
    reply: { type: "string" },
    options: stringList,
    requirements: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["key", "value"],
        properties: { key: { type: "string", enum: requirementKeys }, value: { type: "string" } },
      },
    },
    budgetLimit: {
      type: "object",
      additionalProperties: false,
      required: ["setupMax", "monthlyMax"],
      properties: { setupMax: numberOrNull, monthlyMax: numberOrNull },
    },
    solution: {
      type: "object",
      additionalProperties: false,
      required: ["agentType", "why", "tools"],
      properties: {
        agentType: { type: "string", enum: solutionTypes },
        why: { type: "string" },
        tools: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "why"],
            properties: { name: { type: "string" }, why: { type: "string" } },
          },
        },
      },
    },
    alternatives: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "extras", "stars", "fits", "gaps"],
        properties: {
          id: listingIds.length > 0 ? { type: "string", enum: listingIds } : { type: "string" },
          extras: { type: "array", items: { type: "string", enum: extraKinds } },
          stars: { type: "integer", enum: [1, 2, 3, 4, 5] },
          fits: stringList,
          gaps: stringList,
        },
      },
    },
  },
});

const isString = (value: unknown): value is string => typeof value === "string";
const strings = (value: unknown, max: number) =>
  Array.isArray(value) ? value.filter(isString).map((s) => s.trim()).filter(Boolean).slice(0, max) : [];

const extrasPrice = (id: string, extras: ExtraKind[], facts: ListingFacts) =>
  extras.reduce((sum, kind) => sum + (facts[id].extras[kind] ?? 0), 0);

const limit = (value: unknown) => (typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null);

// Compares the prices of an alternative with the visitor's budget. Both are in the site's currency.
function budgetFit(
  id: string,
  extras: ExtraKind[],
  facts: ListingFacts,
  setupMax: number | null,
  monthlyMax: number | null,
): AdvisorAlternative["budget"] {
  if (setupMax === null && monthlyMax === null) return "unknown";
  const added = extrasPrice(id, extras, facts);
  const [setupLow, setupHigh] = facts[id].setup;
  const [monthlyLow, monthlyHigh] = facts[id].monthly ?? [0, 0];
  if ((setupMax !== null && setupLow + added > setupMax) || (monthlyMax !== null && monthlyLow > monthlyMax)) return "over";
  if ((setupMax !== null && setupHigh + added > setupMax) || (monthlyMax !== null && monthlyHigh > monthlyMax)) return "partly";
  return "within";
}

const budgetRank = { within: 0, partly: 1, unknown: 2, over: 3 };

// Reads the model's JSON and keeps only what the window can show. Returns null when it is not usable.
export function parseAdvisorReply(text: string, facts: ListingFacts): { reply: string; advisor: AdvisorState } | null {
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
  if (!data || !isString(data.reply) || !data.reply.trim()) return null;

  const seen = new Set<string>();
  const requirements: AdvisorState["requirements"] = [];
  for (const item of Array.isArray(data.requirements) ? data.requirements : []) {
    const { key, value } = (item ?? {}) as { key?: unknown; value?: unknown };
    if (!isString(key) || !isString(value) || !value.trim() || seen.has(key)) continue;
    if (!(requirementKeys as readonly string[]).includes(key)) continue;
    seen.add(key);
    requirements.push({ key: key as RequirementKey, value: value.trim() });
  }

  const rawSolution = (data.solution ?? {}) as { agentType?: unknown; why?: unknown; tools?: unknown };
  const agentType = (solutionTypes as readonly string[]).includes(rawSolution.agentType as string)
    ? (rawSolution.agentType as AdvisorState["solution"]["agentType"])
    : "undecided";
  const tools: AdvisorState["solution"]["tools"] = [];
  for (const item of Array.isArray(rawSolution.tools) ? rawSolution.tools.slice(0, 6) : []) {
    const { name, why } = (item ?? {}) as { name?: unknown; why?: unknown };
    if (isString(name) && name.trim()) tools.push({ name: name.trim(), why: isString(why) ? why.trim() : "" });
  }

  const rawLimit = (data.budgetLimit ?? {}) as { setupMax?: unknown; monthlyMax?: unknown };
  const setupMax = limit(rawLimit.setupMax);
  const monthlyMax = limit(rawLimit.monthlyMax);

  const alternatives: AdvisorAlternative[] = [];
  const taken = new Set<string>();
  for (const item of Array.isArray(data.alternatives) ? data.alternatives : []) {
    const { id, extras, stars, fits, gaps } = (item ?? {}) as Record<string, unknown>;
    if (!isString(id) || !facts[id]) continue;
    if (typeof stars !== "number" || !Number.isInteger(stars) || stars < 1 || stars > 5) continue;
    // Only extras this listing really offers, each once, in a fixed order.
    const chosen = extraKinds.filter(
      (kind) => Array.isArray(extras) && extras.includes(kind) && facts[id].extras[kind] !== undefined,
    );
    const key = `${id}:${chosen.join("+")}`;
    if (taken.has(key)) continue;
    taken.add(key);
    alternatives.push({
      id,
      extras: chosen,
      stars,
      budget: budgetFit(id, chosen, facts, setupMax, monthlyMax),
      fits: strings(fits, 3),
      gaps: strings(gaps, 3),
    });
  }
  const price = (a: AdvisorAlternative) => facts[a.id].setup[0] + extrasPrice(a.id, a.extras, facts);
  // Most stars first. Among equals: within budget first, then the cheaper one. Nothing else decides the order.
  alternatives.sort(
    (a, b) => b.stars - a.stars || budgetRank[a.budget] - budgetRank[b.budget] || price(a) - price(b),
  );

  return {
    reply: data.reply.trim(),
    advisor: {
      options: strings(data.options, 4),
      requirements,
      solution: { agentType, why: isString(rawSolution.why) ? rawSolution.why.trim() : "", tools },
      alternatives: alternatives.slice(0, 6),
    },
  };
}

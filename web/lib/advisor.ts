// The requirements advisor in the live window: what it asks about and what it sends back each turn.

// The order is the order the advisor asks in and the order the overview shows them.
export const requirementKeys = [
  "industry",
  "problem",
  "tasks",
  "channel",
  "systems",
  "volume",
  "languages",
  "hours",
  "handover",
  "sensitiveData",
  "budget",
  "timing",
  "area",
] as const;

export type RequirementKey = (typeof requirementKeys)[number];

export const fitLevels = ["strong", "partial", "weak"] as const;
export const solutionTypes = ["phone", "chatbot", "booking", "reviews", "undecided"] as const;

export type AdvisorMatch = {
  id: string;
  fit: (typeof fitLevels)[number];
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
  matches: AdvisorMatch[];
};

export const emptyAdvisorState: AdvisorState = {
  options: [],
  requirements: [],
  solution: { agentType: "undecided", why: "", tools: [] },
  matches: [],
};

const stringList = { type: "array", items: { type: "string" } };

// JSON schema for the advisor's reply. The listing ids are fixed so it can only point at real listings.
export const advisorSchema = (listingIds: string[]) => ({
  type: "object",
  additionalProperties: false,
  required: ["reply", "options", "requirements", "solution", "matches"],
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
    matches: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "fit", "fits", "gaps"],
        properties: {
          id: listingIds.length > 0 ? { type: "string", enum: listingIds } : { type: "string" },
          fit: { type: "string", enum: fitLevels },
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

// Reads the model's JSON and keeps only what the window can show. Returns null when it is not usable.
export function parseAdvisorReply(text: string, listingIds: string[]): { reply: string; advisor: AdvisorState } | null {
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

  const matches: AdvisorMatch[] = [];
  for (const item of Array.isArray(data.matches) ? data.matches : []) {
    const { id, fit, fits, gaps } = (item ?? {}) as Record<string, unknown>;
    if (!isString(id) || !listingIds.includes(id) || matches.some((m) => m.id === id)) continue;
    if (!(fitLevels as readonly string[]).includes(fit as string)) continue;
    matches.push({ id, fit: fit as AdvisorMatch["fit"], fits: strings(fits, 3), gaps: strings(gaps, 3) });
  }

  return {
    reply: data.reply.trim(),
    advisor: {
      options: strings(data.options, 4),
      requirements,
      solution: { agentType, why: isString(rawSolution.why) ? rawSolution.why.trim() : "", tools },
      matches,
    },
  };
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";

type Kind = "setup" | "training";

export type PickCard = {
  title: string;
  alias: string;
  href: string;
  cover: string;
  setup: [number, number];
  monthly: [number, number] | null;
  extras: Partial<Record<Kind, { label: string; price: number }>>;
};

type Labels = {
  empty: string;
  basePackage: string;
  setupLabel: string;
  perMonth: string;
  noMonthlyFee: string;
  starsLabel: string;
  budget: { within: string; partly: string; over: string };
  yourBudget: string;
  open: string;
};

type Pick = { id: string; extras: Kind[]; stars: number };

// One pick in the address: <listing id>.<extras joined by "-", or "none">.<stars 1-5>
function parsePick(value: string, cards: Record<string, PickCard>): Pick | null {
  const [id, extras, stars] = value.split(".");
  const n = Number(stars);
  if (!cards[id] || !Number.isInteger(n) || n < 1 || n > 5) return null;
  const chosen = (["setup", "training"] as const).filter(
    (kind) => extras?.split("-").includes(kind) && cards[id].extras[kind] !== undefined,
  );
  return { id, extras: chosen, stars: n };
}

const amount = (value: string | null) => {
  if (value === null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

// The alternatives the plugin picked, opened in the browser from Claude. The address holds only listing ids,
// extras, stars and the budget; the requirements stay in the conversation.
export function Picks({ cards, labels, locale, currency }: { cards: Record<string, PickCard>; labels: Labels; locale: string; currency: string }) {
  const params = useSearchParams();
  const money = (n: number) => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
  const range = ([a, b]: [number, number]) => (a === b ? money(a) : `${money(a)}–${money(b)}`);

  const setupMax = amount(params.get("setup"));
  const monthlyMax = amount(params.get("monthly"));

  const seen = new Set<string>();
  const picks = params
    .getAll("p")
    .map((value) => parsePick(value, cards))
    .filter((pick): pick is Pick => {
      if (!pick) return false;
      const key = `${pick.id}.${pick.extras.join("-")}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 8)
    .map((pick) => {
      const card = cards[pick.id];
      const added = pick.extras.reduce((sum, kind) => sum + (card.extras[kind]?.price ?? 0), 0);
      const setup: [number, number] = [card.setup[0] + added, card.setup[1] + added];
      const monthly = card.monthly ?? [0, 0];
      let budget: "within" | "partly" | "over" | null = null;
      if (setupMax !== null || monthlyMax !== null) {
        if ((setupMax !== null && setup[0] > setupMax) || (monthlyMax !== null && monthly[0] > monthlyMax)) budget = "over";
        else if ((setupMax !== null && setup[1] > setupMax) || (monthlyMax !== null && monthly[1] > monthlyMax)) budget = "partly";
        else budget = "within";
      }
      return { ...pick, card, setup, budget };
    });

  // Most stars first; among equals, within budget first, then the cheaper one.
  const rank = { within: 0, partly: 1, over: 3 };
  picks.sort(
    (a, b) =>
      b.stars - a.stars || (a.budget ? rank[a.budget] : 2) - (b.budget ? rank[b.budget] : 2) || a.setup[0] - b.setup[0],
  );

  if (picks.length === 0) return <p className="note">{labels.empty}</p>;

  const budgetText = [setupMax !== null ? `${money(setupMax)} ${labels.setupLabel}` : null, monthlyMax !== null ? `${money(monthlyMax)}${labels.perMonth}` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      {budgetText && <p className="meta">{labels.yourBudget}: {budgetText}</p>}
      <ol className="picks">
        {picks.map((pick) => (
          <li key={`${pick.id}.${pick.extras.join("-")}`} className="pick">
            <Image src={pick.card.cover} alt="" width={336} height={188} />
            <div className="pick-main">
              <div className="pick-top">
                <span className="stars" role="img" aria-label={labels.starsLabel.replace("{n}", String(pick.stars))}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={18} className={n <= pick.stars ? "star-on" : "star-off"} aria-hidden="true" />
                  ))}
                </span>
                {pick.budget && <span className={`budget-badge budget-${pick.budget}`}>{labels.budget[pick.budget]}</span>}
              </div>
              <h2>{pick.card.title}</h2>
              <p className="meta">
                {pick.card.alias} · {pick.extras.length ? pick.extras.map((k) => `+ ${pick.card.extras[k]?.label}`).join(" ") : labels.basePackage}
              </p>
              <p className="pick-price">
                {range(pick.setup)} <small>{labels.setupLabel} · {pick.card.monthly ? `${range(pick.card.monthly)}${labels.perMonth}` : labels.noMonthlyFee}</small>
              </p>
              <Link className="button button-secondary" href={pick.card.href}>{labels.open}</Link>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

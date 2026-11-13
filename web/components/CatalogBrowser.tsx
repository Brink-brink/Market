"use client";

import Link from "next/link";
import { useState } from "react";

export type CatalogCard = {
  id: string;
  href: string;
  alias: string;
  title: string;
  summary: string;
  industry: string;
  agentType: string;
  proofType: string;
  setupMin: number;
  badges: string[];
  priceText: string;
  metaText: string;
  example: boolean;
};

type Option = { value: string; label: string };

type Props = {
  cards: CatalogCard[];
  industries: Option[];
  agentTypes: Option[];
  proofTypes: Option[];
  budgets: Option[];
  labels: {
    search: string;
    searchPlaceholder: string;
    industry: string;
    agentType: string;
    proof: string;
    budget: string;
    any: string;
    results: string;
    none: string;
    example: string;
  };
};

export function CatalogBrowser({ cards, industries, agentTypes, proofTypes, budgets, labels }: Props) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [agentType, setAgentType] = useState("");
  const [proofType, setProofType] = useState("");
  const [budget, setBudget] = useState("");

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const visible = cards.filter((card) => {
    const text = `${card.title} ${card.summary} ${card.badges.join(" ")}`.toLowerCase();
    return (
      words.every((word) => text.includes(word)) &&
      (!industry || card.industry === industry) &&
      (!agentType || card.agentType === agentType) &&
      (!proofType || card.proofType === proofType) &&
      (!budget || card.setupMin <= Number(budget))
    );
  });

  const select = (label: string, value: string, onChange: (v: string) => void, options: Option[]) => (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{labels.any}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );

  return (
    <>
      <div className="filters">
        <label className="field field-wide">
          <span>{labels.search}</span>
          <input
            type="search"
            value={query}
            placeholder={labels.searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        {select(labels.industry, industry, setIndustry, industries)}
        {select(labels.agentType, agentType, setAgentType, agentTypes)}
        {select(labels.proof, proofType, setProofType, proofTypes)}
        {select(labels.budget, budget, setBudget, budgets)}
      </div>

      <p className="meta" aria-live="polite">{labels.results.replace("{n}", String(visible.length))}</p>

      {visible.length === 0 ? (
        <p>{labels.none}</p>
      ) : (
        <div className="grid grid-wide">
          {visible.map((card) => (
            <Link key={card.id} href={card.href} className="card card-link">
              <p>
                {card.example && <span className="badge badge-accent">{labels.example}</span>}
                {card.badges.map((badge) => <span key={badge} className="badge">{badge}</span>)}
              </p>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
              <div className="price">{card.priceText}</div>
              <p className="meta">{card.alias} · {card.metaText}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

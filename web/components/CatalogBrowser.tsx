"use client";

import { useState } from "react";
import { ListingTile, type TileData } from "./ListingTile";

export type CatalogCard = {
  tile: TileData;
  industry: string;
  agentType: string;
  proofType: string;
  setupMin: number;
  searchText: string;
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
    return (
      words.every((word) => card.searchText.includes(word)) &&
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
          {visible.map((card) => <ListingTile key={card.tile.id} tile={card.tile} />)}
        </div>
      )}
    </>
  );
}

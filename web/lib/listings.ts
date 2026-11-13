// Approved listings shown in the catalog. Phase 2: added by hand after review (docs/GRANSKNING.md).
// Only catalog fields belong here: never a name, company, e-mail, phone, website, link or demo URL.
export type CatalogListing = {
  id: string;
  alias: string;
  niche: string;
  title: string;
  includes: string[];
  setupPriceSek: [number, number];
  monthlyPriceSek: [number, number] | null;
  deliveryDays: number;
  proofType: "prototype" | "live";
  reviewedOn: string; // YYYY-MM-DD
  ratingAvg: number | null;
};

export const listings: CatalogListing[] = [];

export const proofTypeLabel: Record<CatalogListing["proofType"], string> = {
  prototype: "Prototyp",
  live: "I drift",
};

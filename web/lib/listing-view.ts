import type { TileData } from "@/components/ListingTile";
import { fill, type Dict, type Locale } from "./i18n";
import type { CatalogListing } from "./listings";
import { formatMoney, formatRange } from "./site";

// Tile colour per type of agent.
const tones: Record<CatalogListing["agentType"], string> = {
  phone: "teal",
  chatbot: "violet",
  reviews: "coral",
  booking: "amber",
};

// Display strings shared by the catalog tiles and the listing page.
export function listingView(listing: CatalogListing, lang: Locale, t: Dict) {
  const c = t.common;
  return {
    tone: tones[listing.agentType],
    // The last word of the alias, such as "A7".
    initials: listing.alias.split(" ").at(-1) ?? "",
    title: listing.title[lang],
    summary: listing.summary[lang],
    industryLabel: t.industries[listing.industry],
    agentTypeLabel: t.agentTypes[listing.agentType],
    proofLabel: listing.proofType === "live" ? c.live : c.prototype,
    reviewedText: fill(c.demoReviewed, { date: listing.reviewedOn }),
    setupText: formatRange(listing.setupPrice, lang),
    monthlyText: listing.monthlyPrice
      ? `${formatRange(listing.monthlyPrice, lang)}${c.perMonth}`
      : c.noMonthlyFee,
    deliveryText: fill(c.delivery, { n: listing.deliveryDays }),
    ratingText:
      listing.ratingAvg === null
        ? c.noRating
        : fill(c.rating, { avg: listing.ratingAvg.toFixed(1), count: listing.ratingCount }),
  };
}

export function listingTile(listing: CatalogListing, lang: Locale, t: Dict): TileData {
  const view = listingView(listing, lang, t);
  return {
    id: listing.id,
    href: `/${lang}/catalog/${listing.id}`,
    tone: view.tone,
    cover: listing.cover,
    title: view.title,
    summary: view.summary,
    tags: [view.proofLabel, view.industryLabel],
    features: [
      t.catalog.highlightLive,
      fill(t.catalog.criteria, { n: listing.acceptance.length }),
      ...(listing.extras.some((e) => e.kind === "setup") ? [t.catalog.tagSetup] : []),
      ...(listing.extras.some((e) => e.kind === "training") ? [t.catalog.tagTraining] : []),
    ],
    exampleLabel: listing.example ? t.common.example : null,
    alias: listing.alias,
    initials: view.initials,
    ratingText: view.ratingText,
    fromText: `${t.catalog.from} ${formatMoney(listing.setupPrice[0], lang)}`,
    metaText: `${view.monthlyText} · ${view.deliveryText}`,
  };
}

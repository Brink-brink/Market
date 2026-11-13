import { fill, type Dict, type Locale } from "./i18n";
import type { CatalogListing } from "./listings";
import { formatRange } from "./site";

// Display strings shared by the catalog cards and the listing page.
export function listingView(listing: CatalogListing, lang: Locale, t: Dict) {
  const c = t.common;
  return {
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

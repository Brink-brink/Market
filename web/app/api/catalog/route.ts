import { listings } from "@/lib/listings";
import { site } from "@/lib/site";

// The catalog as the ai-jobb plugin reads it. Catalog fields only: nothing here identifies or reaches a freelancer.
export async function GET() {
  return Response.json({
    currency: site.currency,
    languages: ["en", "sv"],
    // Paths on this site. {lang} is "en" or "sv".
    listingPath: "/{lang}/catalog/{id}",
    picksPath: "/{lang}/picks",
    listings: listings.map((l) => ({
      id: l.id,
      alias: l.alias,
      example: l.example,
      industry: l.industry,
      agentType: l.agentType,
      proofType: l.proofType,
      title: l.title,
      summary: l.summary,
      includes: l.includes,
      notIncluded: l.notIncluded,
      acceptance: l.acceptance,
      setupPrice: l.setupPrice,
      monthlyPrice: l.monthlyPrice,
      deliveryDays: l.deliveryDays,
      extras: l.extras.map((e) => ({ kind: e.kind, price: e.price, text: e.text })),
      dataHandling: l.dataHandling,
      // A made-up business for trying the agent. No real customer.
      demo: { greeting: l.liveDemo.greeting, prompts: l.liveDemo.prompts, facts: l.liveDemo.facts },
    })),
  });
}

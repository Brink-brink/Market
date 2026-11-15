import { offerTemplates } from "@/lib/offer-templates";
import { site } from "@/lib/site";

// The offer templates as the ai-jobb plugin's listing-draft skill reads them.
// The website's listing flow uses the same data, so both give the seller the same suggestions.
export async function GET() {
  return Response.json({
    currency: site.currency,
    languages: ["en", "sv"],
    note: "Numbers are suggestions for the seller to change. In a criterion, {v} is replaced by its value.",
    templates: offerTemplates,
  });
}

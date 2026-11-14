import type { Metadata } from "next";
import { CatalogBrowser, type CatalogCard } from "@/components/CatalogBrowser";
import { PluginCard } from "@/components/PluginCard";
import { fill } from "@/lib/i18n";
import { listingTile, listingView } from "@/lib/listing-view";
import { listings } from "@/lib/listings";
import { pageContext } from "@/lib/page";
import { formatMoney } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/catalog">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.catalog.title };
}

const budgetSteps = [500, 1000, 2500];

export default async function CatalogPage({ params }: PageProps<"/[lang]/catalog">) {
  const { lang, t } = await pageContext(params);
  const c = t.catalog;

  const cards: CatalogCard[] = listings.map((listing) => {
    const view = listingView(listing, lang, t);
    return {
      tile: listingTile(listing, lang, t),
      industry: listing.industry,
      agentType: listing.agentType,
      proofType: listing.proofType,
      setupMin: listing.setupPrice[0],
      searchText: [view.title, view.summary, view.industryLabel, view.agentTypeLabel, view.proofLabel]
        .join(" ")
        .toLowerCase(),
    };
  });

  const options = (labels: Record<string, string>) =>
    Object.entries(labels).map(([value, label]) => ({ value, label }));

  return (
    <>
      <h1>{c.title}</h1>
      <p className="lead">{c.lead}</p>
      {listings.some((l) => l.example) && <p className="note">{t.common.exampleNote}</p>}

      {listings.length > 0 && (
        <PluginCard variant="banner" labels={t.plugin} command="/market" />
      )}

      {listings.length === 0 ? (
        <p className="meta">{c.empty}</p>
      ) : (
        <CatalogBrowser
          cards={cards}
          industries={options(t.industries)}
          agentTypes={options(t.agentTypes)}
          proofTypes={[
            { value: "live", label: t.common.live },
            { value: "prototype", label: t.common.prototype },
          ]}
          budgets={budgetSteps.map((amount) => ({
            value: String(amount),
            label: fill(c.upTo, { amount: formatMoney(amount, lang) }),
          }))}
          labels={{
            search: c.search,
            searchPlaceholder: c.searchPlaceholder,
            industry: c.industry,
            agentType: c.agentType,
            proof: c.proof,
            budget: c.budget,
            any: c.any,
            results: c.results,
            none: c.none,
          }}
        />
      )}
    </>
  );
}

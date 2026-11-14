import type { Metadata } from "next";
import { Suspense } from "react";
import { Picks, type PickCard } from "@/components/Picks";
import { listings } from "@/lib/listings";
import { pageContext } from "@/lib/page";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/picks">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.picks.title, robots: { index: false } };
}

// Opened by the ai-jobb plugin: the alternatives Claude picked for the visitor's requirements.
export default async function PicksPage({ params }: PageProps<"/[lang]/picks">) {
  const { lang, t, link } = await pageContext(params);
  const p = t.picks;
  const cards: Record<string, PickCard> = Object.fromEntries(
    listings.map((l) => [
      l.id,
      {
        title: l.title[lang],
        alias: l.alias,
        href: link(`/catalog/${l.id}`),
        cover: l.cover,
        setup: l.setupPrice,
        monthly: l.monthlyPrice,
        extras: Object.fromEntries(
          l.extras.map((e) => [e.kind, { label: e.kind === "setup" ? t.catalog.extraSetup : t.catalog.extraTraining, price: e.price }]),
        ),
      },
    ]),
  );

  return (
    <>
      <h1>{p.title}</h1>
      <p className="lead">{p.lead}</p>
      <Suspense fallback={null}>
        <Picks
          cards={cards}
          locale={lang}
          currency={site.currency}
          labels={{
            empty: p.empty,
            basePackage: p.basePackage,
            setupLabel: p.setupLabel,
            perMonth: t.common.perMonth,
            noMonthlyFee: t.common.noMonthlyFee,
            starsLabel: p.starsLabel,
            budget: p.budget,
            yourBudget: p.yourBudget,
            open: p.open,
          }}
        />
      </Suspense>
      <p className="note">{p.note}</p>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Coins, FileSearch, LifeBuoy, ListChecks, Play, ShieldCheck, Tag, Target, Truck } from "lucide-react";
import { Assistant } from "@/components/Assistant";
import { IconGrid } from "@/components/IconGrid";
import { ListingWizard } from "@/components/ListingWizard";
import { images } from "@/lib/images";
import { pageContext } from "@/lib/page";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/listing">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.listing.title };
}

export default async function ListingPage({ params }: PageProps<"/[lang]/listing">) {
  const { lang, t } = await pageContext(params);
  const l = t.listing;

  return (
    <>
      <section className="page-head">
        <div>
          <h1>{l.title}</h1>
          <p className="lead">{l.lead}</p>
        </div>
        <Image src={images.pair} alt="" width={1168} height={880} priority />
      </section>

      <h2 id="wizard">{l.wizardTitle}</h2>
      <ListingWizard lang={lang} labels={t.wizard} />
      <p className="meta" style={{ marginTop: 12 }}>{l.claudeAlt}</p>

      <h2 id="assistant">
        {l.assistantTitle} <span className="badge badge-accent">{t.common.addonBadge}</span>
      </h2>
      <Assistant lang={lang} intro={t.assistant.listingIntro} labels={t.assistant} />

      <h2>{l.needTitle}</h2>
      <IconGrid boxed items={l.needs} icons={[Target, ListChecks, Truck, Coins, LifeBuoy, Tag, Play]} />
      <p className="note">{l.aliasNote}</p>

      <h2>{l.reviewTitle}</h2>
      <IconGrid boxed items={l.review} icons={[Play, FileSearch, ShieldCheck, Tag]} />
      <p className="meta" style={{ marginTop: 16 }}>{l.reviewNote}</p>

      <h2>{l.submitTitle}</h2>
      {site.listingFormUrl ? (
        <iframe className="form-frame" src={site.listingFormUrl} title={l.formTitle} />
      ) : (
        <p className="meta">{t.common.opensSoon}</p>
      )}
    </>
  );
}

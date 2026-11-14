import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PhotoSteps } from "@/components/HowTabs";
import { PluginCard } from "@/components/PluginCard";
import { images } from "@/lib/images";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/buyers">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.nav.buyers };
}

export default async function BuyersPage({ params }: PageProps<"/[lang]/buyers">) {
  const { t, link } = await pageContext(params);
  const b = t.buyers;
  const pics = [images.bakery, images.offers, images.call];

  return (
    <>
      <section className="page-head">
        <div>
          <h1>{b.title}</h1>
          <p className="lead">{b.lead}</p>
        </div>
        <Image src={images.street} alt="" width={1168} height={880} priority />
      </section>

      <div id="assistant" style={{ scrollMarginTop: 90 }}>
        <PluginCard variant="advisor" labels={t.plugin} command="/market" />
      </div>

      <h2>{b.stepsTitle}</h2>
      <PhotoSteps steps={t.home.businessSteps.map((step, i) => ({ ...step, image: pics[i] }))} />

      <p style={{ marginTop: 32 }}><Link href={link("/faq")}>{b.faqCta} →</Link></p>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Coins, Scale, Users } from "lucide-react";
import { HeroPrompt } from "@/components/HeroPrompt";
import { HowTabs } from "@/components/HowTabs";
import { IconGrid } from "@/components/IconGrid";
import { ListingTile } from "@/components/ListingTile";
import { images } from "@/lib/images";
import { listingTile } from "@/lib/listing-view";
import { listings } from "@/lib/listings";
import { pageContext } from "@/lib/page";

// The home page speaks to new freelancers who build AI agents. Buyers get a tab and a band further down.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang, t, link } = await pageContext(params);
  const h = t.home;
  const featured = listings.slice(0, 3).map((listing) => listingTile(listing, lang, t));
  const withImages = (steps: { title: string; text: string }[], pics: string[]) =>
    steps.map((step, i) => ({ ...step, image: pics[i] }));

  return (
    <>
      <section className="hero">
        <Image className="hero-img" src={images.hero} alt="" width={1344} height={752} priority />
        <div className="hero-content">
          <h1>{h.heroTitle}</h1>
          <p className="lead">{h.heroLead}</p>
          <HeroPrompt
            target={link("/listing#assistant")}
            placeholder={h.heroPlaceholder}
            cta={h.heroCta}
            hints={h.heroHints}
          />
          <p className="hero-note">{h.heroNote}</p>
        </div>
      </section>

      <IconGrid items={h.benefits} icons={[Coins, BadgeCheck, Users, Scale]} />

      <div className="section-head" id="how">
        <h2>{h.howTitle}</h2>
      </div>
      <HowTabs
        tabs={[
          { label: h.tabFreelancers, steps: withImages(h.freelancerSteps, [images.typing, images.demo, images.handshake]) },
          { label: h.tabBusinesses, steps: withImages(h.businessSteps, [images.bakery, images.offers, images.call]) },
        ]}
      />

      <section className="split">
        <Image src={images.phone} alt="" width={1168} height={880} />
        <div>
          <span className="badge badge-accent">{t.common.addonBadge}</span>
          <h2>{h.assistantTitle}</h2>
          <p>{h.assistantText}</p>
          <div className="actions">
            <Link href={link("/listing#assistant")} className="button">{h.assistantCta}</Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <>
          <div className="section-head">
            <h2>{h.featuredTitle}</h2>
            <Link href={link("/catalog")}>{h.featuredCta} →</Link>
          </div>
          <div className="grid grid-wide">
            {featured.map((tile) => <ListingTile key={tile.id} tile={tile} />)}
          </div>
        </>
      )}

      <section className="split reverse">
        <Image src={images.whiteboard} alt="" width={1168} height={880} />
        <div>
          <span className="badge">{t.common.comingLater}</span>
          <h2>{h.buildTitle}</h2>
          <p>{h.buildText}</p>
          <div className="actions">
            <Link href={link("/build-on")} className="button button-secondary">{h.buildCta}</Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div>
          <h2>{h.buyerTitle}</h2>
          <p>{h.buyerText}</p>
        </div>
        <div className="actions">
          <Link href={link("/buyers")} className="button">{h.buyerCta}</Link>
        </div>
      </section>
    </>
  );
}

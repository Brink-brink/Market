import Link from "next/link";
import { HeroPrompt } from "@/components/HeroPrompt";
import { ListingTile } from "@/components/ListingTile";
import { listingTile } from "@/lib/listing-view";
import { listings } from "@/lib/listings";
import { pageContext } from "@/lib/page";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang, t, link } = await pageContext(params);
  const h = t.home;
  const featured = listings.slice(0, 3).map((listing) => listingTile(listing, lang, t));

  return (
    <>
      <section className="hero">
        <h1>{h.heroTitle}</h1>
        <p className="lead">{h.heroLead}</p>
        <HeroPrompt
          target={link("/buyers#assistant")}
          placeholder={h.heroPlaceholder}
          cta={h.heroCta}
          hints={h.heroHints}
        />
        <p className="hero-note">{h.heroNote}</p>
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

      <h2>{h.howTitle}</h2>
      <ol className="grid numbered">
        {h.how.map((step) => (
          <li key={step.title} className="card">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>

      <section className="band">
        <div>
          <h2>{h.sellerTitle}</h2>
          <p>{h.sellerText}</p>
        </div>
        <div className="actions">
          <Link href={link("/listing")} className="button">{h.sellerCta}</Link>
          <Link href={link("/sellers")} className="button button-secondary">{h.sellerSecondary}</Link>
        </div>
      </section>

      <h2>{h.promisesTitle}</h2>
      <div className="grid">
        {h.promises.map((promise) => (
          <div key={promise.title} className="card">
            <h3>{promise.title}</h3>
            <p>{promise.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

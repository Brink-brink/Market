import Link from "next/link";
import { pageContext } from "@/lib/page";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { t, link } = await pageContext(params);
  const h = t.home;

  return (
    <>
      <section className="hero">
        <h1>{h.title}</h1>
        <p className="lead">{h.lead}</p>
      </section>

      <section className="split">
        <div className="card card-large">
          <h2>{h.buyerTitle}</h2>
          <p>{h.buyerText}</p>
          <div className="actions">
            <Link href={link("/buyers")} className="button">{h.buyerCta}</Link>
            <Link href={link("/catalog")} className="button button-secondary">{h.buyerSecondary}</Link>
          </div>
        </div>
        <div className="card card-large">
          <h2>{h.sellerTitle}</h2>
          <p>{h.sellerText}</p>
          <div className="actions">
            <Link href={link("/listing")} className="button">{h.sellerCta}</Link>
            <Link href={link("/sellers")} className="button button-secondary">{h.sellerSecondary}</Link>
          </div>
        </div>
      </section>

      <h2>{h.howTitle}</h2>
      <ol className="grid numbered">
        {h.how.map((step) => (
          <li key={step.title} className="card">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>

      <h2>{h.typesTitle}</h2>
      <div className="grid">
        {h.types.map((type) => (
          <div key={type.title} className="card">
            <h3>{type.title}</h3>
            <p>{type.text}</p>
          </div>
        ))}
      </div>

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

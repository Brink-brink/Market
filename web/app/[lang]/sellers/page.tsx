import type { Metadata } from "next";
import Link from "next/link";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/sellers">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.nav.sellers };
}

export default async function SellersPage({ params }: PageProps<"/[lang]/sellers">) {
  const { t, link } = await pageContext(params);
  const s = t.sellers;

  return (
    <>
      <h1>{s.title}</h1>
      <p className="lead">{s.lead}</p>
      <div className="actions">
        <Link href={link("/listing")} className="button">{s.cta}</Link>
        <Link href={link("/catalog")} className="button button-secondary">{s.secondary}</Link>
      </div>

      <h2>{s.stepsTitle}</h2>
      <ol className="steps-list">
        {s.steps.map((step) => (
          <li key={step.title}>
            <strong>{step.title}.</strong> {step.text}
          </li>
        ))}
      </ol>

      <h2>{s.assistantTitle}</h2>
      <div className="card card-large">
        <span className="badge badge-accent">{s.assistantBadge}</span>
        <p>{s.assistantText}</p>
        <div className="actions">
          <Link href={link("/listing")} className="button">{t.credits.addonCta}</Link>
        </div>
      </div>

      <h2>{s.promisesTitle}</h2>
      <div className="grid">
        {s.promises.map((promise) => (
          <div key={promise.title} className="card">
            <h3>{promise.title}</h3>
            <p>{promise.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

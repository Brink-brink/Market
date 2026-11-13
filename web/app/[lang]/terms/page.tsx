import type { Metadata } from "next";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.terms.title };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { t } = await pageContext(params);

  return (
    <>
      <h1>{t.terms.title}</h1>
      <p className="note">{t.common.draft}</p>
      <h2>{t.terms.pointsTitle}</h2>
      <ul className="steps">
        {t.terms.points.map((point) => <li key={point}>{point}</li>)}
      </ul>
    </>
  );
}

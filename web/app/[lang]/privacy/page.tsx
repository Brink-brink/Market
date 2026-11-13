import type { Metadata } from "next";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.privacy.title };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { t } = await pageContext(params);

  return (
    <>
      <h1>{t.privacy.title}</h1>
      <p className="note">{t.common.draft}</p>
      <h2>{t.privacy.storeTitle}</h2>
      <ul className="steps">
        {t.privacy.points.map((point) => <li key={point}>{point}</li>)}
      </ul>
    </>
  );
}

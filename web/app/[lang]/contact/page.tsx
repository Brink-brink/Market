import type { Metadata } from "next";
import { pageContext } from "@/lib/page";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.contact.title };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { t } = await pageContext(params);

  return (
    <>
      <h1>{t.contact.title}</h1>
      {site.contactEmail ? (
        <p>{t.contact.text} <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
      ) : (
        <p className="meta">{t.contact.soon}</p>
      )}
    </>
  );
}

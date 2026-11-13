import type { Metadata } from "next";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.faq.title };
}

function Questions({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { t } = await pageContext(params);
  const f = t.faq;

  return (
    <>
      <h1>{f.title}</h1>
      <h2>{f.buyersTitle}</h2>
      <Questions items={f.buyers} />
      <h2>{f.sellersTitle}</h2>
      <Questions items={f.sellers} />
    </>
  );
}

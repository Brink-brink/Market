import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/images";
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
      <section className="page-head">
        <h1>{f.title}</h1>
        <Image src={images.meetup} alt="" width={1168} height={880} priority />
      </section>
      <h2>{f.sellersTitle}</h2>
      <Questions items={f.sellers} />
      <h2>{f.buyersTitle}</h2>
      <Questions items={f.buyers} />
    </>
  );
}

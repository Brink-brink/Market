import type { Metadata } from "next";
import { Assistant } from "@/components/Assistant";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/buyers">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.nav.buyers };
}

export default async function BuyersPage({ params }: PageProps<"/[lang]/buyers">) {
  const { lang, t } = await pageContext(params);
  const b = t.buyers;

  return (
    <>
      <h1>{b.title}</h1>
      <p className="lead">{b.lead}</p>

      <h2 id="assistant">{b.assistantTitle}</h2>
      <Assistant mode="need" lang={lang} intro={t.assistant.needIntro} labels={t.assistant} />
      <p className="note">{b.sendNote}</p>

      <h2>{b.stepsTitle}</h2>
      <ol className="steps-list">
        {b.steps.map((step) => (
          <li key={step.title}>
            <strong>{step.title}.</strong> {step.text}
          </li>
        ))}
      </ol>

      <h2>{b.asksTitle}</h2>
      <ul className="steps">
        {b.asks.map((ask) => <li key={ask}>{ask}</li>)}
      </ul>
    </>
  );
}

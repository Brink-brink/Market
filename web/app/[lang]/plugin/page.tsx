import type { Metadata } from "next";
import Link from "next/link";
import { CopyLine } from "@/components/PluginCard";
import { installCommands } from "@/lib/plugin";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/plugin">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.pluginPage.title };
}

// How a buyer gets the ai-jobb plugin into Claude, so that /market works there.
export default async function PluginPage({ params }: PageProps<"/[lang]/plugin">) {
  const { t, link } = await pageContext(params);
  const p = t.pluginPage;
  const [have, install, write] = p.steps;

  return (
    <>
      <section className="page-head">
        <div>
          <h1>{p.title}</h1>
          <p className="lead">{p.lead}</p>
        </div>
      </section>

      <ol className="plugin-steps">
        <li>
          <h2>{have.title}</h2>
          <p>{have.text}</p>
        </li>
        <li>
          <h2>{install.title}</h2>
          <p>{install.text}</p>
          {installCommands.map((line) => <CopyLine key={line} text={line} labels={t.plugin} />)}
        </li>
        <li>
          <h2>{write.title}</h2>
          <p>{write.text}</p>
          <CopyLine text="/market" labels={t.plugin} />
        </li>
      </ol>

      <p className="section-note">{p.chatgpt}</p>
      <p><Link href={link("/catalog")}>{t.nav.catalog} →</Link></p>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Bot, MessageCircle } from "lucide-react";
import { CopyLine } from "@/components/PluginCard";
import { fill } from "@/lib/i18n";
import { installCommands, pluginStores } from "@/lib/plugin";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/plugin">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.pluginPage.title };
}

const storeIcon = { claude: Bot, chatgpt: MessageCircle };

// Where a buyer gets the ai-jobb plugin: one card per AI assistant, linking to its plugin directory.
export default async function PluginPage({ params }: PageProps<"/[lang]/plugin">) {
  const { t, link } = await pageContext(params);
  const p = t.pluginPage;
  const anyLive = pluginStores.some((store) => store.url);

  return (
    <>
      <section className="page-head">
        <div>
          <h1>{p.title}</h1>
          <p className="lead">{p.lead}</p>
        </div>
      </section>

      <div className="stores">
        {pluginStores.map((store) => {
          const text = p.stores[store.id];
          const Icon = storeIcon[store.id];
          return (
            <div key={store.id} className="store">
              <span className="icon" aria-hidden="true"><Icon size={24} /></span>
              <h2>{text.name}</h2>
              <p>{text.text}</p>
              {store.url ? (
                <a href={store.url} className="button" target="_blank" rel="noopener noreferrer">{fill(p.open, { name: text.name })}</a>
              ) : (
                <span className="button button-secondary" aria-disabled="true">{p.soon}</span>
              )}
            </div>
          );
        })}
      </div>
      {!anyLive && <p className="section-note">{p.soonNote}</p>}

      <h2>{p.thenTitle}</h2>
      <div className="plugin-then"><CopyLine text="/market" labels={t.plugin} /></div>
      <p className="section-note">{p.more}</p>

      <details className="fold">
        <summary>{p.devTitle}</summary>
        <div className="fold-body plugin-then">
          <p>{p.devText}</p>
          {installCommands.map((line) => <CopyLine key={line} text={line} labels={t.plugin} />)}
        </div>
      </details>

      <p style={{ marginTop: 24 }}><Link href={link("/catalog")}>{t.nav.catalog} →</Link></p>
    </>
  );
}

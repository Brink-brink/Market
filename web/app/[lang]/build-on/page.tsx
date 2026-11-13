import type { Metadata } from "next";
import Image from "next/image";
import { ChartNoAxesColumn, Coins, GitBranch, Hammer, KeyRound, ListChecks, MessageSquarePlus, Play, Wallet } from "lucide-react";
import { IconGrid } from "@/components/IconGrid";
import { images } from "@/lib/images";
import { pageContext } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/build-on">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.nav.buildOn };
}

// Suggested shares in percent, by size (rows) and technical level (columns). Source: docs/DELAGARSKAP.md.
const shares = [
  [2, 3, 5],
  [5, 8, 12],
  [10, 15, 20],
];

export default async function BuildOnPage({ params }: PageProps<"/[lang]/build-on">) {
  const { t } = await pageContext(params);
  const b = t.buildOn;

  return (
    <>
      <section className="page-head">
        <div>
          <span className="badge badge-accent">{t.common.comingLater}</span>
          <h1>{b.title}</h1>
          <p className="lead">{b.lead}</p>
        </div>
        <Image src={images.team} alt="" width={1168} height={880} priority />
      </section>

      <h2>{b.buildTitle}</h2>
      <IconGrid boxed items={b.build} icons={[MessageSquarePlus, Hammer, Coins]} />

      <h2>{b.logTitle}</h2>
      <IconGrid boxed items={b.log} icons={[GitBranch, Play, ListChecks]} />

      <h2>{b.shareTitle}</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{b.size}</th>
              <th>{b.simple}</th>
              <th>{b.medium}</th>
              <th>{b.advanced}</th>
            </tr>
          </thead>
          <tbody>
            {shares.map((row, i) => (
              <tr key={b.sizes[i]}>
                <th>{b.sizes[i]}</th>
                {row.map((percent) => <td key={percent}>{percent} %</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="meta">{b.shareNote}</p>

      <h2>{b.buyTitle}</h2>
      <IconGrid boxed items={b.buy} icons={[ChartNoAxesColumn, Wallet, KeyRound]} />
    </>
  );
}

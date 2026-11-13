import type { Metadata } from "next";
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
      <span className="badge badge-accent">{t.common.comingLater}</span>
      <h1>{b.title}</h1>
      <p className="lead">{b.lead}</p>

      <h2>{b.buildTitle}</h2>
      <ol className="steps-list">
        {b.build.map((step) => <li key={step}>{step}</li>)}
      </ol>

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

      <h2>{b.logTitle}</h2>
      <p>{b.logText}</p>
      <ul className="steps">
        {b.log.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <h2>{b.buyTitle}</h2>
      <ol className="steps-list">
        {b.buy.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </>
  );
}

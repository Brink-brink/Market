import Link from "next/link";

export type TileData = {
  id: string;
  href: string;
  tone: string;
  title: string;
  summary: string;
  tags: string[];
  features: string[];
  exampleLabel: string | null;
  priceText: string;
  metaText: string;
};

// One listing in the catalog or on the home page: a coloured top with the title, details below.
export function ListingTile({ tile }: { tile: TileData }) {
  return (
    <Link href={tile.href} className="tile">
      <div className={`tile-top tone-${tile.tone}`}>
        <div className="tile-tags">
          {tile.exampleLabel && <span className="tag-solid">{tile.exampleLabel}</span>}
          {tile.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <h3>{tile.title}</h3>
      </div>
      <div className="tile-body">
        <p>{tile.summary}</p>
        <div className="tile-features">
          {tile.features.map((feature) => <span key={feature}>{feature}</span>)}
        </div>
        <div className="tile-price">{tile.priceText}</div>
        <p className="meta">{tile.metaText}</p>
      </div>
    </Link>
  );
}

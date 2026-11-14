import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export type TileData = {
  id: string;
  href: string;
  tone: string;
  cover: string;
  title: string;
  summary: string;
  tags: string[];
  features: string[];
  exampleLabel: string | null;
  alias: string;
  initials: string;
  ratingText: string;
  fromText: string;
  metaText: string;
};

// One listing in the catalog or on the home page: cover image, who sells it, what it is and the price.
export function ListingTile({ tile }: { tile: TileData }) {
  return (
    <Link href={tile.href} className="tile">
      <div className="tile-cover">
        <Image src={tile.cover} alt="" width={672} height={376} />
        <div className="tile-tags">
          {tile.exampleLabel && <span className="tag-solid">{tile.exampleLabel}</span>}
          {tile.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="tile-body">
        <div className="seller">
          <span className={`avatar tone-${tile.tone}`} aria-hidden="true">{tile.initials}</span>
          <span>{tile.alias}</span>
          <span className="seller-rating"><Star size={14} aria-hidden="true" /> {tile.ratingText}</span>
        </div>
        <h3>{tile.title}</h3>
        <div className="tile-features">
          {tile.features.map((feature) => <span key={feature}>{feature}</span>)}
        </div>
        <div className="tile-price">{tile.fromText}</div>
        <p className="meta">{tile.metaText}</p>
      </div>
    </Link>
  );
}

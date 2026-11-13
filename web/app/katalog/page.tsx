import type { Metadata } from "next";
import { listings, proofTypeLabel, type CatalogListing } from "@/lib/listings";

export const metadata: Metadata = { title: "Katalog" };

const range = ([min, max]: [number, number]) =>
  `${min.toLocaleString("sv-SE")}–${max.toLocaleString("sv-SE")} kr`;

function ListingCard({ listing }: { listing: CatalogListing }) {
  return (
    <div className="card">
      <h3>{listing.title}</h3>
      <p className="meta">{listing.alias} · {listing.niche}</p>
      <p>
        <span className="badge">{proofTypeLabel[listing.proofType]}</span>
        <span className="badge">Demo granskad {listing.reviewedOn}</span>
      </p>
      <div className="price">{range(listing.setupPriceSek)}</div>
      <p className="meta">
        {listing.monthlyPriceSek ? `${range(listing.monthlyPriceSek)}/mån` : "Ingen månadsavgift"} ·
        Leverans {listing.deliveryDays} arbetsdagar
        {listing.ratingAvg !== null && ` · Betyg ${listing.ratingAvg.toFixed(1)}/5`}
      </p>
      <ul className="steps">
        {listing.includes.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <>
      <h1>Katalog</h1>
      <p className="lead">
        Granskade paket från personer som bygger AI-agenter. Ordningen styrs bara av relevans och
        kvalitet och går inte att köpa.
      </p>
      {listings.length === 0 ? (
        <p className="meta">Inga godkända annonser än.</p>
      ) : (
        <div className="grid">
          {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </>
  );
}

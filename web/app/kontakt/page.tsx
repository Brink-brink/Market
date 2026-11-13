import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Kontakt" };

export default function ContactPage() {
  return (
    <>
      <h1>Kontakt</h1>
      {site.contactEmail ? (
        <p>Frågor om tjänsten: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
      ) : (
        <p className="meta">Kontaktadress kommer.</p>
      )}
    </>
  );
}

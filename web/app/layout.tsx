import type { Metadata } from "next";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv">
      <body>
        <header className="header">
          <div className="wrap header-inner">
            <Link href="/" className="logo">{site.name}</Link>
            <nav className="nav">
              {nav.slice(1).map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="wrap main">{children}</main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>{site.name}</span>
            <Link href="/villkor">Villkor</Link>
            <Link href="/integritet">Integritet</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}

# Webbplats för säljare (fas 2)

Next.js 16, statiska sidor, ingen databas. Läs `AGENTS.md` innan du ändrar kod: Next 16 skiljer sig från äldre versioner, och dokumentationen ligger i `node_modules/next/dist/docs/`.

## Sidor

| Sida | Fil | Innehåll |
| --- | --- | --- |
| `/` | `app/page.tsx` | Hur tjänsten fungerar för säljare |
| `/annons` | `app/annons/page.tsx` | Krav på annonsen + inbäddat formulär (Tally) |
| `/krediter` | `app/krediter/page.tsx` | Kreditpaket med Stripe Payment Links |
| `/katalog` | `app/katalog/page.tsx` | Godkända annonser under alias, från `lib/listings.ts` |
| `/villkor`, `/integritet`, `/kontakt` | `app/*/page.tsx` | Utkast, ska granskas av jurist |

Namn, kreditpaket och länkar: `lib/site.ts`. Godkända annonser läggs till för hand i `lib/listings.ts` efter granskning (`docs/GRANSKNING.md`). Bara katalogfält, aldrig namn, kontaktuppgifter eller demolänk.

## Kör lokalt

```bash
npm install
npm run dev
```

Öppna http://localhost:3000.

## Inställningar

Kopiera `.env.example` till `.env.local` och fyll i när tjänsterna finns:

- `NEXT_PUBLIC_LISTING_FORM_URL`: Tallys inbäddningslänk för annonsformuläret
- `NEXT_PUBLIC_STRIPE_LINK_SMALL`, `_MEDIUM`, `_LARGE`: Stripe Payment Links
- `NEXT_PUBLIC_CONTACT_EMAIL`: kontaktadress

Tomma värden visar "öppnar snart" eller en inaktiv knapp.

## Publicera

Koppla repot till Vercel med `web` som rotmapp, och lägg in miljövariablerna där. Peka domänen dit via DNS när den är köpt.

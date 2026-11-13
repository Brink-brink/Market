# Webbplatsen (fas 2)

Sidan vänder sig till **nya frilansare som bygger AI-agenter**. Köpare får en egen sida och en flik på startsidan, men möter tjänsten i första hand i Claude.

Designregel: varje avsnitt har en bild eller ikon och högst en mening per punkt. Detaljer hör hemma i vanliga frågor.

Next.js 16, engelska och svenska, ingen databas. Läs `AGENTS.md` innan du ändrar kod: Next 16 skiljer sig från äldre versioner, och dokumentationen ligger i `node_modules/next/dist/docs/`.

## Sidor

Alla sidor finns under `/en/...` och `/sv/...`. Besökare utan språk i adressen skickas till sitt webbläsarspråk (`proxy.ts`), annars engelska.

| Sida | Fil | Innehåll |
| --- | --- | --- |
| `/` | `app/[lang]/page.tsx` | Foto med skrivrutan "Vad bygger du?" som leder till annonsassistenten, fyra fördelar med ikoner, "Så fungerar det" med fotokort och växel mellan frilansare och företag, annonser ur katalogen, och ett band för köpare |
| `/buyers` | `app/[lang]/buyers/page.tsx` | Köparens väg och behovsassistenten |
| `/listing` | `app/[lang]/listing/page.tsx` | Annonsassistenten, krav, granskning och formulär (Tally) |
| `/catalog` | `app/[lang]/catalog/page.tsx` | Katalog med sök och filter |
| `/catalog/<id>` | `app/[lang]/catalog/[id]/page.tsx` | En annons |
| `/credits` | `app/[lang]/credits/page.tsx` | Kreditpaket (Stripe Payment Links) och tillvalet annonsassistenten |
| `/build-on` | `app/[lang]/build-on/page.tsx` | Bygg vidare och uppköp, märkt som kommande |
| `/faq`, `/terms`, `/privacy`, `/contact` | `app/[lang]/*/page.tsx` | Vanliga frågor och utkast till villkor |

## Var saker ändras

| Vad | Fil |
| --- | --- |
| All text, per språk | `lib/dict/en.ts`, `lib/dict/sv.ts` (samma nycklar i båda) |
| Nytt språk | Lägg till en fil i `lib/dict/` och språket i `lib/i18n.ts` |
| Namn, valuta, kreditpaket | `lib/site.ts` |
| Annonser i katalogen | `lib/listings.ts` |
| Assistenternas instruktioner | `lib/assistant-prompts.ts` |
| Foton | `public/img/*.webp`, listade i `lib/images.ts`. AI-genererade för sidan (nätverkstema). Byt en bild genom att ersätta filen |
| Färger och stil | `app/globals.css` (variablerna överst) |

Godkända annonser läggs till för hand i `lib/listings.ts` efter granskning (`docs/GRANSKNING.md`). Bara katalogfält, aldrig namn, kontaktuppgifter eller demolänk. Annonserna med `example: true` är exempel och ska tas bort vid lansering.

## AI-assistenterna

`components/Assistant.tsx` pratar med `app/api/assist/route.ts`, som anropar Claude API (`claude-opus-5-5`).

- **Behovsassistenten** (`/buyers`) ställer frågorna en byggare behöver svar på och skriver ett behovsutkast.
- **Annonsassistenten** (`/listing`) hjälper säljaren skriva en annons och kontrollerar den mot granskningskraven. Tillval, gratis under lanseringen.

Samtalet sparas inte: webbläsaren skickar hela historiken varje gång. Assistenterna är avstängda tills `ANTHROPIC_API_KEY` är satt; då visas en hänvisning till `/market` i Claude.

Skydd mot missbruk: högst 40 meddelanden per samtal, 4 000 tecken per meddelande och 30 anrop per 10 minuter och IP-adress. Gränsen per IP ligger i minnet på varje serverinstans och är bara en enkel broms. Lägg en delad spärr framför (till exempel Vercels brandvägg) innan sidan får riktig trafik, och sätt en utgiftsgräns för API-nyckeln i Claude Console.

## Kör lokalt

```bash
npm install
npm run dev
```

Öppna http://localhost:3000.

## Inställningar

Kopiera `.env.example` till `.env.local` och fyll i när tjänsterna finns:

- `ANTHROPIC_API_KEY`: slår på assistenterna. Lägg den aldrig i koden
- `NEXT_PUBLIC_LISTING_FORM_URL`: Tallys inbäddningslänk för annonsformuläret
- `NEXT_PUBLIC_STRIPE_LINK_SMALL`, `_MEDIUM`, `_LARGE`: Stripe Payment Links
- `NEXT_PUBLIC_CONTACT_EMAIL`: kontaktadress

Tomma värden visar "öppnar snart" eller en inaktiv knapp.

## Publicera

Koppla repot till Vercel med `web` som rotmapp, och lägg in miljövariablerna där. Peka domänen dit via DNS när den är köpt.

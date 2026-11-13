# Plan

Kvällar och helger. Beslut 2026-11-13: fas 2 byggs parallellt med fas 0 och 1. Ingen lansering med betalning förrän minst en plattform har svarat på frågan om lead-modellen.

## Fas 0 – Regler och samtal (vecka 1)

- Mejla Anthropic och OpenAI om lead-modellen
- Välj bransch och 3 paket
- 10 intervjuer med företagare, 10 med blivande säljare

**Klart när:** svar från minst en plattform, bransch vald.

## Fas 1 – Marknadsanalysen som skill (vecka 2)

- Skriv `skills/market-analysis/SKILL.md`: tar en nisch, söker på webben, ger efterfrågan, prisnivåer, konkurrenter och paketförslag
- Paketera som plugin, testa lokalt i Claude Code
- `/market` med säljarmeny och annonsutkast (inget sparas)
- Låt 10 säljare testa analysen och annonsutkastet

**Klart när:** 7 av 10 testare tycker analysen är användbar.

## Fas 2 – Manuell matchning (vecka 3–4)

- Enkel landningssida för säljare + köp av krediter (Stripe Payment Links räcker)
- Formulär för köpare
- Formulär där säljare skickar in sitt annonsutkast; Philip granskar enligt `GRANSKNING.md`
- Enkel katalog på webbplatsen med godkända annonser (utan kontaktuppgifter)
- Philip matchar för hand, tar betalt per svarat lead

**Klart när:** ≥ 20 säljare har köpt krediter, ≥ 50 % av svarade leads blir affär.

## Fas 3 – MCP-server och plugin (MVP)

- Postgres-schema enligt `ARKITEKTUR.md`
- MCP-server med köpar- och säljarverktyg, inklusive katalog och annonser
- OAuth för säljare, kod i bekräftelsemejlet för köpare
- Webbplats: registrering, krediter, admin med granskning av annonser
- E-postaviseringar

**Klart när:** hela flödet i `PRD.md` fungerar för en bransch, i Claude.

## Fas 4 – Granskning och lansering

- Gå igenom `PLATTFORMSREGLER.md`
- `claude plugin validate`
- Skicka in till Claude-katalogen, sedan ChatGPT

## Fas 5 – Delägarskap och uppköp

Se `DELAGARSKAP.md`.

- Jurist: bidragsavtal, delägaravtal, köpeavtal, upphovsrätt och patent, moms
- Stripe Connect för säljare, betalning av paket via tjänsten
- Bidrag, arbetslogg med GitHub-app (bara läsbehörighet) och granskning av bidrag
- Andelsbok och automatisk delning av intäkter
- Uppköp med escrow och överlämningschecklista

**Klart när:** minst en produkt har fått ett godkänt bidrag och delat intäkter, och ett uppköp har genomförts.

## Fas 6 – Skala

- Fler branscher och paket
- Privatpersoner som köpare
- Abonnemang för säljare

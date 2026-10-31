# Arkitektur

Förslag. Ändra här först om något byts ut, och uppdatera sedan `CLAUDE.md`.

## Komponenter

```
┌────────────────────┐      ┌────────────────────┐
│ Claude / ChatGPT   │      │ Webbplats (Next.js)│
│  └─ vår plugin     │      │  - säljarregistr.  │
│     - skills       │      │  - inträdestest    │
│     - MCP-klient   │      │  - köp av krediter │──── Stripe
└─────────┬──────────┘      │  - admin           │
          │ Streamable HTTP └─────────┬──────────┘
          │ + OAuth 2.0               │
┌─────────▼───────────────────────────▼──────────┐
│ Backend / MCP-server (TypeScript)               │
│  - verktyg för köpare och säljare               │
│  - matchning                                    │
│  - lead-livscykel och kreditdebitering          │
│  - e-postaviseringar                            │
└─────────────────────┬──────────────────────────┘
                      │
                ┌─────▼─────┐
                │ Postgres  │
                └───────────┘
```

1. **Plugin** – paketerar skills (instruktioner, t.ex. marknadsanalysen) och en koppling till vår MCP-server. En plugin för Claude, en för ChatGPT, samma server bakom.
2. **MCP-server** – exponerar verktygen nedan. All affärslogik ligger här, inte i pluginen.
3. **Webbplats** – allt som har med pengar och konton att göra. Pluginen länkar aldrig hit för köp.
4. **Postgres** – all data.
5. **Stripe** – bara på webbplatsen, för kreditpaket.

## Plugin-struktur (Claude Code-plugin)

Verifiera mot aktuell dokumentation innan du bygger: https://claude.com/docs/plugins/submit

```
plugin/
├── .claude-plugin/plugin.json   # namn, version, beskrivning
├── .mcp.json                    # pekar på vår fjärr-MCP-server
└── skills/
    ├── market/SKILL.md          # /market: frågar köpare/säljare och väljer väg
    ├── market-analysis/SKILL.md # säljarens marknadsanalys
    ├── listing-draft/SKILL.md   # hjälper säljaren skriva annons (fas 1: bara utkast)
    ├── create-request/SKILL.md  # hjälper köparen formulera förfrågan
    └── respond-to-lead/SKILL.md # hjälper säljaren skriva erbjudande
```

För ChatGPT: samma MCP-server, paketerad enligt https://developers.openai.com/plugins

## MCP-verktyg

Varje verktyg måste ha `title`, `readOnlyHint`, `destructiveHint`, `openWorldHint`.

### Köpare (inget konto, identifieras med förfrågans id + hemlig token)

| Verktyg | Gör | readOnly | destructive | openWorld |
| --- | --- | --- | --- | --- |
| `search_listings` | Söker i katalogen av godkända annonser (nisch, prisintervall). Returnerar bara katalogfälten, se Datamodell | true | false | false |
| `get_listing` | En annons i detalj, bara katalogfälten: alias, paket, pris, leveranstid, bevistyp, granskningsdatum, betyg | true | false | false |
| `create_service_request` | Skapar förfrågan från fält som köparen godkänt (bransch, behov, budget, e-post). Valfritt: upp till 3 `listing_id` från katalogen; annars matchas den | false | false | false |
| `list_offers` | Visar erbjudanden för en förfrågan | true | false | false |
| `accept_offer` | Köparen svarar på ett erbjudande; triggar debitering av säljaren och utlämnande av kontakt | false | true | false |
| `submit_review` | Omdöme efter leverans | false | false | false |

### Säljare (inloggad via OAuth)

| Verktyg | Gör | readOnly | destructive | openWorld |
| --- | --- | --- | --- | --- |
| `create_listing` | Skickar in en annons som säljaren godkänt; status `in_review` | false | false | false |
| `update_listing` | Ändrar en annons; väsentliga ändringar granskas igen | false | false | false |
| `list_my_listings` | Säljarens annonser med granskningsstatus och granskarens kommentar | true | false | false |
| `get_demand_stats` | Köparnas intresse per nisch: antal förfrågningar och budgetintervall, bara summor | true | false | false |
| `list_matched_leads` | Anonymiserade förfrågningar matchade mot säljaren | true | false | false |
| `respond_to_lead` | Skickar erbjudande (annons + pris + meddelande) | false | false | false |
| `get_credit_balance` | Visar saldo, aldrig köpknapp eller pris | true | false | false |
| `get_contact` | Kontaktuppgifter för ett betalt lead | true | false | false |

Rollvalet i `/market` görs med klientens egna frågeknappar (i Claude Code: AskUserQuestion), inte med ett eget gränssnitt. Ett formulär inne i chatten för köparens förfrågan kräver MCP-servern och hör till fas 3; läs aktuell dokumentation om interaktiva gränssnitt i appar för Claude och ChatGPT innan det byggs.

Marknadsanalysen är en **skill** (instruktioner + webbsökning i Claude/ChatGPT), inte ett verktyg på vår server, i MVP. Annonsutkastet är också en skill; i fas 3 skickar den in via `create_listing`.

Granskningen av annonser görs i admin på webbplatsen, inte i pluginen. Process och checklista: `GRANSKNING.md`.

## Datamodell

```
sellers          id, email, legal_name, alias, rating_avg, status, created_at
packages         id, niche, title, description, price_min, price_max   # mallar
listings         id, seller_id, package_id?, niche, title, includes,
                 setup_price_min, setup_price_max, monthly_price_min?,
                 monthly_price_max?, delivery_days, proof_type (prototype|live),
                 demo_url, test_instructions, data_handling,
                 status (in_review|changes_requested|approved|rejected|paused),
                 approved_version_id?, created_at, updated_at
listing_reviews  id, listing_id, reviewer, decision, checklist (jsonb),
                 comment, created_at
requests         id, access_token_hash, niche, need, budget, buyer_email,
                 buyer_name, status, created_at, expires_at
matches          id, request_id, seller_id, listing_id, source (catalog|matched),
                 status, created_at
offers           id, match_id, listing_id, price, message, created_at
credit_ledger    id, seller_id, delta, reason, offer_id, stripe_ref, created_at
reviews          id, request_id, seller_id, rating, comment, created_at
```

Regler:
- `buyer_email` och `buyer_name` exponeras aldrig för säljaren förrän det finns en debitering i `credit_ledger` för det erbjudandet.
- Ingen chatttext sparas. `need` är köparens egen, godkända beskrivning.
- Saldo = summan av `credit_ledger.delta`. Aldrig ett lagrat saldofält.
- En säljare är aktiv (syns i katalog och matchning) när hen har minst en annons med status `approved`. Det ersätter `test_passed_at`.
- Katalogen visar bara den godkända versionen av en annons och bara katalogfälten: `alias`, `niche`, `title`, `includes`, priser, `delivery_days`, `proof_type`, granskningsdatum och `rating_avg`. Aldrig `email`, `legal_name`, `demo_url`, `test_instructions` eller `data_handling` i rå form.
- `demo_url` och `test_instructions` läses bara av admin vid granskning.
- Kontaktfilter körs på all fritext innan den visas för den andra parten (`listings.includes`, `listings.title`, `requests.need`, `offers.message`): e-post, telefonnummer, webbadresser, sociala medier-konton och säljarens `legal_name`. Träffar tas bort och loggas.
- `alias` tilldelas av tjänsten och kan inte väljas fritt.

## Annons-livscykel

```
listing:  in_review ──► approved ──► paused ──► approved
              │  ▲          │
              ▼  │          └──► (väsentlig ändring) in_review, godkänd version visas under tiden
       changes_requested
              │
              └──► rejected
```

## Lead-livscykel

```
request:  open ──► matched ──► offered ──► accepted ──► reviewed
             │                     │
             └──► expired          └──► expired (inget svar inom X dagar)

offer:    sent ──► accepted (kredit dras, kontakt lämnas ut)
              └──► declined / expired (ingen kostnad)
```

- Högst 3 säljare matchas per förfrågan.
- Debiteringen sker i samma databastransaktion som `accept_offer`. Saknar säljaren krediter: erbjudandet kan inte skickas från början (kolla saldo i `respond_to_lead`).

## Matchning (MVP)

Samma ordning gäller katalogens sortering. Den påverkas aldrig av betalning eller kreditsaldo.

Enkel regelbaserad ordning:
1. Rätt nisch och godkänd annons
2. Har inte fått lead senaste X timmar (sprid till nya säljare)
3. Snittbetyg
4. Svarstid

## Säkerhet och data

- OAuth 2.0 för säljare. Köparen identifieras med token i förfrågan.
- Integritetspolicy som täcker vilka fält vi sparar och hur länge.
- Rate limit på `create_service_request` mot spam.
- Inga betalkortsuppgifter eller känsliga personuppgifter i MCP-servern.

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
    ├── create-request/SKILL.md  # hjälper köparen formulera förfrågan
    └── respond-to-lead/SKILL.md # hjälper säljaren skriva erbjudande
```

För ChatGPT: samma MCP-server, paketerad enligt https://developers.openai.com/plugins

## MCP-verktyg

Varje verktyg måste ha `title`, `readOnlyHint`, `destructiveHint`, `openWorldHint`.

### Köpare (inget konto, identifieras med förfrågans id + hemlig token)

| Verktyg | Gör | readOnly | destructive | openWorld |
| --- | --- | --- | --- | --- |
| `create_service_request` | Skapar förfrågan från fält som köparen godkänt (bransch, behov, budget, e-post) | false | false | false |
| `list_offers` | Visar erbjudanden för en förfrågan | true | false | false |
| `accept_offer` | Köparen svarar på ett erbjudande; triggar debitering av säljaren och utlämnande av kontakt | false | true | false |
| `submit_review` | Omdöme efter leverans | false | false | false |

### Säljare (inloggad via OAuth)

| Verktyg | Gör | readOnly | destructive | openWorld |
| --- | --- | --- | --- | --- |
| `list_matched_leads` | Anonymiserade förfrågningar matchade mot säljaren | true | false | false |
| `respond_to_lead` | Skickar erbjudande (paket + pris + meddelande) | false | false | false |
| `get_credit_balance` | Visar saldo, aldrig köpknapp eller pris | true | false | false |
| `get_contact` | Kontaktuppgifter för ett betalt lead | true | false | false |

Rollvalet i `/market` görs med klientens egna frågeknappar (i Claude Code: AskUserQuestion), inte med ett eget gränssnitt. Ett formulär inne i chatten för köparens förfrågan kräver MCP-servern och hör till fas 3; läs aktuell dokumentation om interaktiva gränssnitt i appar för Claude och ChatGPT innan det byggs.

Marknadsanalysen är en **skill** (instruktioner + webbsökning i Claude/ChatGPT), inte ett verktyg på vår server, i MVP.

## Datamodell

```
sellers          id, email, name, niches[], test_passed_at, rating_avg, status
packages         id, niche, title, description, price_min, price_max, template_url
requests         id, access_token_hash, niche, need, budget, buyer_email,
                 buyer_name, status, created_at, expires_at
matches          id, request_id, seller_id, status, created_at
offers           id, match_id, package_id, price, message, created_at
credit_ledger    id, seller_id, delta, reason, offer_id, stripe_ref, created_at
reviews          id, request_id, seller_id, rating, comment, created_at
```

Regler:
- `buyer_email` och `buyer_name` exponeras aldrig för säljaren förrän det finns en debitering i `credit_ledger` för det erbjudandet.
- Ingen chatttext sparas. `need` är köparens egen, godkända beskrivning.
- Saldo = summan av `credit_ledger.delta`. Aldrig ett lagrat saldofält.

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

Enkel regelbaserad ordning, aldrig påverkad av betalning:
1. Rätt nisch och godkänt test
2. Har inte fått lead senaste X timmar (sprid till nya säljare)
3. Snittbetyg
4. Svarstid

## Säkerhet och data

- OAuth 2.0 för säljare. Köparen identifieras med token i förfrågan.
- Integritetspolicy som täcker vilka fält vi sparar och hur länge.
- Rate limit på `create_service_request` mot spam.
- Inga betalkortsuppgifter eller känsliga personuppgifter i MCP-servern.

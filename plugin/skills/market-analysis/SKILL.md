---
name: market-analysis
description: Market analysis of a niche for someone who wants to sell AI agents to small businesses as a side job. Searches the web for demand, price levels and competitors, suggests three packages with fixed price ranges, and assesses whether the niche suits a beginner, citing a source for every figure. Use when a seller names a niche (for example "booking agent for hair salons", "bokningsagent för frisörer") or asks whether a niche, industry or type of AI agent is worth selling or what to charge for it.
allowed-tools: WebSearch WebFetch
---

# Market analysis of a niche

The seller wants to know whether a niche is worth selling AI agents in, and how to package and price the work. The niche is: $ARGUMENTS

If that is empty, take the niche from the seller's latest message. If there is no niche anywhere, ask for one in a single short question and stop.

## Ground rules

These apply to the whole answer and override everything else in this skill.

1. **Answer in the seller's language.** Use the language the seller writes in, including headings and labels. If your instructions set a response language for this session, use that. Otherwise the seller's messages in this conversation and the niche text decide it, never the language of this skill or of the sources.
2. **Every figure needs a source.** Every number (price, market size, count, share, growth, salary, fee) is followed by its source as a Markdown link, with the publication or retrieval date when known. One number, one source; do not attach a single source to a paragraph of numbers.
3. **"Found nothing" beats a guess.** If a search turns up nothing usable for a point, say so plainly in the seller's language (for Swedish: "hittade inget"). Never fill a gap with a typical-sounding number, a number from memory, or an unsourced range.
4. **Separate facts from judgement.** Anything you conclude yourself (package prices, the beginner assessment, which competitor is strongest) is marked as your assessment and says which sourced facts it rests on.
5. **No sales for anyone.** Do not mention prices of credits, leads or any platform subscription, do not link to any checkout or purchase page, and do not urge the seller to buy anything. Do not recommend any particular marketplace or service as the place to find customers; describe the competitive landscape neutrally.

## Step 1: Pin down the niche and market

- Restate the niche as: **customer type** (e.g. hair salons) + **agent type** (e.g. booking agent).
- Decide the market and currency. Use what the seller said; otherwise infer from their language (Swedish → Sweden, SEK). Only ask if it is genuinely ambiguous, and then ask once. When you inferred the market rather than being told it, say so in one line under the title, so the seller can correct it.
- Show all prices in that currency. When a source uses another currency, look up the current exchange rate from a central bank and cite it like any other figure. For SEK, fetch Riksbanken's latest rate with WebFetch from `https://api.riksbank.se/swea/v1/Observations/Latest/SEK<CUR>PMI`, where `<CUR>` is the source currency (for example `SEKUSDPMI`, `SEKEURPMI`, `SEKGBPPMI`). For other currencies, use the ECB or the market's own central bank. Then give the original amount and the converted amount. If you find no rate, show the original amount only and say so.

## Step 2: Search

Run several searches before writing anything. Search in the market's language and in English. Prefer primary sources (the seller's own price pages, industry associations, official statistics, marketplace listings) over blog round-ups. Open the most promising pages with WebFetch to read the actual numbers instead of relying on search snippets.

Cover all three areas:

- **Demand.** Is there a real need in this customer type? Look for: number of businesses in the market (official statistics), the pain the agent solves (missed calls, no-shows, slow lead follow-up) with figures, adoption of similar tools, job or project postings asking for this.
- **Price levels.** What do buyers pay today? Look for: freelance gigs and project listings for this kind of agent, agency price pages, SaaS tools that solve the same problem (monthly price), and hourly rates for this kind of work.
- **Competitors.** Who already sells this to this customer type? Look for: SaaS products aimed at the niche, agencies, freelancers, and built-in features in the software the customers already use (e.g. the booking system already has reminders). Note price and what they offer.

Record the source URL and date for every number as you go.

## Step 3: Suggest three packages

Suggest exactly three packages that a solo seller could deliver, from simplest to most extensive. For each:

- **Name** and **what is included** (concrete deliverables, setup, integrations, support period).
- **Fixed price range** for setup, plus a monthly fee if a recurring part makes sense.
- **Basis for the price:** which sourced price points (from step 2) the range is anchored to. Mark the range itself as your assessment.

If you found no price data at all to anchor on, still describe the three packages, but write "found nothing" (in the seller's language) for the price and suggest how the seller can find out (for example: ask five businesses, look at specific listings).

## Step 4: Assess whether the niche suits a beginner

Give one verdict: **Suits a beginner**, **Suits a beginner with reservations** or **Does not suit a beginner** (in the seller's language). Base it on:

- **Technical difficulty:** can it be built with standard no-code or AI tools, or does it need custom integration?
- **Integrations:** does it depend on the customers' existing systems, and do those have open APIs?
- **Risk and regulation:** does the agent handle sensitive data (health, finances, children) or give advice where mistakes are costly?
- **Sales:** how easy is it to reach and convince the customers, and how long is the buying decision?
- **Competition:** how crowded is it, and do cheap off-the-shelf tools already cover the need?

For each factor, write one line and cite the sourced fact it rests on where there is one.

## Output format

Use this structure, translated into the seller's language. Start directly with the title: no preamble such as "I've finished searching". Keep it tight: short paragraphs and tables, no filler.

```
# Market analysis: <niche> (<market>)

**In short:** 2–3 sentences: is it worth it, the price level, the verdict for beginners.

## Demand
Bullets with figures and sources. "Found nothing" where applicable.

## Price levels
Table: What | Price | Source

## Competitors
Table: Competitor | Type (SaaS/agency/freelancer/built-in) | Price | What they offer | Source

## Three packages
Table: Package | Includes | Price range | Based on
Then one line stating that the price ranges are an assessment.

## Suits a beginner?
Verdict, then one line per factor.

## Gaps
What you searched for but did not find.

## Sources
Numbered list of every source used, with title, URL and date.
```

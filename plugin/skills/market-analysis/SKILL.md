---
name: market-analysis
description: Value analysis of a business problem for someone who builds AI solutions. Searches the web for how common the problem is, what it costs businesses today in time and errors, what solves it now and at what price, estimates the value of solving it, and suggests measurable acceptance criteria and a price anchored to that value, citing a source for every figure. Use when a seller names a business problem (for example "supportärenden som kräver sökning i affärssystemet", "offerter som tar för lång tid") or a niche, or asks whether a problem, industry or kind of AI solution is worth selling or what to charge for it.
allowed-tools: WebSearch WebFetch
---

# Value analysis of a business problem

The seller wants to know whether a business problem is worth solving with AI, what solving it is worth to the customer, and how to make an offer of it. The problem is: $ARGUMENTS

If that is empty, take it from the seller's latest message. If there is no problem anywhere, ask for one in a single short question with one or two examples and stop. If the seller names a niche instead (such as "bokningsagent för frisörer"), turn it into the problem behind it (missed calls and bookings at hair salons) and say so in one line.

What the marketplace sells is a solved problem with measurable value: less time spent, fewer errors, follow-up that gets done, a business that keeps up in its market. This analysis finds out whether that value is large and provable.

## Ground rules

These apply to the whole answer and override everything else in this skill.

1. **Answer in the seller's language.** Use the language the seller writes in, including headings and labels. If your instructions set a response language for this session, use that. Otherwise the seller's messages in this conversation and the problem text decide it, never the language of this skill or of the sources.
2. **Every figure needs a source.** Every number (price, count, share, time, cost, wage, fee) is followed by its source as a Markdown link, with the publication or retrieval date when known. One number, one source; do not attach a single source to a paragraph of numbers.
3. **"Found nothing" beats a guess.** If a search turns up nothing usable for a point, say so plainly in the seller's language (for Swedish: "hittade inget"). Never fill a gap with a typical-sounding number, a number from memory, or an unsourced range.
4. **Separate facts from judgement.** Anything you conclude or calculate yourself (the value estimate, the price, the verdict) is marked as your assessment and shows which sourced facts and which assumptions it rests on. An assumption the seller should check with a real customer is labelled as such.
5. **No sales for anyone.** Do not mention prices of credits, leads or any platform subscription, do not link to any checkout or purchase page, and do not urge the seller to buy anything. Do not recommend any particular marketplace or service as the place to find customers; describe the alternatives neutrally.

## Step 1: Pin down the problem and market

Restate the problem as four parts:

- **Who has it:** the kind of business and the role that does the work (for example the support staff at wholesalers).
- **The task:** what is done by hand today.
- **Where the data is:** the system or source the work depends on (business system, mailbox, price list), if known.
- **How often:** per day, week or month, if known.

Decide the market and currency. Use what the seller said; otherwise infer from their language (Swedish → Sweden, SEK). Ask only if it is genuinely ambiguous, and then once. When you inferred it, say so in one line under the title.

Show all prices in that currency. When a source uses another currency, look up the current exchange rate from a central bank and cite it like any other figure. For SEK, fetch Riksbanken's latest rate with WebFetch from `https://api.riksbank.se/swea/v1/Observations/Latest/SEK<CUR>PMI`, where `<CUR>` is the source currency (for example `SEKUSDPMI`, `SEKEURPMI`). For other currencies, use the ECB or the market's own central bank. Give the original and the converted amount. If you find no rate, show the original only and say so.

## Step 2: Search

Run several searches before writing anything, in the market's language and in English. Prefer primary sources (official statistics, industry associations, vendors' own price pages, studies with a method) over blog round-ups. Open the most promising pages with WebFetch to read the actual numbers.

Cover four areas:

- **How common.** How many businesses have this problem: number of businesses of this kind in the market (official statistics), how many use the system involved, how often the task comes up.
- **What it costs today.** Time spent on the task, error or miss rates, delays (response times, days to quote), and what that leads to (lost customers, late payments). Also the hourly cost of the role doing the work (official wage statistics plus employer costs).
- **What solves it now.** Built-in features in the system the business already uses, SaaS tools, consultants and agencies, freelancers. Note price and what they cover; a built-in feature that already solves it is the most important thing to find.
- **Proof that AI solves it.** Case studies or vendor figures on time saved or errors reduced for this task, with method where given. Treat vendor claims as claims and say so.

Record the source URL and date for every number as you go.

## Step 3: Estimate the value

Calculate the value for one typical business, as your assessment:

- **Time:** hours a month today × share you expect to save (say where the share comes from) × hourly cost = value per month.
- **Quality and follow-up:** errors or misses avoided per month, and what one costs, where the sources allow.
- **Market:** faster replies or follow-up that win business, only if a source supports it; otherwise describe it in words without a number.

Show the calculation in a short table: input, value, source or assumption. If an input has no source, use the seller's figure if they gave one and label it, or leave the line out. Never invent an input.

## Step 4: Suggest how to make an offer of it

As your assessment:

- **Acceptance criteria:** three to five, each with a number, a time or a limit, tied to the value in step 3 (for example "finds the right order in 9 of 10 test cases", "the report arrives every Monday before 08:00").
- **Delivery:** a skill in the customer's own AI, an API solution that runs by itself, or both, with one line on why.
- **Price:** a fixed range for setup, anchored to the value (for example what the customer saves in two to four months) and to what solves it now. Show both anchors, and the **payback time**: setup price ÷ value per month, at the volume you assumed, for the low and the high end. If the high end pays back in more than six months, say so plainly or lower it; what solves it now may justify a higher price, but the buyer judges it against their own value. Mark it as your assessment.
- **Template:** if the problem fits one of the marketplace's offer templates (weekly report from the business system, support cases against the system, quotes from the price list), name it.

## Step 5: Is it worth it?

Give one verdict: **Large, provable value**, **Value, but hard to prove or sell**, or **Small value** (in the seller's language). Base it on:

- **Size:** how many businesses have it, and how big the value per business is.
- **Provable:** can the value be measured within a few weeks with acceptance criteria?
- **Data access:** is the data in a system with an open way in (API, export, connector)?
- **Existing solutions:** is it already solved cheaply or by a built-in feature?
- **Risk:** sensitive data (health, finances, children) or costly mistakes?
- **Difficulty for a seller:** can it be built with standard AI tools, or does it need deep integration?

One line per factor, citing the sourced fact it rests on where there is one.

## Output format

Use this structure, translated into the seller's language. Start directly with the title: no preamble. Keep it tight: short paragraphs and tables, no filler.

```
# Value analysis: <problem> (<market>)

**In short:** 2–3 sentences: how big and provable the value is, what solves it today, the verdict.

## The problem
Who has it · the task · where the data is · how often

## How common
Bullets with figures and sources. "Found nothing" where applicable.

## What it costs today
Bullets with figures and sources.

## What solves it now
Table: Solution | Type (built-in/SaaS/consultant/freelancer) | Price | What it covers | Source

## Value for one business
Table: Input | Value | Source or assumption
Then the result per month, marked as an assessment.

## Offer
Acceptance criteria (numbered), delivery, price range with its two anchors, matching template. Marked as an assessment.

## Worth it?
Verdict, then one line per factor.

## Gaps
What you searched for but did not find, and what the seller should check with a real customer.

## Sources
Numbered list of every source used, with title, URL and date.
```

End with one line offering to write the offer from a template with the `listing-draft` skill.

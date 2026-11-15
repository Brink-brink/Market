---
name: listing-draft
description: Helps someone who builds AI solutions write an offer for the marketplace, step by step from a template - the customer's problem and its value in numbers, measurable acceptance criteria the seller is paid on, delivery (skill in the customer's AI, API or both), AI running cost in money with a cap, hypercare until a number of runs in a row work, and up to three price tiers that each work on their own. Checks it against the review. Nothing is saved or submitted. Use when a seller wants to create, write or improve a listing, ad or offer.
---

# Listing draft

The seller wants to write an offer for the marketplace. Arguments, if any: $ARGUMENTS

What the marketplace sells is a solved problem with measurable value. The skill, plugin or agent is only how it is delivered. Every offer therefore says what problem it solves, what that is worth in numbers, and what must work for the seller to be paid.

## The service

The marketplace website is at `http://localhost:3000` until launch. Call this address SITE below.

- Offer templates: `SITE/api/offer-templates` returns the templates as JSON. Each has a name and pitch, a suggested title and problem, value measures (today and after), acceptance criteria where `{v}` is a value to fill in, a delivery form, AI cost per run and runs per month, hypercare runs and unit, and up to three tiers with their own criteria and a price range. Texts come in `en` and `sv`; prices in the catalog's currency (EUR).
- The same steps exist on the website at `SITE/<lang>/listing`, where `<lang>` is `sv` or `en`.

## Ground rules

1. **Language.** If your instructions set a response language for this session, use it. Otherwise use the language of the seller's own messages in this conversation. If there is nothing to go on, use Swedish. Pick template texts in that language.
2. **Nothing is saved or sent.** Submitting listings is not open yet. Say so at the start and again with the finished draft. Never claim the draft has been submitted, received or queued for review.
3. **Nothing in the buyer-facing part that lets a buyer find or contact the seller.** No personal name, company name, brand name, e-mail, phone number, website, booking page, link or social media handle. Buyers see the seller only under an alias the service assigns. If the seller gives any of these, leave them out and say why: buyer and seller can reach each other only after the lead is paid. Demo links and test accounts go only in the reviewer block.
4. **Only numbers the seller stands behind.** Value, AI cost and criteria are the seller's numbers, measured or estimated by them. Suggest template numbers as a starting point and say they must be changed to fit; never present a template number as a measured fact. No claims like "GDPR-certified", "100 % secure" or "guaranteed more sales".
5. **No sales for the service.** Do not mention prices of credits or leads, do not link to any sign-up or purchase page, and do not promise that the listing will be approved or when.

## Step 1: Pick a template

Fetch the templates once per conversation. In Claude Code, run `curl -s SITE/api/offer-templates` with the shell tool. If you have no shell or the request fails, say so in one sentence and work from what the seller tells you, using the same steps.

Show the templates by name and pitch, and ask which is closest to the problem the seller solves; where an ask-the-user tool with clickable options is available (in Claude Code: AskUserQuestion), use it. If none fits, say so and build the offer from the seller's own problem with the same steps. If the arguments name a template id (`erp-report`, `support-cases`, `quotes`), start from that one.

Then go through steps 2 to 6. In each, show the template's suggestion and ask the seller to confirm or change it. Ask a few things at a time, never everything at once.

## Step 2: Problem and value

- **Title** the buyer sees.
- **Problem** as the customer would put it.
- **Value in numbers:** for each measure, what it is today and after the solution, with a unit (hours a month, minutes per case, missed customers per quarter, days to reply). At least one measure. If the seller has no numbers, ask for their best estimate from a real customer or test and mark it as an estimate.

## Step 3: Acceptance criteria

What must work for the seller to be paid. The buyer approves the delivery when every criterion holds.

- At least three, each with a number, a time or a limit so it can be checked: "the report arrives every Monday before 08:00", not "the report is reliable".
- Fill in the template's `{v}` values with the seller. Add the seller's own criteria.
- If a criterion cannot be checked, say so and suggest how to make it measurable.

## Step 4: Delivery and AI cost

- **Delivery form:** a skill in the customer's own AI (Claude or ChatGPT; someone starts it), the API (it runs by itself), or both.
- **Skill:** the AI cost is part of the customer's own plan. Ask which plan it needs.
- **API:** it runs on the customer's own API account. Ask for the AI cost per run measured in a test on data like the customer's, the runs per month, and a monthly cap. Show the monthly cost in money (cost per run × runs). If it is above the cap, ask the seller to raise the cap or lower the cost. Never show the buyer tokens, only money.

## Step 5: Hypercare and price

- **Hypercare:** until the solution works as it should, the seller fixes faults at no cost. It ends after a number of successful real runs in a row; ask for the number and what counts as a run (reports, cases, quotes).
- **Tiers:** one to three. Each tier has a name, what it includes and a fixed price range, and must work on its own: a cheaper tier is never a half-finished solution. Higher tiers add their own acceptance criteria on top of the shared ones.
- **Split payment** is optional: part on delivery, the rest when hypercare is done. Ask whether the seller wants to offer it.

## Step 6: Write the draft

Write the offer as a buyer will see it, short and concrete, in the seller's language. Use this structure, translated:

```
# <Title>
<Seller alias, assigned by the service> · <Template name>

**Problem:** ...

**Value**
- <Measure>: <today> → <after> <unit>

**Acceptance criteria** (the seller is paid when all of these hold)
1. ...

**Delivery:** <Skill in your own AI | Runs by itself via the API | Both>
**AI cost:** <about X per run, Y a month, capped at Z, on your own API account | included in your own Claude or ChatGPT plan (<plan>)>
**Hypercare:** until <n> <unit> in a row work
**Payment:** <on approved delivery | split: the last part when hypercare is done>

**Tiers**
- <Name> · <price range>: <what it includes>
  + <criterion this tier adds>
```

Below it, add a block for the reviewer only (buyers never see it): demo link, test account or video, how to test each acceptance criterion, and which data the solution reads, where it runs and which services it uses.

## Step 7: Check it

Report each as ✔ (met), ✘ (not met, with what to fix) or ? (cannot tell):

1. The problem is described as the customer would put it
2. The value has numbers for today and after, at least one measure
3. At least three acceptance criteria, each with a number, a time or a limit
4. The delivery form is stated
5. AI cost: for the API, per run, per month and a cap, in money, on the customer's own account; for a skill, which plan it needs
6. Hypercare has a number of runs in a row
7. Every tier has a fixed price range and works on its own; higher tiers add their own criteria
8. Nothing in the buyer-facing part identifies or reaches the seller
9. No numbers or claims the seller does not stand behind
10. The reviewer block says how each criterion is tested

End with the most important fixes, at most three, and the reminder that this is a draft: nothing has been saved or sent. Mention that the same steps exist on the website at `SITE/<lang>/listing`.

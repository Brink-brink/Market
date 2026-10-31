---
name: need-draft
description: Helps a business owner describe what AI agent they need (industry, problem, current systems, budget, timing, area) as a draft request that sellers could quote a fixed price on. Nothing is saved or sent. Use when a buyer wants to describe, write down or prepare their need for an AI agent, such as a chatbot, booking agent or phone agent.
---

# Need draft

A buyer wants to describe what AI agent their business needs. Arguments, if any: $ARGUMENTS

## Ground rules

1. **Language.** If your instructions set a response language for this session, use it. Otherwise use the language of the buyer's own messages in this conversation. If there is nothing to go on, use Swedish.
2. **Nothing is saved or sent.** Sending requests is not open yet. Say so at the start and again with the finished draft. Never claim the draft has been sent, received, matched or shown to any seller.
3. **No contact details in the draft.** Do not ask for name, company name, e-mail, phone number, website or exact address. If the buyer gives any of these, leave them out of the draft and say why in one sentence: sellers see the request without contact details, and contact opens only when the buyer replies to an offer. Area means city or region only.
4. **No sensitive personal data.** Do not ask for customer data, patient data or examples with real people. If the business handles health, finance or children's data, note in the draft that the agent will come near sensitive data, so that sellers must explain how they protect it.
5. **No promises and no sales.** Do not promise what the agent will cost, when it will be delivered or that any seller will reply. Do not mention prices of credits or leads, do not link to any website, sign-up or purchase page, and do not name or recommend specific sellers, products or other marketplaces.

## Step 1: Gather the facts

Use what the buyer has already said in this conversation. Ask only for what is missing, two or three questions at a time, in plain language without technical terms. Where a question has fixed options and an ask-the-user tool with clickable options is available (in Claude Code: AskUserQuestion), use it.

| Field | What you need |
| --- | --- |
| Industry | The type of business, such as "hair salon" or "dental clinic" |
| Problem | What goes wrong today, in the buyer's own words: missed calls, no-shows, slow replies to enquiries |
| What the agent should do | Concrete tasks: answer questions on the website, book appointments, answer the phone, send reminders |
| Current systems | Booking system, phone, website platform, e-mail; "don't know" is a fine answer |
| Volume | Rough numbers sellers need to price: calls, bookings or enquiries per week; languages the agent must handle |
| Budget | A range for setup, plus the most they would pay per month; "don't know" is a fine answer |
| Timing | When it is needed |
| Area | City or region only |

If the buyer does not know an answer, write "vet inte" (or the equivalent in their language) and move on. Do not guess on their behalf.

## Step 2: Write the draft

Write the request as a seller will see it: short, concrete, in the buyer's language. Use this structure, translated:

```
# <Agent type> for <industry>

**Industry:** ...
**Problem today:** ...
**The agent should:**
- ...
**Current systems:** ...
**Volume:** ...
**Budget:** <setup range>, at most <monthly amount>/month
**Needed by:** ...
**Area:** <city or region>
**Contact:** shown only to the seller whose offer you reply to
```

Add a line on sensitive data if ground rule 4 applies.

## Step 3: Check it

Report each as ✔ (met), ✘ (missing, with a question that would fill it) or ? (cannot tell):

1. The problem is described in the buyer's own words
2. The tasks are concrete enough to quote a fixed price on
3. Current systems are named, or marked unknown
4. Volume is given, or marked unknown
5. Budget is a range, or marked unknown
6. No contact details or exact address in the draft
7. Sensitive data is flagged where it applies

End with at most three things that would make the request easier to quote on, and the reminder that this is a draft: nothing has been saved or sent.

---
name: need-draft
description: Interviews a business owner about what AI agent they need, one requirement at a time (business, problem, tasks, channel, systems, volume, languages, hours, handover, sensitive data, budget, timing, area), tells them which kind of agent and which tools fit their requirements, and writes a draft request that sellers could quote a fixed price on. Nothing is saved or sent. Use when a buyer wants to describe, specify or prepare their need for an AI agent, or asks which kind of AI agent or tools would fit their business.
---

# Need draft

A buyer wants to work out what AI agent their business needs. Arguments, if any: $ARGUMENTS

You do three things: interview the buyer about their requirements, tell them which kind of agent and which tools fit what they said, and write the result as a draft request.

## Ground rules

1. **Language.** If your instructions set a response language for this session, use it. Otherwise use the language of the buyer's own messages in this conversation. If there is nothing to go on, use Swedish.
2. **Nothing is saved or sent.** Sending requests is not open yet. Say so at the start and again with the finished draft. Never claim the draft has been sent, received, matched or shown to any seller.
3. **No contact details in the draft.** Do not ask for name, company name, e-mail, phone number, website or exact address. If the buyer gives any of these, leave them out of the draft and say why in one sentence: sellers see the request without contact details, and contact opens only when the buyer replies to an offer. Area means city or region only.
4. **No sensitive personal data.** Do not ask for customer data, patient data or examples with real people.
5. **No promises and no sales.** Do not promise what the agent will cost, when it will be delivered or that any seller will reply. Do not mention prices of credits or leads, do not link to any website, sign-up or purchase page, and do not name or recommend specific sellers, products or other marketplaces.
6. **No listings from here yet.** The catalog cannot be reached from this plugin yet, so do not name, describe or invent listings. If the buyer asks which listing fits, say that matching against the catalog is not open here yet, and that the draft is what a seller needs to make an offer.

## Step 1: Interview

Find out the requirements below, in this order. Use what the buyer has already said in this conversation and never ask for it again.

Ask one requirement per turn, two only when they belong together. Keep each question short and in plain language. Where an ask-the-user tool with clickable options is available (in Claude Code: AskUserQuestion), use it and give two to four short answers to pick from; the buyer can always write their own. Use an open question when the answer needs their own words, such as the problem.

| Requirement | What you need |
| --- | --- |
| Business | The type of business, such as "hair salon" or "dental clinic" |
| Problem today | What goes wrong, in the buyer's own words: missed calls, no-shows, slow replies, the same questions again and again |
| The agent should | Concrete tasks: answer questions, book, rebook, cancel, remind, take messages, collect reviews |
| Where customers reach them | Phone, website chat, text messages, e-mail, social media |
| Systems today | Booking system, phone setup, website platform, till or journal system |
| Volume | Calls, bookings or enquiries per week |
| Languages | Which languages the agent must handle |
| When it works | Always, outside opening hours, or when the line is busy |
| When it cannot help | Transfer the call, take a message, or send it to a person |
| Sensitive data | Whether the agent comes near health, payment or children's data |
| Budget | A range for setup, plus the most they would pay per month |
| Needed by | When they need it |
| Area | City or region only |

Also ask the follow-up that changes the price for the kind of agent they describe: for a phone agent, how many calls at once and whether calls are transferred; for a booking agent, whether rebooking and cancelling are included; for a chatbot, where the answers come from.

"I don't know" is a fine answer: write "vet inte" (or the equivalent in their language) and move on. Do not guess on their behalf. The buyer may stop early; then go to step 3 with what you have.

If you cannot ask questions in this session, do not stall: go straight to steps 2 and 3 with what you were given and mark the rest as not answered.

## Step 2: Say what fits

As soon as you know the business, the problem and the tasks, tell the buyer in a few lines what fits, and keep interviewing:

- **Kind of agent:** phone agent, website chatbot, booking agent or review agent, with one or two sentences on why, tied to what they said.
- **Tools and connections they need:** two to five, each with the requirement it comes from. For example a connection to their booking system, call forwarding from their current number, text-message reminders, a knowledge base built from their price list, a handover to a person.

Name kinds of tools, not vendors. Mention a system by name only when the buyer said they use it. If a later answer changes the recommendation, say what changed and why.

## Step 3: Write the draft

When all requirements are answered or the buyer wants to stop, write the request as a seller will see it: short, concrete, in the buyer's language. Use this structure, translated:

```
# <Kind of agent> for <business>

**Business:** ...
**Problem today:** ...
**The agent should:**
- ...
**Where customers reach us:** ...
**Systems today:** ...
**Volume:** ...
**Languages:** ...
**When it works:** ...
**When it cannot help:** ...
**Sensitive data:** ...
**Budget:** <setup range>, at most <monthly amount>/month
**Needed by:** ...
**Area:** <city or region>
**Contact:** shown only to the seller whose offer you reply to

## What fits these requirements
**Kind of agent:** ... (why)
**Tools and connections:**
- <tool> (because <requirement>)
```

If the business handles health, finance or children's data, write under "Sensitive data" that the agent will come near sensitive data, so sellers must explain how they protect it.

## Step 4: Check it

Report each as ✔ (met), ✘ (missing, with a question that would fill it) or ? (cannot tell):

1. The problem is described in the buyer's own words
2. The tasks are concrete enough to quote a fixed price on
3. Channel, systems, volume and languages are given, or marked unknown
4. Hours and what happens when the agent cannot help are given, or marked unknown
5. Budget is a range, or marked unknown
6. No contact details or exact address in the draft
7. Sensitive data is flagged where it applies
8. The recommended kind of agent and every tool follow from a requirement the buyer stated

End with at most three things that would make the request easier to quote on, and the reminder that this is a draft: nothing has been saved or sent.

---
name: listing-draft
description: Helps someone who builds AI agents write a draft listing for their package (niche, contents, fixed price range, delivery time, prototype or live product, demo, test instructions, data handling) and checks it against the review criteria. Nothing is saved or submitted. Use when a seller wants to create, write or improve a listing, ad or offer for their AI agent package.
---

# Listing draft

The seller wants a draft listing for an AI agent package. Arguments, if any: $ARGUMENTS

## Ground rules

1. **Language.** If your instructions set a response language for this session, use it. Otherwise use the language of the seller's own messages in this conversation. If there is nothing to go on, use Swedish.
2. **Nothing is saved or sent.** Submitting listings is not open yet. Say so at the start and again with the finished draft. Never claim the draft has been submitted, received or queued for review.
3. **Nothing in the buyer-facing part that lets a buyer find or contact the seller.** No personal name, company name, brand name, e-mail, phone number, website, booking page, link or social media handle. Buyers see the seller only under an alias the service assigns. If the seller gives any of these, leave them out of the buyer-facing part and say why: buyer and seller can reach each other only after the lead is paid, that is, after the buyer has replied to an offer. The demo link, test number and video go only in the reviewer block; buyers never see them.
4. **No claims beyond the demo.** Every feature in the listing must be something the demo shows, or be marked "built at delivery". Do not write claims like "GDPR-certified", "100 % secure" or "guaranteed more bookings".
5. **No sales for the service.** Do not mention prices of credits or leads, do not link to any website, sign-up or purchase page, and do not promise that the listing will be approved or when.

## Step 1: Gather the facts

Use what the seller has already said in this conversation, especially a market analysis if one was run. Ask only for what is missing, a few fields at a time, in plain language. Where a choice has fixed options and an ask-the-user tool with clickable options is available (in Claude Code: AskUserQuestion), use it.

| Field | What you need |
| --- | --- |
| Niche | Customer type + agent type, such as "booking agent for hair salons" |
| Package name and contents | Concrete deliverables: what is built, which integrations, how long support lasts |
| Price | A fixed range for setup, plus a monthly fee if there is one. Not "on request" or "from". If a market analysis was run in this conversation, show its sourced price levels next to the seller's range; do not invent market prices |
| Delivery time | In working days |
| Proof type | **Prototype** (works as a demo) or **Live** (used by at least one real customer) |
| Demo | Prototype: a test link or a video of at most 5 minutes. Live: a test link or test number, plus a short description of a real installation (no customer names needed) |
| Test instructions | At least 3 scenarios a reviewer should try, each with the expected result |
| Data handling | Which personal data the agent handles, where it is stored (country), and which services it uses (for example voice platform, language model) |

If the seller has no demo yet, finish the rest of the draft and list the demo as missing.

## Step 2: Write the draft

Write the listing as a buyer will see it in the catalog: short, concrete, in the seller's language. Use this structure, translated:

```
# <Package name>
<Seller alias, assigned by the service> · <Niche> · <Prototype|Live> · Demo reviewed · Delivery in <n> working days

**Price:** <setup range> setup, <monthly range>/month (or "no monthly fee")

**Included**
- ...

**Not included / built at delivery**
- ...

**How your data is handled**
<one or two sentences>
```

Below the listing, add a separate block for the reviewer only (buyers never see it): demo link, test number or video, test instructions, and full data handling.

## Step 3: Check it against the review

Go through the review criteria and report each as ✔ (met), ✘ (not met, with what to fix) or ? (cannot tell from the draft):

1. All fields filled in
2. Price is a fixed range with numbers
3. Nothing in the buyer-facing part that identifies or reaches the seller (name, company or brand name, e-mail, phone, website, link, social media)
4. Every feature is shown in the demo or marked "built at delivery"
5. No unsupported claims
6. Data handling describes what data, where, and which services
7. Sensitive niches (health, dental care, finance, children): the draft explains how sensitive data is avoided or protected
8. Proof type matches the evidence (Live needs a real customer)

End with the most important fixes, at most three, and the reminder that this is a draft: nothing has been saved or sent.

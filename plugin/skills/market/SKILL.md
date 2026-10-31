---
name: market
description: Entry point for the /market command. Asks whether the user is a buyer (a business that wants an AI agent built) or a seller (someone who builds AI agents as a side job) and sends them down the right path. Use only when the user runs /market.
---

# /market

The user ran `/market`. Arguments, if any: $ARGUMENTS

## Language

Work out the session's language before you write anything, in this order:

1. If your instructions set a response language for this session (for example a language setting in Claude Code), use it.
2. Otherwise use the language of the user's own messages in this conversation, including any text after the command. The command word itself says nothing about language.
3. If neither gives an answer (the user has written only `/market`), write the role question in both Swedish and English, one line each, and label the options in both languages ("Säljare / Seller", "Köpare / Buyer"). Then continue in the language the user answers in.

Keep that language for the rest of the conversation, including the market analysis.

## Step 1: Find out the role

If the arguments already say the role, skip the question. Words like "säljare", "seller", "sälja", "bygger" mean seller. Words like "köpare", "buyer", "köpa", "behöver" mean buyer.

Otherwise ask one question: are you a buyer or a seller? Explain each in a few words:

- **Seller:** you build AI agents and want to know which niche pays and what to charge.
- **Buyer:** your business needs an AI agent, such as a chatbot, booking or phone agent, built for it.

If an ask-the-user tool with clickable options is available (in Claude Code: AskUserQuestion), use it with exactly these two options. Otherwise ask in plain text. Do not build a page, form or artifact for this question.

## Step 2a: Seller

If the arguments or the conversation already make clear what the seller wants (for example "analysera frisörer" or "skapa annons"), go straight to that option. Otherwise ask which of these they want, the same way as the role question:

1. **Analyse a niche:** demand, prices and competitors from the web.
2. **See buyer interest:** what buyers ask for in this service.
3. **Create a listing:** your package with a prototype or live product, reviewed before it is shown.
4. **My listings and requests:** status, matched requests and credit balance.

Then:

- **1:** If a niche (customer type + agent type, such as "bokningsagent för frisörer") is already named, use it; otherwise ask for it in one short question with one or two examples. Run the market analysis by following this plugin's `market-analysis` skill. In Claude Code, load it with the Skill tool (`ai-jobb:market-analysis`) and pass the niche as the argument.
- **2:** Buyer interest is not open yet, because there are no buyer requests in the service yet. Say so in one sentence and offer option 1 instead, which shows demand on the web.
- **3:** Follow this plugin's `listing-draft` skill. In Claude Code, load it with the Skill tool (`ai-jobb:listing-draft`), passing anything the seller has already said about the package.
- **4:** Listings and requests are not open yet. Say so in one sentence and offer options 1 and 3.

## Step 2b: Buyer

The catalog and matching are not open yet. Tell the buyer that in two or three sentences:

- Browsing listings from people who build AI agents, and getting matched with them, is not open yet.
- Nothing they wrote has been saved or sent anywhere.

Then stop. Do not:

- ask for or store contact details, company name or any other information
- promise a launch date
- link to any website, sign-up or purchase page
- mention prices of credits, leads or anything else in the service
- recommend other marketplaces or services instead

If the buyer asks something general about AI agents for their business, you may answer it as usual, as an ordinary conversation outside this command.

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

1. If the arguments or the conversation already name a niche (customer type + agent type, such as "bokningsagent för frisörer"), use it. Otherwise ask for it in one short question with one or two examples.
2. Run the market analysis for that niche by following this plugin's `market-analysis` skill. In Claude Code, load it with the Skill tool (`ai-jobb:market-analysis`) and pass the niche as the argument.

## Step 2b: Buyer

Matching buyers with sellers is not open yet. Tell the buyer that in two or three sentences:

- Matching with people who build AI agents is not open yet.
- Nothing they wrote has been saved or sent anywhere.

Then stop. Do not:

- ask for or store contact details, company name or any other information
- promise a launch date
- link to any website, sign-up or purchase page
- mention prices of credits, leads or anything else in the service
- recommend other marketplaces or services instead

If the buyer asks something general about AI agents for their business, you may answer it as usual, as an ordinary conversation outside this command.

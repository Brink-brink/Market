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

If the arguments already say the role, skip the question. Words like "säljare", "seller", "sälja", "bygger" mean seller. Words like "köpare", "buyer", "köpa", "behöver", "behov" mean buyer, and so does a user who describes their own business ("jag har en frisörsalong").

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

Tell the buyer in two or three sentences:

- You can help them find the AI agent their business needs: you ask about their requirements one at a time, show which listings in the catalog fit, with stars and prices within their budget, and open them in the browser.
- Requesting offers from the freelancers is not open yet, and nothing they write is saved or sent anywhere.

Then ask the same way as the role question, with two options: find the right agent now, or just browse the catalog.

- **Find the right agent:** follow this plugin's `need-draft` skill. In Claude Code, load it with the Skill tool (`ai-jobb:need-draft`), passing anything the buyer has already said about their business and need.
- **Browse the catalog:** open `http://localhost:3000/<lang>/catalog` in the browser, where `<lang>` is `sv` when you write Swedish and `en` otherwise. In Claude Code use the shell tool: `start "" "<address>"` on Windows, `open "<address>"` on macOS, `xdg-open "<address>"` on Linux. Also put the address in your reply. Then offer to help them find the right agent.
- If they say they have a code for a request or ask to see offers, say that requests and offers are not open yet, so there is no code yet. Do not ask for the code.

Do not:

- ask for or store contact details, company name or other identifying information
- promise a launch date
- link to any sign-up or purchase page; the only addresses you give or open are the catalog, its listing pages and the alternatives page on the service
- mention prices of credits or leads (the prices in listings are fine)
- recommend other marketplaces or services instead

If the buyer asks something general about AI agents for their business, you may answer it as usual, as an ordinary conversation outside this command.

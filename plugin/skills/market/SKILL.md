---
name: market
description: Entry point for the /market command. Asks whether the user is a buyer (a business that wants an AI agent built) or a seller (someone who builds AI solutions that solve a concrete problem for businesses) and sends them down the right path. Use only when the user runs /market.
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

- **Seller:** you build AI solutions that solve a concrete problem for businesses, and want to find the problems worth solving and sell your solution.
- **Buyer:** your business needs an AI agent, such as a chatbot, booking or phone agent, built for it.
If an ask-the-user tool with clickable options is available (in Claude Code: AskUserQuestion), use it with exactly these two options. Otherwise ask in plain text. Do not build a page, form or artifact for this question.

## Step 2a: Seller

If the arguments or the conversation already make clear what the seller wants (for example "analysera supportärenden" or "skapa erbjudande"), go straight to that option. A seller who gives a path to a skill or plugin, or says they want to list one, goes straight to option 2.

Otherwise tell the seller in two or three sentences how selling works here:

- What sells is a **solved problem with measurable value**: less time spent, fewer errors, follow-up that gets done, a business that keeps up in its market. The skill, plugin or API solution is how it is delivered.
- Every offer has **acceptance criteria** with numbers; the seller is paid when they hold, then gives **hypercare** until a number of real runs in a row work.

Then ask which of these they want, the same way as the role question:

1. **Find a problem worth solving:** how common a business problem is, what it costs today, what solves it now and what that costs.
2. **Create an offer:** from a template, or from a skill or plugin you already built. Problem and value, acceptance criteria, delivery and AI cost, hypercare and price.
3. **See buyer interest:** which problems buyers ask to have solved in this service.
4. **My offers and requests:** status, matched requests and credit balance.

Then:

- **1:** If a problem is already named (what goes wrong, for which kind of business, in which system, such as "supportärenden som kräver sökning i affärssystemet hos grossister"), use it; otherwise ask for it in one short question with one or two examples. Run the analysis by following this plugin's `market-analysis` skill. In Claude Code, load it with the Skill tool (`ai-jobb:market-analysis`) and pass the problem as the argument. Afterwards, offer option 2 with the template that fits best.
- **2:** Follow this plugin's `listing-draft` skill. In Claude Code, load it with the Skill tool (`ai-jobb:listing-draft`), passing anything the seller has already said about the problem and the solution, including a path to their skill or plugin if they gave one.
- **3:** Buyer interest is not open yet, because there are no buyer requests in the service yet. Say so in one sentence and offer option 1 instead, which looks at the problem on the web.
- **4:** Offers and requests are not open yet. Say so in one sentence and offer options 1 and 2.

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

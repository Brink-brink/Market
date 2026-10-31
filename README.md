# AI-jobb-plugin

Plugin för Claude och ChatGPT som matchar småföretag som behöver AI-agenter med personer som vill bygga dem som extrajobb. Säljaren betalar per lead (Thumbtack-modellen).

Börja med `CLAUDE.md`. Status: fas 1 – marknadsanalysen finns som skill i `plugin/`.

## Testa pluginen

```
claude --plugin-dir ./plugin
```

Kör sedan `/ai-jobb:market-analysis bokningsagent för frisörer`. Se `plugin/README.md` för installation via den lokala marknadsplatsen.

## Kom igång i Claude Code

```
cd ai-jobb-plugin
git init
claude
```

Första prompt förslagsvis:

> Läs CLAUDE.md och docs/. Hjälp mig med fas 1 i docs/PLAN.md: skriv SKILL.md för marknadsanalysen och ett plugin-skelett.

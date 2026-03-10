# Shared Learnings Guide

Use `.learnings/` as a lightweight memory-and-improvement inbox.

## Files

- `.learnings/LEARNINGS.md` — durable lessons and corrected patterns
- `.learnings/ERRORS.md` — failures worth learning from
- `.learnings/FEATURE_REQUESTS.md` — repeated capability needs

## Source Labels

Use these consistently:

- `reds-a` — assistant-side mistake, discovery, or improvement
- `danlin` — user-side mistake, correction, or changed understanding
- `shared` — joint lesson or coordination issue
- `external` — provider/tool/platform-caused issue

## Logging Rule

Prefer neutral wording:

- good: "Assumption about manual install being better under rate limits was unreliable"
- bad: "Danlin was wrong about manual install"

## Promotion Rule

Promote only when the lesson is durable, short, and action-guiding. If it is just a temporary hiccup, leave it in `.learnings/` or daily memory.

## Escalation Path

- repeated lesson → `MEMORY.md`
- repeated workflow prevention rule → `AGENTS.md`
- setup-specific repeated issue → `TOOLS.md`
- repeated multi-step solution → new skill or checklist

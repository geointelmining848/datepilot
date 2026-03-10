---
name: reds-a-improvement-loop
description: Help Reds A improve over time through bounded reflection, memory maintenance, learning capture, and workflow upgrades. Use when: (1) the user asks Reds A to improve, evolve, remember better, or build long-term memory, (2) reviewing recent work to extract durable lessons, (3) promoting daily notes into MEMORY.md, AGENTS.md, TOOLS.md, or a reusable skill, (4) reducing repeated mistakes in research, coding, planning, or communication. NOT for autonomous self-rewriting, silent policy changes, or uncontrolled self-modification.
---

# Reds A Improvement Loop

Optimize for **usefulness, continuity, and clarity**.

This skill exists to make Reds A more helpful to Danlin over time. It also exists to support Danlin as a fallible human: capture important decisions, reduce repeated mistakes, and preserve context that either side might otherwise forget. It does **not** justify open-ended self-modification or theatrical "evolution." Prefer boring, testable improvements.

## Core Rules

- Improve **Reds A's work**, not Reds A's mythology.
- Prefer memory, checklists, and workflow upgrades over personality churn.
- Promote only **proven** patterns into long-term memory.
- Do not silently change high-trust files in major ways.
- If a proposed change would make future behavior less clear, do not make it.
- Delete or avoid stale memory instead of hoarding it.
- Prefer a few high-signal rules over many low-signal rules.
- When in doubt, simplify rather than expand.

## Improvement Targets

Only improve within these areas:

1. **Shared memory**
   - Daily notes in `memory/YYYY-MM-DD.md`
   - Long-term memory in `MEMORY.md`
   - Structured learnings in `.learnings/`
   - Important decisions, commitments, preferences, and open loops for both Reds A and Danlin

2. **Workflow**
   - `AGENTS.md` for durable process rules
   - `TOOLS.md` for environment-specific gotchas
   - Reusable checklists/templates for research and engineering
   - Guardrails that reduce mistakes by either side

3. **Reusable skills**
   - Draft a new skill only when a pattern repeats and is broadly useful

## Hard Boundaries

Never use this skill to:

- rewrite system prompts or safety policies
- install skills or external software without explicit user approval
- run in an uncontrolled loop
- claim general self-improvement without evidence
- promote one-off tasks into permanent memory
- change `SOUL.md` unless the user explicitly wants a soul/personality change

## The Loop

### 1. Gather evidence

Read only the smallest relevant set:

- today's and recent `memory/YYYY-MM-DD.md`
- `MEMORY.md` when in the main session
- `.learnings/LEARNINGS.md`, `.learnings/ERRORS.md`, `.learnings/FEATURE_REQUESTS.md` if they exist
- changed project files or recent task artifacts when needed

### 2. Classify what happened

Put findings into one of these buckets:

- **remember** — durable user/project fact worth preserving
- **learn** — a mistake, correction, or better pattern from Reds A or Danlin
- **upgrade** — a workflow rule that should change future behavior
- **extract** — a repeated pattern that deserves a skill/checklist/template
- **discard** — temporary noise; do not preserve it

### 3. Apply promotion thresholds

Only promote if the item is:

- likely to matter again
- specific enough to act on later
- stable for at least more than one momentary task
- short enough to remain readable in the target file

Use this default threshold:

- **MEMORY.md**: durable facts, ongoing priorities, stable preferences, recurring lessons
- **AGENTS.md**: repeated workflow rules and decision protocols
- **TOOLS.md**: environment-specific commands, quirks, paths, credentials handling notes (never secret values)
- **new skill/checklist**: repeated multi-step pattern with clear reuse value
- **daily memory only**: temporary context, raw notes, incomplete thoughts

Use these minimum bars before promotion:

- promote to `MEMORY.md` only if it is likely to matter across sessions
- promote to `AGENTS.md` only if it has changed behavior more than once or clearly would have prevented repeated friction
- promote to `TOOLS.md` only if it is machine/setup specific
- extract a new skill/checklist only if the pattern has recurred at least twice and can be described concretely in under a page

### 4. Make bounded changes

Safe auto-actions:

- append a daily memory note
- draft a concise `MEMORY.md` addition
- add/update a short workflow note in `AGENTS.md` or `TOOLS.md`
- create a draft checklist or skill in `skills/`

Ask before:

- major edits to `MEMORY.md`, `AGENTS.md`, `SOUL.md`, or `TOOLS.md`
- deleting substantial memory/history
- installing anything
- changing external integrations

### 5. Summarize the gain

When reporting back, be concrete:

- what was remembered
- what lesson was extracted
- what workflow changed
- why it should make Reds A more useful later

Avoid vague claims like "I evolved" or "I am now improved."

### 6. Prune aggressively

If a rule, memory item, or draft skill is stale, redundant, or too abstract, do one of these:

- leave it in daily memory only
- keep it in `.learnings/` without promotion
- shorten it
- delete the draft

Do not preserve process for process's sake.

## Default Output Format

Use this structure when reviewing improvement opportunities:

```markdown
IMPROVEMENT REVIEW
- Evidence:
- Keep:
- Promote:
- Upgrade:
- Discard:
- Proposed edits:
- Expected benefit:
- Risk level: low | medium | high
```

## Memory Maintenance Guidance

For memory curation or promotion decisions, read `references/memory-promotion.md`.

For shared human/assistant lesson logging, read `references/shared-learnings.md` and use `.learnings/LEARNINGS.md`, `.learnings/ERRORS.md`, and `.learnings/FEATURE_REQUESTS.md` as the inbox.

For periodic distillation, read `references/weekly-review.md`.

## Shared Fallibility Rule

Assume both Reds A and Danlin can make mistakes. Use memory and workflow upgrades to reduce avoidable repetition, not to assign blame. When logging a correction or lesson, preserve the useful takeaway and strip out unnecessary sting.

## App Research Focus

When the work relates to Danlin's app business, prioritize preserving:

- app idea evaluation criteria
- monetization heuristics
- App Store research patterns
- stack decisions that speed shipping
- repeated engineering/debugging lessons

Use these references as needed:

- `references/app-idea-evaluation.md` for screening opportunities
- `references/research-postmortem.md` for rejected or weakened ideas
- `references/shipping-checklist.md` for moving from concept to build plan

## Success Test

This skill is succeeding only if Reds A is measurably better at one or more of these:

- forgetting fewer important things
- repeating fewer mistakes
- producing clearer plans
- researching app ideas more consistently
- shipping code with less thrash

Warning signs that the skill is getting worse instead of better:

- too many rules with overlapping meaning
- memory entries that are vague or theatrical
- constant promotion with little later reuse
- long reviews that produce no behavior change
- new skills/checklists being created faster than they are actually used

If the skill starts producing abstraction sludge, stop and simplify.

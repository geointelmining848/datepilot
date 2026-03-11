# Dating Companion App — MVP Implementation Plan

**Date:** 2026-03-10
**Based on:** `docs/plans/2026-03-10-dating-companion-product-spec.md`
**Status:** Ready for execution
**Target:** Cross-platform MVP for iOS + Android

---

## 1. Build Goal

Ship a store-safe MVP for a dating profile and conversation coach with these v1 features:

1. Profile Doctor
2. Opener Generator
3. Reply Coach
4. Ask-Out Helper
5. Lightweight local style memory
6. Basic paywall shell

This MVP should feel real, useful, and coherent without overbuilding backend infrastructure.

---

## 2. Execution Principles

- Build one shared mobile app in Expo / React Native.
- Keep data local-first unless a server is strictly required.
- Treat AI as a utility layer, not the entire product.
- Optimize for sharp UX and useful outputs over feature count.
- Avoid all direct dating-app integrations in v1.
- Keep all prompts structured and cost-conscious.
- Make the app testable internally by end of first build cycle.

---

## 3. Architecture Decisions

## Client
- Expo / React Native
- TypeScript
- Expo Router or React Navigation
- local persistence for profile and preferences

## Server
- none initially for planning purposes, but design app so AI request layer can later be routed through a thin proxy
- if API-key protection is required before testing, add a minimal server function as a separate step

## Local data to persist
- tone preset
- dating goal
- profile draft
- saved preferences
- recent generated result history (optional, capped)

## No v1 support for
- login
- sync
- cloud history
- social graph
- automation

---

## 4. Task Breakdown

## Phase A — Foundation

### Task A1 — Initialize app project
**Goal:** Create the cross-platform app shell.

**Deliverables:**
- app scaffolded
- TypeScript enabled
- basic folder structure
- lint/format setup
- run on iOS + Android simulator/dev build

**Suggested structure:**
- `app/` or `src/app/`
- `src/components/`
- `src/features/`
- `src/lib/`
- `src/store/`
- `src/types/`

**Done when:**
- app boots locally
- basic navigation works

---

### Task A2 — Define app theme and UI primitives
**Goal:** Prevent messy screen-by-screen styling.

**Deliverables:**
- color tokens
- spacing/type scale
- button component
- input component
- card component
- result block component
- loading / error state components

**Done when:**
- all later screens can reuse shared primitives

---

### Task A3 — Set up navigation and screen skeletons
**Goal:** Establish the information architecture early.

**Screens:**
- onboarding
- home
- profile doctor
- opener generator
- reply coach
- ask-out helper
- style/preferences
- paywall
- settings

**Done when:**
- user can navigate through empty screen shells cleanly

---

## Phase B — Local State and Preferences

### Task B1 — Design local data model
**Goal:** Create a stable local schema before feature logic grows.

**Models:**
- `UserPreferences`
- `SavedProfile`
- `UsageState`
- `SavedResult` (optional lightweight cache)

**Done when:**
- TypeScript types/interfaces exist
- local storage keys are defined

---

### Task B2 — Implement local persistence
**Goal:** Save user preferences and profile data between sessions.

**Scope:**
- tone preset
- dating goal
- bio/prompt inputs
- simple usage counters

**Done when:**
- data survives app restart

---

## Phase C — Core Product Flows

### Task C1 — Build onboarding flow
**Goal:** Collect just enough context to personalize output.

**Inputs:**
- primary goal: more matches / better chats / more dates
- preferred tone
- optional quick self-description

**Output:**
- saved initial preferences
- user lands on home screen

**Done when:**
- onboarding is short, clear, and skippable enough to avoid friction

---

### Task C2 — Build Home screen
**Goal:** Make the value proposition obvious immediately.

**Content:**
- top summary / promise
- cards for 4 core tools
- maybe recent result shortcut
- paywall or upgrade CTA placement

**Done when:**
- user understands what to do within seconds

---

### Task C3 — Implement Profile Doctor
**Goal:** Deliver first high-value transformation feature.

**Inputs:**
- bio text
- prompt answers
- selected tone

**Outputs:**
- quick diagnosis
- rewritten version
- 2–3 variants
- concise rationale

**Design requirements:**
- clear before/after layout
- copy/export buttons
- regenerate option

**Done when:**
- test users can paste text and get useful, structured output

---

### Task C4 — Implement Opener Generator
**Goal:** Provide rapid-repeat value.

**Inputs:**
- match profile text
- optional context
- selected tone

**Outputs:**
- 3–5 opener options
- best opener highlighted
- optional warning if generic

**Done when:**
- outputs are visibly differentiated by tone and not repetitive sludge

---

### Task C5 — Implement Reply Coach
**Goal:** Build the likely retention engine.

**Inputs:**
- pasted chat snippet
- goal for the message
- selected tone

**Outputs:**
- best reply
- alternate replies
- brief why-this-works guidance
- avoid-this warning when relevant

**Done when:**
- conversation assistance feels materially better than generic chat output

---

### Task C6 — Implement Ask-Out Helper
**Goal:** Make the app outcome-oriented, not just message-oriented.

**Inputs:**
- conversation snippet
- optional suggested date type

**Outputs:**
- timing assessment: too early / reasonable / overdue
- message suggestions
- low-pressure vs direct variants

**Done when:**
- the feature feels like a distinct tool, not a relabeled reply generator

---

## Phase D — AI Interaction Layer

### Task D1 — Define structured prompt templates
**Goal:** Prevent prompt chaos and cost blow-up.

**Templates needed:**
- profile doctor template
- opener template
- reply coach template
- ask-out template

**Requirements:**
- short and modular
- consistent output shape
- tone controls
- safety and anti-generic instructions

**Done when:**
- prompts produce stable sections with minimal post-processing

---

### Task D2 — Implement AI service wrapper
**Goal:** Centralize generation logic.

**Responsibilities:**
- one request interface per feature
- normalize outputs
- handle loading/error states
- prepare for later backend proxy swap if needed

**Done when:**
- UI features do not call raw model logic directly

---

## Phase E — Monetization and Limits

### Task E1 — Implement free usage limits locally
**Goal:** Simulate freemium without building a full billing backend first.

**Scope:**
- count uses by feature
- show upgrade prompt when limit hit

**Done when:**
- free tier constraints exist and are visible

---

### Task E2 — Build paywall shell
**Goal:** Create upgrade flow without overengineering payments on day one.

**Content:**
- what premium unlocks
- why upgrade helps
- restore purchases placeholder if needed later

**Done when:**
- paywall screen is integrated and coherent

---

## Phase F — Polish and Safety

### Task F1 — Add output quality controls
**Goal:** Reduce generic or cringe responses.

**Examples:**
- discourage pickup-line clichés
- discourage manipulative or creepy framing
- prefer natural and context-aware language
- avoid overlong outputs

**Done when:**
- outputs feel useful and brand-consistent

---

### Task F2 — Add basic analytics events
**Goal:** Learn what users actually value.

**Track:**
- onboarding complete
- feature opened
- generation success/failure
- paywall viewed
- upgrade CTA tapped

**Done when:**
- event hooks exist, even if analytics destination remains minimal at first

---

### Task F3 — Error / empty / loading states
**Goal:** Make the app feel credible.

**Done when:**
- every generation flow has sane fallback UX

---

## Phase G — QA and Store Readiness

### Task G1 — Internal QA pass
**Checklist:**
- iOS navigation works
- Android navigation works
- storage persists correctly
- no broken layouts on small screens
- feature outputs appear in correct format
- usage limits behave consistently

---

### Task G2 — Store-safety copy review
**Goal:** Reduce policy risk before submission.

**Review:**
- onboarding copy
- app description draft
- screenshots copy
- no claims of automation or guaranteed outcomes

---

### Task G3 — Test build prep
**Goal:** Produce internal testable builds.

**Done when:**
- one installable iOS build path exists
- one installable Android build path exists

---

## 5. Suggested Milestones

### Milestone 1 — App shell complete
Includes Phase A + Phase B.

### Milestone 2 — Core feature flows complete
Includes Phase C + D.

### Milestone 3 — Monetization and polish complete
Includes Phase E + F.

### Milestone 4 — Internal beta ready
Includes Phase G.

---

## 6. Risks and Mitigations

### Risk: outputs feel generic
**Mitigation:** structured prompts, tone presets, concise rationale blocks, internal QA with real examples

### Risk: app becomes cringe / low-trust
**Mitigation:** strict brand tone, practical UX, no manipulative claims

### Risk: policy issues from dating-app adjacency
**Mitigation:** no integrations, no automation, no scraping claims

### Risk: AI cost too high
**Mitigation:** short prompts, capped generations, reuse local state, free-tier usage limits

### Risk: low retention
**Mitigation:** prioritize Reply Coach and Profile Doctor quality first, add local style memory early

---

## 7. Priority Order

If we must cut scope under time pressure, preserve in this order:

1. Profile Doctor
2. Reply Coach
3. Opener Generator
4. Ask-Out Helper
5. Local style memory
6. Paywall shell
7. Analytics extras

---

## 8. Recommended Next Step

Start execution from **Phase A**.

If using a plan-driven build workflow, the next doc should be a task execution checklist with explicit file paths and acceptance criteria per task.

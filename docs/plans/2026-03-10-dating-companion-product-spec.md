# Dating Companion App — Product Spec

**Date:** 2026-03-10
**Owner:** Danlin Yu + Reds A
**Status:** Draft v1
**Platforms:** iOS + Android
**Build target:** Expo / React Native MVP

---

## 1. Product Summary

Build a cross-platform dating profile and conversation coach for users of apps like Tinder, Hinge, and Bumble.

The app is **not** a dating app and does **not** integrate directly with third-party dating platforms. Instead, it helps users improve outcomes by analyzing pasted text, manually entered profile content, and optionally screenshot-derived content.

### Core promise

**Get better matches and better conversations on dating apps.**

### Product category

- Lifestyle
- Productivity / coaching utility
- AI-assisted communication tool

---

## 2. Problem Statement

Dating app users face a recurring problem:

- their profiles underperform
- their opening messages are generic or awkward
- conversations die quickly
- they do not know when or how to ask for a date

At the same time, major dating apps show strong demand but meaningful dissatisfaction, especially on Google Play. Users continue using them despite mediocre ratings, which suggests strong demand with poor user experience.

### Observed market signal

Android review/rating evidence suggests substantial dissatisfaction in major dating apps:

- Tinder — 3.77 / 8.84M reviews
- Hinge — 3.44 / 426K reviews
- Match — 3.20 / 151K reviews
- OkCupid — 3.40 / 671K reviews
- POF — 3.65 / 1.68M reviews
- Bumble — 3.83 / 1.50M reviews

This indicates a credible wedge for a utility layer that improves results without needing to replace the underlying platforms.

---

## 3. Product Positioning

### Positioning statement

For people using dating apps who want better matches and better conversations, this app is a practical dating coach that improves profiles, opening lines, replies, and ask-out timing without the cringe and spamminess of many existing AI "wingman" products.

### Tone and brand feel

- practical
- confident
- useful
- slightly sharp
- not cheesy
- not manipulative
- not pickup-artist coded

### What the app is not

- not a swipe bot
- not a chat automation tool
- not a scraper
- not a fake engagement service
- not a dating simulator
- not a generic AI chat wrapper

---

## 4. Target Users

### Primary users

- active users of Tinder, Hinge, or Bumble
- feel they are underperforming on dating apps
- want practical help improving their profile and chats
- willing to pay for better outcomes if the app is visibly useful

### User motivations

- get more matches
- send better first messages
- stop fumbling replies
- move from chat to actual dates
- avoid generic, awkward, or low-response messages

### Early adopter profile

- 18–35 initially
- comfortable with mobile AI tools
- likely to try dating optimization tools
- frustrated but still actively using dating apps

---

## 5. Core JTBD (Jobs To Be Done)

1. **When my profile is underperforming, help me rewrite it so I get more matches.**
2. **When I match with someone, help me send a first message that is not boring.**
3. **When a conversation is stalling, help me send the best next reply.**
4. **When the timing is right, help me ask for a date naturally.**
5. **When I use the app repeatedly, remember my tone and goals so outputs improve over time.**

---

## 6. MVP Scope

## v1 Features (must-have)

### 6.1 Profile Doctor

**Input:**
- bio text
- prompts / profile answers
- optional target vibe/tone

**Output:**
- diagnosis of weak points
- rewritten profile
- 2–3 style variants
- explanation of what changed

**User value:**
Strong before/after transformation. Easy to demonstrate and market.

---

### 6.2 Opener Generator

**Input:**
- pasted profile text
- optional screenshot text pasted manually
- target tone

**Output:**
- 3–5 opening messages
- tone variants (playful / warm / witty / direct / confident)
- optional warning when suggestions are too generic

**User value:**
High immediate gratification and repeat usage.

---

### 6.3 Reply Coach

**Input:**
- recent message thread snippet
- target tone
- optional goal (flirty / continue conversation / escalate / clarify)

**Output:**
- best next reply
- alternative replies
- short explanation of why one is strongest
- "avoid this" guidance when helpful

**User value:**
Likely the primary retention loop for repeat users.

---

### 6.4 Ask-Out Helper

**Input:**
- conversation snippet
- optional local context (coffee, drinks, walk, etc.)

**Output:**
- whether it seems too early / reasonable / overdue
- suggested ask-out messages
- low-pressure and confident variants

**User value:**
Outcome-oriented. Differentiates the app from generic opener tools.

---

### 6.5 Lightweight Personal Style Memory

**Stored locally on device:**
- preferred tone
- dating goals
- self-description basics
- profile baseline
- preferred message style

**User value:**
Makes the app feel tailored rather than generic.

---

## Out of Scope for v1

- direct Tinder/Hinge/Bumble integrations
- app automation or bot behavior
- swiping automation
- chat auto-send
- full cloud sync
- account system
- social/community features
- advanced photo AI scoring
- full OCR/screenshot pipeline as a dependency
- complex relationship simulator features
- large backend memory systems

---

## 7. Competitive Strategy

### Why this can compete

The goal is not to outspend or out-scale incumbents. The goal is to build a sharper wedge product:

- more serious than "rizz" apps
- more useful than cheesy opener generators
- more focused than generic AI chat apps
- more outcome-driven than vague dating-advice products

### Differentiators

1. **Non-cringe positioning**
2. **Practical outputs tied to real dating workflow**
3. **Light personalization**
4. **Cross-app utility**
5. **Dual-store availability**

### Competitor set

Indirect competitors:
- Tinder / Hinge / Bumble / Match / OkCupid / POF

Direct / adjacent competitors:
- WingAI
- MatchBoost AI
- Rizz / Rare-style assistants
- generic AI chat assistants used for dating help

### Market severity

- direct dating-platform competition: extreme and unattractive
- dating companion / dating utility competition: active but still attackable

---

## 8. Monetization

## Model

**Freemium + simple subscription**

### Free tier
- limited profile rewrites
- limited openers per day
- limited reply coaching per day

### Paid tier
- more or unlimited generations
- premium tone presets
- ask-out helper access
- saved style personalization
- higher usage caps

### Recommended initial pricing to test
- monthly subscription first
- optional weekly subscription later if useful

### Why not credits first?
- more complexity
- harder to explain
- more work to implement
- unnecessary for first validation

---

## 9. Policy / Platform Risk

### Main policy principle

The app must remain a coaching and writing utility, not an automation layer for third-party dating apps.

### Safe rules
- user pastes text manually
- user uploads content voluntarily
- app returns suggestions only
- user sends messages themselves

### Avoid
- unauthorized scraping
- account login to third-party dating apps
- auto-sending messages
- fake engagement
- manipulative guarantees or deceptive claims

### Marketing claims to avoid
- "guaranteed more dates"
- "bypass dating apps"
- "automatically message your matches"

---

## 10. UX Overview

## Primary screens

1. **Onboarding**
   - what the app helps with
   - choose goal: more matches / better chats / more dates
   - choose tone

2. **Home**
   - Profile Doctor
   - Opener Generator
   - Reply Coach
   - Ask-Out Helper

3. **Profile Doctor screen**
4. **Opener Generator screen**
5. **Reply Coach screen**
6. **Ask-Out Helper screen**
7. **Style & Preferences screen**
8. **Paywall screen**
9. **Settings**

## UX principles

- short path to value
- results must feel transformed, not generic
- explanations should be concise
- save user effort via reusable profile/style memory

---

## 11. Data Model (v1)

## Local-only entities

### UserPreferences
- tonePreset
- datingGoal
- preferredStyle
- genderPreference (optional and user-defined)
- notesAboutSelf

### SavedProfile
- bio
- prompts
- lastUpdatedAt

### ToolUsage
- featureUsed
- count
- lastUsedAt

### SavedResults (optional minimal local cache)
- featureType
- inputHash
- outputs
- createdAt

No mandatory account system in v1.

---

## 12. Technical Architecture

## Client
- Expo / React Native
- TypeScript
- local persistence for preferences/profile baseline

## Server
A minimal AI proxy layer if required to protect API keys.

## Why minimal server
- lower cost
- lower complexity
- faster build
- less maintenance risk

## AI usage strategy
- short, task-specific prompt templates
- no giant contexts
- no multi-agent production chains
- strongly structured outputs

## Analytics
Track only core product signals initially:
- onboarding completed
- profile rewrite used
- opener generated
- reply coach used
- ask-out helper used
- paywall shown
- paywall converted

---

## 13. Cost Strategy

## Goal

Keep fixed costs extremely low before revenue.

### Cost-minimizing decisions
- no login in v1
- no cloud sync in v1
- no large backend in v1
- local-first personalization
- very small analytics footprint
- simple subscription model

### Likely early cost buckets
- AI API usage
- possibly a thin server layer
- eventually app store assets / domain if desired

### Cost philosophy

Be cheap under the hood, sharp on the surface.

---

## 14. Validation Plan

## What must be true quickly
Within the first 7–14 days of testing, we need evidence that:

1. users find outputs materially better than writing on their own
2. profile rewrites feel meaningfully useful
3. reply coaching gets repeat usage
4. users understand the app immediately
5. some users would plausibly pay

## Early kill signals
- outputs feel generic and forgettable
- users try once but do not return
- no feature stands out as clearly valuable
- policy/store positioning becomes too risky
- AI cost per active user is too high relative to value

---

## 15. 7-Day Build Plan

### Day 1
- initialize project
- nav shell
- design tokens / components
- onboarding flow
- local storage model

### Day 2
- Profile Doctor UI + prompt flow
- result card design

### Day 3
- Opener Generator UI + prompt flow

### Day 4
- Reply Coach UI + prompt flow

### Day 5
- Ask-Out Helper
- saved user style/preferences

### Day 6
- paywall shell
- polish / loading / error states
- basic analytics events

### Day 7
- internal QA
- app copy pass
- policy risk copy review
- test build prep

---

## 16. Recommended Working Names

Shortlist:
- DatePilot
- MatchCraft
- PromptLine
- BetterMatch
- CharmLoop
- FirstMove

### Naming preference
The name should sound:
- practical
- modern
- non-cheesy
- usable on both stores

---

## 17. Go / No-Go Recommendation

## Recommendation: **GO**

This is the strongest currently identified app concept because it combines:
- strong demonstrated user pain
- high-demand category
- visible dissatisfaction in existing platforms
- clear monetization path
- feasible cross-platform MVP scope
- lower risk than trying to build a new dating network

### Why now
The market is active but not fully solved. Companion/coaching products exist, but there is still room for a cleaner, sharper, less-cringe utility aimed at real outcomes.

---

## 18. Immediate Next Step

Move from product spec to implementation plan.

### Next artifact to create
A task-by-task MVP build plan covering:
- app setup
- shared UI primitives
- prompt and feature flows
- local persistence
- paywall shell
- analytics
- QA checklist

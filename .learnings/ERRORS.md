# Shared Errors

Use this file for command failures, broken assumptions, missed steps, and recurring confusion from either side when the error is worth learning from.

## Principles

- Record the failure clearly.
- Preserve only enough context to help future recovery.
- Focus on prevention and diagnosis, not embarrassment.
- Promote recurring prevention rules to `AGENTS.md`, `TOOLS.md`, or a skill.

## Entry Template

## [ERR-YYYYMMDD-XXX] short-title

**Logged:** ISO-8601 timestamp  
**Source:** reds-a | danlin | shared | external  
**Area:** research | product | engineering | workflow | memory | communication  
**Status:** pending | resolved | promoted  

### Summary
What failed.

### Context
Short factual context.

### Prevention
What should be checked or done differently next time.

### Promotion Target
agents | tools | skill | none

---

## [ERR-20260310-001] clawhub-rate-limits

**Logged:** 2026-03-10T20:56:00Z  
**Source:** external  
**Area:** workflow  
**Status:** pending  

### Summary
Several ClawHub installs failed due to rate limiting.

### Context
Skill vetting and installation worked intermittently; retries sometimes failed with rate limit errors unrelated to local intent.

### Prevention
Treat rate limits as a provider constraint, retry later instead of assuming manual execution will solve it immediately.

### Promotion Target
tools

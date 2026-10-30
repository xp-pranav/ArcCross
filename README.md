# ArcCross product and technical specification pack

**Purpose:** Give product, design, engineering, and AI contributors one consistent description of ArcCross and a staged plan for building it.

**Status:** Working draft, based on the supplied ArcCross project context. Product direction is established; implementation and detailed architecture are not. Recommendations in these files remain proposals until the three-person team accepts them.

## Files in this pack

**New to development? Start with the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md), then open the plan for your assigned member number below.** Every spec includes an in-file beginner note; the guide explains the common concepts and sensitive-work rules.

1. [Product Requirements Document](prd.md) — product goals, scope, functional requirements, acceptance criteria, and release boundaries.
2. [Technical Requirements Document](trd.md) — proposed client stack, shared protocol, local networking, security boundaries, and future service architecture.
3. [App Flow](app_flow.md) — navigation map, user journeys, and error/recovery paths.
4. [UI and UX Design Brief](ui_ux_design_brief.md) — proposed visual direction, screen requirements, interaction patterns, and accessibility expectations.
5. [Backend Schema](backend_schema.md) — local client data model and a future hosted-service schema proposal.
6. [Implementation Plan](implementation_plan.md) — ordered build sequence, ownership, dependencies, and milestone exit checks.
7. [Three Member Project Plan](ArcCross_Three_Member_Project_Plan.md) — companion roadmap with team workflow and the detailed first two-week sprint.
8. [Equal Work Split and Complete Roadmap](TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md) — current source of truth for ownership boundaries, phase gates, capacity balance, and technical execution requirements.
9. [Roadmap Backlog](ROADMAP_BACKLOG.csv) — compact milestone summary with beginner explanations, examples, and human-verification notes; use the detailed chunk backlog below for the team's task board rather than tracking both separately.
10. [Readable Member Plans](MEMBER_VERSION_TABLES_AND_WORK_CHUNKS.md) — concise version sequence and direct links to the three individual work plans.
11. [Member Chunk Backlog](MEMBER_CHUNK_BACKLOG.csv) — importable single-owner tickets with dependencies, beginner explanations, examples to try, sensitivity labels, human-verification guidance, and acceptance checks; 10 points per member per milestone.
12. [Member 1 — Core Systems Plan](MEMBER_1_CORE_SYSTEMS_PLAN.md) — readable individual plan for protocol, security, and shared contracts.
13. [Member 2 — Desktop Plan](MEMBER_2_DESKTOP_PLAN.md) — readable individual plan for macOS and Windows clients.
14. [Member 3 — Android/Linux Plan](MEMBER_3_ANDROID_LINUX_PLAN.md) — readable individual plan for Android, Linux, and optional hosted service.
15. [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md) — how a local transfer works, technical vocabulary, first-time workflow, examples, and what humans must personally own and verify.

## How to use these specs

Read the PRD first, then the TRD and App Flow. Use the UI/UX brief to design screens, the Backend Schema to shape persistence, and the Implementation Plan to order work. The project plan already created for the team contains the collaboration routine and first two-week sprint; the implementation plan here complements it with engineering tasks and technical gates.

If a concept is unfamiliar, do not guess from a ticket title. Read the beginner note at the bottom of that spec, use the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md), and ask the ticket owner to explain the expected result before coding.

Use `TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md` as the current phase and ownership plan. The three individual member plans give the readable version-by-version breakdown; `MEMBER_CHUNK_BACKLOG.csv` is the proposed task-level board source. The version labels and ticket details still need the team's review and capacity calibration. These files supersede the older high-level role split where they differ; keep the older project plan as background for the collaboration routine and Sprint 0 outline.

When a detail conflicts across files, treat the PRD as the source for user-visible scope and the TRD as the source for technical proposals. Record an accepted change in the decision log and update all affected files in the same review.

## Status language

- **Confirmed context** means it appears in the supplied ArcCross brief.
- **Recommendation** means this pack proposes it for review; it is not an accepted implementation decision.
- **Open decision** means the team must choose before the listed dependency or release gate.
- **Deferred** means intentionally outside the current MVP boundary.

## Instructions for AI agents

- Do not assume a repository, implementation, final design system, or backend already exists.
- Preserve local-network-first, privacy-first, cross-platform interoperability as product principles.
- Do not silently convert recommendations into confirmed decisions.
- Do not add automatic clipboard syncing, account requirements, cloud relays, arbitrary app-state handoff, or remote access to the MVP.
- Do not implement custom cryptographic primitives. Ask for a security review when a proposed change affects pairing, device identity, session encryption, key storage, relay access, or sensitive data retention.
- Use current official platform documentation when selecting APIs or setting minimum OS versions. Record platform restrictions and test the claimed versions on real devices.
- If a request conflicts with these specs, surface the conflict and propose a small decision record rather than silently changing architecture.

## Confirmed product baseline

ArcCross is intended to connect macOS, Windows, Linux, and Android devices in one ecosystem. Secure pairing and local-network file sharing lead the roadmap. Clipboard, handoff, hosted connectivity, notification integrations, richer device status, and remote Mac access are later capabilities. The team has three members, but their names and individual skills are not supplied; this pack uses role labels Member A, Member B, and Member C.

## Decisions still open

The pilot device pair; supported OS versions; Linux framework and distribution target; exact discovery and transport; protocol encoding; account-free pairing expectations; hosted provider; license and premium boundaries; public-release feature scope; iOS/iPadOS timing; final brand and trademark availability; and remote-access scope.

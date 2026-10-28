# ArcCross product and technical specification pack

**Purpose:** Give product, design, engineering, and AI contributors one consistent description of ArcCross and a staged plan for building it.

**Status:** Working draft, based on the supplied ArcCross project context. Product direction is established; implementation and detailed architecture are not. Recommendations in these files remain proposals until the three-person team accepts them.

## Files in this pack

1. [Product Requirements Document](prd.md) — product goals, scope, functional requirements, acceptance criteria, and release boundaries.
2. [Technical Requirements Document](trd.md) — proposed client stack, shared protocol, local networking, security boundaries, and future service architecture.
3. [App Flow](app_flow.md) — navigation map, user journeys, and error/recovery paths.
4. [UI and UX Design Brief](ui_ux_design_brief.md) — proposed visual direction, screen requirements, interaction patterns, and accessibility expectations.
5. [Backend Schema](backend_schema.md) — local client data model and a future hosted-service schema proposal.
6. [Implementation Plan](implementation_plan.md) — ordered build sequence, ownership, dependencies, and milestone exit checks.
7. [Three Member Project Plan](ArcCross_Three_Member_Project_Plan.docx) — companion roadmap with team workflow and the detailed first two-week sprint.

## How to use these specs

Read the PRD first, then the TRD and App Flow. Use the UI/UX brief to design screens, the Backend Schema to shape persistence, and the Implementation Plan to order work. The project plan already created for the team contains the collaboration routine and first two-week sprint; the implementation plan here complements it with engineering tasks and technical gates.

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

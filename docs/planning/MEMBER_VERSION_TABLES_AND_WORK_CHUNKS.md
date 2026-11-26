# ArcCross: Readable Plans for the Three Members

The previous combined tables were too wide to read comfortably. The work is now split into three individual plans, using short sections and task lists instead of wide tables.

## Open the plan for your role

- **[Member 1 (A) — Core Systems, Protocol, and Security](MEMBER_1_CORE_SYSTEMS_PLAN.md)**
- **[Member 2 (B) — macOS and Windows Desktop Clients](MEMBER_2_DESKTOP_PLAN.md)**
- **[Member 3 (C) — Android, Linux, and Later Hosted Service](MEMBER_3_ANDROID_LINUX_PLAN.md)**

The roles are placeholders because member names, skills, and availability have not been supplied. Each plan spells out owned features, version-by-version chunks, dependencies, technical requirements, and exit checks.

Before starting, read the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md). It explains the terms used in the plans and marks tasks that need human-led security or platform verification.

## Proposed release order

- **0.1:** Foundations and two-device proof.
- **0.2:** Local-sharing alpha on one desktop and Android.
- **0.5:** Four-platform local beta covering macOS, Windows, Linux, and Android.
- **1.0:** Public local-sharing release.
- **1.1:** Optional text/link continuity and separately approved clipboard history.
- **1.2:** Optional account coordination and encrypted relay.
- **1.3+:** Optional advanced integrations, one feature at a time.
- **1.x:** Maintenance and compatibility releases.

The required path is **0.1 → 0.2 → 0.5 → 1.0 → 1.x**. Versions 1.1–1.3+ are later optional add-ons and do not block the first public local-sharing release.

## How to use the work chunks

- Use the [detailed backlog CSV](MEMBER_CHUNK_BACKLOG.csv) as the ticket source for one shared team board. It has 96 unique, single-owner tickets with dependencies, plain-language explanations, examples, sensitivity labels, human-verification guidance, and acceptance checks.
- The [roadmap backlog CSV](ROADMAP_BACKLOG.csv) is a compact summary only. Do not import both CSVs as separate task lists.
- Each member is planned for 10 normalized points per milestone. Points are relative planning weights, not hours; recalibrate after the first two-week sprint using the team's actual availability and pace.
- Keep one active owner and one code path per ticket. Land shared protocol/schema changes before client changes. Each client owner writes tests for their own features; cross-platform testing is shared.

## Common technical requirements

- Keep local sharing account-free and usable without internet through version 1.0.
- Use a documented, versioned protocol and shared fixtures. JSON with a checked-in schema is a recommendation, not a finalized decision.
- Use vetted platform security and secure key storage; do not implement custom cryptography. Pairing requires explicit approval.
- Stage received files temporarily, sanitize filenames, verify integrity before finalizing, and do not auto-open received files.
- Handle local-network permissions, firewalls, VPNs, AP isolation, network changes, sleep/background limits, and storage failures with clear states and recovery steps.
- Verify current platform requirements before selecting OS/API minimums. Linux framework/distribution and exact tech stack remain open decisions.
- Gate clipboard history, hosted connectivity, notifications, screen viewing, and remote input separately with privacy, permission, security, platform-support, and recovery checks.

## Full project references

- [Team roadmap and technical requirements](TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md)
- [Product and technical spec index](../README.md)
- [Detailed task backlog](MEMBER_CHUNK_BACKLOG.csv)

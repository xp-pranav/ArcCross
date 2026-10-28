# ArcCross Implementation Plan

**Status:** Recommended build sequence  
**Team:** Three role-based owners; map names and skills before Sprint 1  
**Sequencing:** Milestone gates, not delivery-date promises

## 1. Ownership model

- **Member A — Protocol and security:** protocol contract, device identity, pairing, threat model, transport review, compatibility, and hosted-service security design.
- **Member B — Desktop clients:** first desktop client, then macOS/Windows/Linux expansion, desktop permission behavior, packaging, and updates.
- **Member C — Android and quality:** Android client, shared test fixtures and regression coordination, CI/release checklist, and possible hosted service implementation after M4 approval.
- **All three:** code review, client-pair interoperability, real-device testing, user-visible documentation, and release evidence. Each code owner writes tests for their work; Member C coordinates rather than becoming the only tester.

## 2. Build sequence

| Step | Work | Lead | Depends on | Exit check |
|---|---|---|---|---|
| 0. Confirm project boundary | Map roles to names/skills; choose available desktop and Android test devices; record open decisions and current assumptions. | All | None | Pilot pair, owners, OS versions for the spike, and M0 acceptance are written down. |
| 1. Create project foundation | Create proposed monorepo; contribution rules; PR template; issue labels; CI skeleton; docs directory; secret scanning and basic build checks. | B coordinates; all contribute | Step 0 | New contributors can clone, build client skeletons, and run CI. |
| 2. Define protocol v0 | Message envelope, versioning, error registry, discovery service identity, pairing request, capabilities, transfer offer, and golden fixtures. | A | Step 0 | B and C can implement a harmless protocol exchange from the same examples. |
| 3. Create client skeletons | Desktop shell and Android shell; device/transfer navigation; local settings; permission explanation placeholders. | B desktop; C Android | Steps 1–2 | Both apps launch and can show fake device/transfer states without claiming connectivity. |
| 4. Prove discovery and pairing | Implement local discovery on the selected pair, QR/code confirmation, explicit approval, identity binding, rejection, expiry, and revoked-peer rejection. | A protocol; B/C clients | Steps 2–3 | Pairing accepted and rejected paths pass on real devices; unknown peers cannot become trusted silently. |
| 5. Establish encrypted session | Select vetted OS-supported TLS implementation/configuration, authenticate device identity, handle timeout/reconnect, and document trust/key storage. | A with B/C review | Step 4 | Devices establish an authenticated encrypted local session; negative tests reject bad identity and expired pairing. |
| 6. Transfer one file | Transfer offer/accept, bounded streaming, temp writes, progress, cancellation, integrity verification, safe finalization, and errors. | B desktop; C Android; A protocol | Step 5 | Test file reaches the destination and verifies; corruption, cancel, and dropped connection are visible. |
| 7. Pilot alpha and device management | Pair list, online/last-seen, active transfer, device removal, error recovery, baseline measurements, threat-model update. | A integrates; B/C own clients | Step 6 | M1 acceptance suite passes on the selected pair; unresolved risks are tracked. |
| 8. Expand to four clients | Add remaining macOS/Windows/Linux clients in sequence; choose Linux framework/distribution; reuse protocol fixtures and pairwise acceptance suite. | B desktop; C Android; A protocol | Step 7; platform choices | M2 acceptance suite passes for Android with every claimed desktop client. |
| 9. Prepare public local MVP | Install/update path, platform support matrix, privacy guide, setup/pairing docs, security review, accessibility pass, clean install and upgrade checks. | C coordinates; B desktop distribution; A security; all fix | Step 8 | A new tester can install, pair, transfer, revoke, and recover without developer help; no open critical security issue. |
| 10. Add continuity | Explicit clipboard send, typed activity/link payloads, optional clipboard history only after retention controls and privacy review. | A protocol; B/C clients | Step 9 or M2 beta; capability research | User-initiated text/link send works; history is opt-in, pause/clear/retention work. |
| 11. Add hosted connectivity | Account/device coordination, push-assisted wake-up, and optional encrypted relay after service and threat-model approval. | A architecture/security; C service; B/C clients | Stable M2; service owner/provider/privacy decisions | Local transfers still work offline/signed out; relay sees no plaintext; account/device deletion revokes access. |
| 12. Add advanced integrations | Platform-permitted notification access, richer status, remote Mac viewing/input as separate gated features. | C Android; B Mac; A security | M2; feature-specific API and abuse review | Permissions, decline/revoke, visible state, and support matrix pass for each feature. |
| 13. Release and maintain | Release candidate, versioning, release notes, support route, compatibility policy, incident handling, reproducible build inputs where practical. | C coordinates; every owner signs platform evidence | Relevant product gates | Release checklist passes; published docs match shipped behavior and known limitations. |

## 3. First two-week sprint

The sprint proves one desktop plus one Android device. Keep the goal demo-grade. Leave four-client production behavior, clipboard, hosted accounts, remote access, final packaging, and broad performance tuning for later milestones.

| Working days | Member A | Member B | Member C | Shared checkpoint |
|---|---|---|---|---|
| 1–2 | Draft identity, pairing, protocol boundary, initial threat model. | Confirm desktop hardware/toolchain; create app shell and network spike. | Confirm Android hardware/toolchain; create app shell and test fixture skeleton. | Select pilot pair; create repository and CI skeleton; agree acceptance checks. |
| 3–4 | Write protocol v0, example messages, and open transport questions. | Implement desktop connection shell. | Implement Android connection shell and permission notes. | Exchange a harmless hello message using the shared envelope. |
| 5–6 | Review authentication/encryption approach and record spike limitations. | Connect desktop transport and add safe failure logging. | Connect Android transport and start integration test runner. | Prove authenticated encrypted local connection or record the blocker and next experiment. |
| 7–8 | Review identity and pairing approval. | Build desktop pairing approval and basic transfer screen. | Build Android pairing approval and reject/reconnect tests. | Pair devices; verify rejection and reconnect behavior. |
| 9–10 | Review file integrity approach and remaining security risks. | Finish desktop send/receive and progress. | Finish Android send/receive and digest verification. | Demo transfer and matching digest; log defects and phase 1 scope. |

**Sprint exit:** two devices pair with explicit approval, establish an authenticated encrypted session, transfer a test file, verify matching integrity values, and reject an unapproved pairing. If this does not fit ten working days, carry the unfinished gate as the next sprint’s top dependency and report the tested state accurately.

## 4. Milestone acceptance

### M0 Architecture proof

- Pairing requires user approval on the receiver.
- Two selected devices establish authenticated encrypted local connectivity.
- A test file transfers and both sides verify the digest.
- Rejected pairing and disconnect behavior are shown.
- Threat model and unresolved technical decisions are documented.

### M1 Local-sharing alpha

- Discovery, pairing, trust list, send/receive, progress, cancellation, failure, retry behavior, integrity, and revocation work on pilot pair.
- No account or hosted service is required.
- Error states distinguish permission denial, offline peer, receiver rejection, storage failure, and integrity mismatch.

### M2 Four-platform MVP

- macOS, Windows, Linux, and Android meet the same core acceptance criteria.
- Team publishes supported OS versions and Linux distribution scope.
- Interoperability tests pass for Android paired with each claimed desktop platform.
- Unavailable status/capability values are labeled honestly.

### M6 Public release

- Clean install, update, uninstall, permission denial/regrant, and transfer recovery paths are verified.
- Security review has no unresolved critical issue.
- Privacy, supported-platform, setup, pairing, and known-issues docs match the build.
- Each owner confirms their platform’s release evidence.

## 5. Dependency and review rules

- Do not build all clients against undocumented protocol behavior. Land message examples and fixtures first.
- Do not add accounts or relay before M2 local sharing is stable and service ownership is assigned.
- Do not add clipboard history before the user controls, retention, local protection, and delete behavior are agreed.
- Do not add remote input in the same change as remote screen viewing; split access modes and review each one.
- Require a non-author review for every change. Protocol, identity, encryption, hosted data, and key-storage changes require Member A plus a client-owner review.
- Integrate at least twice per week during active implementation; run protocol fixtures and the pilot smoke test at each checkpoint.

## 6. Test and release work throughout

- Unit tests for protocol parsing, validation, transfer state, and error mapping.
- Shared fixtures for cross-language/platform consistency.
- Integration tests for accepted/rejected pairing, trusted/revoked peers, transfer, corruption, cancellation, disconnect, retry, and storage failure.
- Real-device matrix for discovery, permission prompts, network changes, sleep/resume, and background behavior.
- Privacy-safe telemetry only after a data inventory and consent/notice decision; no content collection.
- Set throughput and failure targets after measuring pilot hardware and network conditions.

## 7. Proposed repository layout

```text
ArcCross/
  apps/
    macos/
    windows/
    linux/
    android/
  packages/
    protocol/
    test-fixtures/
  services/             # create after M4 approval
    api/
    relay/
  docs/
    PRD.md
    TRD.md
    APP_FLOW.md
    UI_UX_DESIGN_BRIEF.md
    BACKEND_SCHEMA.md
    IMPLEMENTATION_PLAN.md
    THREAT_MODEL.md
    PLATFORM_LIMITATIONS.md
  tests/
    integration/
    interoperability/
    security/
```

This is a proposed structure, not an existing repository.

## 8. Open decisions that affect the plan

- Which devices and OS versions can the team test in Sprint 1?
- Which member has capacity/experience for each proposed client stack?
- Which Linux desktop framework and distribution are supportable?
- JSON versus Protocol Buffers; exact local transport and key lifecycle.
- Account-free pairing requirement and hosted-service owner/provider.
- First public release platform matrix and license/business model.
- iOS/iPadOS and remote-access priorities.

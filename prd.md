# ArcCross Product Requirements Document
> New to this topic? Read the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md) first. This document includes a plain-language explanation and notes about work that needs human review.

**Status:** Working draft for team review  
**Scope:** Product behavior from first prototype through the first public release  
**Decision status:** Product direction is confirmed in the source brief; requirements and priorities below are recommendations until accepted.

## 1. Product summary

ArcCross is a cross-platform device connectivity product intended to make a Mac, Windows PC, Linux computer, and Android phone work as one connected workspace. The first useful release should solve a concrete problem: let a user securely pair trusted devices and share files over the local network without requiring a cloud upload.

The longer-term product can add explicit clipboard transfer, supported activity handoff, hosted cross-network coordination, platform-supported notification forwarding, richer device status, and remote Mac interaction. Those capabilities must follow the secure local-sharing path and remain subject to each operating system's permissions and limits.

**Working brand message:** “One ecosystem. Every device.” This is a working concept, not a confirmed final brand or cleared trademark.

## 2. Product principles

1. Prefer direct local transfer when devices share a network.
2. Require explicit user action to trust a new device and grant sensitive permissions.
3. Treat discovery as a way to find a possible peer, never as proof of trust.
4. Keep data encrypted in transit and minimize stored metadata.
5. Show platform limitations and unavailable information honestly.
6. Keep clients interoperable through a versioned shared protocol.
7. Add features in small, independently testable releases.

## 3. Users and needs

These personas are planning assumptions, not research findings.

### Primary user

A person who uses devices from different operating-system ecosystems and regularly moves files, links, or small pieces of information between them.

**Need:** A simple, trustworthy way to discover their own devices and move selected content without first uploading it to a cloud drive.

### Secondary user

A technically comfortable user who owns several personal devices and wants device status, clear connection state, and control over trust and privacy.

**Need:** See which devices are paired, online, recently seen, and allowed to receive transfers; remove access immediately when a device is lost or no longer trusted.

## 4. Goals and non-goals

### Product goals

- Pair two user-approved devices and establish an authenticated encrypted session.
- Send and receive user-selected files over the local network.
- Show transfer progress and actionable failure states.
- Let users cancel, retry recoverable failures, verify file integrity, and revoke trusted devices.
- Prove one desktop plus Android path before adding the remaining desktop clients.
- Make the four stated target platforms part of the planned MVP expansion.

### Non-goals for the first local-sharing MVP

- Requiring accounts to pair devices or transfer locally.
- Uploading every file to a hosted service.
- Automatically mirroring the clipboard across all platforms.
- Resuming arbitrary third-party application state.
- Forwarding every notification from every operating system.
- Remote viewing or controlling a Mac.
- iPhone or iPad support; this remains a future scope decision.
- Guaranteeing a launch date before developer availability and platform scope are known.

## 5. Release scope

### M0 technical proof

A selected desktop and an Android device can approve a pairing, establish an authenticated encrypted local session, transfer a test file, and verify matching integrity values. This is prototype evidence, not production readiness.

### M1 local-sharing alpha

The pilot pair has usable discovery, pairing, file send/receive, progress, cancellation, recovery behavior, device list, and revocation. No account or hosted service is required.

### M2 four-platform MVP

The same core transfer and device-management acceptance suite passes on macOS, Windows, Linux, and Android. The team must define the supported OS and Linux distribution matrix before claiming broad compatibility.

### Later phases

- **M3 Continuity:** explicit text/link send, optional clipboard history, and supported activity references.
- **M4 Hosted connectivity:** optional account coordination, push-assisted wake-up, and encrypted relay where required.
- **M5 Advanced integrations:** platform-permitted notification forwarding, richer device status, and separately authorized remote Mac functions.
- **M6 Release:** installable, supportable release with compatibility, security, privacy, and documentation evidence.

The first public release may be the four-platform local-sharing MVP. M3–M5 features are included only when their own gates pass.

## 6. Functional requirements

| ID | Requirement | Priority | Acceptance criteria | Milestone |
|---|---|---|---|---|
| FR-01 | Discover nearby ArcCross peers | Must | The client lists possible peers on a supported local network; discovery data alone never grants trust. Permission denial produces an explanation and a manual retry path. | M0–M2 |
| FR-02 | Pair with explicit approval | Must | The initiating user verifies a QR code or short code; the receiving user accepts or rejects; rejected requests create no trusted device. Pairing expires after a defined short window. | M0–M1 |
| FR-03 | Authenticate trusted devices | Must | Each transfer session verifies the paired device identity. Unknown or revoked peers cannot start a transfer. | M0–M1 |
| FR-04 | Send and receive files | Must | A user selects a peer and local file(s), sees a clear destination/receive action, and receives a completed file only after integrity verification. | M0–M2 |
| FR-05 | Show transfer state | Must | The UI shows queued/connecting/transferring/completed/failed/canceled state, progress, and a useful error. Speed may be shown after reliable measurement is available. | M1–M2 |
| FR-06 | Cancel and recover | Must | Users can cancel an active transfer. Recoverable interruptions offer retry or resume only if the protocol supports safe resumption; failures never leave a misleading “complete” state. | M1–M2 |
| FR-07 | Verify integrity | Must | Sender and receiver compare a cryptographic digest for the completed file; mismatches are rejected and reported. | M0–M2 |
| FR-08 | Manage trusted devices | Must | The dashboard shows device name, platform, online/last-seen state where available, and a remove/revoke action. Revocation blocks new sessions. | M1–M2 |
| FR-09 | Report capabilities honestly | Must | Battery or status values display only when provided by the platform; unavailable values are labeled unavailable rather than inferred. | M2 |
| FR-10 | Send text and links explicitly | Later | User selects a destination device and confirms a text/link send. Delivery state and unsupported content are visible. | M3 |
| FR-11 | Optional clipboard history | Later | History is off by default, has pause/clear/retention controls, and does not upload contents by default. | M3 |
| FR-12 | Hosted coordination and relay | Later | Users can opt in; local transfer remains available when signed out or the service is down; a relay does not see plaintext file contents. | M4 |
| FR-13 | Notification forwarding | Later | Each integration is separately enabled, explains requested access, and provides a way to revoke it. Only supported platform sources are claimed. | M5 |
| FR-14 | Remote Mac viewing/input | Deferred | A dedicated authorization flow, visible active-session indicator, immediate disconnect, and revocation are required before release. | M5 or later |

## 7. Core user stories

- As a user, I can see nearby devices and identify the device I intend to pair.
- As a user, I can reject a pairing request and know that the requester received no trusted access.
- As a user, I can select a file, choose a paired device, and see whether delivery completed.
- As a user, I can cancel a transfer and understand whether a partial file was removed or retained for retry.
- As a user, I can revoke a device and prevent it from reconnecting as trusted.
- As a user, I can continue using local transfers when the internet or an ArcCross service is unavailable.
- As a user, I can send a selected link or text snippet without enabling continuous clipboard monitoring.

## 8. Non-functional requirements

### Security and privacy

- Use vetted platform cryptography and authenticated encrypted sessions; do not implement custom cryptographic algorithms.
- Keep private keys in platform secure storage where available.
- Do not log file contents, clipboard contents, pairing secrets, or private keys.
- Use explicit opt-in for clipboard features and hosted connectivity.
- Threat-model identity, pairing, revocation, file paths, local-network exposure, hosted registration, push tokens, and relay access.

### Reliability

- Detect interrupted, canceled, corrupted, and incomplete transfers.
- Write incoming data to a temporary location and publish the final file only after verification.
- Measure performance on representative hardware before setting throughput targets.

### Compatibility

- State supported OS versions and Linux distributions clearly.
- Test every claimed client pair against the shared protocol suite.
- Record permissions, background execution limits, and unavailable capabilities by platform.

### Accessibility and usability

- Support keyboard navigation on desktop and screen-reader labels on all clients.
- Never use color alone to communicate transfer or trust state.
- Explain permissions at the point of use and preserve a path forward when the user declines.

## 9. Product success measures

Do not invent numerical launch targets before the team has a pilot baseline. During M0/M1, measure:

- Pairing success and rejection behavior.
- File-transfer completion and integrity-check results.
- Failure reason distribution and recovery success.
- Time from opening the app to first successful transfer.
- Permission-denial and retry paths.
- Supported-client-pair compatibility.

After the pilot, the team should set targets for transfer completion, error rate, and onboarding time using real device/network observations.

## 10. Open product questions

1. Which desktop plus Android pair can all three developers test in Sprint 1?
2. Is account-free pairing a product requirement for the public release?
3. Which file types, maximum file size, and destination behavior are in the first public build?
4. Which desktop platforms must ship together in the first public release?
5. What retention period, if any, should optional clipboard history use?
6. Is iOS/iPadOS a future goal or outside the product roadmap?
7. Which license and hosted-service boundary will the team choose?

## Beginner guide for this document

A PRD is a product promise: it says what a user should be able to do and how the team will know it works. It is not a list of code files or a final technical design.

**Example:** FR-06 says a user can cancel or recover a transfer. To implement that, the client must show a cancel action, stop sending safely, remove or clearly label partial data, and report the final state. The PRD tells the team what outcome is required; the TRD and implementation tickets decide how to build it.

The team must personally decide which features belong in 1.0, what data is stored, what the permission prompts mean, and what success claims can be made. Do not let a generated PRD turn a recommendation into a confirmed decision. Clipboard history, accounts, notifications, and remote access are later gates, not requirements for a beginner's first prototype.

For definitions of “paired,” “verified,” “digest,” “threat model,” and other terms, see the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md). The [detailed backlog](MEMBER_CHUNK_BACKLOG.csv) turns these requirements into owner-sized tasks and adds plain-language examples and human-review guidance.

# Member 3 (C): Android, Linux, and Later Hosted Service

This is Member 3's personal work plan. Member names and skill assignments are placeholders; replace “Member 3” with the actual teammate's name when roles are assigned.

**Before starting:** Read the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md) for the end-to-end file-transfer example and the rules for sensitive work.

## Your lane

You own ArcCross on Android and Linux. If the team approves hosted connectivity after the four-platform local beta, you also own the coordination service implementation.

You own:

- Android app shell, navigation, local-network permission flow, discovery, pairing, and transfer behavior.
- Android reliability across permission changes, backgrounding, network changes, interruption, retry, and storage errors.
- Linux framework selection, first supported distribution, Linux client, and package.
- Android/Linux text and link flows and any separately approved notification/status integration.
- Hosted coordination API, database migrations, rendezvous, push registration, cleanup, and monitoring only after M4 approval.
- Tests, platform support notes, and release evidence for your Android/Linux/service work.

You do not own the shared protocol/security policy or macOS/Windows client code. Member 1 owns shared contracts and security review; Member 2 owns desktop clients.

## How your part works — beginner explanation

Your work has two distinct paths. First, build user-facing Android and Linux apps that follow the same protocol as the desktops. Much later, if the team approves it, build a small coordination service. The first local file-sharing release does not need that service.

- **Android app lifecycle:** Android may pause or restrict an app when it goes to the background or the phone sleeps. The app must report what it can still do and recover when it returns; never promise background delivery without testing the selected OS version and permission model.
- **Linux baseline:** Linux has many desktop environments and package formats. Pick one framework/distribution the team can build and maintain first. “Works on Linux” must name the versions actually tested.
- **API:** A defined request/response boundary between an app and a later service. Example: the client asks to register its public device identity; the API checks which account owns it.
- **Database schema/migration:** The schema describes stored fields and links. A migration changes that structure without corrupting existing data. Test both a fresh database and an upgrade from the previous version.
- **Hosted service vs. relay:** The coordination service may help devices find each other across networks. A relay may carry encrypted bytes when a direct connection cannot work. Neither needs to store file contents; local transfers must still work without them.
- **Push token:** A sensitive value used by an operating system's notification service to reach a device. Protect it, limit its use, and delete/rotate it when access is revoked.

**Example:** In the local MVP, Android discovers and pairs directly with a desktop; no account is involved. If hosted connectivity is later approved, the service stores device coordination metadata and issues a short-lived rendezvous. The actual file remains encrypted before it reaches any relay.

## Sensitive work you must personally understand

- **C-M0-03, C-M1-04, C-M2-01:** Android local-network permission, denial/regrant, backgrounding, and network changes. Test the actual permission prompts and behavior on supported physical devices.
- **C-M1-02 and all file receive paths:** destination restrictions, temporary writes, cleanup, and integrity checks. Do not accept a peer-provided path or blindly use generated file-handling code.
- **C-M2-02 through C-M2-04:** Linux framework, distribution, packaging, and actual supported platform claims. These are team decisions that must match what the team can maintain.
- **C-M4-*:** account ownership, API authentication, database migrations, push tokens, rendezvous expiry, deletion, rate limits, and monitoring are security-sensitive. Member 1 must review the contract; test cross-account denial and deletion before a service is exposed.
- **C-M5-***: notification access is sensitive user content. Ask only when requested, explain the exact access, allow revocation, and test what is and is not forwarded.
- **C-M6-01/C-M6-02:** release credentials and distribution accounts remain under human control. Never commit them or put them in AI prompts.

The hosted API is explicitly optional and starts only after M4 approval. AI can explain Kotlin, package formats, TypeScript, or SQL and draft non-secret scaffolding. You must understand any database rule or authorization check you keep and test it against real cases. Never deploy AI-generated authentication, authorization, database, or token code without a human security review.

## How to work a ticket

The [detailed backlog](MEMBER_CHUNK_BACKLOG.csv) includes beginner explanations, examples, sensitivity, and acceptance checks. For platform tickets, test on the target phone or Linux distribution, not only in a simulator. If a task depends on Member 1's contract, do not guess the message or security behavior.

## Version path

**Required release path:** 0.1 → 0.2 → 0.5 → 1.0 → 1.x. Versions 1.1, 1.2, and 1.3+ are optional add-ons and do not block version 1.0.

### Version 0.1 — M0 foundations and two-device proof

Work chunks:

- **C-M0-01 · 2 points:** Confirm the Android test device, OS/API baseline for the spike, and build toolchain.
- **C-M0-02 · 2 points:** Build the Android shell with core navigation.
- **C-M0-03 · 3 points:** Build the permission explanation and local-discovery spike.
- **C-M0-04 · 3 points:** Connect pairing/transfer proof, add a repeatable integration runner, and document Linux framework comparison criteria.

**Version exit:** Android shows real permission/discovery state, supports pairing approval/rejection, and participates in the proof transfer. Linux framework selection criteria are written down.

**Depends on:** The team choosing a pilot device and Member 1 publishing the first message examples. Verify current Android requirements before fixing a target API.

### Version 0.2 — M1 local-sharing alpha

Work chunks:

- **C-M1-01 · 2 points:** Add Android file picker and outgoing transfer offer.
- **C-M1-02 · 2 points:** Add incoming approval, destination choice, and safe temporary-file writes.
- **C-M1-03 · 3 points:** Add progress, cancellation, retry, interruption recovery, and digest verification.
- **C-M1-04 · 3 points:** Test permission denial/regrant, device revocation, and real-device behavior.

**Version exit:** Android sends and receives on the pilot pair, verifies content, recovers from interruptions, and rejects revoked devices.

### Version 0.5 — M2 four-platform local beta

Work chunks:

- **C-M2-01 · 2 points:** Harden Android background, network-change, and permission paths.
- **C-M2-02 · 2 points:** Select Linux UI framework and first supported distribution using the spike.
- **C-M2-03 · 3 points:** Build Linux pairing and core transfer client.
- **C-M2-04 · 3 points:** Package the Linux baseline and publish Android/Linux conformance evidence and support matrix.

**Version exit:** Android and Linux pass the shared core behavior. Together with Member 2's desktop clients, they complete all six unique pairings in both send directions. Publish tested OS/distribution versions and limitations.

### Version 1.0 — M6 public local-sharing release

Work chunks:

- **C-M6-01 · 2 points:** Prepare the Android public build and distribution checklist.
- **C-M6-02 · 2 points:** Package Linux for the selected supported distribution.
- **C-M6-03 · 3 points:** Run and record all six device pairings in both transfer directions.
- **C-M6-04 · 3 points:** Finalize setup, privacy, limitations, support, and release checklist.

**Version exit:** Android/Linux installs work on the published baselines. The complete cross-platform matrix covers integrity, cancellation, revocation, and failure recovery; docs match the release.

### Version 1.1 — M3 continuity add-on (optional)

Work chunks:

- **C-M3-01 · 2 points:** Add explicit text/link sending on Android and Linux.
- **C-M3-02 · 2 points:** Add receive preview, copy/open, and capability handling.
- **C-M3-03 · 3 points:** Add optional history controls only if approved by the privacy gate.
- **C-M3-04 · 3 points:** Test duplicate messages, reconnects, retention, and permission states.

**Version exit:** Users choose content and recipients; unsupported payloads are identified. Any history is opt-in and supports pause, clear, expiry, and deletion.

### Version 1.2 — M4 hosted connectivity (optional)

Work chunks:

- **C-M4-01 · 2 points:** Create the TypeScript coordination API and authentication boundary.
- **C-M4-02 · 2 points:** Create PostgreSQL schema, migrations, and ownership constraints.
- **C-M4-03 · 3 points:** Implement device registration/revocation, push registration, and short-lived rendezvous.
- **C-M4-04 · 3 points:** Add expiry cleanup, rate limits, deletion tests, and service monitoring.

**Version exit:** Member 1 has approved the security contract and the team has named a provider/operator. The relay receives ciphertext only, the service stores no file/clipboard contents by default, and local transfers work without the service.

### Version 1.3+ — M5 one advanced integration at a time (optional)

Work chunks:

- **C-M5-01 · 2 points:** Prototype Android notification integration behind explicit permission.
- **C-M5-02 · 2 points:** Report Android capability/status where the OS permits it.
- **C-M5-03 · 3 points:** Add Linux capability indicators for the selected supported integration.
- **C-M5-04 · 3 points:** Test permission denial/revoke/background limits and publish the platform matrix.

**Version exit:** The user opts in before access begins and can revoke it. Unsupported capabilities are labeled honestly. Select one integration per release.

### Version 1.x — M7 maintenance

Work chunks:

- **C-M7-01 · 2 points:** Maintain Android/Linux compatibility and supported version/distribution matrix.
- **C-M7-02 · 2 points:** Maintain Android distribution, Linux packages, and dependencies.
- **C-M7-03 · 3 points:** Operate the hosted service only if M4 shipped and an operator was named; otherwise use this capacity for client reliability work.
- **C-M7-04 · 3 points:** Publish Android/Linux/service regression evidence, release notes, and support information.

**Version exit:** Each release has current compatibility, regression, support, and service evidence. Service operations are not assumed if hosted connectivity is not selected.

## Technical checklist for your work

- Proposed Android stack is Kotlin/Jetpack Compose. Linux framework and first distribution are intentionally open until your M2 comparison is complete.
- Verify official Android local-network permission and background requirements before setting the minimum API/OS baseline.
- Use Member 1's shared schema and fixtures. Keep Android/Linux behavior interoperable with desktop clients.
- Use OS file pickers and secure storage. Write to a temporary destination, sanitize remote filenames, verify integrity, then finalize safely.
- Make permission denial/regrant, app backgrounding, battery limits, sleep, network changes, and storage errors visible and recoverable.
- For hosted service, enforce account/device ownership, short-lived scoped tokens, expiry, rate limits, revocation, and deletion. Keep file/clipboard content out of service storage and logs.
- Do not start service implementation before M4 approval, provider/operator assignment, and Member 1's security contract.
- Keep notification access, clipboard history, remote/screen access, and other advanced integrations behind separate permission and security gates.

## Team handoff rules

1. Build against Member 1's schema and fixtures; request contract changes through the shared board.
2. Keep Android/Linux/service changes in the agreed paths. Do not edit desktop or shared security files without coordination.
3. Own tests and support evidence for Android/Linux/service work. Cross-platform pairing is shared work, not only your QA responsibility.
4. Keep each milestone at 10 normalized points. Points are planning weights, not hours; recalibrate after the first two-week sprint.
5. Use the shared [detailed backlog](MEMBER_CHUNK_BACKLOG.csv); do not create a separate task list.

For the complete technical roadmap and team workflow, see the [full roadmap](TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md) and [readable member-plan index](MEMBER_VERSION_TABLES_AND_WORK_CHUNKS.md).

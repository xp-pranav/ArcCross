# ArcCross Three-Member Project Plan

This plan turns ArcCross’s established product direction into a
sequenced delivery path for a three person team. It starts with a two
platform proof of secure local transfer, expands the MVP to the four
stated target platforms, then adds continuity features, optional hosted
connectivity, advanced integrations, and a release process.

**Beginner note:** This is a planning document, not a coding tutorial. Use the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md) for plain-language explanations and the newer [individual member plans](MEMBER_VERSION_TABLES_AND_WORK_CHUNKS.md) for the current A/B/C ownership and ticket breakdown. Where this older plan differs, the newer member plans and roadmap are the source of truth.

The project context establishes a product concept and roadmap. It
confirms that implementation has not started and architecture choices
remain open. The work below is therefore a recommendation. The two week
sprint should produce demo grade technical evidence; production
readiness is a later release gate. The team should choose the first
platform pair based on developer access and experience; macOS plus
Android is a reasonable default when both are available.

# Planning status
| **Established in the project context** | **Recommended for this plan** | **Still requires a team decision** |
|----|----|----|
| ArcCross targets macOS, Windows, Linux, and Android. Local network first, privacy first, and cross platform interoperability are core principles. | Build and validate a narrow desktop plus Android slice before implementing all four clients. Keep local transfers usable without accounts or cloud services. | First platform pair and minimum supported OS versions; exact discovery and transport; account free pairing expectations. |
| Secure pairing and file sharing lead the roadmap. Clipboard, handoff, hosted connectivity, notifications, device status, and remote Mac access follow. | Make protocol compatibility, security, permissions, and interoperability release gates in every phase. Defer nonessential polish until the transfer path works. | Final language and framework choices, Linux packaging target, hosted provider, licensing and premium boundaries. |
| Native clients are preferred where OS integration matters; a versioned shared protocol is proposed. No repository or implementation is confirmed. | Use one shared protocol and test fixture set. Keep app code native where needed, but avoid duplicating protocol behavior. Maintain a decision log before implementation hardens choices. | Final brand and trademark availability, public release scope, iOS/iPadOS timing, and remote access timing. |

# Recommended delivery sequence
Use milestone gates instead of promising a calendar date for the
complete roadmap. Only the first two weeks are scheduled here. Later
timing depends on team availability, the selected platform pair,
packaging requirements, and how much native integration each operating
system requires.

| **Gate** | **Outcome** | **Lead coordination** | **Must follow** |
|----|----|----|----|
| M0 Architecture proof | Two selected devices pair, connect securely, transfer a test file, and verify integrity. | A leads protocol and security; B and C lead one client each. | None |
| M1 MVP alpha | Usable local file sharing and device status on the pilot desktop and Android clients. | A owns protocol; B pilot desktop; C pilot Android; testing is shared. | M0 |
| M2 Four platform MVP | File sharing and essential device management work on macOS, Windows, Linux, and Android. | B owns macOS/Windows; C owns Android/Linux; A owns protocol and shared fixtures. | M1 plus platform selection |
| M3 Continuity | Explicit clipboard send, optional history, links, and supported activity handoff. | A protocol; B desktop behavior; C Android behavior and tests. | M2 |
| M4 Hosted connectivity | Optional account coordination, push assisted wake up, and encrypted relay where needed. | A architecture/security; C service; B and C client integration. | Threat model, privacy review, M2 stability |
| M5 Advanced integrations | Platform permitted notifications, richer status, and a separately authorized remote Mac feature. | C Android integration; B Mac integration; A security review. | M2; hosted features only where required |
| M6 Release | Installable, documented, supportable release with security and compatibility evidence. | Integration coordination rotates; every member owns their platform and evidence. | Relevant feature gates and release checklist |

# Three member ownership
Use role labels until the team maps real names and strengths. Each lead
owns the delivery and documentation for that area, while all three
members review protocol changes, test real device interoperability, and
share release responsibility.

| Role label | Primary ownership | Expected deliverables | Shared responsibilities |
|---|---|---|---|
| **Member A**<br>Protocol and security lead | Protocol specification, identity and pairing model, connection and transfer contracts, threat model, security review, integration decisions. | Versioned protocol; test fixtures; pairing and revocation design; threat model; integration checklist; hosted security design. | Review every cross-client protocol change; pair on end-to-end tests; record unresolved risks. |
| **Member B**<br>Desktop client lead | macOS and Windows clients; desktop discovery, send/receive, permissions, packaging, and updates. | Desktop clients; desktop interoperability tests; platform notes; installers and signing plan when scope is known. | Review protocol changes; test against Android and Linux; own desktop release blockers. |
| **Member C**<br>Android/Linux client lead | Android permission flows and client; Linux framework choice, client, and package; later hosted-service implementation only after M4 approval. | Android/Linux clients; owned-client tests; platform support notes; service tests/operations only if approved. | Review protocol changes; test against desktop; own Android/Linux release blockers. |

Load balancing rule: every member writes and maintains tests for the
code they own. The integration captain rotates each sprint; coordination
does not make one person the permanent QA owner. Member A reviews
security boundaries, while affected client owners test their adapters.

# Detailed work breakdown
The exit criteria are observable checks. A phase is complete only when
its criteria pass on the selected devices and the remaining limitations
are written down.

## Phase 0 Foundations and two platform proof
Set up the collaboration system and prove the smallest secure end to end
path. This is the first two week sprint described below.

- A: draft product requirements, protocol versioning rules, device
  identity and pairing flow, threat model, and an explicit list of
  protocol decisions still open.

- B: create the pilot desktop app shell and test receiving/sending a
  file through the agreed transport boundary; document desktop network
  and permission needs.

- C: create the Android app shell, permission/onboarding notes, reusable
  protocol fixtures, and the first integration test outline.

- All: create repository and contribution guide; agree code ownership,
  review rules, CI checks, issue labels, and a shared definition of
  done.

**Depends on** Team selects two available devices and agrees on the
smallest protocol surface. This phase creates the first repository; the
supplied context does not say a repository exists.

**Exit criteria** A user explicitly approves pairing on both devices;
the devices establish an authenticated encrypted session on the local
network; one test file transfers; both ends verify the expected
integrity value; rejected pairing and disconnect behavior are
demonstrated. The code may be a prototype and must be labeled as such.

## Phase 1 Local sharing MVP on the pilot pair
Turn the proof into a usable local file sharing path with device
management and reliable failure handling.

- A: finalize protocol messages for discovery, pairing, transfer setup,
  progress, completion, cancellation, error reporting, and device
  revocation; choose vetted cryptographic building blocks rather than
  designing custom cryptography.

- B and C: implement matching desktop and Android send/receive flows,
  transfer progress, cancellation, retries, safe temporary writes, and
  clear error states.

- A with B and C: add trusted device list, online/last seen status,
  explicit removal/revocation, and defensive handling of unknown peers.

- All three members agree on the failure cases. A owns shared negative
  protocol fixtures; B and C run the applicable cases on their clients,
  including corruption, duplicate requests, denied pairing, interrupted
  Wi-Fi, low storage, and app restarts.

**Depends on** M0 protocol and connection proof; threat model review;
agreed file size and supported file types for the pilot.

**Exit criteria** A tester can pair, send and receive a file, see
progress, cancel, retry a recoverable failure, detect corrupted content,
remove a trusted device, and confirm that an unpaired peer cannot
transfer. No cloud service is needed.

## Phase 2 Expand the MVP to all four platforms
Bring the declared target scope into the MVP through staged client work,
not simultaneous rewrites.

- B completes the macOS and Windows clients. C selects and builds the
  Linux client after a framework/distribution spike. Keep one shared
  conformance suite for each client.

- C stabilizes Android and Linux behavior across the documented device,
  OS, and distribution baselines; A owns protocol compatibility and
  migrates clients when a version change is unavoidable.

- Define honest capability reporting for online status, battery, and
  permissions. Show “unavailable” where a client cannot report a value.

- Decide packaging and update approach per desktop platform; publish
  platform limitation notes before inviting external testers.

**Depends on** M1 stable protocol and pilot client behavior; OS version
and Linux distribution choices; team access to each supported test
environment.

**Exit criteria** The same acceptance suite passes between Android and
each supported desktop client. Pairing, local transfer, progress,
integrity, cancellation, revocation, and basic device status work on
macOS, Windows, Linux, and Android, with documented exceptions.

## Phase 3 Continuity features
Add user initiated information flow without promising arbitrary cross
app state transfer.

- A: define typed clipboard and activity payloads, expiry/retention
  rules, duplicate handling, and protocol versioning.

- B and C: implement explicit send actions for text, links, and
  supported activity references. Add clipboard history only behind an
  opt in setting with pause and clear controls.

- All: test sensitive content exclusions where feasible, device removal,
  reconnects, duplicate delivery, and conflicts across clients.

- Keep activity handoff limited to payloads each ArcCross client can
  interpret; do not claim to resume arbitrary third party app state.

**Depends on** M2; a reviewed data retention policy; per platform
interaction and clipboard capability review.

**Exit criteria** Users can explicitly send text and links to a selected
paired device. Optional history obeys retention, pause, and clear
controls. Unsupported payloads fail with a clear explanation and do not
silently disappear.

## Phase 4 Optional hosted connectivity
Add cross network coordination only after the local product works
reliably on its own.

- A: threat model account enrollment, device registration, push tokens,
  relay access, key lifecycle, abuse cases, and service outage behavior.

- C: implement the smallest account and coordination service only after
  the data model, authentication, retention, and operational owner are
  approved.

- B and C: add optional account flows and relay support; keep local
  direct transfers independent of hosted service availability.

- All: test relay confidentiality, authorization boundaries, rate
  limits, account/device deletion, observability without collecting file
  contents, and outage fallback.

**Depends on** M2 stability; a written hosted service threat model and
privacy/data retention decision; a chosen provider and service owner.

**Exit criteria** Users can opt into account-backed coordination; local
transfer still works when signed out or service is unavailable. A relay
never receives plaintext file contents. Device and account removal
revoke future access, and service data collection is documented.

## Phase 5 Advanced integrations
Add integrations only when platform APIs, user permissions, and
maintenance costs support a reliable experience.

- C: prototype Android notification forwarding behind an explicit
  permission explanation and user control. Confirm background delivery
  expectations against current Android requirements.

- B: explore richer Mac status and remote screen viewing as separate
  capabilities. Require user initiated authorization, visible session
  state, and immediate disconnect for remote access.

- A: review data minimization, permission scope, session authentication,
  revocation, and protocol compatibility for each integration.

- All: keep notification forwarding, battery status, and remote access
  as independent feature flags so one restricted integration does not
  block core transfer.

**Depends on** M2 and relevant platform API research; for remote Mac
interaction, a dedicated authorization and abuse review.

**Exit criteria** Each integration has a platform support matrix,
permission onboarding, decline/revoke path, user-visible state, and
tests on every claimed OS version. Unsupported cases are clearly marked;
core local sharing remains unaffected.

## Phase 6 Release and ongoing maintenance
Ship a release only after the supported platform matrix, security,
installation, recovery, and documentation checks are complete.

- The integration captain coordinates the release checklist, versioning,
  release notes, known issues, support route, rollback/disable plan, and
  reproducible build inputs where practical. The captain rotates.

- B owns macOS/Windows packaging and update behavior; C owns Android/Linux
  packaging and distribution notes; A reviews protocol/security evidence
  and compatibility notes.

- All: run the full interoperability matrix, upgrade/reinstall checks,
  permissions denied/regranted flows, transfer recovery, accessibility
  basics, and clean install tests.

- Publish README, supported platforms, setup and pairing guide,
  privacy/data handling summary, threat model summary, contribution
  guide, and platform limitations.

**Depends on** M2 for a core public release; M3-M5 features are included
only if their own gates pass and they do not delay or destabilize the
local sharing release.

**Exit criteria** A new user can install a supported build, understand
permissions, pair devices, transfer and verify a file, recover from
normal failures, revoke a device, uninstall cleanly, and find accurate
support and privacy documentation. No known critical security issue
remains open.

# First two week sprint
The sprint should produce a narrow, demo grade proof on one desktop and
one Android device. Limit sprint work to that path; leave four
production clients, clipboard, hosted accounts, remote access, polished
release packaging, and broad performance tuning for later gates.

| **Work period** | **Member A** | **Member B** | **Member C** | **Shared checkpoint** |
|----|----|----|----|----|
| Days 1–2 | Draft pairing, identity, protocol boundary, and initial threat model. | Confirm desktop device/toolchain; create app shell and network spike. | Confirm Android device/toolchain; create app shell and test fixture skeleton. | Choose pair, create repository, agree branch/PR flow and sprint acceptance criteria. |
| Days 3–4 | Write protocol v0 and message examples; identify unresolved transport choices. | Implement desktop connection shell and receive/send boundary. | Implement Android connection shell and permission notes. | Review protocol together; test that both clients can exchange a harmless hello message. |
| Days 5–6 | Review authentication and encryption design; document threats the spike does not address. | Connect desktop transport to selected protocol; add failure logging without file contents. | Connect Android transport; add basic integration test runner. | Prove authenticated encrypted local connection or document a specific blocker and reduced fallback. |
| Days 7–8 | Review pairing approval and device identity checks. | Implement desktop pairing approval and a basic transfer screen. | Implement Android pairing approval and test cases for reject/reconnect. | Pair the two devices; verify rejection and reconnect behavior. |
| Days 9–10 | Review integrity verification and capture remaining security risks. | Complete desktop file send/receive, progress, and test notes. | Complete Android file send/receive, integrity check, and test notes. | Demo file transfer and hash match; record defects, follow-up work, and phase 1 scope. |

Sprint exit check: two trusted devices pair with explicit approval,
establish an authenticated encrypted connection, transfer a test file,
verify matching integrity values, and reject an unapproved pairing. If
the team cannot complete this in ten working days, carry the unfinished
item as the next sprint’s top dependency and report the tested state
accurately.

# Dependencies and sequencing rules
| **Work item** | **Must be true first** | **Why it matters** |
|----|----|----|
| Client implementation beyond a spike | Protocol message examples and versioning rules reviewed by all three members. | Keeps desktop and Android behavior interoperable and reduces rework. |
| Pairing and trusted-device list | Identity model, user approval, key storage approach, and revocation behavior agreed. | Trust and revocation affect every transfer and hosted feature. |
| Four platform expansion | Pilot acceptance suite passes and supported OS/build environments are available. | Scaling unstable semantics to more clients multiplies debugging cost. |
| Clipboard and handoff | Four platform MVP works; payload types and retention controls are documented. | Sensitive data and capability differences require explicit user controls. |
| Accounts, push, relay | Local path stable; service threat model, privacy, data retention, provider, and operational ownership approved. | Hosted infrastructure adds cost, attack surface, and support duties. |
| Remote access | Dedicated scope, platform API research, authorization UX, visible session status, and abuse review approved. | Screen viewing and input carry materially greater privacy and security impact. |
| Public release | Install/update flow, compatibility matrix, documentation, security review, and release owner are complete. | A successful demo does not establish installability or maintainability. |

# Testing and security gates
Treat test and security work as part of each feature, not as a final
cleanup phase. The integration captain rotates each sprint; the author
of each component adds its own unit and failure tests; Member A reviews
trust boundaries and threat changes.

| **Area** | **Minimum evidence before a milestone passes** |
|----|----|
| Protocol and interoperability | Shared fixtures; version compatibility tests; every supported client pair passes the same message and transfer cases. |
| Network and reliability | Disconnect, network change, offline peer, retry, duplicate request, cancellation, app restart, large agreed file, and low-storage behavior. |
| Security | Unpaired peer rejected; identity verified; session encrypted; revocation takes effect; corrupted transfer detected; secrets kept in OS secure storage where available; no custom cryptographic primitive. |
| Privacy | Clipboard remains opt in; history can pause and clear; hosted transfer is optional; logs avoid file content and clipboard contents; user-visible permissions match feature use. |
| Platform behavior | Permission granted, denied, revoked, and re-enabled flows; documented behavior when background activity, discovery, or status data is restricted. |
| Release | Clean install, upgrade, uninstall, accurate platform/support matrix, release notes, known issues, and no unresolved critical security findings. |

Do not invent a throughput target before measuring representative
devices and agreeing on acceptable file sizes and local network
conditions. Record baseline transfer time and failure rate during the
pilot, then set measurable targets before the four platform beta.

# Collaboration workflow
| **Practice** | **Team rule** |
|----|----|
| Work tracking | Keep one backlog with milestones M0–M6. Every task has an owner, acceptance check, dependency, and small reviewable scope. |
| Branches and reviews | Use short lived branches and pull requests. Require one review from a non author. Changes to protocol, identity, encryption, or hosted data handling require review from Member A plus one client owner. |
| Integration cadence | Integrate at least twice per week during active implementation. Run protocol fixtures and the pilot device smoke test at every integration checkpoint. |
| Decisions | Record decisions with date, context, options considered, chosen path, owner, and revisit trigger. Mark proposals as proposals until the team accepts them. |
| Definition of ready | Task has user-visible behavior or technical output, acceptance criteria, dependencies, platform scope, and security/privacy implications. |
| Definition of done | Code reviewed; tests added and passed; docs and platform limitations updated; failure behavior checked; no hidden placeholder or unsupported capability claim. |
| Team routine | One planning session each sprint, brief async daily updates, one integration demo at the end of each week, and a sprint review plus retro. Keep meetings short and decisions written. |

Proposed repository layout (not an existing repository): apps/macos,
apps/windows, apps/linux, apps/android, packages/protocol,
packages/test-fixtures, services/api, services/relay, docs, and
tests/integration. Create services only when the hosted phase is
approved.

# Scope and risk notes
| **Risk** | **Effect on delivery** | **Control** |
|----|----|----|
| Four native clients started together | Three people can become spread across four incomplete apps before one transfer path works. | Keep M0/M1 to one desktop plus Android; expand clients in a planned order after the conformance suite exists. |
| Platform behavior differs | Discovery, background work, permissions, clipboard, and status data can vary by OS/version. | Maintain a capability matrix; test the claimed OS matrix; expose unavailable features honestly. |
| Protocol changes arrive late | Clients drift and integration cost rises. | Version the protocol early, use fixtures, and review cross-client changes before merge. |
| Hosted service enters too early | Adds infrastructure, privacy, operational, and abuse work before core local value is proven. | Keep accounts and relay optional and behind a separate M4 gate. |
| Security is treated as a final audit | Pairing, identity, revocation, and data handling can become expensive to retrofit. | Review the threat model in M0 and update it for clipboard, hosted transfer, notifications, and remote access. |
| Unavailable team hardware or skills | A selected platform can block the two week proof or create unrealistic parallel work. | Select the first pair based on available hardware and ownership; change the default pair before code is committed if access is missing. |

Realistic scope: the two week sprint can establish a technical path, but
it cannot prove broad OS compatibility, production security, installer
quality, sustained background behavior, or relay readiness. The first
public release should include only features whose platform and support
gates pass.

# Decisions to close as the team learns
| **Decision** | **Recommended timing** | **Reason to close it** |
|----|----|----|
| Pilot pair and owner names | Sprint day 1 | Unblocks parallel client shells and a measurable demo. |
| Minimum OS versions and Linux distribution | Before M2 begins | Defines APIs, test devices, and packaging support. |
| Protocol encoding and transport | After M0 spike, before M1 implementation hardens | The context proposes JSON or Protocol Buffers and authenticated encrypted local connections but does not select either. |
| Account free pairing and hosted feature boundaries | Before M4 | Controls whether the core product remains useful without an account and defines service scope. |
| Open source license and premium model | Before public beta or hosted launch | Affects contributions, distribution, and service expectations. |
| iOS/iPadOS, remote access, and final brand | At roadmap review; do not block the file sharing MVP | These are explicitly unresolved or later scope items. |

# Platform references for later validation
These official references support two examples from the roadmap. Recheck
the documentation for each chosen OS version when implementing; this
short list is not a complete platform compatibility review.

**Android background execution limits.** [Android Developers
documentation](https://developer.android.com/about/versions/oreo/background)

**Android notification access API.** [NotificationListenerService
reference](https://developer.android.com/reference/android/service/notification/NotificationListenerService)

**macOS screen capture.** [ScreenCaptureKit
documentation](https://developer.apple.com/documentation/screencapturekit/capturing-screen-content-in-macos)

# Beginner guide for this older plan

This plan contains useful phase background but predates the clearer member-specific tickets. “M0/M1/M2” are project checkpoints, not programming languages or tools. M0 proves one small slice; M1 makes that slice usable; M2 expands to all four clients. The team should not build four full apps at once.

**Example:** In M0, one Mac and one Android phone may prove pairing and a test file. In M2, repeat the same acceptance checks across macOS, Windows, Linux, and Android. Passing the Mac/Android demo does not prove Windows/Linux work.

The current role assignment is Member 1/A for shared protocol/security, Member 2/B for macOS/Windows, and Member 3/C for Android/Linux and later service implementation. Testing is shared. Use the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md) for definitions and sensitive-work rules, and the [current team roadmap](TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md) where this older document conflicts.

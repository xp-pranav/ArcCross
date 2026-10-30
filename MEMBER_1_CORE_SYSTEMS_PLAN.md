# Member 1 (A): Core Systems, Protocol, and Security

This is Member 1's personal work plan. Member names and skill assignments are placeholders; replace “Member 1” with the actual teammate's name when the team assigns roles.

**Before starting:** Read the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md) for the end-to-end file-transfer example and the rules for sensitive work.

## Your lane

You own shared technical contracts that every ArcCross client uses. Your job is to make device trust, protocol behavior, security rules, and error meanings consistent across macOS, Windows, Linux, and Android.

You own:

- Shared protocol and message schemas, version rules, examples, and fixtures.
- Device identity, pairing, trust, revocation, transfer-state, and error contracts.
- Security and privacy requirements, threat model, compatibility rules, and release security review.
- Diagnostic codes and security-negative test fixtures.
- Hosted-service security/API contract if the team approves hosted connectivity after the local beta.

You do not own the platform app screens, desktop/mobile app adapters, installers, or hosted API implementation. Member 2 owns desktop clients; Member 3 owns Android/Linux and, only after approval, hosted service implementation.

## How your part works — beginner explanation

Think of your work as writing the shared rules of a game. Each client is built with a different toolkit, but they must agree on what a message means.

- **Protocol:** The agreed message format. Example: a `transfer.offer` says which transfer is being offered and its allowed size. It does not contain the file itself.
- **Discovery vs. pairing:** Discovery is someone knocking and saying “ArcCross is here.” Pairing is the user checking who knocked and choosing to trust that device. A device found on Wi-Fi must never become trusted automatically.
- **Authentication vs. encryption:** Authentication checks that the peer is the paired device. Encryption helps keep the conversation private while it travels over the network. Both are needed; a friendly device name is not proof of identity.
- **Digest:** A calculated check value for the completed file. If the sender and receiver calculate different values, the transfer is not marked complete. A digest does not encrypt data.
- **Fixture:** A shared sample message and expected result. You publish it once; Members 2 and 3 use the same fixture to make sure Mac, Windows, Linux, and Android interpret it consistently.
- **Threat model:** A practical “what could go wrong?” note. Example: an unknown device sends a huge message or a filename like `../../important-file`. Record how the system rejects it.

**Example:** You publish the approved pairing request and a fixture for an expired request. Member 2 and Member 3 each make their client reject the expired example. If they disagree, fix the shared rule before adding more features.

## Sensitive work you must personally understand

The following are **human-led**. AI can explain concepts, draft test cases, or help document a vetted choice, but do not blindly copy generated protocol/security code or let AI approve the design.

- **A-M0-02 through A-M0-04:** identity, pairing, threat model, encrypted-session decision.
- **A-M1-03 and A-M1-04:** revocation, replay/integrity rules, and negative fixtures.
- **A-M2-01 and A-M2-03:** safe version compatibility and security-negative behavior.
- **A-M3-* through A-M5-*:** clipboard privacy, hosted authorization/relay, and advanced feature permissions if those optional phases are approved.
- **A-M6-* and A-M7-***: final release security review, incident process, and vulnerability response.

For these tickets, write down what you believe the code does in your own words, review failure cases with another member, and use established platform security libraries. Do not create a custom encryption algorithm or key-exchange scheme. If none of the three members can explain the identity/encryption design, treat production release as blocked until a qualified security reviewer helps.

## How to work a ticket

Read the matching ticket in the [detailed backlog](MEMBER_CHUNK_BACKLOG.csv): the CSV includes a plain-language explanation, a simple example/check, a sensitivity label, and the formal acceptance check. Start with 2-point tickets before taking a 3-point ticket if the concept is new. Ask another member to confirm the contract before client code depends on it.

## Version path

**Required release path:** 0.1 → 0.2 → 0.5 → 1.0 → 1.x. Versions 1.1, 1.2, and 1.3+ are optional add-ons and do not block version 1.0.

### Version 0.1 — M0 foundations and two-device proof

Work chunks:

- **A-M0-01 · 2 points:** Define the versioned protocol envelope and first message examples. Clients need required fields, message IDs, message types, versions, and size limits.
- **A-M0-02 · 2 points:** Document pairing and device identity: approval, rejection, expiry, and the rule that discovery never creates trust.
- **A-M0-03 · 3 points:** Write the initial threat model, trust boundaries, and key-storage assumptions.
- **A-M0-04 · 3 points:** Test an authenticated encrypted session on the pilot devices. Record the approach or the exact blocker and next experiment.

**Version exit:** The chosen desktop and Android devices can use the documented session for a proof transfer; rejected pairing fails closed. This is a prototype gate, not a production security certification.

**Depends on:** The team selecting real pilot devices and Members 2 and 3 confirming the contract works for their clients.

### Version 0.2 — M1 local-sharing alpha

Work chunks:

- **A-M1-01 · 2 points:** Finalize discovery, pairing, capabilities, and session messages.
- **A-M1-02 · 2 points:** Define transfer states, transitions, error codes, and file-size boundaries.
- **A-M1-03 · 3 points:** Define trust, revocation, integrity, replay, and destination-authorization behavior.
- **A-M1-04 · 3 points:** Publish shared valid, invalid, boundary, expired, and revoked-peer test fixtures.

**Version exit:** Members 2 and 3 pass the same fixtures. Unknown or revoked devices cannot transfer. Transfer success, cancellation, and failure mean the same thing in both clients.

### Version 0.5 — M2 four-platform local beta

Work chunks:

- **A-M2-01 · 2 points:** Set compatibility, deprecation, and downgrade rules.
- **A-M2-02 · 2 points:** Expand fixtures to every shared message and supported protocol version.
- **A-M2-03 · 3 points:** Add tests for malformed/oversized messages, replay, corrupted transfers, and revoked peers.
- **A-M2-04 · 3 points:** Publish diagnostic categories and measured transfer/reliability baseline with test conditions.

**Version exit:** All four clients pass protocol conformance. The M2 release gate covers all six unique device pairings in both sending directions. Security-negative tests reject bad inputs without logging content or secrets.

### Version 1.0 — M6 public local-sharing release

Work chunks:

- **A-M6-01 · 2 points:** Review the final threat model and unresolved-risk register.
- **A-M6-02 · 2 points:** Publish supported protocol versions and interoperability evidence.
- **A-M6-03 · 3 points:** Audit dependencies, diagnostics, and logs for privacy leaks or secrets.
- **A-M6-04 · 3 points:** Complete security sign-off and document the vulnerability/incident contact path.

**Version exit:** No unresolved critical security issue; the security evidence matches the release scope. Optional features need their own review if included.

### Version 1.1 — M3 continuity add-on (optional)

Work chunks:

- **A-M3-01 · 2 points:** Define text/link payload types and size limits.
- **A-M3-02 · 2 points:** Define IDs, deduplication, expiry, and replay behavior.
- **A-M3-03 · 3 points:** Define clipboard-history opt-in, retention, sensitive-content handling, pause, clear, and deletion rules.
- **A-M3-04 · 3 points:** Publish continuity fixtures and compatibility/security checks.

**Version exit:** Clients can agree on safe text/link behavior. History stays off unless the user opts in. Automatic clipboard syncing is not assumed.

### Version 1.2 — M4 hosted connectivity (optional)

Work chunks:

- **A-M4-01 · 2 points:** Threat-model accounts, devices, relay, deletion, and abuse.
- **A-M4-02 · 2 points:** Define service authentication, ownership checks, and relay authorization contract.
- **A-M4-03 · 3 points:** Define key, token, session, revocation, and outage behavior.
- **A-M4-04 · 3 points:** Add security checks for deletion, replay, expiry, rate limits, and authorization.

**Version exit:** A service provider and operator are named; local transfers work signed out and during service outages; relay access is approved and short-lived.

### Version 1.3+ — M5 one advanced integration at a time (optional)

Work chunks:

- **A-M5-01 · 2 points:** Threat-model the one integration selected for that release.
- **A-M5-02 · 2 points:** Publish its supported-platform and permission matrix.
- **A-M5-03 · 3 points:** Define visible active-session, revocation, authorization, and retention behavior.
- **A-M5-04 · 3 points:** Approve denial, revoke, expiry, and unauthorized-access tests and release gate.

**Version exit:** The selected integration has a specific security review and rollback path. Remote input is a separate decision from screen viewing.

### Version 1.x — M7 maintenance

Work chunks:

- **A-M7-01 · 2 points:** Maintain vulnerability intake and response routine.
- **A-M7-02 · 2 points:** Maintain protocol compatibility and deprecation policy.
- **A-M7-03 · 3 points:** Review and ship protocol/security fixes with regression checks.
- **A-M7-04 · 3 points:** Publish release security evidence and advisories when needed.

**Version exit:** Every maintenance release has a clear compatibility statement and security-fix evidence. This work repeats for each release cycle.

## Technical checklist for your work

- Keep schemas versioned and examples checked in; unknown security-sensitive fields or unsafe downgrades must fail safely.
- Use a vetted platform TLS implementation. Do not create custom cryptography.
- Pairing must require user approval; discovery metadata is untrusted and must not contain file/clipboard content or secrets.
- Define identity verification, expiry, replay prevention, revocation, and key lifecycle before client behavior is treated as stable.
- Keep logs free of file content, clipboard content, pairing codes, tokens, private keys, and unnecessary full file paths.
- Publish fixtures early. Client owners implement against the fixtures instead of guessing the shared behavior.
- Review any change involving trust, keys, encryption, hosted authorization, or sensitive data retention.

## Team handoff rules

1. Publish the contract/fixture PR before Members 2 and 3 implement against it.
2. Review client requests as small interface changes; land the shared contract first, then each client adapter separately.
3. Keep your milestone work to 10 normalized points. Points are planning weights, not hours; recalibrate after the first two-week sprint.
4. Use the shared [detailed backlog](MEMBER_CHUNK_BACKLOG.csv). Do not maintain a separate personal task list.

For product scope, technical stack recommendations, and collaboration workflow, see the [full roadmap](TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md) and [readable member-plan index](MEMBER_VERSION_TABLES_AND_WORK_CHUNKS.md).

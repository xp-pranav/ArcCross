# Member 2 (B): macOS and Windows Desktop Clients

This is Member 2's personal work plan. Member names and skill assignments are placeholders; replace “Member 2” with the actual teammate's name when roles are assigned.

**Before starting:** Read the [Beginner Team Guide](BEGINNER_TEAM_GUIDE.md) for the end-to-end file-transfer example and the rules for sensitive work.

## Your lane

You own ArcCross desktop behavior on macOS and Windows, from the first pairing screens through public installers and updates.

You own:

- Desktop app shell and Devices, Transfers, and Settings navigation.
- Desktop discovery, pairing approval/rejection, device list, and revoke flows.
- Desktop file selection, receive approval, transfer progress, cancellation, retry, and failure/recovery states.
- macOS/Windows permission, firewall, VPN, packaging, signing, update, and support guidance.
- Optional desktop text/link, clipboard controls, hosted-service states, and approved Mac-specific integrations.
- Tests, accessibility checks, and release notes for your desktop code.

You do not own the shared protocol/schema, Android/Linux client code, or hosted-service implementation. Member 1 owns shared contracts; Member 3 owns Android/Linux and the optional hosted service after approval.

## How your part works — beginner explanation

You turn the shared rules into a Mac and Windows app that a person can operate. You are responsible for the whole desktop journey: what the user sees, what the operating system allows, and where the received file safely ends up.

- **App shell:** The basic window and navigation. It can show sample states before networking works; label those as examples so nobody mistakes a mock screen for a real connection.
- **Adapter:** The platform-specific part that connects the UI to Member 1's shared protocol. The Mac and Windows adapters may be different internally, but the same message must mean the same thing.
- **Permission:** The operating system's approval for local-network access. Explain the need before asking. If the user declines, show how to try again and keep the rest of the app usable.
- **File flow:** Use the system file picker so the user chooses the file and destination. Write incoming bytes to a temporary file, verify the final content, then finish the save. Never trust a filename received from another device as a file path.
- **Recovery:** A progress bar is not enough. If Wi-Fi disconnects, the UI should say “Interrupted,” explain whether any partial file remains, and offer only retry/resume behavior the implementation actually supports.
- **Packaging:** A build that runs from your development environment is not automatically installable by another person. Test the installer/update/uninstall path on a clean machine.

**Example:** A nearby Android phone appears in the Mac app as “Nearby,” not “Paired.” The user compares the code and approves. Later, the phone offers `photo.jpg`; the Mac shows sender/name/size, receives it to a temporary file, verifies it, and only then displays “Verified.”

## Sensitive work you must personally understand

- **B-M0-03, B-M1-02, B-M1-03, B-M2-03:** local-network permissions, destination handling, interruption behavior, and firewall/VPN recovery. Test allow, deny, re-enable, and real network failure on the actual supported OS.
- **B-M1-02 and all file receive paths:** path validation, overwrite behavior, temporary files, cleanup on cancellation, and digest failure. Never rely on an AI-generated path sanitizer without understanding and testing it.
- **B-M4-*:** account/relay UI must not imply that a local or cloud connection is secure unless the shared contract and Member 1's review say so.
- **B-M5-***: screen or remote access uses sensitive OS permissions. Keep active status visible and stop access immediately when requested. Screen viewing and remote input are different features.
- **B-M6-01 through B-M6-03:** signing identities and developer certificates are secrets. The assigned human operator must control them; do not put certificate passwords, signing keys, or store credentials in code, prompts, screenshots, or chat.

AI can draft layout code, help explain Swift/WinUI errors, or suggest test cases. You must run the app, understand the generated code you keep, and test on supported Mac/Windows versions. If file safety or permissions are unclear, stop and ask Member 1 for the security contract before guessing.

## How to work a ticket

The [detailed backlog](MEMBER_CHUNK_BACKLOG.csv) now includes a plain-language explanation, example/check, sensitivity label, and formal acceptance test for each ticket. Build in your desktop paths, keep one ticket per branch, and ask Member 1 before changing a shared message or error meaning.

## Version path

**Required release path:** 0.1 → 0.2 → 0.5 → 1.0 → 1.x. Versions 1.1, 1.2, and 1.3+ are optional add-ons and do not block version 1.0.

### Version 0.1 — M0 foundations and two-device proof

Work chunks:

- **B-M0-01 · 2 points:** Confirm the pilot desktop, OS, test device, and toolchain.
- **B-M0-02 · 2 points:** Build the desktop shell with Devices, Transfers, and Settings navigation.
- **B-M0-03 · 3 points:** Build discovery and local-network permission states.
- **B-M0-04 · 3 points:** Connect pairing approval/rejection and the first transfer spike.

**Version exit:** Desktop launches, shows real permission/discovery state, can approve or reject a pairing, and participates in the two-device proof.

**Depends on:** The team choosing available hardware and Member 1 publishing the first protocol examples.

### Version 0.2 — M1 local-sharing alpha

Work chunks:

- **B-M1-01 · 2 points:** Add file selection and outgoing transfer offer.
- **B-M1-02 · 2 points:** Add incoming approval, destination selection, and temporary-file writes.
- **B-M1-03 · 3 points:** Add progress, cancel, retry, disconnect recovery, and integrity result.
- **B-M1-04 · 3 points:** Add paired-device list, revoke action, and actionable error states.

**Version exit:** On the pilot desktop, users can send and receive, verify file integrity, cancel/retry, recover from disconnect, and revoke a trusted device.

### Version 0.5 — M2 four-platform local beta

Work chunks:

- **B-M2-01 · 2 points:** Complete macOS core-client behavior and shared protocol conformance.
- **B-M2-02 · 2 points:** Complete Windows core-client behavior and shared protocol conformance.
- **B-M2-03 · 3 points:** Add firewall, VPN, local-network permission, and recovery guidance.
- **B-M2-04 · 3 points:** Test the desktop install/update approach and publish supported OS versions.

**Version exit:** macOS and Windows both pass pairing, send/receive, integrity, cancellation, revocation, and error checks. They interoperate with Android and each other. The full cross-platform gate covers six unique device pairings in both send directions.

### Version 1.0 — M6 public local-sharing release

Work chunks:

- **B-M6-01 · 2 points:** Prepare and sign/package the macOS release.
- **B-M6-02 · 2 points:** Prepare and sign/package the Windows release.
- **B-M6-03 · 3 points:** Verify clean install, upgrade, rollback/disable, and uninstall.
- **B-M6-04 · 3 points:** Finalize desktop setup, recovery, accessibility, and release notes.

**Version exit:** A clean-machine user can install, pair, transfer, recover from common network/permission issues, and uninstall using the published instructions.

### Version 1.1 — M3 continuity add-on (optional)

Work chunks:

- **B-M3-01 · 2 points:** Add explicit text/link sending from desktop.
- **B-M3-02 · 2 points:** Add receive preview, copy/open actions, and link safety flow.
- **B-M3-03 · 3 points:** Add opt-in clipboard-history settings with pause, clear, and expiry only if approved.
- **B-M3-04 · 3 points:** Add keyboard, screen-reader, error, duplicate, and retention regression checks.

**Version exit:** Users choose the content and recipient. History stays off until opted into, and its controls match Member 1's privacy contract. Automatic clipboard monitoring is not assumed.

### Version 1.2 — M4 hosted connectivity (optional)

Work chunks:

- **B-M4-01 · 2 points:** Add optional sign-in/out while keeping signed-out local use as the default.
- **B-M4-02 · 2 points:** Show hosted-device availability and service state accurately.
- **B-M4-03 · 3 points:** Negotiate relay use while preferring the local path and allowing fallback.
- **B-M4-04 · 3 points:** Handle service outage, token expiry, device deletion, and sign-out in the UI.

**Version exit:** Local transfer remains available signed out and when the service is down. Hosted status is not confused with local reachability.

### Version 1.3+ — M5 one advanced integration at a time (optional)

Work chunks:

- **B-M5-01 · 2 points:** Add desktop capability and integration-status indicators.
- **B-M5-02 · 2 points:** Prototype one approved Mac-only integration, such as screen viewing.
- **B-M5-03 · 3 points:** Add visible permission, active-session, and disconnect controls.
- **B-M5-04 · 3 points:** Add integration-specific tests and platform limitation notes.

**Version exit:** The user can see when access is active and stop it. Screen viewing and remote input are separate scopes; remote input requires a separate approval and review.

### Version 1.x — M7 maintenance

Work chunks:

- **B-M7-01 · 2 points:** Maintain macOS/Windows compatibility and supported OS matrix.
- **B-M7-02 · 2 points:** Maintain desktop signing, installer, and update paths.
- **B-M7-03 · 3 points:** Fix desktop regressions, crashes, and performance issues.
- **B-M7-04 · 3 points:** Publish desktop changelog, known issues, and support notes.

**Version exit:** Every desktop release has regression evidence, a current support matrix, and accurate release notes. This work repeats for each release cycle.

## Technical checklist for your work

- Proposed stacks are Swift/SwiftUI for macOS and C#/WinUI for Windows; these are recommendations until the team confirms them.
- Keep UI, app services, protocol adapter, discovery/transport, persistence, and secure storage as distinct boundaries.
- Consume Member 1's versioned schema and fixtures. Do not invent desktop-only meanings for shared messages or errors.
- Use OS file pickers and platform secure storage. Write received files to a temporary location, verify integrity, then finalize safely.
- Sanitize remote filenames and prevent writes outside the user-selected destination. Do not auto-open received files.
- Treat firewall, VPN, local-network permission, sleep/wake, and network changes as visible states with useful recovery steps.
- Keep private keys, tokens, pairing codes, file contents, clipboard contents, and unnecessary full file paths out of logs.
- Keep clipboard history, hosted connectivity, and Mac-only integrations out of 1.0 unless the team explicitly selects them and they pass their own gates.

## Team handoff rules

1. Build against Member 1's published schema/fixtures; request shared changes through a linked interface ticket.
2. Keep desktop code in the agreed desktop paths. Do not edit Android/Linux or service paths; coordinate before a cross-client interface change.
3. Keep your milestone work to 10 normalized points. Points are planning weights, not hours; recalibrate after the first two-week sprint.
4. Own tests and release evidence for the desktop features you build. Cross-platform pair testing is shared work, not delegated only to Member 3.
5. Use the shared [detailed backlog](MEMBER_CHUNK_BACKLOG.csv), not a separate personal task list.

For the complete technical roadmap and team workflow, see the [full roadmap](TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md) and [readable member-plan index](MEMBER_VERSION_TABLES_AND_WORK_CHUNKS.md).

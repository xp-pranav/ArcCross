# ArcCross Beginner Team Guide

**Read this before splitting or implementing tickets.** The project documents are recommendations for a product that is still being planned. The repository currently contains planning files; do not assume the app, service, or final technology choices already exist.

This guide explains how the pieces fit together, gives concrete examples, and marks the work the team must understand and verify itself. It is written for teammates who are new to app development.

## 1. ArcCross in one sentence

ArcCross is intended to help a person securely pair their own devices and send a selected file directly over a local network, starting with macOS, Windows, Linux, and Android.

The first release is deliberately smaller than the full vision. It does not need an account, cloud storage, automatic clipboard sync, notifications, or remote control. Those are later, optional projects.

## 2. How sending one file should work

Think of the flow as a series of separate gates. Passing one gate does not automatically pass the next.

1. **Find:** Each app looks for possible ArcCross peers on the same reachable network. This only means “a device may be nearby.” It does not make that device trusted.
2. **Pair:** The user confirms the intended device, for example by comparing a short-lived code. The other user approves or rejects. Rejection must leave no trust behind.
3. **Trust and connect:** The apps verify the saved device identity and open an authenticated encrypted connection using a vetted platform library.
4. **Offer:** The sender picks a file and sends the recipient its name and size. The receiver sees who sent it and chooses whether to accept.
5. **Transfer:** The file is streamed in bounded pieces. The UI shows progress and supports cancellation. If Wi-Fi drops, the app reports an interruption instead of pretending the transfer finished.
6. **Verify:** The receiver checks that the completed bytes match the sender's file using a standard digest such as SHA-256. Encryption protects traffic while it travels; a digest checks that the received file matches.
7. **Save safely:** The receiver first writes to a temporary file in the user's chosen folder. It moves the file into its final name only after verification. A remote filename must never be allowed to write outside that folder.
8. **Record the result:** Both apps show “Verified” or a clear failure. Logs contain a safe error code, not file contents, pairing codes, keys, or secrets.

**Example:** A Mac discovers an Android phone. The user compares the same pairing code on both devices and approves. The Mac selects `notes.pdf`; Android shows the sender, file name, and size. Android accepts, shows progress, checks the digest, and then offers “Show in folder.” If the code differs or the receiver rejects, no transfer starts.

## 3. What the different project documents do

- **PRD:** What users need and which features are in or out of each release. Example: “Users can cancel a transfer.”
- **TRD:** How the software should be structured and which technical decisions are proposed. It is not proof that a design is already implemented.
- **App Flow:** The screens and steps a user moves through, including failure and recovery paths.
- **UI/UX Brief:** What each screen should communicate and how it should behave for keyboard, touch, and assistive technology users.
- **Backend Schema:** What information is stored. “Schema” means the shape of data, such as field names and relationships. The local MVP does not need the proposed hosted database.
- **Implementation Plan / Roadmap:** What order to build in, what depends on what, and what evidence closes each milestone.
- **Member plans:** Which member owns each feature family and their smaller tickets.
- **Backlog CSV:** The task list to put on one shared board. Every ticket has one owner and a “done” check.
- **Competitive research:** Evidence and observations to inform product decisions. It is input, not a promise that every observation is still current or a requirement to copy another app.

## 4. The version path in plain language

- **0.1 proof:** One available desktop and one Android device demonstrate the smallest safe connection and test transfer. It is a learning prototype.
- **0.2 alpha:** The pilot pair can be used for a complete local transfer with progress, errors, cancellation, and device removal.
- **0.5 beta:** All four planned platforms work together and pass the shared acceptance checks.
- **1.0 public local-sharing release:** People can install, pair, transfer, recover, and uninstall using documented instructions.
- **1.1, 1.2, 1.3+:** Optional feature releases for continuity, hosted connectivity, or one advanced integration at a time. These do not block 1.0.
- **1.x maintenance:** Fixes and compatibility updates after release.

The dates are intentionally undecided. A two-week sprint means about ten working days, not a guarantee that every ambitious proof will fit. Show what works, record what did not, and carry unfinished dependencies forward accurately.

## 5. Basic development workflow

1. Read the ticket and its dependencies. Ask the owner if the expected behavior is unclear.
2. Confirm the ticket has one owner, one code area, a point estimate, and a testable “done” check.
3. Create a short-lived branch for that ticket. Do not edit another member's owned module at the same time.
4. Make the smallest change that satisfies the ticket. If the task grows, split it before adding unrelated work.
5. Run the checks that apply to your change. For platform permissions, networking, installation, or background behavior, also use a real supported device or machine.
6. Ask another member to review the change. Security-sensitive changes need the security owner plus the affected client owner.
7. Merge only after the reviewer understands the behavior and the checks pass. Update the docs if the user-visible behavior or support limits changed.

Useful terms:

- **Branch:** A separate line of work for one change.
- **Pull request (PR):** A reviewable proposal to merge a branch into the shared project.
- **CI:** Automated build and checks that run when code changes.
- **WIP limit:** Work in progress limit; the plan suggests no more than two active tickets per person.
- **Fixture:** A checked-in example message with expected results. All clients use the same example to confirm they interpret the protocol the same way.
- **Acceptance check:** Observable evidence that a ticket is complete, not just “the code compiles.”

## 6. Work that the team must personally understand and verify

“Do it yourselves” means the assigned member understands the behavior, makes or presents the decision for team review, and personally verifies the result. It does not mean every line must be typed without AI or reference material. AI can teach, suggest, and draft; it cannot approve the product's security or prove behavior on a real device.

### Critical — human-led; do not copy blindly

- Device identity, pairing approval, revocation, authentication, encryption configuration, and key storage.
- File-system access, path validation, temporary-file handling, file overwrite behavior, and integrity verification.
- Permission requests for local network, notifications, clipboard, screen capture, accessibility, or background execution.
- Account/device authorization, database ownership rules, tokens, relay access, data deletion, and retention if hosted features are approved.
- Security/privacy claims, threat model decisions, incident response, and release sign-off.
- Signing keys, developer certificates, production credentials, store accounts, and deployment secrets. Never put these in prompts, source control, screenshots, or logs.

For cryptography, use a vetted platform implementation and established protocols. Do not invent encryption, key exchange, or “secure” token schemes. If nobody on the team can explain and review the security behavior, do not ship that feature until a qualified reviewer helps.

### High — AI may help, but the owner must test on target systems

- Local discovery, firewall behavior, network changes, Android background behavior, and OS permissions.
- Transfer interruption, retry/resume, cancellation, storage-full, duplicate filename, and large-file behavior.
- App signing/packaging/update, database migrations, account deletion, diagnostics, clipboard, and notification integrations.

Run these on the supported physical device or clean machine where practical. A simulator or unit test is useful but does not prove that a real firewall or permission dialog behaves correctly.

### Good places to use AI assistance

- Ask for a plain-language explanation of code or a platform API before using it.
- Draft screen layouts, non-sensitive boilerplate, documentation, sample fixtures, and ordinary unit-test cases.
- Ask AI to find edge cases or review a diff, then verify each finding yourself.
- Generate example data that contains no real user files, secrets, tokens, or personal information.

Never paste signing keys, passwords, access tokens, private keys, real clipboard contents, user files, or production data into an AI prompt. Never merge AI-generated security-sensitive code unless a teammate can explain it, review it, and pass the required tests.

## 7. Quick glossary

- **Client:** The app running on a user's device.
- **Local network / LAN:** Devices that can reach each other through a nearby Wi-Fi or wired network. “Same Wi-Fi” does not guarantee that the router permits communication.
- **Discovery:** Looking for possible nearby apps. It is not authentication.
- **Pairing:** A deliberate user action that records which device is trusted.
- **Authentication:** Checking that a connected peer is the device it claims to be.
- **Encryption in transit:** Preventing other network participants from reading or altering data while it travels.
- **Digest/checksum:** A calculated value used to detect whether the received file differs from the sent file. It does not encrypt the file.
- **Protocol:** The shared message rules used by all four clients.
- **API:** A defined way for one software component to request work from another, such as an app asking a future service to register a device.
- **Database migration:** A controlled change to the database structure, with a way to test upgrades and handle failure.
- **Threat model:** A written list of what is valuable, who could attack it, how they might do so, and which protections are needed.
- **Least privilege:** Give a feature only the access it needs, only for as long as it needs it.
- **ADR:** Architecture Decision Record: a short dated note explaining a technical choice and its trade-offs.

## 8. First questions to ask in a team review

- Which real desktop and Android devices can we test this week?
- Which member understands each proposed platform stack best?
- Can each person explain the ticket's “done” check before starting it?
- Which permissions or user data does the feature touch?
- What happens if the user rejects, cancels, loses network, revokes access, or uninstalls?
- What evidence will show the feature works beyond one developer's machine?

## Related documents

- [Product and technical spec index](../README.md)
- [Per-member readable plans](MEMBER_VERSION_TABLES_AND_WORK_CHUNKS.md)
- [Detailed ticket backlog](MEMBER_CHUNK_BACKLOG.csv)
- [Complete technical roadmap](TEAM_ROADMAP_AND_EQUAL_WORK_SPLIT.md)

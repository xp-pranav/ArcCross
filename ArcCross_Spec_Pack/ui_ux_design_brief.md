# ArcCross UI and UX Design Brief

**Status:** Visual and interaction direction for review  
**Product stage:** First release focuses on pairing and local file sharing  
**Brand status:** “One ecosystem. Every device.” is a working message, not a final brand decision.

## 1. Design objective

Make cross-device actions feel clear and safe. The interface should help a user answer three questions quickly:

1. Which devices do I trust?
2. Which device is available now?
3. What is happening to the file or content I sent?

ArcCross should feel calm, precise, and approachable. It can use familiar system controls on every platform, but should not imitate another company’s product identity or imply that ArcCross can bypass operating-system permissions.

## 2. Experience principles

- **Show the next useful action:** Add a device, send a file, retry, or review a permission.
- **Make trust visible:** Distinguish discovered devices from paired devices.
- **Use direct status language:** “Searching,” “Waiting for approval,” “Transferring,” “Verified,” or “Interrupted.”
- **Explain sensitive access at the point of need:** Do not front-load optional permissions.
- **Keep local and hosted states distinct:** A cloud service should never make local availability ambiguous.
- **Use platform-native behavior:** Respect system file pickers, navigation, keyboard shortcuts, menus, touch targets, and permission prompts.
- **Never rely on color alone:** Pair status colors with a label/icon.

## 3. Proposed visual direction

The palette below is a starting proposal for a design prototype, not an approved brand system.

| Token | Proposed value | Use |
|---|---|---|
| Ink | `#17212B` | Primary text and key icons |
| Deep blue | `#1E3A5F` | Primary actions and navigation emphasis |
| Teal | `#2A8C83` | Positive connection and completed transfer accents |
| Canvas | `#F6F8FA` | Main light background |
| Surface | `#FFFFFF` | Cards, sheets, and dialogs |
| Border | `#D9E0E7` | Dividers and control outlines |
| Muted text | `#5B6570` | Supporting labels and timestamps |
| Warning | `#A65D00` | Recoverable warnings, paired with text/icon |
| Error | `#B42318` | Failed or blocked states, paired with text/icon |

Support light and dark appearances using semantic tokens. Do not lock a platform to a fixed color mode. Use native system typography or an accessible sans-serif. Avoid using custom display typography for status and data-heavy screens.

## 4. Layout and navigation

### Desktop

- App window with a compact persistent sidebar: Devices, Transfers, Settings.
- Main pane shows the selected screen with a clear title and one primary action.
- Device list rows show name, platform, availability, and a restrained secondary label.
- Pairing and transfer details can use system-style sheets/dialogs where they preserve context.
- Keep important actions accessible by keyboard and menu/toolbar where expected on each OS.

### Android

- Use a simple top-level navigation pattern for Devices, Transfers, and Settings.
- Use touch-sized controls and system file selection/share mechanisms.
- Show one prominent action on the empty Devices screen: **Add device**.
- Keep transfer progress visible without forcing the user to remain on one screen.

Do not force pixel-identical layouts. Preserve the same naming, status semantics, and task order across clients.

## 5. Screen requirements

### Welcome and first run

- Short value statement and plain-language local-network purpose.
- Device name field with a useful default.
- Permission explanation appears before the first discovery request.
- Secondary link to privacy details.

### Devices

- Clear headings for **This device**, **Paired devices**, and optionally **Nearby devices**.
- Paired and merely discovered devices must look different.
- Device card/row shows name, platform, online/last-seen, and accessible capability labels.
- Primary action: **Add device** or **Send file**, depending on context.
- Empty state explains how to begin; no decorative illustration should obscure the action.

### Pairing

- Show the peer name and platform prominently.
- QR/code comparison must be readable and easy to cancel.
- Use explicit **Approve** and **Reject** buttons with different visual weight.
- State when a request expires or the code does not match.

### Transfer

- Show sender and recipient, file name(s), total size, progress, and state.
- Give **Cancel** a clear place while transfer is active.
- On completion, display **Verified** as text and offer a destination action.
- On failure, state the reason and next step; do not use a generic red banner alone.

### Device details

- Show trust state, platform, last-seen status, and active transfers.
- Place **Remove device** in a deliberate management area and confirm the consequence.

### Settings

- Group local-network, receive, clipboard, notification, and hosted controls by feature.
- Only display later-feature controls when implemented.
- Provide permission status and instructions for changing it through the OS.
- Add privacy and diagnostics sections that do not expose file or clipboard contents.

## 6. Interaction and content guidance

### Recommended labels

- **Add device** instead of “Connect” when trust is being created.
- **Pair** for the explicit trust step.
- **Send file** for the primary content transfer.
- **Paired** for trusted devices and **Nearby** for discovered, untrusted peers.
- **Verified** after integrity checks pass.
- **Remove device** with confirmation text that says it will need to pair again.

### Permission copy pattern

Before requesting access, state:

- what the permission enables;
- when ArcCross will use it;
- what remains available if the user declines;
- where to change the permission later.

Do not promise continuous background delivery where the platform may restrict it.

## 7. Motion, feedback, and status

Use short, functional transitions when a device pairs or a transfer changes state. Avoid decorative motion during security prompts. Keep progress updates stable and avoid resetting a progress indicator on reconnect unless the transfer truly restarts.

Status meanings:

- **Searching:** discovery is active.
- **Nearby:** discovered, not trusted.
- **Waiting for approval:** request sent; trust is not established.
- **Paired:** identity is trusted.
- **Online/Offline:** last connection status; show last-seen time when useful.
- **Transferring:** content is in flight.
- **Verified:** integrity check passed.
- **Interrupted/Failed:** include a next step.

## 8. Accessibility and localization

- Support dynamic text sizing where the platform allows it.
- Provide screen-reader labels for device state, transfer progress, and icon-only controls.
- Preserve sufficient contrast in light and dark modes.
- Keep focus order logical; announce important pairing and transfer state changes.
- Do not encode status only by color, shape, or animation.
- Avoid hard-coded text widths and string concatenation so localization can expand safely.
- Validate keyboard-only use on desktop and screen reader use on Android and desktop targets.

## 9. Design handoff deliverables

Before a production client is considered designed, provide:

- annotated flows for first run, pairing, send, receive, failure/retry, and revoke;
- responsive desktop and Android layouts;
- empty, loading, permission-denied, offline, success, and error states;
- semantic color and spacing tokens;
- component variants for device rows, status chips, transfer progress, alerts, and confirmation dialogs;
- copy inventory for permission explanations and security-sensitive actions;
- accessibility notes and design QA checklist.

## 10. Design questions for team review

1. Should Devices or Transfers be the landing screen after first setup?
2. Should receiving from a paired device require per-transfer approval by default?
3. Which ArcCross icon or wordmark direction is distinct from existing product marks?
4. Should the first release include a compact transfer history or only active/recent activity?
5. What platform-specific system controls are essential for the pilot pair?

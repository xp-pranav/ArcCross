# ArcCross Backend Schema

**Status:** Conceptual schema proposal  
**Important architecture boundary:** Local pairing and file transfer do not require a backend. The schema below separates client-local metadata for M0–M3 from a possible hosted coordination service for M4. Do not build the hosted tables until that phase is approved.

## 1. Data principles

- Store file contents and clipboard contents on the sending/receiving devices only.
- The hosted service should store the minimum metadata required for account/device coordination.
- Private keys never leave their device. A service may store public keys and short-lived routing metadata.
- Every server query must verify that the authenticated account owns the referenced device.
- Device/account deletion must revoke service access and remove or expire associated endpoints and sessions.
- Keep audit and diagnostic records free of file names, file paths, clipboard contents, pairing codes, and private keys.

## 2. Client-local schema for the local MVP

Each client may use a local database for non-secret metadata. The exact ORM/library is platform-specific. Keep private keys and long-lived credentials in OS secure storage, not in these tables.

### `local_devices`

| Field | Type | Notes |
|---|---|---|
| `device_id` | UUID/text UUID, primary key | ArcCross protocol identifier |
| `display_name` | text | User-editable local label |
| `platform` | text | `macos`, `windows`, `linux`, or `android` |
| `public_key_fingerprint` | text | Fingerprint only; public key may be stored if required by the protocol |
| `trust_state` | text | `pending`, `trusted`, or `revoked` |
| `paired_at` | timestamp, nullable | Set after verified pairing |
| `last_seen_at` | timestamp, nullable | Approximate status, not proof of current reachability |
| `capabilities_json` | JSON, nullable | Non-sensitive negotiated capabilities |
| `revoked_at` | timestamp, nullable | Keep a local tombstone if needed to reject stale sessions |

### `local_transfers`

| Field | Type | Notes |
|---|---|---|
| `transfer_id` | UUID/text UUID, primary key | Client transfer identifier |
| `peer_device_id` | UUID/text UUID, foreign key | Trusted peer reference |
| `direction` | text | `send` or `receive` |
| `display_name` | text | Filename shown in history; local only |
| `byte_count` | integer | Validate non-negative and within configured limits |
| `bytes_completed` | integer | Progress metadata |
| `content_digest` | text, nullable | Digest for integrity verification |
| `state` | text | `offered`, `accepted`, `transferring`, `complete`, `failed`, `canceled` |
| `error_code` | text, nullable | Stable non-sensitive error code |
| `started_at` | timestamp | Transfer creation time |
| `finished_at` | timestamp, nullable | Terminal time |

Store the destination path only if the product needs to display it again; otherwise resolve the location locally and avoid persisting full paths in history. Never use a peer-provided path directly.

### `local_preferences`

| Field | Type | Notes |
|---|---|---|
| `key` | text, primary key | Typed preference identifier |
| `value` | text/JSON | Non-secret setting only |
| `updated_at` | timestamp | Change time |

### Later local table: `clipboard_items`

Do not create until M3 is accepted. If created, keep history off by default, encrypt payloads using a key protected by platform secure storage, apply user-configured expiry, and support pause/clear. Do not sync or upload its content by default.

## 3. Hosted schema proposal for M4

PostgreSQL is a proposed service database from the project context, not a finalized choice. The following tables contain metadata only.

### `accounts`

| Column | Type | Constraints / purpose |
|---|---|---|
| `id` | UUID | Primary key |
| `auth_subject` | text | Unique external identity subject; do not store a plaintext password if a managed identity provider is selected |
| `status` | text | `active`, `disabled`, or `deletion_pending` |
| `created_at` | timestamptz | Account creation |
| `deleted_at` | timestamptz, nullable | Deletion workflow marker |

### `devices`

| Column | Type | Constraints / purpose |
|---|---|---|
| `id` | UUID | Primary key; protocol device identifier |
| `account_id` | UUID | Foreign key to `accounts`, cascade on deletion |
| `display_name` | varchar | User-editable, length-limited |
| `platform` | text | Constrained to supported platform identifiers |
| `public_key` | bytea/text | Public identity material only; never the private key |
| `key_fingerprint` | text | Unique per account where practical |
| `created_at` | timestamptz | Registration time |
| `last_seen_at` | timestamptz, nullable | Coarse last-seen metadata |
| `revoked_at` | timestamptz, nullable | Revoked devices cannot request rendezvous |

Add `UNIQUE (account_id, id)` to support account-scoped foreign keys. Index active devices by `account_id` and `revoked_at`.

### `push_endpoints`

| Column | Type | Constraints / purpose |
|---|---|---|
| `id` | UUID | Primary key |
| `account_id` | UUID | Owner; used for authorization checks |
| `device_id` | UUID | Foreign key to owned device |
| `provider` | text | Platform push provider identifier |
| `token_ciphertext` | bytea/text | Encrypted token if server storage is necessary; rotate and delete on revocation |
| `updated_at` | timestamptz | Last refresh |
| `revoked_at` | timestamptz, nullable | Disable endpoint |

### `relay_sessions`

| Column | Type | Constraints / purpose |
|---|---|---|
| `id` | UUID | Primary key |
| `account_id` | UUID | Owner account |
| `sender_device_id` | UUID | Must belong to `account_id` |
| `receiver_device_id` | UUID | Must belong to `account_id` |
| `rendezvous_token_hash` | bytea/text | Hash of scoped, short-lived token; never store bearer token in plaintext |
| `state` | text | `pending`, `active`, `closed`, or `expired` |
| `created_at` | timestamptz | Creation time |
| `expires_at` | timestamptz | Required expiry; cleanup job removes expired metadata |
| `closed_at` | timestamptz, nullable | Closed time |

Enforce that sender and receiver differ. Use account-scoped composite foreign keys so a session cannot join devices from unrelated accounts unless an explicitly reviewed sharing feature is added. Apply a short TTL and rate limits. Store no file payload, filename, or clipboard content.

## 4. Illustrative SQL migration

This is a starting point for review, not a production migration.

```sql
CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    auth_subject TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'disabled', 'deletion_pending')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE devices (
    id UUID PRIMARY KEY,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    display_name VARCHAR(80) NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('macos', 'windows', 'linux', 'android')),
    public_key BYTEA NOT NULL,
    key_fingerprint TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    UNIQUE (account_id, id),
    UNIQUE (account_id, key_fingerprint)
);

CREATE INDEX devices_active_by_account
    ON devices (account_id, last_seen_at DESC)
    WHERE revoked_at IS NULL;

CREATE TABLE relay_sessions (
    id UUID PRIMARY KEY,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    sender_device_id UUID NOT NULL,
    receiver_device_id UUID NOT NULL,
    rendezvous_token_hash BYTEA NOT NULL UNIQUE,
    state TEXT NOT NULL CHECK (state IN ('pending', 'active', 'closed', 'expired')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,
    closed_at TIMESTAMPTZ,
    CHECK (sender_device_id <> receiver_device_id),
    FOREIGN KEY (account_id, sender_device_id)
        REFERENCES devices (account_id, id) ON DELETE CASCADE,
    FOREIGN KEY (account_id, receiver_device_id)
        REFERENCES devices (account_id, id) ON DELETE CASCADE
);

CREATE INDEX relay_sessions_expiry ON relay_sessions (expires_at);
```

Before production, review enum/check evolution, migration rollback, token generation, account deletion, and authorization at the service boundary.

## 5. API operations implied by the schema

These are conceptual operations, not a finalized endpoint contract:

- Register, list, rename, and revoke a device.
- Register and revoke a push endpoint.
- Create a short-lived rendezvous between two authorized devices.
- Close or expire a relay session.
- Delete an account and all associated device metadata.

Every operation needs authenticated identity, ownership checks, input limits, rate limits, safe logs, and tests for cross-account access denial.

## 6. Retention and deletion

- Local transfer history should have a user-visible clear-history control and a retention choice if it persists beyond recent activity.
- Hosted relay sessions must expire automatically; deletion should not depend on a client reconnecting.
- Account deletion removes device and push metadata and invalidates sessions.
- Define backup retention and operational logs before hosted launch.
- Keep a minimum audit trail for security events only when justified; document its fields and expiry.

## 7. Decisions required before M4

1. Account-free pairing versus account-linked trusted devices.
2. Identity provider and authentication model.
3. Whether push tokens are stored and how they are encrypted/rotated.
4. Relay topology, token scope, rate limits, and operational owner.
5. Data retention and account deletion timelines.
6. Whether PostgreSQL remains the chosen database after provider/operations review.

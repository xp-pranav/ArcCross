export type Platform = 'macos' | 'android' | 'ios' | 'linux' | 'windows';

export type PairingStatus = 'paired' | 'available' | 'pairing' | 'unpaired';

export type ConnectionStatus = 'online' | 'offline' | 'busy';

export type TrustStatus = 'trusted' | 'standard';

export interface Device {
  id: string;
  name: string;
  platform: Platform;
  isCurrentDevice?: boolean;
  pairingStatus: PairingStatus;
  connectionStatus: ConnectionStatus;
  trustStatus: TrustStatus;
  lastSeen: string;
  ipAddress: string;
  clientVersion: string;
  model: string;
  signalStrength?: 1 | 2 | 3;
}

export type TransferStatus = 'waiting' | 'transferring' | 'completed' | 'interrupted' | 'failed' | 'canceled';

export type TransferDirection = 'incoming' | 'outgoing';

export interface TransferFile {
  id: string;
  name: string;
  size: number; // in bytes
  type: string;
  progress: number;
}

export interface Transfer {
  id: string;
  direction: TransferDirection;
  peerId: string;
  peerName: string;
  peerPlatform: Platform;
  files: TransferFile[];
  totalBytes: number;
  transferredBytes: number;
  speed?: string;
  status: TransferStatus;
  timestamp: string;
  savedLocation?: string;
}

export type PairingApprovalState = 'waiting' | 'mismatch' | 'expired' | 'rejected' | 'success';

export interface PairingSession {
  id: string;
  peerDevice: Device;
  verificationCode: string;
  qrPayload: string;
  expiresInSeconds: number;
  state: PairingApprovalState;
}

export interface AppSettings {
  deviceName: string;
  theme: 'system' | 'light' | 'dark';
  discoveryMode: 'visible_all' | 'contacts' | 'paired_only';
  requireTransferApproval: boolean;
  autoAcceptTrusted: boolean;
  defaultDownloadLocation: string;
  reducedMotion: boolean;
  accentColor: 'teal' | 'blue';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

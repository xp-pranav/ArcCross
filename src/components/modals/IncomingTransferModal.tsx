import React from 'react';
import { BottomSheet } from '../common/BottomSheet';
import { PlatformIcon } from '../common/PlatformIcon';
import { FileItem } from '../transfers/FileItem';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowDownLeft, HardDrive } from 'lucide-react';

export const IncomingTransferModal: React.FC = () => {
  const {
    activeModal,
    incomingTransfer,
    acceptIncomingTransfer,
    declineIncomingTransfer,
    settings,
  } = useApp();

  const isOpen = activeModal === 'incoming-transfer' && !!incomingTransfer;

  if (!isOpen || !incomingTransfer) return null;

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={declineIncomingTransfer}
      title="Incoming Transfer"
      subtitle="A paired device wants to send you files directly."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Sender Identity Card (macOS Inset) */}
        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PlatformIcon platform={incomingTransfer.peerPlatform} size={20} />
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {incomingTransfer.peerName}
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Authenticated Endpoint • Local Subnet Direct
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 'var(--text-2xs)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--color-teal-subtle)',
                color: 'var(--color-teal)',
                fontWeight: 600,
              }}
            >
              Verified Peer
            </span>
          </div>
        </div>

        {/* Files Summary */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'var(--text-2xs)',
              color: 'var(--color-text-tertiary)',
              marginBottom: '6px',
            }}
          >
            <span>Files ({incomingTransfer.files.length})</span>
            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
              {formatSize(incomingTransfer.totalBytes)} total
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '150px', overflowY: 'auto' }}>
            {incomingTransfer.files.map((file) => (
              <FileItem key={file.id} name={file.name} size={file.size} type={file.type} />
            ))}
          </div>
        </div>

        {/* Destination Path Preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: 'var(--text-2xs)',
            color: 'var(--color-text-tertiary)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-control)',
            backgroundColor: 'var(--color-elevated)',
            border: '1px solid var(--color-border)',
          }}
        >
          <HardDrive size={13} color="var(--color-teal)" />
          <span>Save destination: <strong style={{ color: 'var(--color-text-primary)' }}>{settings.defaultDownloadLocation}</strong></span>
        </div>

        {/* macOS Action Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            paddingTop: 'var(--space-2)',
            borderTop: '0.5px solid var(--color-separator)',
          }}
        >
          <button type="button" className="macos-button" onClick={declineIncomingTransfer}>
            Decline
          </button>
          <button type="button" className="macos-button primary" onClick={acceptIncomingTransfer}>
            <ArrowDownLeft size={13} />
            <span>Accept & Receive</span>
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            fontSize: 'var(--text-2xs)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          <ShieldCheck size={12} color="var(--color-teal)" />
          <span>Direct peer-to-peer streaming with zero cloud transit</span>
        </div>
      </div>
    </BottomSheet>
  );
};

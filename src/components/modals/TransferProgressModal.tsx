import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { ProgressBar } from '../common/ProgressBar';
import { FileItem } from '../transfers/FileItem';
import { PlatformIcon } from '../common/PlatformIcon';
import { useApp } from '../../context/AppContext';
import { TransferStatus } from '../../types';
import { ArrowRight, Pause, Play, AlertTriangle, AlertCircle } from 'lucide-react';

export const TransferProgressModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    activeTransfer,
    updateActiveTransferStatus,
    cancelActiveTransfer,
    currentDevice,
  } = useApp();

  const [isPaused, setIsPaused] = useState(false);

  const isOpen = activeModal === 'transfer-progress' && !!activeTransfer;

  if (!isOpen || !activeTransfer) return null;

  const percent = Math.min(
    100,
    Math.round((activeTransfer.transferredBytes / (activeTransfer.totalBytes || 1)) * 100)
  );

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const senderName =
    activeTransfer.direction === 'outgoing' ? currentDevice.name : activeTransfer.peerName;
  const recipientName =
    activeTransfer.direction === 'outgoing' ? activeTransfer.peerName : currentDevice.name;

  const handleTogglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      updateActiveTransferStatus('transferring');
    } else {
      setIsPaused(true);
      updateActiveTransferStatus('interrupted');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="File Transfer"
      subtitle="Streaming directly between local endpoints."
      maxWidth="480px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Prototype Variant Switcher (macOS segmented pill style) */}
        <div
          style={{
            backgroundColor: 'var(--color-elevated)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Simulate Status
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {(['waiting', 'transferring', 'interrupted', 'canceled', 'failed', 'completed'] as TransferStatus[]).map(
              (variant) => (
                <button
                  key={variant}
                  onClick={() => updateActiveTransferStatus(variant)}
                  style={{
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid',
                    borderColor: activeTransfer.status === variant ? 'var(--color-teal)' : 'var(--color-border)',
                    backgroundColor: activeTransfer.status === variant ? 'var(--color-surface)' : 'transparent',
                    color: activeTransfer.status === variant ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    fontSize: 'var(--text-2xs)',
                    fontWeight: activeTransfer.status === variant ? 600 : 400,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {variant}
                </button>
              )
            )}
          </div>
        </div>

        {/* Sender -> Recipient Visual Row (macOS Inset) */}
        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlatformIcon
                platform={activeTransfer.direction === 'outgoing' ? currentDevice.platform : activeTransfer.peerPlatform}
                size={16}
              />
              <div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>Sender</div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {senderName}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--color-teal)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-teal-subtle)',
              }}
            >
              <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 600 }}>TLS Direct</span>
              <ArrowRight size={12} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>Recipient</div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {recipientName}
                </div>
              </div>
              <PlatformIcon
                platform={activeTransfer.direction === 'outgoing' ? activeTransfer.peerPlatform : currentDevice.platform}
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Progress & Speed Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                {percent}%
              </div>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                {formatSize(activeTransfer.transferredBytes)} of {formatSize(activeTransfer.totalBytes)} •{' '}
                {activeTransfer.status === 'transferring' ? activeTransfer.speed || '14.2 MB/s' : activeTransfer.status}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {activeTransfer.status === 'transferring' && (
                <button className="macos-button" onClick={handleTogglePause}>
                  <Pause size={12} />
                  <span>Pause</span>
                </button>
              )}
              {activeTransfer.status === 'interrupted' && (
                <button className="macos-button primary" onClick={handleTogglePause}>
                  <Play size={12} />
                  <span>Resume</span>
                </button>
              )}
              <button className="macos-button" onClick={cancelActiveTransfer}>
                <span>Stop</span>
              </button>
            </div>
          </div>

          <ProgressBar progress={percent} status={activeTransfer.status} height={5} />
        </div>

        {/* Detailed Files List */}
        <div>
          <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            Files in payload ({activeTransfer.files.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '140px', overflowY: 'auto' }}>
            {activeTransfer.files.map((file) => (
              <FileItem
                key={file.id}
                name={file.name}
                size={file.size}
                type={file.type}
                progress={file.progress}
                showProgress={true}
              />
            ))}
          </div>
        </div>

        {/* Status Callout if Interrupted or Failed */}
        {activeTransfer.status === 'interrupted' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-control)',
              backgroundColor: 'var(--color-warning-subtle)',
              border: '1px solid rgba(201, 104, 0, 0.2)',
              fontSize: 'var(--text-2xs)',
              color: 'var(--color-warning)',
            }}
          >
            <AlertTriangle size={14} />
            <span>Transfer is paused. Existing chunks remain verified in memory.</span>
          </div>
        )}

        {activeTransfer.status === 'failed' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-control)',
              backgroundColor: 'var(--color-error-subtle)',
              border: '1px solid rgba(215, 0, 21, 0.2)',
              fontSize: 'var(--text-2xs)',
              color: 'var(--color-error)',
            }}
          >
            <AlertCircle size={14} />
            <span>Connection dropped. Re-establishing local socket.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

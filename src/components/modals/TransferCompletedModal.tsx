import React from 'react';
import { Modal } from '../common/Modal';
import { Check, FolderOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TransferCompletedModal: React.FC = () => {
  const { activeModal, closeModal, activeTransfer, addToast, settings } = useApp();

  const isOpen = activeModal === 'transfer-completed';

  if (!isOpen) return null;

  const location = activeTransfer?.savedLocation || `${settings.defaultDownloadLocation}/Received/`;

  const handleShowLocation = () => {
    addToast({
      title: 'Revealing in Finder',
      description: `Path: ${location}`,
      type: 'info',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      maxWidth="420px"
      showCloseButton={true}
    >
      <div
        className="animate-slide-up"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'var(--space-2) 0',
          gap: 'var(--space-4)',
        }}
      >
        {/* Apple-grade Quiet Success Teal Check Badge */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-teal-subtle)',
            border: '2px solid rgba(42, 140, 131, 0.3)',
            color: 'var(--color-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={28} strokeWidth={2.75} />
        </div>

        {/* Title & Subtitle */}
        <div>
          <h2
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '4px',
            }}
          >
            Verified
          </h2>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)',
              maxWidth: '300px',
              lineHeight: 1.5,
            }}
          >
            Your files were successfully received and written to local storage.
          </p>
        </div>

        {/* Saved Location Box (macOS Inset) */}
        <div className="macos-inset-group" style={{ width: '100%' }}>
          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, textAlign: 'left' }}>
              <FolderOpen size={16} color="var(--color-teal)" style={{ flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.625rem', color: 'var(--color-text-tertiary)' }}>Saved Location</div>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {location}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="macos-button"
              onClick={handleShowLocation}
            >
              Show
            </button>
          </div>
        </div>

        {/* Simulated Prototype Notice */}
        <div
          style={{
            fontSize: '0.625rem',
            color: 'var(--color-text-muted)',
            backgroundColor: 'var(--color-elevated)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-border)',
          }}
        >
          Simulated Demonstration State — files are managed locally.
        </div>

        {/* macOS Action Buttons */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            paddingTop: 'var(--space-2)',
            borderTop: '0.5px solid var(--color-separator)',
          }}
        >
          <button type="button" className="macos-button" onClick={handleShowLocation}>
            Show in Finder
          </button>
          <button type="button" className="macos-button primary" onClick={closeModal}>
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

import React from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { PlatformIcon } from '../common/PlatformIcon';
import { TransferRow } from '../transfers/TransferRow';
import { useApp } from '../../context/AppContext';
import { Edit2, Trash2, Share2, Shield, Wifi, Cpu, HardDrive } from 'lucide-react';

export const DeviceDetailsModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    selectedDevice,
    openModal,
    transfers,
  } = useApp();

  const isOpen = activeModal === 'device-details' && !!selectedDevice;

  if (!isOpen || !selectedDevice) return null;

  const deviceTransfers = transfers.filter(
    (t) => t.peerId === selectedDevice.id || t.peerName.toLowerCase().includes(selectedDevice.name.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Device Info"
      subtitle="Hardware specifications and cryptographic link attributes."
      maxWidth="500px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Device Identity Header (Get Info style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: 'var(--space-2) 0' }}>
          <PlatformIcon platform={selectedDevice.platform} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3
                style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.015em',
                }}
              >
                {selectedDevice.name}
              </h3>
              {selectedDevice.isCurrentDevice && (
                <span
                  style={{
                    fontSize: 'var(--text-2xs)',
                    padding: '1px 5px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--color-teal-subtle)',
                    color: 'var(--color-teal)',
                    fontWeight: 600,
                  }}
                >
                  This Mac
                </span>
              )}
            </div>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
              {selectedDevice.model}
            </div>
          </div>
          <StatusBadge status={selectedDevice.connectionStatus} size="sm" />
        </div>

        {/* Technical Attributes (macOS Inset Group Table) */}
        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={13} color="var(--color-teal)" />
              Trust Profile
            </span>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {selectedDevice.trustStatus === 'trusted' ? 'Trusted Endpoint' : 'Standard Peer'}
            </span>
          </div>

          <div className="macos-inset-row">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wifi size={13} color="var(--color-teal)" />
              Subnet Address
            </span>
            <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              {selectedDevice.ipAddress}
            </span>
          </div>

          <div className="macos-inset-row">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={13} color="var(--color-teal)" />
              Client Version
            </span>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              {selectedDevice.clientVersion}
            </span>
          </div>

          <div className="macos-inset-row">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HardDrive size={13} color="var(--color-teal)" />
              Last Seen
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
              {selectedDevice.lastSeen}
            </span>
          </div>
        </div>

        {/* Transfer History with this Device */}
        <div>
          <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            Exchange History ({deviceTransfers.length})
          </div>
          {deviceTransfers.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '140px', overflowY: 'auto' }}>
              {deviceTransfers.map((t) => (
                <TransferRow key={t.id} transfer={t} />
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: 'var(--space-4)',
                textAlign: 'center',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-control)',
                border: '1px dashed var(--color-border)',
                fontSize: 'var(--text-2xs)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              No transfer records logged with {selectedDevice.name}.
            </div>
          )}
        </div>

        {/* macOS Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-3)',
            borderTop: '0.5px solid var(--color-separator)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              className="macos-button"
              onClick={() => openModal('rename-device', selectedDevice)}
            >
              <Edit2 size={12} />
              <span>Rename...</span>
            </button>
            {!selectedDevice.isCurrentDevice && (
              <button
                className="macos-button danger"
                onClick={() => openModal('remove-device-confirm', selectedDevice)}
              >
                <Trash2 size={12} />
                <span>Remove</span>
              </button>
            )}
          </div>

          <button
            className="macos-button primary"
            disabled={selectedDevice.connectionStatus !== 'online'}
            onClick={() => openModal('send-files', selectedDevice)}
          >
            <Share2 size={12} />
            <span>Send Files</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

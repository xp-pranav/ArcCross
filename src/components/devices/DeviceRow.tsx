import React from 'react';
import { Device } from '../../types';
import { PlatformIcon } from '../common/PlatformIcon';
import { StatusBadge } from '../common/StatusBadge';
import { Share2, Link2, MoreHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DeviceRowProps {
  device: Device;
}

export const DeviceRow: React.FC<DeviceRowProps> = ({ device }) => {
  const { openModal, setSelectedDevice } = useApp();

  const isOnline = device.connectionStatus === 'online';

  return (
    <div className="macos-inset-row interactive">
      {/* Device Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <PlatformIcon platform={device.platform} size={18} />
        <div>
          <div
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{device.name}</span>
            {device.isCurrentDevice && (
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
          <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
            {device.model} • <span style={{ fontFamily: 'var(--font-mono)' }}>{device.ipAddress}</span>
          </div>
        </div>
      </div>

      {/* Status & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <StatusBadge status={device.connectionStatus} size="sm" />

        {device.pairingStatus === 'paired' ? (
          <button
            className="macos-button"
            disabled={!isOnline}
            onClick={() => {
              setSelectedDevice(device);
              openModal('send-files', device);
            }}
            title="Transmit files"
          >
            <Share2 size={12} />
            <span>Send</span>
          </button>
        ) : (
          <button
            className="macos-button primary"
            onClick={() => {
              setSelectedDevice(device);
              openModal('add-device', device);
            }}
          >
            <Link2 size={12} />
            <span>Pair</span>
          </button>
        )}

        <button
          onClick={() => openModal('device-details', device)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Get Info"
        >
          <MoreHorizontal size={15} />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Device } from '../../types';
import { PlatformIcon } from '../common/PlatformIcon';
import { StatusBadge } from '../common/StatusBadge';
import { MoreHorizontal, Share2, Edit2, Trash2, Info, Link2, Wifi } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DeviceCardProps {
  device: Device;
  onSendFiles?: () => void;
  onPair?: () => void;
  onViewDetails?: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onSendFiles,
  onPair,
  onViewDetails,
}) => {
  const { openModal, setSelectedDevice } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  const handleDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      openModal('device-details', device);
    }
  };

  const handleSend = () => {
    if (onSendFiles) {
      onSendFiles();
    } else {
      setSelectedDevice(device);
      openModal('send-files', device);
    }
  };

  const isOnline = device.connectionStatus === 'online';

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border)',
        padding: '14px 16px',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all var(--duration-fast) var(--ease-apple)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-teal)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        setShowMenu(false);
      }}
    >
      {/* Top Header: Hardware Icon & Actions Menu */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PlatformIcon platform={device.platform} size={20} />
          <div>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.015em',
                lineHeight: 1.25,
              }}
            >
              {device.name}
            </div>
            <div
              style={{
                fontSize: 'var(--text-2xs)',
                color: 'var(--color-text-tertiary)',
                marginTop: '1px',
              }}
            >
              {device.model}
            </div>
          </div>
        </div>

        {/* macOS Style Context Dropdown Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: showMenu ? 'var(--color-border-subtle)' : 'transparent',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color var(--duration-instant) ease',
            }}
            title="Options"
          >
            <MoreHorizontal size={15} />
          </button>

          {showMenu && (
            <div
              className="animate-sheet-drop"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                width: '150px',
                backgroundColor: 'var(--color-sheet-bg)',
                borderRadius: 'var(--radius-control)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sheet)',
                padding: '4px',
                zIndex: 'var(--z-dropdown)',
              }}
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleDetails();
                }}
                className="macos-sidebar-item"
                style={{ height: '26px', fontSize: 'var(--text-xs)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={13} />
                  <span>Get Info</span>
                </div>
              </button>

              {device.pairingStatus === 'paired' && (
                <>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      openModal('rename-device', device);
                    }}
                    className="macos-sidebar-item"
                    style={{ height: '26px', fontSize: 'var(--text-xs)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Edit2 size={13} />
                      <span>Rename...</span>
                    </div>
                  </button>

                  {!device.isCurrentDevice && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        openModal('remove-device-confirm', device);
                      }}
                      className="macos-sidebar-item"
                      style={{ height: '26px', fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Trash2 size={13} />
                        <span>Remove Link...</span>
                      </div>
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Middle Specs & Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 'var(--space-3) 0',
          paddingTop: 'var(--space-2)',
          borderTop: '0.5px solid var(--color-separator)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <StatusBadge status={device.connectionStatus} label={isOnline ? 'Online' : 'Offline'} size="sm" />
          {device.trustStatus === 'trusted' && (
            <span
              style={{
                fontSize: 'var(--text-2xs)',
                padding: '1px 5px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--color-deep-blue-subtle)',
                color: 'var(--color-deep-blue)',
                fontWeight: 600,
              }}
            >
              Trusted
            </span>
          )}
        </div>

        <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Wifi size={11} />
          <span>{device.lastSeen}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {device.isCurrentDevice ? (
          <button
            onClick={handleSend}
            className="macos-button"
            style={{ width: '100%' }}
          >
            <Share2 size={12} />
            <span>Send Files from This Mac</span>
          </button>
        ) : device.pairingStatus === 'paired' ? (
          <>
            <button
              onClick={handleDetails}
              className="macos-button"
              style={{ flex: 1 }}
            >
              Inspect
            </button>
            <button
              onClick={handleSend}
              className="macos-button primary"
              style={{ flex: 1 }}
              disabled={!isOnline}
            >
              <Share2 size={12} />
              <span>Send Files</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              if (onPair) onPair();
              else {
                setSelectedDevice(device);
                openModal('add-device', device);
              }
            }}
            className="macos-button primary"
            style={{ width: '100%' }}
          >
            <Link2 size={12} />
            <span>Pair Device...</span>
          </button>
        )}
      </div>
    </div>
  );
};

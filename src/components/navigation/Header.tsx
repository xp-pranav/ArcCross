import React, { useState } from 'react';
import {
  Share2,
  Plus,
  Radio,
  BellRing,
  Sparkles,
  ChevronDown,
  Layers,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentDevice,
    openModal,
    simulateIncomingTransfer,
    startPairingWithDevice,
    availableDevices,
  } = useApp();

  const [showDemoMenu, setShowDemoMenu] = useState(false);

  return (
    <header className="macos-unified-toolbar">
      {/* Left: macOS Window Controls & Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="macos-traffic-lights" aria-hidden="true">
          <div className="macos-traffic-light close" title="Close" />
          <div className="macos-traffic-light minimize" title="Minimize" />
          <div className="macos-traffic-light zoom" title="Zoom" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.015em',
            }}
          >
            ArcCross
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 7px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-teal-subtle)',
              color: 'var(--color-teal)',
              fontSize: 'var(--text-2xs)',
              fontWeight: 600,
            }}
          >
            <Radio size={10} className="animate-pulse-subtle" />
            <span>{currentDevice.name}</span>
          </span>
        </div>
      </div>

      {/* Center: Subtle Quick Status or Search capsule */}
      <div
        className="macos-search-field"
        style={{ width: '240px', display: 'none' }} /* Visible on wide desktop when needed */
      >
        <Search size={13} color="var(--color-text-tertiary)" />
        <input type="text" placeholder="Search devices, peers..." />
      </div>

      {/* Right: Native Toolbar Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {/* Prototype Demo Testing Popover Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="macos-button"
            style={{
              height: '26px',
              padding: '0 8px',
              backgroundColor: 'var(--color-deep-blue-subtle)',
              borderColor: 'rgba(62, 122, 186, 0.25)',
              color: 'var(--color-deep-blue)',
            }}
            title="Inspect prototype interaction states"
          >
            <Layers size={13} />
            <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 600 }}>Simulations</span>
            <ChevronDown size={11} />
          </button>

          {showDemoMenu && (
            <div
              className="animate-sheet-drop"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                width: '210px',
                backgroundColor: 'var(--color-sheet-bg)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sheet)',
                padding: '4px',
                zIndex: 'var(--z-dropdown)',
              }}
            >
              <div
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  padding: '6px 10px 4px',
                  letterSpacing: '0.04em',
                }}
              >
                Prototype Interactions
              </div>

              <button
                onClick={() => {
                  setShowDemoMenu(false);
                  simulateIncomingTransfer();
                }}
                className="macos-sidebar-item"
                style={{ height: '28px', fontSize: 'var(--text-xs)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BellRing size={13} color="var(--color-teal)" />
                  <span>Incoming Transfer Sheet</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowDemoMenu(false);
                  const peer = availableDevices[0];
                  if (peer) startPairingWithDevice(peer);
                }}
                className="macos-sidebar-item"
                style={{ height: '28px', fontSize: 'var(--text-xs)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={13} color="var(--color-deep-blue)" />
                  <span>Pairing Approval Modal</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowDemoMenu(false);
                  openModal('transfer-progress');
                }}
                className="macos-sidebar-item"
                style={{ height: '28px', fontSize: 'var(--text-xs)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Radio size={13} color="var(--color-text-secondary)" />
                  <span>Transfer Progress Modal</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowDemoMenu(false);
                  openModal('transfer-completed');
                }}
                className="macos-sidebar-item"
                style={{ height: '28px', fontSize: 'var(--text-xs)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={13} color="var(--color-teal)" />
                  <span>Verified Success Modal</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Standard Native Toolbar Buttons */}
        <button
          onClick={() => openModal('send-files')}
          className="macos-button"
          title="Transmit files directly to a paired device"
        >
          <Share2 size={13} color="var(--color-text-secondary)" />
          <span>Send Files</span>
        </button>

        <button
          onClick={() => openModal('add-device')}
          className="macos-button primary"
          title="Add a new device to your private ecosystem"
        >
          <Plus size={13} />
          <span>Add Device</span>
        </button>
      </div>
    </header>
  );
};

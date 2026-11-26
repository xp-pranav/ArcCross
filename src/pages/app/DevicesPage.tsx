import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformIcon } from '../../components/common/PlatformIcon';
import {
  Plus,
  RotateCcw,
  MoreHorizontal,
  ArrowRight,
  QrCode,
  Share2,
} from 'lucide-react';

export const DevicesPage: React.FC = () => {
  const {
    currentDevice,
    pairedDevices,
    availableDevices,
    openModal,
    startPairingWithDevice,
    setSelectedDevice,
  } = useApp();

  const [isScanning, setIsScanning] = useState(false);
  const [demoState, setDemoState] = useState<'normal' | 'no-nearby' | 'no-paired'>('normal');

  const handleScanAgain = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (demoState === 'no-nearby') {
        setDemoState('normal');
      }
    }, 1100);
  };

  const visiblePaired = demoState === 'no-paired' ? [] : pairedDevices;
  const visibleAvailable = demoState === 'no-nearby' ? [] : availableDevices;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Top Header Block matching ASCII wireframe */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-separator)',
        }}
      >
        <div>
          {/* Breadcrumb / Section Label */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              marginBottom: '4px',
            }}
          >
            WORKSPACE / DEVICES
          </div>

          {/* Title & Subtitle */}
          <h1
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
            }}
          >
            Devices
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Your connected ecosystem.
          </p>
        </div>

        {/* Primary "+ Add device" Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            onClick={() => openModal('add-device')}
            className="macos-button primary"
            style={{
              height: '32px',
              padding: '0 14px',
              fontSize: 'var(--text-xs)',
              gap: '6px',
            }}
          >
            <Plus size={14} />
            <span>Add device</span>
          </button>
        </div>
      </div>

      {/* Prototype State Switcher Toolbar (Discrete Prototype Verification) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-elevated)',
          border: '1px solid var(--color-border-subtle)',
          fontSize: 'var(--text-2xs)',
        }}
      >
        <span style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          Prototype View States:
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setDemoState('normal')}
            className="macos-button"
            style={{
              height: '22px',
              fontSize: '0.625rem',
              padding: '0 8px',
              backgroundColor: demoState === 'normal' ? 'var(--color-surface)' : 'transparent',
              fontWeight: demoState === 'normal' ? 600 : 400,
            }}
          >
            Default
          </button>
          <button
            onClick={() => setDemoState('no-nearby')}
            className="macos-button"
            style={{
              height: '22px',
              fontSize: '0.625rem',
              padding: '0 8px',
              backgroundColor: demoState === 'no-nearby' ? 'var(--color-surface)' : 'transparent',
              fontWeight: demoState === 'no-nearby' ? 600 : 400,
            }}
          >
            Empty Nearby
          </button>
          <button
            onClick={() => setDemoState('no-paired')}
            className="macos-button"
            style={{
              height: '22px',
              fontSize: '0.625rem',
              padding: '0 8px',
              backgroundColor: demoState === 'no-paired' ? 'var(--color-surface)' : 'transparent',
              fontWeight: demoState === 'no-paired' ? 600 : 400,
            }}
          >
            Empty Paired
          </button>
        </div>
      </div>

      {/* DEVICE GROUP 1: THIS DEVICE */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div className="macos-sidebar-group-header" style={{ padding: '0 2px' }}>
          THIS DEVICE
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
            }}
          >
            {/* Left: [laptop] MacBook Pro */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <PlatformIcon platform="macos" size={17} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {currentDevice.name}
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  {currentDevice.model}
                </div>
              </div>
            </div>

            {/* Right: macOS · This device | ● Online (···) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  color: 'var(--color-teal)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-teal)',
                  }}
                />
                Online
              </span>

              <button
                onClick={() => openModal('device-details', currentDevice)}
                className="macos-button"
                style={{ height: '26px', padding: '0 6px' }}
                title="Device parameters"
              >
                <MoreHorizontal size={14} color="var(--color-text-secondary)" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DEVICE GROUP 2: PAIRED DEVICES */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div className="macos-sidebar-group-header" style={{ padding: '0 2px' }}>
          PAIRED DEVICES
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}
        >
          {visiblePaired.length === 0 ? (
            <div
              style={{
                padding: 'var(--space-8) var(--space-4)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}
            >
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                No paired devices. Add a device to start sharing files across your ecosystem.
              </div>
              <button
                onClick={() => openModal('add-device')}
                className="macos-button primary"
                style={{ fontSize: 'var(--text-xs)', height: '28px' }}
              >
                <Plus size={13} />
                <span>Add device</span>
              </button>
            </div>
          ) : (
            visiblePaired.map((dev, idx) => {
              const isOnline = dev.connectionStatus === 'online';
              return (
                <div
                  key={dev.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderTop: idx > 0 ? '1px solid var(--color-separator)' : 'none',
                    transition: 'background-color var(--duration-fast) var(--ease-apple)',
                  }}
                >
                  {/* Left: glyph, name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--color-border-subtle)',
                      }}
                    >
                      <PlatformIcon platform={dev.platform} size={17} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {dev.name}
                      </div>
                      <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                        {dev.model}
                      </div>
                    </div>
                  </div>

                  {/* Right: State & Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 500,
                        color: isOnline ? 'var(--color-teal)' : 'var(--color-text-tertiary)',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isOnline ? 'var(--color-teal)' : 'transparent',
                          border: isOnline ? 'none' : '1.5px solid var(--color-text-tertiary)',
                        }}
                      />
                      {isOnline ? 'Online' : 'Offline'}
                    </span>

                    {/* Quick Send Button if Online */}
                    {isOnline && (
                      <button
                        onClick={() => {
                          setSelectedDevice(dev);
                          openModal('send-files', dev);
                        }}
                        className="macos-button"
                        style={{ height: '26px', padding: '0 8px', fontSize: 'var(--text-2xs)', gap: '4px' }}
                        title="Transmit files"
                      >
                        <Share2 size={11} color="var(--color-text-secondary)" />
                        <span>Send</span>
                      </button>
                    )}

                    <button
                      onClick={() => openModal('device-details', dev)}
                      className="macos-button"
                      style={{ height: '26px', padding: '0 6px' }}
                      title="Inspect device details"
                    >
                      <MoreHorizontal size={14} color="var(--color-text-secondary)" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* DEVICE GROUP 3: AVAILABLE TO PAIR */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2px',
          }}
        >
          <div className="macos-sidebar-group-header" style={{ padding: 0 }}>
            AVAILABLE TO PAIR
          </div>

          <button
            onClick={handleScanAgain}
            className="macos-button"
            disabled={isScanning}
            style={{
              height: '24px',
              padding: '0 8px',
              fontSize: 'var(--text-2xs)',
              gap: '4px',
              color: 'var(--color-deep-blue)',
            }}
          >
            <RotateCcw size={11} className={isScanning ? 'animate-spin' : ''} />
            <span>{isScanning ? 'Scanning...' : 'Scan again ↻'}</span>
          </button>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}
        >
          {isScanning ? (
            <div
              style={{
                padding: 'var(--space-6)',
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <RotateCcw size={13} className="animate-spin" color="var(--color-deep-blue)" />
              <span>Scanning local subnet for unassigned beacons...</span>
            </div>
          ) : visibleAvailable.length === 0 ? (
            <div
              style={{
                padding: 'var(--space-6) var(--space-4)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                No nearby devices.
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', maxWidth: '380px' }}>
                Make sure both devices are on the same network.
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--space-2)' }}>
                <button
                  onClick={handleScanAgain}
                  className="macos-button"
                  style={{ fontSize: 'var(--text-xs)', height: '28px' }}
                >
                  <RotateCcw size={12} />
                  <span>Scan again</span>
                </button>
                <button
                  onClick={() => openModal('add-device')}
                  className="macos-button"
                  style={{ fontSize: 'var(--text-xs)', height: '28px' }}
                >
                  <QrCode size={12} />
                  <span>Use QR code</span>
                </button>
              </div>
            </div>
          ) : (
            visibleAvailable.map((dev, idx) => (
              <div
                key={dev.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderTop: idx > 0 ? '1px solid var(--color-separator)' : 'none',
                }}
              >
                {/* Left: [desktop] Studio PC */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <PlatformIcon platform={dev.platform} size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {dev.name}
                    </div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                      {dev.model}
                    </div>
                  </div>
                </div>

                {/* Right: Nearby State and (Pair →) Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Nearby
                  </span>

                  <button
                    onClick={() => startPairingWithDevice(dev)}
                    className="macos-button primary"
                    style={{
                      height: '26px',
                      padding: '0 10px',
                      fontSize: 'var(--text-2xs)',
                      gap: '4px',
                    }}
                  >
                    <span>Pair</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* QUIET FOOTER LINE */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 'var(--space-8)',
          marginTop: 'var(--space-4)',
          borderTop: '1px solid var(--color-separator)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        <span>Direct by design.</span>
        <span style={{ fontWeight: 600, letterSpacing: '0.04em' }}>ArcCross</span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { QRCodePanel } from '../pairing/QRCodePanel';
import { PairingCode } from '../pairing/PairingCode';
import {
  QrCode,
  Radio,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Monitor,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddDeviceModal: React.FC = () => {
  const { activeModal, closeModal, pairDevice, availableDevices, addToast } = useApp();
  const [method, setMethod] = useState<'nearby' | 'qr' | 'code'>('nearby');
  const [searchState, setSearchState] = useState<'searching' | 'results' | 'no-results' | 'permission-denied'>('results');
  const [inputCode, setInputCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOpen = activeModal === 'add-device';

  const handlePairNearby = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const target = availableDevices[0] || {
        id: 'device-studio-pc',
        name: 'Studio PC',
        platform: 'windows' as const,
        pairingStatus: 'paired' as const,
        connectionStatus: 'online' as const,
        trustStatus: 'trusted' as const,
        lastSeen: 'Active now',
        ipAddress: '192.168.1.199',
        clientVersion: 'v1.0.0',
        model: 'Windows · Unpaired',
      };
      pairDevice(target);
      closeModal();
    }, 800);
  };

  const handleJoinWithCode = (codeToUse?: string) => {
    const code = codeToUse || inputCode;
    if (code.length < 6) {
      addToast({
        title: 'Invalid Code',
        description: 'Please enter a 6-digit numeric verification code.',
        type: 'warning',
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const target = availableDevices[0] || {
        id: 'device-studio-pc',
        name: 'Studio PC',
        platform: 'windows' as const,
        pairingStatus: 'paired' as const,
        connectionStatus: 'online' as const,
        trustStatus: 'trusted' as const,
        lastSeen: 'Active now',
        ipAddress: '192.168.1.199',
        clientVersion: 'v1.0.0',
        model: 'Windows · Unpaired',
      };
      pairDevice(target);
      closeModal();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Add Device"
      subtitle="Establish a point-to-point encrypted session on your subnet."
      maxWidth="480px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Mode Selector */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="macos-segmented-control" style={{ width: '100%', maxWidth: '340px', height: '28px' }}>
            <button
              type="button"
              onClick={() => setMethod('nearby')}
              className={`macos-segmented-button ${method === 'nearby' ? 'active' : ''}`}
              style={{ flex: 1, height: '22px' }}
            >
              <Radio size={12} />
              <span>Nearby</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('qr')}
              className={`macos-segmented-button ${method === 'qr' ? 'active' : ''}`}
              style={{ flex: 1, height: '22px' }}
            >
              <QrCode size={12} />
              <span>QR Code</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('code')}
              className={`macos-segmented-button ${method === 'code' ? 'active' : ''}`}
              style={{ flex: 1, height: '22px' }}
            >
              <span>Code</span>
            </button>
          </div>
        </div>

        {/* NEARBY TAB */}
        {method === 'nearby' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Visual State Toggle for Prototype Verification */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.625rem',
                color: 'var(--color-text-tertiary)',
                padding: '4px 8px',
                backgroundColor: 'var(--color-elevated)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <span>Mock State:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setSearchState('searching')}
                  style={{
                    border: 'none',
                    background: searchState === 'searching' ? 'var(--color-surface)' : 'transparent',
                    fontSize: '0.625rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: searchState === 'searching' ? 600 : 400,
                  }}
                >
                  Searching
                </button>
                <button
                  type="button"
                  onClick={() => setSearchState('results')}
                  style={{
                    border: 'none',
                    background: searchState === 'results' ? 'var(--color-surface)' : 'transparent',
                    fontSize: '0.625rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: searchState === 'results' ? 600 : 400,
                  }}
                >
                  Results
                </button>
                <button
                  type="button"
                  onClick={() => setSearchState('no-results')}
                  style={{
                    border: 'none',
                    background: searchState === 'no-results' ? 'var(--color-surface)' : 'transparent',
                    fontSize: '0.625rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: searchState === 'no-results' ? 600 : 400,
                  }}
                >
                  No Results
                </button>
                <button
                  type="button"
                  onClick={() => setSearchState('permission-denied')}
                  style={{
                    border: 'none',
                    background: searchState === 'permission-denied' ? 'var(--color-surface)' : 'transparent',
                    fontSize: '0.625rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: searchState === 'permission-denied' ? 600 : 400,
                  }}
                >
                  Denied
                </button>
              </div>
            </div>

            {/* State 1: Searching */}
            {searchState === 'searching' && (
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
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-deep-blue-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-deep-blue)',
                  }}
                >
                  <RotateCcw size={22} className="animate-spin" />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Searching local subnet...
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                    Listening for unassigned mDNS beacons on 192.168.1.0/24
                  </div>
                </div>
              </div>
            )}

            {/* State 2: Results */}
            {searchState === 'results' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Nearby Unpaired Devices
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Monitor size={16} color="var(--color-text-secondary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        Studio PC
                      </div>
                      <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                        Windows · Nearby
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePairNearby}
                    disabled={isSubmitting}
                    className="macos-button primary"
                    style={{ height: '26px', fontSize: 'var(--text-2xs)', padding: '0 10px', gap: '4px' }}
                  >
                    <span>{isSubmitting ? 'Pairing...' : 'Pair'}</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            )}

            {/* State 3: No Results */}
            {searchState === 'no-results' && (
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
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  No nearby devices found.
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', maxWidth: '340px' }}>
                  Make sure both devices are on the same network and have ArcCross open.
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--space-2)' }}>
                  <button
                    type="button"
                    onClick={() => setSearchState('searching')}
                    className="macos-button"
                    style={{ fontSize: 'var(--text-xs)', height: '28px' }}
                  >
                    <RotateCcw size={12} />
                    <span>Scan again</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('qr')}
                    className="macos-button"
                    style={{ fontSize: 'var(--text-xs)', height: '28px' }}
                  >
                    <QrCode size={12} />
                    <span>Use QR code</span>
                  </button>
                </div>
              </div>
            )}

            {/* State 4: Permission Denied */}
            {searchState === 'permission-denied' && (
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
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(207, 46, 46, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-error)',
                  }}
                >
                  <ShieldAlert size={20} />
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Local Network Access Required
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', maxWidth: '340px' }}>
                  ArcCross needs local subnet access to broadcast and discover nearby devices without cloud servers.
                </div>
              </div>
            )}
          </div>
        )}

        {/* QR CODE TAB */}
        {method === 'qr' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <QRCodePanel
              value="arccross://pair?session=macbook_host_subnet"
              size={160}
              caption="Scan with ArcCross on your mobile device to pair instantly."
            />
            <button
              type="button"
              className="macos-button"
              style={{ width: '100%', fontSize: 'var(--text-xs)', height: '28px' }}
              onClick={() => handleJoinWithCode('482913')}
            >
              Simulate Mobile Scanning QR
            </button>
          </div>
        )}

        {/* CODE TAB */}
        {method === 'code' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                Enter the six-digit code shown on the peer device:
              </p>
              <PairingCode isInput={true} onCodeComplete={(code) => setInputCode(code)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setInputCode('482913')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-deep-blue)',
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Auto-fill demo code (482 913)
              </button>
            </div>

            <button
              type="button"
              className="macos-button primary"
              disabled={isSubmitting || inputCode.length < 6}
              onClick={() => handleJoinWithCode()}
              style={{ width: '100%', height: '32px' }}
            >
              <span>{isSubmitting ? 'Establishing Trust...' : 'Confirm Pairing Code'}</span>
            </button>
          </div>
        )}

        {/* Cancel Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-separator)' }}>
          <button
            type="button"
            className="macos-button"
            onClick={closeModal}
            style={{ height: '28px', fontSize: 'var(--text-xs)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

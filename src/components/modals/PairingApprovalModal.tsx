import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { PairingCode } from '../pairing/PairingCode';
import { QRCodePanel } from '../pairing/QRCodePanel';
import { PlatformIcon } from '../common/PlatformIcon';
import { useApp } from '../../context/AppContext';
import { PairingApprovalState } from '../../types';
import { CheckCircle2, XCircle, AlertTriangle, Clock, QrCode, KeyRound } from 'lucide-react';

export const PairingApprovalModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    pairingSession,
    setPairingState,
    approvePairing,
    rejectPairing,
  } = useApp();

  const [countdown, setCountdown] = useState(58);
  const [showQRMode, setShowQRMode] = useState(false);

  const isOpen = activeModal === 'pairing-approval';
  const state: PairingApprovalState = pairingSession?.state || 'waiting';
  const peer = pairingSession?.peerDevice;

  useEffect(() => {
    if (!isOpen || state !== 'waiting') return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPairingState('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, state, setPairingState]);

  if (!isOpen || !peer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Pairing Security Prompt"
      subtitle="A nearby device is requesting mutual TLS pairing."
      maxWidth="460px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Prototype State Selector Pills */}
        <div
          style={{
            backgroundColor: 'var(--color-elevated)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Simulate Verification State
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {(['waiting', 'mismatch', 'expired', 'rejected', 'success'] as PairingApprovalState[]).map(
              (variant) => (
                <button
                  key={variant}
                  onClick={() => setPairingState(variant)}
                  style={{
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid',
                    borderColor: state === variant ? 'var(--color-teal)' : 'var(--color-border)',
                    backgroundColor: state === variant ? 'var(--color-surface)' : 'transparent',
                    color: state === variant ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    fontSize: 'var(--text-2xs)',
                    fontWeight: state === variant ? 600 : 400,
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

        {/* Peer Device Identity Inset Row */}
        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PlatformIcon platform={peer.platform} size={22} />
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {peer.name}
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  {peer.model} • <span style={{ fontFamily: 'var(--font-mono)' }}>{peer.ipAddress}</span>
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
              Direct Peer
            </span>
          </div>
        </div>

        {/* Active Verification State Content */}
        {state === 'waiting' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
              <div className="macos-segmented-control" style={{ width: '240px' }}>
                <button
                  onClick={() => setShowQRMode(false)}
                  className={`macos-segmented-button ${!showQRMode ? 'active' : ''}`}
                  style={{ flex: 1 }}
                >
                  <KeyRound size={11} />
                  <span>6-Digit Code</span>
                </button>
                <button
                  onClick={() => setShowQRMode(true)}
                  className={`macos-segmented-button ${showQRMode ? 'active' : ''}`}
                  style={{ flex: 1 }}
                >
                  <QrCode size={11} />
                  <span>QR Scan</span>
                </button>
              </div>
            </div>

            {showQRMode ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <QRCodePanel
                  value={pairingSession?.qrPayload || 'arccross://pair?code=482913'}
                  size={150}
                  caption="Scan with peer camera to verify cryptographic signature"
                />
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                  Verify that the peer device displays this exact code:
                </div>
                <PairingCode code={pairingSession?.verificationCode || '482 913'} />
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                fontSize: 'var(--text-2xs)',
                color: countdown < 15 ? 'var(--color-warning)' : 'var(--color-text-tertiary)',
              }}
            >
              <Clock size={12} />
              <span>
                Code expires in <strong>{countdown}s</strong>
              </span>
            </div>

            {/* macOS Buttons: Cancel/Reject on left, Approve on right */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                paddingTop: 'var(--space-3)',
                borderTop: '0.5px solid var(--color-separator)',
              }}
            >
              <button type="button" className="macos-button" onClick={rejectPairing}>
                Decline
              </button>
              <button type="button" className="macos-button primary" onClick={approvePairing}>
                Approve Pairing
              </button>
            </div>
          </div>
        )}

        {state === 'success' && (
          <div className="animate-slide-up" style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-teal-subtle)',
                color: 'var(--color-teal)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-2)',
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Pairing Successful
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              <strong>{peer.name}</strong> is now trusted for local direct file exchanges.
            </p>
          </div>
        )}

        {state === 'mismatch' && (
          <div className="animate-slide-up" style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-warning-subtle)',
                color: 'var(--color-warning)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-2)',
              }}
            >
              <AlertTriangle size={26} />
            </div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Code Mismatch
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px', maxWidth: '320px', margin: '4px auto 14px' }}>
              The code on the other device differed. Connection was aborted.
            </p>
            <button className="macos-button" onClick={() => setPairingState('waiting')}>
              Retry Verification
            </button>
          </div>
        )}

        {state === 'expired' && (
          <div className="animate-slide-up" style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-elevated)',
                color: 'var(--color-text-tertiary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-2)',
              }}
            >
              <Clock size={26} />
            </div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Session Timed Out
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px', marginBottom: '14px' }}>
              Security tokens automatically expire after 60 seconds.
            </p>
            <button
              className="macos-button"
              onClick={() => {
                setCountdown(60);
                setPairingState('waiting');
              }}
            >
              Generate New Code
            </button>
          </div>
        )}

        {state === 'rejected' && (
          <div className="animate-slide-up" style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-error-subtle)',
                color: 'var(--color-error)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-2)',
              }}
            >
              <XCircle size={26} />
            </div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Pairing Rejected
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px', marginBottom: '14px' }}>
              The connection request was declined.
            </p>
            <button className="macos-button" onClick={closeModal}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeSwitcher } from '../../components/common/ThemeSwitcher';
import { ArcCrossLogo } from '../../components/common/ArcCrossLogo';
import {
  Laptop,
  Radio,
  Eye,
  Sliders,
  Shield,
  Lock,
  Download,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, currentDevice, updateDeviceName, addToast } = useApp();
  const [localDevName, setLocalDevName] = useState(settings.deviceName);
  const [downloadPath, setDownloadPath] = useState(settings.defaultDownloadLocation);

  const handleSaveDeviceName = () => {
    if (localDevName.trim()) {
      updateDeviceName(currentDevice.id, localDevName.trim());
      updateSettings({ deviceName: localDevName.trim() });
    }
  };

  const handleSaveDownloadPath = () => {
    if (downloadPath.trim()) {
      updateSettings({ defaultDownloadLocation: downloadPath.trim() });
    }
  };

  const handleResetPairingKeys = () => {
    addToast({
      title: 'Pairing Keyset Reset',
      description: 'Local TLS certificates re-generated.',
      type: 'info',
    });
  };

  const handleCheckUpdates = () => {
    addToast({
      title: 'ArcCross is Up to Date',
      description: 'Running ArcCross v1.0.0 (Native Build).',
      type: 'success',
    });
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ paddingBottom: 'var(--space-2)', borderBottom: '0.5px solid var(--color-separator)' }}>
        <h1
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
          }}
        >
          System Settings
        </h1>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Hardware broadcasting, reception rules, and appearance preferences.
        </p>
      </div>

      {/* SECTION 1: General (macOS Inset Group) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1-5)' }}>
        <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', paddingLeft: 'var(--space-1)' }}>
          General
        </div>

        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Laptop size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Device Name
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Identity broadcast over local subnet
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                value={localDevName}
                onChange={(e) => setLocalDevName(e.target.value)}
                style={{
                  height: '26px',
                  padding: '0 8px',
                  borderRadius: 'var(--radius-control)',
                  backgroundColor: 'var(--color-elevated)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-xs)',
                  width: '180px',
                  outline: 'none',
                }}
              />
              <button
                className="macos-button"
                disabled={localDevName === currentDevice.name || !localDevName.trim()}
                onClick={handleSaveDeviceName}
              >
                Save
              </button>
            </div>
          </div>

          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Radio size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Discovery Mode
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Control who sees this device on the local network
                </div>
              </div>
            </div>

            <select
              value={settings.discoveryMode}
              onChange={(e) =>
                updateSettings({
                  discoveryMode: e.target.value as 'visible_all' | 'contacts' | 'paired_only',
                })
              }
              style={{
                height: '26px',
                padding: '0 8px',
                borderRadius: 'var(--radius-control)',
                backgroundColor: 'var(--color-elevated)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="visible_all">Visible to Everyone on Subnet</option>
              <option value="contacts">Known Endpoints Only</option>
              <option value="paired_only">Paired Devices Only</option>
            </select>
          </div>
        </div>
      </section>

      {/* SECTION 2: Appearance */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1-5)' }}>
        <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', paddingLeft: 'var(--space-1)' }}>
          Appearance
        </div>

        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Eye size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Theme Mode
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Light, Dark, or Match System appearance
                </div>
              </div>
            </div>

            <ThemeSwitcher size="sm" />
          </div>

          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Accent Color
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Brand tint for controls and highlights
                </div>
              </div>
            </div>

            <div className="macos-segmented-control">
              <button
                onClick={() => updateSettings({ accentColor: 'teal' })}
                className={`macos-segmented-button ${settings.accentColor === 'teal' ? 'active' : ''}`}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A8C83' }} />
                <span>Teal</span>
              </button>
              <button
                onClick={() => updateSettings({ accentColor: 'blue' })}
                className={`macos-segmented-button ${settings.accentColor === 'blue' ? 'active' : ''}`}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E3A5F' }} />
                <span>Deep Blue</span>
              </button>
            </div>
          </div>

          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Reduce Motion
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Minimize transition animations across views
                </div>
              </div>
            </div>

            <label className="macos-switch">
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
              />
              <span className="macos-switch-track" />
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 3: Receiving */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1-5)' }}>
        <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', paddingLeft: 'var(--space-1)' }}>
          Receiving Rules
        </div>

        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Manual Transfer Approval
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Prompt before accepting incoming file transfers
                </div>
              </div>
            </div>

            <label className="macos-switch">
              <input
                type="checkbox"
                checked={settings.requireTransferApproval}
                onChange={(e) => updateSettings({ requireTransferApproval: e.target.checked })}
              />
              <span className="macos-switch-track" />
            </label>
          </div>

          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Auto-Accept from Trusted Endpoints
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Receive directly if sender is cryptographically paired
                </div>
              </div>
            </div>

            <label className="macos-switch">
              <input
                type="checkbox"
                checked={settings.autoAcceptTrusted}
                onChange={(e) => updateSettings({ autoAcceptTrusted: e.target.checked })}
              />
              <span className="macos-switch-track" />
            </label>
          </div>

          <div className="macos-inset-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Download size={15} color="var(--color-teal)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  Save Destination
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                  Directory where received files will be placed
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                value={downloadPath}
                onChange={(e) => setDownloadPath(e.target.value)}
                style={{
                  height: '26px',
                  padding: '0 8px',
                  borderRadius: 'var(--radius-control)',
                  backgroundColor: 'var(--color-elevated)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  width: '180px',
                  outline: 'none',
                }}
              />
              <button
                className="macos-button"
                disabled={downloadPath === settings.defaultDownloadLocation || !downloadPath.trim()}
                onClick={handleSaveDownloadPath}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Privacy & Keys */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1-5)' }}>
        <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', paddingLeft: 'var(--space-1)' }}>
          Security & Cryptography
        </div>

        <div className="macos-inset-group">
          <div className="macos-inset-row">
            <div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                Subnet Direct Isolation
              </div>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                Zero cloud relays, zero analytics, zero external logging
              </div>
            </div>
            <span
              style={{
                fontSize: 'var(--text-2xs)',
                fontWeight: 600,
                padding: '2px 6px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--color-teal-subtle)',
                color: 'var(--color-teal)',
              }}
            >
              Zero Cloud
            </span>
          </div>

          <div className="macos-inset-row">
            <div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                Reset Ecosystem Keys
              </div>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                Revoke local TLS certificates and unpair all endpoints
              </div>
            </div>
            <button className="macos-button danger" onClick={handleResetPairingKeys}>
              Reset Keyset
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: About ArcCross */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1-5)' }}>
        <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', paddingLeft: 'var(--space-1)' }}>
          About ArcCross
        </div>

        <div className="macos-inset-group" style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ArcCrossLogo size={28} showText={true} />
            <button className="macos-button" onClick={handleCheckUpdates}>
              <RefreshCw size={12} />
              <span>Check for Updates</span>
            </button>
          </div>

          <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginTop: '10px' }}>
            ArcCross is a privacy-first, local-subnet device ecosystem crafted using native macOS interaction standards and Apple Human Interface Guidelines.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 'var(--space-3)',
              marginTop: 'var(--space-3)',
              borderTop: '0.5px solid var(--color-separator)',
              fontSize: 'var(--text-2xs)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            <span>ArcCross Web Client v1.0.0</span>
            <span>MIT License</span>
          </div>
        </div>
      </section>
    </div>
  );
};

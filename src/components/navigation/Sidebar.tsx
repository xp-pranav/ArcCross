import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Laptop,
  ArrowLeftRight,
  Settings as SettingsIcon,
  Sparkles,
  Radio,
  FolderDown,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ArcCrossLogo } from '../common/ArcCrossLogo';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentDevice, pairedDevices, transfers, openModal } = useApp();

  const activeTransfersCount = transfers.filter(
    (t) => t.status === 'transferring' || t.status === 'waiting'
  ).length;

  const onlinePairedCount = pairedDevices.filter((d) => d.connectionStatus === 'online').length;

  return (
    <aside className="macos-sidebar">
      {/* Top Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {/* ArcCross Brand Header */}
        <div style={{ padding: 'var(--space-2) var(--space-2-5) var(--space-3)' }}>
          <NavLink to="/" style={{ textDecoration: 'none' }} title="Return to ArcCross Website">
            <ArcCrossLogo size={26} showText={true} />
          </NavLink>
        </div>

        {/* Source List Group 1: WORKSPACE */}
        <div className="macos-sidebar-group-header">Workspace</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <NavLink
            to="/app"
            end
            className={({ isActive }) => `macos-sidebar-item ${isActive ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Laptop size={15} color="var(--color-teal)" />
              <span>Devices</span>
            </div>
            {onlinePairedCount > 0 && (
              <span
                style={{
                  fontSize: 'var(--text-2xs)',
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-elevated)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                {onlinePairedCount}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => openModal('add-device')}
            className="macos-sidebar-item"
            style={{ textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={15} color="var(--color-text-tertiary)" />
              <span>Pair New Device</span>
            </div>
            <ChevronRight size={13} color="var(--color-text-tertiary)" />
          </button>
        </nav>

        {/* Source List Group 2: ACTIVITY */}
        <div className="macos-sidebar-group-header" style={{ marginTop: 'var(--space-2)' }}>
          Activity
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <NavLink
            to="/app/transfers"
            className={({ isActive }) => `macos-sidebar-item ${isActive ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeftRight size={15} color="var(--color-deep-blue)" />
              <span>Transfers</span>
            </div>
            {activeTransfersCount > 0 && (
              <span
                className="animate-pulse-subtle"
                style={{
                  fontSize: 'var(--text-2xs)',
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-teal)',
                  color: 'var(--color-teal-contrast)',
                }}
              >
                {activeTransfersCount}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => openModal('transfer-completed')}
            className="macos-sidebar-item"
            style={{ textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderDown size={15} color="var(--color-text-tertiary)" />
              <span>Received Files</span>
            </div>
          </button>
        </nav>

        {/* Source List Group 3: CONFIGURATION */}
        <div className="macos-sidebar-group-header" style={{ marginTop: 'var(--space-2)' }}>
          System
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <NavLink
            to="/app/settings"
            className={({ isActive }) => `macos-sidebar-item ${isActive ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SettingsIcon size={15} color="var(--color-text-secondary)" />
              <span>Settings</span>
            </div>
          </NavLink>

          <NavLink
            to="/app/welcome"
            className={({ isActive }) => `macos-sidebar-item ${isActive ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={15} color="var(--color-text-secondary)" />
              <span>Setup Assistant</span>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Source List Section: Hardware Identity */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2-5)',
          paddingTop: 'var(--space-3)',
          borderTop: '0.5px solid var(--color-separator)',
        }}
      >
        {/* Current Machine Inset Box */}
        <div
          onClick={() => openModal('device-details', currentDevice)}
          className="macos-inset-row interactive"
          style={{
            padding: '8px 10px',
            borderRadius: 'var(--radius-control)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            cursor: 'pointer',
          }}
          title="Inspect local machine parameters"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-teal)',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentDevice.name}
              </div>
              <div style={{ fontSize: '0.625rem', color: 'var(--color-text-tertiary)' }}>
                Direct Subnet • Online
              </div>
            </div>
          </div>
          <Info size={13} color="var(--color-text-tertiary)" />
        </div>

        {/* Theme Segmented Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ThemeSwitcher size="sm" />
        </div>

        {/* Security Stamp */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.625rem',
            color: 'var(--color-text-muted)',
            padding: '0 4px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={11} color="var(--color-teal)" />
            TLS 1.3 Direct
          </span>
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

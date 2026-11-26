import React from 'react';
import { NavLink } from 'react-router-dom';
import { HardDrive, ArrowLeftRight, Settings as SettingsIcon, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNavigation: React.FC = () => {
  const { pairedDevices, transfers, openModal } = useApp();

  const activeTransfers = transfers.filter(
    (t) => t.status === 'transferring' || t.status === 'waiting'
  ).length;

  const onlineCount = pairedDevices.filter((d) => d.connectionStatus === 'online').length;

  return (
    <nav
      className="arccross-mobile-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: 'var(--glass-surface)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 'var(--z-sticky)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <NavLink
        to="/app"
        end
        style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: isActive ? 'var(--color-teal)' : 'var(--color-text-secondary)',
          textDecoration: 'none',
          fontSize: 'var(--text-xs)',
          fontWeight: isActive ? 600 : 500,
          position: 'relative',
        })}
      >
        <HardDrive size={20} />
        <span>Devices</span>
        {onlineCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-teal)',
            }}
          />
        )}
      </NavLink>

      <button
        onClick={() => openModal('add-device')}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-teal)',
          color: 'var(--color-teal-contrast)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-card)',
          cursor: 'pointer',
        }}
        title="Add Device"
      >
        <Plus size={20} />
      </button>

      <NavLink
        to="/app/transfers"
        style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: isActive ? 'var(--color-teal)' : 'var(--color-text-secondary)',
          textDecoration: 'none',
          fontSize: 'var(--text-xs)',
          fontWeight: isActive ? 600 : 500,
          position: 'relative',
        })}
      >
        <ArrowLeftRight size={20} />
        <span>Transfers</span>
        {activeTransfers > 0 && (
          <span
            className="animate-pulse-subtle"
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-teal)',
            }}
          />
        )}
      </NavLink>

      <NavLink
        to="/app/settings"
        style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: isActive ? 'var(--color-teal)' : 'var(--color-text-secondary)',
          textDecoration: 'none',
          fontSize: 'var(--text-xs)',
          fontWeight: isActive ? 600 : 500,
        })}
      >
        <SettingsIcon size={20} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

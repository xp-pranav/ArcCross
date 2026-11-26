import React from 'react';
import { ConnectionStatus, PairingStatus, TransferStatus, TrustStatus } from '../../types';

interface StatusBadgeProps {
  status: ConnectionStatus | PairingStatus | TransferStatus | TrustStatus | string;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'sm',
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      // Connection
      case 'online':
        return {
          dotColor: 'var(--color-teal)',
          bg: 'var(--color-teal-subtle)',
          color: 'var(--color-teal)',
          border: 'rgba(42, 140, 131, 0.25)',
          text: label || 'Online',
        };
      case 'offline':
        return {
          dotColor: 'var(--color-text-muted)',
          bg: 'var(--color-elevated)',
          color: 'var(--color-text-muted)',
          border: 'var(--color-border)',
          text: label || 'Offline',
        };
      case 'busy':
        return {
          dotColor: 'var(--color-warning)',
          bg: 'var(--color-warning-subtle)',
          color: 'var(--color-warning)',
          border: 'rgba(166, 93, 0, 0.25)',
          text: label || 'Busy',
        };

      // Pairing
      case 'paired':
        return {
          dotColor: 'var(--color-teal)',
          bg: 'var(--color-teal-subtle)',
          color: 'var(--color-teal)',
          border: 'rgba(42, 140, 131, 0.25)',
          text: label || 'Paired',
        };
      case 'available':
        return {
          dotColor: 'var(--color-deep-blue)',
          bg: 'var(--color-deep-blue-subtle)',
          color: 'var(--color-deep-blue)',
          border: 'rgba(30, 58, 95, 0.25)',
          text: label || 'Available',
        };

      // Trust
      case 'trusted':
        return {
          dotColor: 'var(--color-teal)',
          bg: 'var(--color-teal-subtle)',
          color: 'var(--color-teal)',
          border: 'rgba(42, 140, 131, 0.25)',
          text: label || 'Trusted',
        };

      // Transfer
      case 'completed':
        return {
          dotColor: 'var(--color-teal)',
          bg: 'var(--color-teal-subtle)',
          color: 'var(--color-teal)',
          border: 'rgba(42, 140, 131, 0.25)',
          text: label || 'Completed',
        };
      case 'transferring':
        return {
          dotColor: 'var(--color-teal)',
          bg: 'var(--color-teal-subtle)',
          color: 'var(--color-teal)',
          border: 'rgba(42, 140, 131, 0.25)',
          text: label || 'Transferring',
          pulsing: true,
        };
      case 'waiting':
        return {
          dotColor: 'var(--color-warning)',
          bg: 'var(--color-warning-subtle)',
          color: 'var(--color-warning)',
          border: 'rgba(166, 93, 0, 0.25)',
          text: label || 'Waiting',
          pulsing: true,
        };
      case 'interrupted':
        return {
          dotColor: 'var(--color-warning)',
          bg: 'var(--color-warning-subtle)',
          color: 'var(--color-warning)',
          border: 'rgba(166, 93, 0, 0.25)',
          text: label || 'Interrupted',
        };
      case 'failed':
        return {
          dotColor: 'var(--color-error)',
          bg: 'var(--color-error-subtle)',
          color: 'var(--color-error)',
          border: 'rgba(180, 35, 24, 0.25)',
          text: label || 'Failed',
        };
      case 'canceled':
        return {
          dotColor: 'var(--color-text-muted)',
          bg: 'var(--color-elevated)',
          color: 'var(--color-text-muted)',
          border: 'var(--color-border)',
          text: label || 'Canceled',
        };

      default:
        return {
          dotColor: 'var(--color-text-muted)',
          bg: 'var(--color-elevated)',
          color: 'var(--color-text-secondary)',
          border: 'var(--color-border)',
          text: label || status,
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: size === 'sm' ? '2px 8px' : '4px 10px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        fontSize: size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)',
        fontWeight: 500,
        lineHeight: 1.2,
        userSelect: 'none',
      }}
    >
      <span
        className={config.pulsing ? 'animate-pulse-subtle' : ''}
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: config.dotColor,
          flexShrink: 0,
        }}
      />
      {config.text}
    </span>
  );
};

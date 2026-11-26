import React from 'react';
import { Platform } from '../../types';
import { Laptop, Smartphone, Tablet, Terminal, Monitor } from 'lucide-react';

interface PlatformIconProps {
  platform: Platform;
  size?: number;
  className?: string;
  variant?: 'subtle' | 'solid' | 'badge';
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  size = 20,
  className = '',
  variant = 'subtle',
}) => {
  const getIcon = () => {
    switch (platform) {
      case 'macos':
        return <Laptop size={size} strokeWidth={1.75} />;
      case 'android':
        return <Smartphone size={size} strokeWidth={1.75} />;
      case 'ios':
        return <Tablet size={size} strokeWidth={1.75} />;
      case 'linux':
        return <Terminal size={size} strokeWidth={1.75} />;
      case 'windows':
      default:
        return <Monitor size={size} strokeWidth={1.75} />;
    }
  };

  const getLabel = () => {
    switch (platform) {
      case 'macos':
        return 'macOS';
      case 'android':
        return 'Android';
      case 'ios':
        return 'iOS / iPadOS';
      case 'linux':
        return 'Linux';
      case 'windows':
        return 'Windows';
      default:
        return platform;
    }
  };

  if (variant === 'badge') {
    return (
      <div
        className={`platform-badge ${className}`}
        title={getLabel()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 8px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-elevated)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--text-xs)',
          fontWeight: 500,
        }}
      >
        {getIcon()}
        <span>{getLabel()}</span>
      </div>
    );
  }

  return (
    <div
      className={`platform-icon ${className}`}
      title={getLabel()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 16,
        height: size + 16,
        borderRadius: 'var(--radius-control)',
        backgroundColor: variant === 'solid' ? 'var(--color-elevated)' : 'var(--color-deep-blue-subtle)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        flexShrink: 0,
      }}
    >
      {getIcon()}
    </div>
  );
};

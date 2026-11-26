import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 - 100
  status?: 'transferring' | 'completed' | 'interrupted' | 'failed' | 'waiting' | 'canceled';
  height?: number;
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status = 'transferring',
  height = 5,
  showPercent = false,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const getBarColor = () => {
    switch (status) {
      case 'completed':
        return 'var(--color-teal)';
      case 'failed':
        return 'var(--color-error)';
      case 'interrupted':
      case 'waiting':
        return 'var(--color-warning)';
      case 'canceled':
        return 'var(--color-text-muted)';
      case 'transferring':
      default:
        return 'var(--color-teal)';
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {showPercent && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>Progress</span>
          <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
            {clampedProgress}%
          </span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'var(--color-elevated)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '1px solid var(--color-border-subtle)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${clampedProgress}%`,
            height: '100%',
            backgroundColor: getBarColor(),
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};

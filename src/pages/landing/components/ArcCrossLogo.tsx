import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'monochrome';
}

export const ArcCrossLogo: React.FC<LogoProps> = ({
  size = 32,
  showText = true,
  className = '',
  variant = 'default',
}) => {
  const isMonochrome = variant === 'monochrome';

  return (
    <div
      className={`arccross-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size > 24 ? '12px' : '8px',
        userSelect: 'none',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <circle
          cx="20"
          cy="20"
          r="17"
          stroke="var(--color-border)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.8"
        />
        <path
          d="M8 24C7 16 13 8 21 8C27 8 32 12 33 18"
          stroke={isMonochrome ? 'currentColor' : 'var(--color-deep-blue)'}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M32 16C33 24 27 32 19 32C13 32 8 28 7 22"
          stroke={isMonochrome ? 'currentColor' : 'var(--color-teal)'}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="4.5" fill={isMonochrome ? 'currentColor' : 'var(--color-teal)'} />
        <circle cx="20" cy="20" r="2" fill="var(--color-canvas)" />
      </svg>

      {showText && variant !== 'compact' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: size > 28 ? '1.125rem' : '0.9375rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            Arc<span style={{ color: 'var(--color-teal)' }}>Cross</span>
          </span>
          {size > 28 && (
            <span
              style={{
                fontSize: '0.6875rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginTop: '2px',
              }}
            >
              Direct Ecosystem
            </span>
          )}
        </div>
      )}
    </div>
  );
};

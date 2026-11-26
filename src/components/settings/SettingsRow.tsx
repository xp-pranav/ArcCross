import React, { ReactNode } from 'react';

interface SettingsRowProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  isLast?: boolean;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  title,
  description,
  icon,
  children,
  isLast = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        borderBottom: isLast ? 'none' : '1px solid var(--color-border-subtle)',
        gap: 'var(--space-4)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        {icon && (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-elevated)',
              color: 'var(--color-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                marginTop: '2px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
};

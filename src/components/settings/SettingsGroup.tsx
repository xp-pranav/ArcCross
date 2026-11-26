import React, { ReactNode } from 'react';

interface SettingsGroupProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({ title, description, children }) => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <div>
        <h3
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)',
              marginTop: '2px',
            }}
          >
            {description}
          </p>
        )}
      </div>

      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {children}
      </div>
    </section>
  );
};

import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-teal)',
          color: 'var(--color-teal-contrast)',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: 'var(--shadow-subtle)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid transparent',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-error-subtle)',
          color: 'var(--color-error)',
          border: '1px solid rgba(180, 35, 24, 0.25)',
        };
      case 'secondary':
      default:
        return {
          backgroundColor: 'var(--color-elevated)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          height: '32px',
          padding: '0 12px',
          fontSize: 'var(--text-xs)',
          gap: '6px',
        };
      case 'lg':
        return {
          height: '46px',
          padding: '0 20px',
          fontSize: 'var(--text-base)',
          gap: '10px',
        };
      case 'md':
      default:
        return {
          height: '38px',
          padding: '0 16px',
          fontSize: 'var(--text-sm)',
          gap: '8px',
        };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`arccross-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-control)',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all var(--duration-fast) var(--ease-apple)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin-slow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ marginRight: children ? '4px' : 0 }}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}
      {!isLoading && icon && iconPosition === 'left' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
      {!isLoading && icon && iconPosition === 'right' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
    </button>
  );
};

import React, { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'secondary' | 'outline' | 'danger';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  className = '',
  disabled,
  style,
  ...props
}) => {
  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { width: '28px', height: '28px', padding: '4px' };
      case 'lg':
        return { width: '42px', height: '42px', padding: '8px' };
      case 'md':
      default:
        return { width: '34px', height: '34px', padding: '6px' };
    }
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'var(--color-elevated)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-error-subtle)',
          color: 'var(--color-error)',
          border: '1px solid transparent',
        };
      case 'ghost':
      default:
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid transparent',
        };
    }
  };

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      className={`arccross-icon-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-control)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'all var(--duration-fast) var(--ease-apple)',
        ...getSizeStyles(),
        ...getVariantStyles(),
        ...style,
      }}
      {...props}
    >
      {icon}
    </button>
  );
};

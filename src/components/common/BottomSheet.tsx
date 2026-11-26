import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-sheet)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: -1,
        }}
      />

      {/* Sheet Container */}
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '85vh',
          backgroundColor: 'var(--color-sheet-bg)',
          borderTopLeftRadius: 'var(--radius-sheet)',
          borderTopRightRadius: 'var(--radius-sheet)',
          border: '1px solid var(--color-border)',
          borderBottom: 'none',
          boxShadow: 'var(--shadow-sheet)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        }}
      >
        {/* Drag Handle Capsule */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
            paddingBottom: '2px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '4px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-border)',
            }}
          />
        </div>

        {/* Sheet Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-2) var(--space-4) var(--space-3)',
            borderBottom: '0.5px solid var(--color-separator)',
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-secondary)', marginTop: '1px' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'var(--color-elevated)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 18px', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

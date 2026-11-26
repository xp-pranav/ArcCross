import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '500px',
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'opacity var(--duration-fast) var(--ease-apple)',
          zIndex: -1,
        }}
      />

      {/* macOS Sheet Card */}
      <div
        className="animate-sheet-drop"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
          maxHeight: '90vh',
          backgroundColor: 'var(--color-sheet-bg)',
          borderRadius: 'var(--radius-sheet)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sheet)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* macOS Sheet Titlebar */}
        {(title || showCloseButton) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px 12px',
              borderBottom: '0.5px solid var(--color-separator)',
              userSelect: 'none',
            }}
          >
            <div>
              {title && (
                <h2
                  style={{
                    fontSize: 'var(--text-md)',
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  style={{
                    fontSize: 'var(--text-2xs)',
                    color: 'var(--color-text-secondary)',
                    marginTop: '1px',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {showCloseButton && (
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
                  transition: 'all var(--duration-instant) ease',
                }}
                title="Close sheet"
              >
                <X size={13} />
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div
          style={{
            padding: '18px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

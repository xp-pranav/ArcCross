import React, { useRef, useState } from 'react';

interface PairingCodeProps {
  code?: string;
  isInput?: boolean;
  onCodeComplete?: (code: string) => void;
}

export const PairingCode: React.FC<PairingCodeProps> = ({
  code = '482913',
  isInput = false,
  onCodeComplete,
}) => {
  const [digits, setDigits] = useState<string[]>(
    isInput ? ['', '', '', '', '', ''] : code.replace(/\s+/g, '').slice(0, 6).split('')
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, val: string) => {
    if (!isInput) return;
    const sanitized = val.replace(/\D/g, '').slice(-1);
    const updated = [...digits];
    updated[index] = sanitized;
    setDigits(updated);

    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = updated.join('');
    if (fullCode.length === 6 && onCodeComplete) {
      onCodeComplete(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isInput) return;
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        userSelect: isInput ? 'auto' : 'all',
      }}
    >
      {/* First 3 digits */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[0, 1, 2].map((i) =>
          isInput ? (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[i] || ''}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: '44px',
                height: '52px',
                borderRadius: 'var(--radius-control)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-primary)',
              }}
            />
          ) : (
            <div
              key={i}
              style={{
                width: '42px',
                height: '48px',
                borderRadius: 'var(--radius-control)',
                backgroundColor: 'var(--color-elevated)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-primary)',
              }}
            >
              {digits[i] || '•'}
            </div>
          )
        )}
      </div>

      {/* Separator dash */}
      <div
        style={{
          width: '8px',
          height: '2px',
          backgroundColor: 'var(--color-text-muted)',
          borderRadius: '1px',
          margin: '0 4px',
        }}
      />

      {/* Second 3 digits */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[3, 4, 5].map((i) =>
          isInput ? (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[i] || ''}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: '44px',
                height: '52px',
                borderRadius: 'var(--radius-control)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-primary)',
              }}
            />
          ) : (
            <div
              key={i}
              style={{
                width: '42px',
                height: '48px',
                borderRadius: 'var(--radius-control)',
                backgroundColor: 'var(--color-elevated)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-primary)',
              }}
            >
              {digits[i] || '•'}
            </div>
          )
        )}
      </div>
    </div>
  );
};

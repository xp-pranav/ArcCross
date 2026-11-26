import React from 'react';

interface QRCodePanelProps {
  value: string;
  size?: number;
  caption?: string;
}

export const QRCodePanel: React.FC<QRCodePanelProps> = ({
  value,
  size = 200,
  caption = 'Scan using camera or another ArcCross device',
}) => {
  return (
    <div
      data-qr-payload={value}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* High-fidelity stylized SVG QR code with ArcCross center glyph */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: '6px' }}
      >
        {/* Background */}
        <rect width="160" height="160" fill="#FFFFFF" rx="4" />

        {/* Top-Left Finder */}
        <rect x="12" y="12" width="40" height="40" rx="6" stroke="#17212B" strokeWidth="6" fill="none" />
        <rect x="22" y="22" width="20" height="20" rx="3" fill="#17212B" />

        {/* Top-Right Finder */}
        <rect x="108" y="12" width="40" height="40" rx="6" stroke="#17212B" strokeWidth="6" fill="none" />
        <rect x="118" y="22" width="20" height="20" rx="3" fill="#17212B" />

        {/* Bottom-Left Finder */}
        <rect x="12" y="108" width="40" height="40" rx="6" stroke="#17212B" strokeWidth="6" fill="none" />
        <rect x="22" y="118" width="20" height="20" rx="3" fill="#17212B" />

        {/* Timing Patterns */}
        <path d="M58 20H102M58 26H102M58 32H102" stroke="#17212B" strokeWidth="3" strokeDasharray="5 5" />
        <path d="M20 58V102M26 58V102M32 58V102" stroke="#17212B" strokeWidth="3" strokeDasharray="5 5" />

        {/* Dense Data Patterns */}
        <rect x="60" y="42" width="8" height="8" fill="#17212B" />
        <rect x="74" y="42" width="14" height="8" fill="#17212B" />
        <rect x="94" y="42" width="8" height="8" fill="#17212B" />

        <rect x="42" y="60" width="8" height="8" fill="#17212B" />
        <rect x="42" y="74" width="8" height="14" fill="#17212B" />
        <rect x="42" y="94" width="8" height="8" fill="#17212B" />

        <rect x="110" y="60" width="14" height="8" fill="#17212B" />
        <rect x="130" y="60" width="8" height="8" fill="#17212B" />
        <rect x="110" y="74" width="8" height="12" fill="#17212B" />
        <rect x="124" y="74" width="14" height="8" fill="#17212B" />
        <rect x="110" y="92" width="8" height="8" fill="#17212B" />
        <rect x="124" y="92" width="14" height="8" fill="#17212B" />

        <rect x="60" y="110" width="8" height="14" fill="#17212B" />
        <rect x="74" y="110" width="14" height="8" fill="#17212B" />
        <rect x="94" y="110" width="8" height="14" fill="#17212B" />

        <rect x="60" y="130" width="14" height="8" fill="#17212B" />
        <rect x="80" y="130" width="8" height="8" fill="#17212B" />
        <rect x="94" y="130" width="8" height="8" fill="#17212B" />
        <rect x="108" y="124" width="16" height="14" fill="#17212B" />
        <rect x="130" y="124" width="8" height="14" fill="#17212B" />

        {/* Center Logo Shield with ArcCross Emblem */}
        <circle cx="80" cy="80" r="22" fill="#FFFFFF" stroke="#D9E0E7" strokeWidth="2" />
        <circle cx="80" cy="80" r="17" fill="#0D1117" />
        {/* Emblem */}
        <path d="M72 82C71 76 75 72 80 72C84 72 87 75 88 79" stroke="#32649B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M88 78C89 84 85 88 80 88C76 88 73 85 72 81" stroke="#5CC8BC" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="80" r="2.5" fill="#5CC8BC" />
      </svg>

      {caption && (
        <span
          style={{
            fontSize: 'var(--text-xs)',
            color: '#5B6570',
            marginTop: 'var(--space-3)',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {caption}
        </span>
      )}
    </div>
  );
};

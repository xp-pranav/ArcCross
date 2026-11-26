import React from 'react';

export type HardwareFinish = 'graphite' | 'blue' | 'teal' | 'dark';

interface HardwareProps {
  children: React.ReactNode;
  dark?: boolean;
  finish?: HardwareFinish;
  className?: string;
  style?: React.CSSProperties;
}

function getFinishClass(prefix: string, dark: boolean, finish?: HardwareFinish): string {
  const effective = finish ?? (dark ? 'dark' : 'graphite');
  if (effective === 'dark') return `${prefix}--dark`;
  if (effective === 'teal') return `${prefix}--teal`;
  if (effective === 'blue') return `${prefix}--blue`;
  return '';
}

export const LaptopHardware: React.FC<HardwareProps> = ({
  children,
  dark = false,
  finish,
  className = '',
  style,
}) => {
  const finishClass = getFinishClass('hw-laptop', dark, finish);
  return (
    <div
      className={`hw-laptop ${finishClass} ${className}`.trim()}
      style={style}
    >
      <div className="hw-laptop-lid">
        <div className="hw-laptop-notch" aria-hidden="true">
          <span className="hw-laptop-cam" />
        </div>
        <div className="hw-laptop-screen">
          {children}
          <div className="hw-laptop-glare" aria-hidden="true" />
        </div>
      </div>
      <div className="hw-laptop-base" aria-hidden="true">
        <div className="hw-laptop-lip" />
      </div>
    </div>
  );
};

export const AndroidPhoneHardware: React.FC<HardwareProps> = ({
  children,
  dark = false,
  finish,
  className = '',
  style,
}) => {
  const finishClass = getFinishClass('hw-phone', dark, finish);
  return (
    <div
      className={`hw-phone ${finishClass} ${className}`.trim()}
      style={style}
    >
      <div className="hw-phone-screen">
        <div className="hw-phone-punch" aria-hidden="true" />
        {children}
        <div className="hw-phone-glare" aria-hidden="true" />
      </div>
    </div>
  );
};

interface FilePacketPillProps {
  name: string;
  size: string;
  accent?: string;
}

export const FilePacketPill: React.FC<FilePacketPillProps> = ({
  name,
  size,
  accent = '#0071E3',
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.86)',
      backdropFilter: 'saturate(180%) blur(18px)',
      WebkitBackdropFilter: 'saturate(180%) blur(18px)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow:
        '0 14px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
      whiteSpace: 'nowrap',
    }}
  >
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: `${accent}15`,
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}
    >
      KEY
    </div>
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1D1D1F', lineHeight: 1.2 }}>
        {name}
      </div>
      <div style={{ fontSize: 11, color: '#6E6E73', lineHeight: 1.2 }}>{size}</div>
    </div>
  </div>
);

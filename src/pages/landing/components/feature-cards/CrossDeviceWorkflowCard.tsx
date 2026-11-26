import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Copy, Laptop, Smartphone, Tablet } from 'lucide-react';
import { LiquidGlassCard } from '../LiquidGlassCard';
import { useLandingTheme } from '../../LandingThemeContext';
import { DemoButtons } from './DemoButtons';

const WORKFLOWS = [
  { id: 'handoff', label: 'Project Handoff', file: 'Product_Brief_v3.pdf', status: 'Synced to 3 devices' },
  { id: 'clipboard', label: 'Shared Note', file: 'Meeting notes copied', status: 'Ready on Tablet & Phone' },
  { id: 'media', label: 'Media Drop', file: 'Studio_Photos_RAW (18)', status: 'Delivered to Mac & Tab' },
];

const DEVICES = [
  { name: 'MacBook Pro', icon: <Laptop size={16} /> },
  { name: 'Galaxy Tab', icon: <Tablet size={16} /> },
  { name: 'Pixel 9', icon: <Smartphone size={16} /> },
];

export const CrossDeviceWorkflowCard: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();
  const [workflowIdx, setWorkflowIdx] = useState(0);
  const [hostIdx, setHostIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);

  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#A8AEBA' : '#48484D';
  const blueTint = isDark ? '#60B2FF' : '#0071E3';
  const tealTint = isDark ? '#4ADBC8' : '#1D7F72';

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setWorkflowIdx((prev) => (prev + 1) % WORKFLOWS.length);
      setHostIdx((prev) => (prev + 1) % DEVICES.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const current = WORKFLOWS[workflowIdx];

  return (
    <LiquidGlassCard className="ac-feature-card" aria-label="Cross-device Workflow">
      <div className="ac-feature-card-visual">
        <div className="ac-feature-card-visual-inner">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {WORKFLOWS.map((wf, idx) => {
              const active = idx === workflowIdx;
              return (
                <button
                  key={wf.id}
                  type="button"
                  onClick={() => {
                    setWorkflowIdx(idx);
                    setHostIdx(idx % DEVICES.length);
                    setIsPlaying(false);
                  }}
                  style={{
                    height: 30,
                    padding: '0 12px',
                    borderRadius: 9999,
                    border: active
                      ? `1px solid ${isDark ? '#F5F5F7' : '#1D1D1F'}`
                      : isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.9)',
                    background: active
                      ? (isDark ? '#F5F5F7' : '#1D1D1F')
                      : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.58)'),
                    color: active
                      ? (isDark ? '#1D1D1F' : '#FFFFFF')
                      : textSecondary,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease',
                  }}
                >
                  {wf.label}
                </button>
              );
            })}
          </div>

          <div className="ac-card-three-col-grid">
            {DEVICES.map((dev, i) => {
              const isHost = i === hostIdx;
              return (
                <motion.button
                  key={dev.name}
                  type="button"
                  onClick={() => {
                    setHostIdx(i);
                    setIsPlaying(false);
                  }}
                  animate={prefersReducedMotion ? undefined : { y: isHost ? -4 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  style={{
                    textAlign: 'left',
                    background: isDark ? 'rgba(24, 30, 44, 0.62)' : 'rgba(255, 255, 255, 0.58)',
                    backdropFilter: 'saturate(200%) blur(20px)',
                    WebkitBackdropFilter: 'saturate(200%) blur(20px)',
                    borderRadius: 18,
                    padding: 16,
                    border: isHost
                      ? '1.5px solid rgba(0, 113, 227, 0.6)'
                      : isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(255, 255, 255, 0.92)',
                    boxShadow: isHost
                      ? '0 14px 30px rgba(0, 113, 227, 0.16), inset 0 1px 0 rgba(255,255,255,0.85)'
                      : isDark
                        ? '0 10px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)'
                        : '0 8px 20px rgba(15, 35, 65, 0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                    }}
                  >
                    <span style={{ color: textPrimary }}>{dev.icon}</span>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: isHost ? blueTint : tealTint,
                      }}
                    >
                      {isHost ? 'Host' : 'Synced'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary, marginBottom: 6 }}>
                    {dev.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: textSecondary,
                      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.74)',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                      padding: '6px 8px',
                      borderRadius: 9,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Copy size={11} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {current.file}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 12,
              fontWeight: 600,
              color: tealTint,
              textAlign: 'center',
            }}
          >
            {current.status} · Click any device to switch host
          </div>
        </div>
      </div>

      <div className="ac-feature-card-footer">
        <div style={{ maxWidth: 460 }}>
          <h3 className="ac-feature-heading" style={{ marginBottom: 8 }}>
            Cross-device Workflow
          </h3>
          <p className="ac-intro-copy" style={{ fontSize: 16 }}>
            Move effortlessly across laptop, tablet, and Android phone. Start drafting on one screen and pick up assets instantly on the next.
          </p>
        </div>

        <DemoButtons
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onReplay={() => {
            setWorkflowIdx(0);
            setHostIdx(0);
            setIsPlaying(true);
          }}
        />
      </div>
    </LiquidGlassCard>
  );
};

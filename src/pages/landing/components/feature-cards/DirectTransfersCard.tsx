import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Check, FileText, Film, FolderArchive, Laptop, Send, Smartphone } from 'lucide-react';
import { LiquidGlassCard } from '../LiquidGlassCard';
import { useLandingTheme } from '../../LandingThemeContext';
import { DemoButtons } from './DemoButtons';

const PAYLOADS = [
  { id: 'keynote', name: 'Launch_Deck.key', size: '142 MB', rate: '48.6 MB/s', icon: <FileText size={14} /> },
  { id: 'video', name: 'Product_Reel_4K.mov', size: '640 MB', rate: '54.2 MB/s', icon: <Film size={14} /> },
  { id: 'zip', name: 'Raw_Stills_Batch.zip', size: '1.2 GB', rate: '61.0 MB/s', icon: <FolderArchive size={14} /> },
];

export const DirectTransfersCard: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [progress, setProgress] = useState(prefersReducedMotion ? 100 : 34);
  const progressRef = useRef(prefersReducedMotion ? 100 : 34);

  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#A8AEBA' : '#48484D';
  const blueTint = isDark ? '#60B2FF' : '#0071E3';
  const tealTint = isDark ? '#4ADBC8' : '#1D7F72';

  useEffect(() => {
    if (!isPlaying) return;
    let frameId: number;
    let lastTime = performance.now();
    let holdUntil = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (now >= holdUntil) {
        let next = progressRef.current + dt * 38;
        if (next >= 100) {
          if (progressRef.current < 100) {
            next = 100;
            holdUntil = now + 1100;
          } else {
            next = 0;
          }
        }
        progressRef.current = next;
        setProgress(next);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const handleSelectPayload = (idx: number) => {
    setSelectedIdx(idx);
    const next = prefersReducedMotion ? 100 : 8;
    progressRef.current = next;
    setProgress(next);
    setIsPlaying(!prefersReducedMotion);
  };

  const handleReplay = () => {
    progressRef.current = 0;
    setProgress(0);
    setIsPlaying(true);
  };

  const payload = PAYLOADS[selectedIdx];
  const displayPct = Math.round(progress);
  const isDone = displayPct >= 100;

  return (
    <LiquidGlassCard className="ac-feature-card" aria-label="Direct Transfers">
      <div className="ac-feature-card-visual">
        <div className="ac-feature-card-visual-inner">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              {PAYLOADS.map((item, idx) => {
                const active = idx === selectedIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectPayload(idx)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      height: 30,
                      padding: '0 12px',
                      borderRadius: 9999,
                      border: active
                        ? `1px solid ${blueTint}`
                        : isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.9)',
                      background: active
                        ? 'rgba(0, 113, 227, 0.16)'
                        : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255, 255, 255, 0.56)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      color: active ? blueTint : textSecondary,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleReplay}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                height: 28,
                padding: '0 11px',
                borderRadius: 9999,
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.92)',
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.68)',
                color: blueTint,
                fontSize: 11.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Send size={11} />
              <span>Send</span>
            </button>
          </div>

          <div className="ac-card-transfer-grid">
            <div
              style={{
                background: isDark ? 'rgba(24, 30, 44, 0.62)' : 'rgba(255, 255, 255, 0.58)',
                backdropFilter: 'saturate(210%) blur(20px)',
                WebkitBackdropFilter: 'saturate(210%) blur(20px)',
                borderRadius: 18,
                border: isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(255, 255, 255, 0.94)',
                padding: 16,
                boxShadow: isDark
                  ? '0 12px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)'
                  : '0 10px 26px rgba(15, 35, 65, 0.08), inset 0 1.5px 0 rgba(255,255,255,0.98)',
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                    border: isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: textPrimary,
                  }}
                >
                  <Laptop size={16} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>MacBook Pro</div>
                  <div style={{ fontSize: 11, color: textSecondary }}>Sending · {payload.rate}</div>
                </div>
              </div>
              <div
                style={{
                  padding: '9px 11px',
                  borderRadius: 11,
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255, 255, 255, 0.72)',
                  border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.04)',
                  fontSize: 12,
                  fontWeight: 500,
                  color: textPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {payload.name}
                </span>
                <span style={{ color: textSecondary, flexShrink: 0 }}>{payload.size}</span>
              </div>
            </div>

            <div className="ac-card-stream-track">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 5,
                  borderRadius: 99,
                  background: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    borderRadius: 99,
                    background: isDone ? '#30B8A6' : 'linear-gradient(90deg, #0071E3, #30B8A6)',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isDone ? tealTint : blueTint,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {isDone ? 'Complete' : `${displayPct}%`}
              </span>
            </div>

            <div
              style={{
                background: isDark ? 'rgba(24, 30, 44, 0.62)' : 'rgba(255, 255, 255, 0.58)',
                backdropFilter: 'saturate(210%) blur(20px)',
                WebkitBackdropFilter: 'saturate(210%) blur(20px)',
                borderRadius: 18,
                border: isDone
                  ? '1.5px solid rgba(48, 184, 166, 0.65)'
                  : isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(255, 255, 255, 0.94)',
                padding: 16,
                boxShadow: isDark
                  ? '0 12px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)'
                  : '0 10px 26px rgba(15, 35, 65, 0.08), inset 0 1.5px 0 rgba(255,255,255,0.98)',
                transition: 'border-color 220ms ease',
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: 'rgba(48, 184, 166, 0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: tealTint,
                  }}
                >
                  <Smartphone size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>Pixel 9</div>
                  <div style={{ fontSize: 11, color: textSecondary }}>Android · Local Wi-Fi</div>
                </div>
              </div>
              <div
                style={{
                  padding: '9px 11px',
                  borderRadius: 11,
                  background: isDone ? 'rgba(48, 184, 166, 0.16)' : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255, 255, 255, 0.72)'),
                  fontSize: 12,
                  fontWeight: 600,
                  color: isDone ? tealTint : textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {isDone ? (
                  <>
                    <Check size={14} strokeWidth={2.5} />
                    <span>Saved to Downloads</span>
                  </>
                ) : (
                  <span>Receiving directly...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ac-feature-card-footer">
        <div style={{ maxWidth: 460 }}>
          <h3 className="ac-feature-heading" style={{ marginBottom: 8 }}>
            Direct Transfers
          </h3>
          <p className="ac-intro-copy" style={{ fontSize: 16 }}>
            Send large presentations, RAW video, or entire project folders straight from your laptop to your Android phone at local network speeds.
          </p>
        </div>

        <DemoButtons
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onReplay={handleReplay}
        />
      </div>
    </LiquidGlassCard>
  );
};

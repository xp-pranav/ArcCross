import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CloudOff, Laptop, Server, Smartphone } from 'lucide-react';
import { LiquidGlassCard } from '../LiquidGlassCard';
import { useLandingTheme } from '../../LandingThemeContext';
import { DemoButtons } from './DemoButtons';

export const PrivacyFirstCard: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();
  const [mode, setMode] = useState<'direct' | 'cloud'>('direct');
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [tick, setTick] = useState(prefersReducedMotion ? 50 : 0);
  const tickRef = useRef(prefersReducedMotion ? 50 : 0);

  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#A8AEBA' : '#48484D';
  const blueTint = isDark ? '#60B2FF' : '#0071E3';
  const tealTint = isDark ? '#4ADBC8' : '#1D7F72';

  useEffect(() => {
    if (!isPlaying) return;
    let frameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const speed = mode === 'direct' ? 42 : 24;
      tickRef.current = (tickRef.current + dt * speed) % 100;
      setTick(tickRef.current);
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, mode]);

  const handleReplay = () => {
    tickRef.current = 0;
    setTick(0);
    setIsPlaying(true);
  };

  return (
    <LiquidGlassCard className="ac-feature-card" aria-label="Privacy First">
      <div className="ac-feature-card-visual">
        <div className="ac-feature-card-visual-inner">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                padding: 3,
                borderRadius: 9999,
                background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.56)',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.9)',
                backdropFilter: 'blur(14px)',
              }}
            >
              {(['direct', 'cloud'] as const).map((option) => {
                const selected = mode === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setMode(option);
                      tickRef.current = 0;
                      setTick(0);
                    }}
                    style={{
                      position: 'relative',
                      height: 28,
                      padding: '0 14px',
                      borderRadius: 9999,
                      border: 'none',
                      background: 'transparent',
                      color: selected ? '#1D1D1F' : textSecondary,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      zIndex: 1,
                    }}
                  >
                    {selected && (
                      <motion.span
                        layoutId="ac-privacy-card-mode"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.1 }
                            : { type: 'spring', bounce: 0.15, duration: 0.34 }
                        }
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 9999,
                          background: '#FFFFFF',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          zIndex: -1,
                        }}
                      />
                    )}
                    {option === 'direct' ? 'ArcCross Direct' : 'Cloud Upload'}
                  </button>
                );
              })}
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: mode === 'direct' ? tealTint : textSecondary,
              }}
            >
              <CloudOff size={14} />
              {mode === 'direct' ? '0 bytes uploaded to cloud' : 'Detours via remote servers'}
            </span>
          </div>

          <div
            style={{
              position: 'relative',
              background: isDark ? 'rgba(24, 30, 44, 0.62)' : 'rgba(255, 255, 255, 0.58)',
              backdropFilter: 'saturate(200%) blur(20px)',
              WebkitBackdropFilter: 'saturate(200%) blur(20px)',
              borderRadius: 18,
              border: isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(255,255,255,0.94)',
              boxShadow: isDark
                ? '0 12px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 10px 26px rgba(15, 35, 65, 0.08), inset 0 1.5px 0 rgba(255,255,255,0.98)',
              padding: '26px 22px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 22,
                opacity: mode === 'direct' ? 0.42 : 1,
                transition: 'opacity 240ms ease',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '6px 12px',
                  borderRadius: 9999,
                  border: mode === 'cloud' ? `1px solid ${blueTint}` : '1px dashed #8E94A0',
                  background: mode === 'cloud' ? 'rgba(0, 113, 227, 0.14)' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(245, 245, 247, 0.72)'),
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: mode === 'cloud' ? blueTint : textSecondary,
                }}
              >
                <Server size={13} />
                <span>
                  {mode === 'direct'
                    ? 'Remote cloud server (bypassed)'
                    : 'Remote cloud server (upload + download)'}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.86)',
                    border: isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.06)',
                    color: textPrimary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Laptop size={18} />
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>Laptop</span>
              </div>

              <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: 2.5,
                    background:
                      mode === 'direct' ? 'rgba(48, 184, 166, 0.45)' : (isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0, 0, 0, 0.1)'),
                    borderRadius: 99,
                  }}
                />
                {mode === 'direct' && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${tick}%`,
                      transform: 'translateX(-50%)',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: '#30B8A6',
                      boxShadow: '0 0 0 4px rgba(48, 184, 166, 0.28)',
                    }}
                  />
                )}
                {mode === 'cloud' && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${tick}%`,
                      top: tick < 50 ? `${-tick * 0.62}px` : `${-(100 - tick) * 0.62}px`,
                      transform: 'translateX(-50%)',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: blueTint,
                      boxShadow: '0 0 0 4px rgba(0, 113, 227, 0.22)',
                    }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>Android</span>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(48, 184, 166, 0.18)',
                    color: tealTint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Smartphone size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ac-feature-card-footer">
        <div style={{ maxWidth: 460 }}>
          <h3 className="ac-feature-heading" style={{ marginBottom: 8 }}>
            Privacy First
          </h3>
          <p className="ac-intro-copy" style={{ fontSize: 16 }}>
            Your files move straight from one device to the other. Nothing is uploaded to an external cloud bucket, and no account is required.
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

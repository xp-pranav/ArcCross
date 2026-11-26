import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Check, Film, Play, RotateCcw } from 'lucide-react';
import {
  AndroidPhoneHardware,
  HardwareFinish,
  LaptopHardware,
} from '../components';
import { useLandingTheme } from '../LandingThemeContext';

const STAGES = ['Laptop ready', 'Android paired', 'Transferring', 'Delivered'];

const FINISH_OPTIONS: { id: HardwareFinish; label: string; swatch: string }[] = [
  { id: 'graphite', label: 'Graphite', swatch: '#2b2c30' },
  { id: 'blue', label: 'Pacific Blue', swatch: '#0071E3' },
  { id: 'teal', label: 'Studio Teal', swatch: '#30B8A6' },
  { id: 'dark', label: 'Space Black', swatch: '#0d0d10' },
];

export const ScrollExperienceSection: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const disableStickyScroll = Boolean(prefersReducedMotion) || isMobile;

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.7,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(disableStickyScroll ? 100 : 0);
  const [stageIdx, setStageIdx] = useState(disableStickyScroll ? 3 : 0);
  const [manualFinish, setManualFinish] = useState<HardwareFinish | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (disableStickyScroll) {
      setPercent(100);
      setStageIdx(3);
    }
  }, [disableStickyScroll]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (disableStickyScroll) return;

    const normalized = Math.max(0, Math.min(1, (latest - 0.34) / 0.44));
    setPercent(Math.round(normalized * 100));

    if (latest < 0.22) setStageIdx(0);
    else if (latest < 0.4) setStageIdx(1);
    else if (latest < 0.78) setStageIdx(2);
    else setStageIdx(3);
  });

  // Fullscreen-to-framed transition on scroll (light + dark aware)
  const frameScale = useTransform(smoothProgress, [0, 0.24], [1.05, 1]);
  const frameBgLight = useTransform(
    smoothProgress,
    [0, 0.28, 0.65, 1],
    ['#FFFFFF', '#EAF1FA', '#E2EEFB', '#E1F3EE']
  );
  const frameBgDark = useTransform(
    smoothProgress,
    [0, 0.28, 0.65, 1],
    ['#0A0F1A', '#0E1626', '#0D1C30', '#0B1E22']
  );

  // Layered device assembly
  const laptopX = useTransform(smoothProgress, [0, 0.22], [-44, 0]);
  const laptopOpacity = useTransform(smoothProgress, [0, 0.16], [0.55, 1]);

  const phoneX = useTransform(smoothProgress, [0.18, 0.38], [62, 0]);
  const phoneOpacity = useTransform(smoothProgress, [0.18, 0.34], [0, 1]);

  const packetX = useTransform(smoothProgress, [0.34, 0.76], [-124, 124]);
  const packetY = useTransform(smoothProgress, [0.34, 0.55, 0.76], [8, -22, 8]);
  const packetOpacity = useTransform(smoothProgress, [0.3, 0.36, 0.74, 0.82], [0, 1, 1, 0]);

  const progressScale = useTransform(smoothProgress, [0.34, 0.78], [0, 1]);
  const completedOpacity = useTransform(smoothProgress, [0.76, 0.88], [0, 1]);

  const handleStageSelect = (idx: number) => {
    if (disableStickyScroll) {
      const percents = [15, 35, 68, 100];
      setStageIdx(idx);
      setPercent(percents[idx]);
      return;
    }

    const outer = outerRef.current;
    if (!outer) return;
    const targets = [0.12, 0.32, 0.58, 0.92];
    const scrollRange = outer.offsetHeight - window.innerHeight;
    const targetTop = outer.offsetTop + scrollRange * targets[idx];
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  const handleSimulateTransfer = () => {
    if (prefersReducedMotion) {
      setPercent(100);
      setStageIdx(3);
      return;
    }
    if (!disableStickyScroll && outerRef.current) {
      const outer = outerRef.current;
      const scrollRange = outer.offsetHeight - window.innerHeight;
      window.scrollTo({ top: outer.offsetTop + scrollRange * 0.92, behavior: 'smooth' });
      return;
    }
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(eased * 100);
      setPercent(next);
      setStageIdx(t < 0.25 ? 1 : t < 0.95 ? 2 : 3);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const isCompleted = percent >= 100;

  const scrollDrivenFinish: HardwareFinish =
    stageIdx === 0 || stageIdx === 1
      ? 'graphite'
      : stageIdx === 2
        ? 'blue'
        : 'teal';
  const activeFinish = manualFinish ?? (isDark && scrollDrivenFinish === 'graphite' ? 'dark' : scrollDrivenFinish);
  const isDarkHardware = activeFinish === 'dark' || isDark;

  return (
    <section
      ref={outerRef}
      className="ac-scroll-exp-outer"
      aria-label="Scroll-driven file transfer story"
    >
      <div className="ac-scroll-exp-sticky">
        <div className="ac-container">
          <div className="ac-scroll-exp-header">
            <h2 className="ac-section-headline">
              One file.
              <br />
              Everywhere it needs to be.
            </h2>
          </div>

          <motion.div
            className="ac-scroll-exp-frame"
            style={
              disableStickyScroll
                ? { backgroundColor: isDark ? '#0D1626' : '#E5EFFB' }
                : { scale: frameScale, backgroundColor: isDark ? frameBgDark : frameBgLight }
            }
          >
            {/* Dynamic Studio Tint Orbs behind devices */}
            <div className="ac-ambient-canvas" aria-hidden="true">
              <div
                className="ac-mesh-orb ac-mesh-orb--blue"
                style={{
                  width: 380,
                  height: 360,
                  top: -60,
                  left: '8%',
                  opacity: activeFinish === 'blue' ? 1 : 0.6,
                  transition: 'opacity 380ms ease',
                }}
              />
              <div
                className="ac-mesh-orb ac-mesh-orb--teal"
                style={{
                  width: 380,
                  height: 360,
                  bottom: -60,
                  right: '8%',
                  opacity: activeFinish === 'teal' ? 1 : 0.6,
                  transition: 'opacity 380ms ease',
                }}
              />
            </div>

            <div className="ac-scroll-exp-stage">
              {/* Laptop sized proportionally with vh so controls never slice on MacBooks or zoomed screens */}
              <motion.div
                style={
                  disableStickyScroll
                    ? { x: 0, opacity: 1 }
                    : { x: laptopX, opacity: laptopOpacity }
                }
              >
                <LaptopHardware
                  finish={activeFinish}
                  dark={isDarkHardware}
                  style={{ width: isMobile ? 330 : 'min(410px, 50vh)' }}
                >
                  <div
                    style={{
                      height: '100%',
                      padding: isMobile ? '11px 12px 10px' : '16px 16px 12px',
                      background: isDarkHardware
                        ? 'linear-gradient(160deg, #161c28 0%, #0b1018 100%)'
                        : 'radial-gradient(circle at 18% 20%, rgba(0,113,227,0.22) 0%, transparent 48%), linear-gradient(160deg, #E5EFFC 0%, #E1F3EE 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 6,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: isDarkHardware ? '#F5F5F7' : '#1D1D1F',
                        }}
                      >
                        MacBook Pro
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: isCompleted ? '#30B8A6' : '#0071E3' }}>
                        {isCompleted ? 'Sent' : 'Sending'}
                      </span>
                    </div>

                    <div
                      style={{
                        background: isDarkHardware ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.62)',
                        backdropFilter: 'saturate(200%) blur(18px)',
                        WebkitBackdropFilter: 'saturate(200%) blur(18px)',
                        borderRadius: 12,
                        padding: isMobile ? '8px 10px' : 12,
                        border: isDarkHardware
                          ? '1px solid rgba(255,255,255,0.18)'
                          : '1px solid rgba(255,255,255,0.92)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          width: isMobile ? 28 : 32,
                          height: isMobile ? 28 : 32,
                          borderRadius: 8,
                          background: 'rgba(0, 113, 227, 0.16)',
                          color: isDarkHardware ? '#60B2FF' : '#0071E3',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Film size={isMobile ? 14 : 16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: isMobile ? 11 : 12,
                            fontWeight: 600,
                            color: isDarkHardware ? '#F5F5F7' : '#1D1D1F',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Studio_Master_4K.mov
                        </div>
                        <div style={{ fontSize: isMobile ? 9.5 : 10.5, color: isDarkHardware ? '#A8AEBA' : '#48484D' }}>
                          640 MB · Local Wi-Fi Direct
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: isMobile ? 9.5 : 10.5,
                          color: isDarkHardware ? '#A8AEBA' : '#48484D',
                          marginBottom: 4,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        <span>{isCompleted ? 'Delivered to Pixel 9' : 'Direct byte stream'}</span>
                        <span
                          style={{
                            fontWeight: 600,
                            color: isDarkHardware ? '#F5F5F7' : '#1D1D1F',
                          }}
                        >
                          {percent}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          borderRadius: 99,
                          background: isDarkHardware ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                          overflow: 'hidden',
                        }}
                      >
                        {disableStickyScroll ? (
                          <div
                            style={{
                              height: '100%',
                              width: `${percent}%`,
                              background: isCompleted
                                ? '#30B8A6'
                                : 'linear-gradient(90deg, #0071E3, #30B8A6)',
                            }}
                          />
                        ) : (
                          <motion.div
                            style={{
                              height: '100%',
                              width: '100%',
                              transformOrigin: 'left center',
                              scaleX: progressScale,
                              background: isCompleted
                                ? '#30B8A6'
                                : 'linear-gradient(90deg, #0071E3, #30B8A6)',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </LaptopHardware>
              </motion.div>

              {/* Flying Liquid Glass File Indicator */}
              {!disableStickyScroll && (
                <motion.div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    x: packetX,
                    y: packetY,
                    opacity: packetOpacity,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 14px',
                    borderRadius: 16,
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(38, 46, 62, 0.86) 0%, rgba(20, 26, 36, 0.72) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(235, 246, 255, 0.56) 100%)',
                    backdropFilter: 'saturate(220%) blur(22px)',
                    WebkitBackdropFilter: 'saturate(220%) blur(22px)',
                    border: isDark ? '1.5px solid rgba(255, 255, 255, 0.28)' : '1.5px solid rgba(255, 255, 255, 0.96)',
                    outline: '1px solid rgba(0, 113, 227, 0.25)',
                    boxShadow:
                      '0 18px 38px rgba(15, 35, 65, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <Film size={15} color={isDark ? '#60B2FF' : '#0071E3'} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#F5F5F7' : '#1D1D1F' }}>
                    Studio_Master_4K.mov
                  </span>
                </motion.div>
              )}

              {/* Android Phone sized proportionally with vh */}
              <motion.div
                style={
                  disableStickyScroll
                    ? { x: 0, opacity: 1 }
                    : { x: phoneX, opacity: phoneOpacity }
                }
              >
                <AndroidPhoneHardware
                  finish={activeFinish}
                  dark={isDarkHardware}
                  style={{ width: isMobile ? 156 : 'min(158px, 20vh)' }}
                >
                  <div
                    style={{
                      height: '100%',
                      padding: '24px 10px 14px',
                      background: isDarkHardware
                        ? 'linear-gradient(180deg, #101622 0%, #0a1216 100%)'
                        : 'radial-gradient(circle at 78% 18%, rgba(48,184,166,0.22) 0%, transparent 48%), linear-gradient(180deg, #E5EFFB 0%, #E0F3EE 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            color: isDarkHardware ? '#F5F5F7' : '#1D1D1F',
                          }}
                        >
                          Pixel 9
                        </span>
                        <span style={{ fontSize: 9.5, fontWeight: 600, color: '#30B8A6' }}>Direct</span>
                      </div>

                      <div
                        style={{
                          borderRadius: 13,
                          background: isDarkHardware ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.62)',
                          backdropFilter: 'saturate(200%) blur(16px)',
                          WebkitBackdropFilter: 'saturate(200%) blur(16px)',
                          border: isCompleted
                            ? '1px solid rgba(48, 184, 166, 0.55)'
                            : isDarkHardware
                              ? '1px solid rgba(255,255,255,0.16)'
                              : '1px solid rgba(255,255,255,0.92)',
                          padding: 9,
                          minWidth: 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ fontSize: 9, color: isDarkHardware ? '#A8AEBA' : '#48484D', marginBottom: 3 }}>
                          {isCompleted ? 'Received from Mac' : 'Incoming file'}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: isDarkHardware ? '#F5F5F7' : '#1D1D1F',
                            marginBottom: 8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Studio_Master_4K.mov
                        </div>

                        <div
                          style={{
                            height: 4,
                            borderRadius: 99,
                            background: isDarkHardware ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            marginBottom: 7,
                          }}
                        >
                          {disableStickyScroll ? (
                            <div
                              style={{
                                height: '100%',
                                width: `${percent}%`,
                                background: '#30B8A6',
                              }}
                            />
                          ) : (
                            <motion.div
                              style={{
                                height: '100%',
                                width: '100%',
                                transformOrigin: 'left center',
                                scaleX: progressScale,
                                background: '#30B8A6',
                              }}
                            />
                          )}
                        </div>

                        <motion.div
                          style={{
                            opacity: disableStickyScroll ? (isCompleted ? 1 : 0.4) : completedOpacity,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 9.5,
                            fontWeight: 600,
                            color: isDarkHardware ? '#4ADBC8' : '#1D7F72',
                          }}
                        >
                          <Check size={11} strokeWidth={2.6} />
                          <span>{isCompleted ? 'Verified & Ready' : `${percent}% complete`}</span>
                        </motion.div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: 44,
                        height: 4,
                        borderRadius: 99,
                        background: isDarkHardware ? 'rgba(255,255,255,0.24)' : 'rgba(29, 29, 31, 0.2)',
                        margin: '0 auto',
                      }}
                    />
                  </div>
                </AndroidPhoneHardware>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Stage Indicator + Hardware Finish Switcher + Quick Simulate */}
          <div className="ac-scroll-exp-controls-row">
            <div className="ac-scroll-exp-steps" aria-label="Transfer stages">
              {STAGES.map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleStageSelect(idx)}
                  className={`ac-scroll-step-chip ${idx === stageIdx ? 'ac-scroll-step-chip--active' : ''}`}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: idx <= stageIdx ? '#30B8A6' : '#8E94A0',
                    }}
                  />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="ac-finish-switcher" aria-label="Hardware finish preview">
              <span style={{ fontSize: 11.5, fontWeight: 500, color: isDark ? '#A8AEBA' : '#48484D' }}>
                Finish
              </span>
              {FINISH_OPTIONS.map((opt) => {
                const selected = activeFinish === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-label={`${opt.label} finish`}
                    aria-pressed={selected}
                    title={opt.label}
                    onClick={() => setManualFinish(opt.id)}
                    className={`ac-finish-dot ${selected ? 'ac-finish-dot--active' : ''}`}
                    style={{ background: opt.swatch }}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSimulateTransfer}
              className="ac-scroll-step-chip"
              style={{ color: isDark ? '#60B2FF' : '#0071E3', fontWeight: 600 }}
            >
              {isCompleted ? <RotateCcw size={12} /> : <Play size={12} />}
              <span>{isCompleted ? 'Replay transfer' : 'Simulate stream'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Check,
  ChevronDown,
  FileText,
  Film,
  Laptop,
  Layers,
  Send,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react';
import {
  AndroidPhoneHardware,
  LaptopHardware,
  LiquidGlassCard,
} from '../components';
import { useLandingTheme } from '../LandingThemeContext';

const LINE_ONE_WORDS = ['Your', 'devices.'];
const LINE_TWO_WORDS = ['One', 'seamless', 'ecosystem.'];
const LINE_ONE_DELAYS = [0, 0.045];
const LINE_TWO_DELAYS = [0.09, 0.125, 0.155];

const HERO_PAYLOADS = [
  { id: 'key', name: 'Launch_Keynote.key', size: '142 MB', rate: '48.6 MB/s', time: '2.9s', icon: FileText },
  { id: 'mov', name: 'Studio_Reel_4K.mov', size: '640 MB', rate: '62.4 MB/s', time: '10.2s', icon: Film },
  { id: 'fig', name: 'Design_Kit.fig', size: '86 MB', rate: '54.0 MB/s', time: '1.6s', icon: Layers },
] as const;

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [transferPhase, setTransferPhase] = useState<'sending' | 'arrived'>('sending');
  const [sendRunKey, setSendRunKey] = useState(0);

  const payload = HERO_PAYLOADS[selectedIdx];
  const PayloadIcon = payload.icon;

  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#A8AEBA' : '#515154';

  // Smooth spring-driven pointer 3D tilt (desktop fine pointer only)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerRotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5.2, 5.2]), {
    stiffness: 110,
    damping: 22,
  });
  const pointerRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), {
    stiffness: 110,
    damping: 22,
  });

  // Smoothed scroll-linked spatial camera movement, tilt, and depth parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.7,
  });

  const cameraScale = useTransform(smoothScroll, [0, 0.8], [1, 0.94]);
  const scrollTiltX = useTransform(smoothScroll, [0, 0.8], [0, 6.5]);
  const devicesY = useTransform(smoothScroll, [0, 1], [0, -30]);
  const phoneParallaxY = useTransform(smoothScroll, [0, 1], [0, -68]);
  const hudParallaxY = useTransform(smoothScroll, [0, 1], [0, -86]);
  const statParallaxY = useTransform(smoothScroll, [0, 1], [0, -48]);

  const combinedRotateX = useTransform(
    [pointerRotateX, scrollTiltX],
    ([px, sx]) => (px as number) + (sx as number)
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setTransferPhase('arrived');
      return;
    }

    let arrivalTimeout: number;
    let nextTimeout: number;

    setTransferPhase('sending');
    arrivalTimeout = window.setTimeout(() => {
      setTransferPhase('arrived');
      nextTimeout = window.setTimeout(() => {
        setSendRunKey((k) => k + 1);
      }, 2400);
    }, 1850);

    return () => {
      window.clearTimeout(arrivalTimeout);
      window.clearTimeout(nextTimeout);
    };
  }, [prefersReducedMotion, sendRunKey, selectedIdx]);

  const triggerTransfer = useCallback((idx: number) => {
    setSelectedIdx(idx);
    setSendRunKey((k) => k + 1);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType !== 'mouse' || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section ref={heroRef} className="ac-hero-section" id="overview">
      {/* Ambient studio mesh gradient orbs behind glass */}
      <div className="ac-ambient-canvas" aria-hidden="true">
        <div
          className="ac-mesh-orb ac-mesh-orb--blue"
          style={{ width: 560, height: 540, top: -90, left: '10%' }}
        />
        <div
          className="ac-mesh-orb ac-mesh-orb--teal"
          style={{ width: 520, height: 500, top: 160, right: '6%' }}
        />
        <div
          className="ac-mesh-orb ac-mesh-orb--ice"
          style={{ width: 640, height: 420, top: 320, left: '26%' }}
        />
      </div>

      <div className="ac-container">
        {/* Frosted Liquid Glass Eyebrow Pill */}
        <motion.div
          className="ac-hero-eyebrow-wrap"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="ac-glass-pill">
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#30B8A6',
                boxShadow: '0 0 0 3px rgba(48, 184, 166, 0.24)',
              }}
            />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary, letterSpacing: '-0.01em' }}>
              Direct Local Ecosystem
            </span>
          </div>
        </motion.div>

        {/* Staggered Masked Editorial Typography */}
        <h1 className="ac-hero-headline" aria-label="Your devices. One seamless ecosystem.">
          <span className="ac-stagger-line">
            {LINE_ONE_WORDS.map((word, idx) => (
              <React.Fragment key={word}>
                <span className="ac-stagger-mask">
                  <motion.span
                    className="ac-stagger-word"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: '105%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{
                      duration: prefersReducedMotion ? 0.15 : 0.62,
                      delay: prefersReducedMotion ? 0 : LINE_ONE_DELAYS[idx],
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {idx < LINE_ONE_WORDS.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </span>

          <span className="ac-stagger-line">
            {LINE_TWO_WORDS.map((word, idx) => (
              <React.Fragment key={word}>
                <span className="ac-stagger-mask">
                  <motion.span
                    className="ac-stagger-word"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: '105%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{
                      duration: prefersReducedMotion ? 0.15 : 0.64,
                      delay: prefersReducedMotion ? 0 : LINE_TWO_DELAYS[idx],
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {idx < LINE_TWO_WORDS.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </span>
        </h1>

        {/* 3D Device Centerpiece with Liquid Glass Backdrop & Parallax */}
        <div
          ref={stageRef}
          className="ac-hero-stage"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="ac-hero-stage-plate" aria-hidden="true" />

          {/* Floating Liquid Glass Telemetry Card */}
          <motion.div
            className="ac-hero-floating-hud"
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { y: hudParallaxY }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: prefersReducedMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: 'rgba(48, 184, 166, 0.18)',
                color: isDark ? '#4ADBC8' : '#1D7F72',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={16} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: textPrimary, lineHeight: 1.2 }}>
                Peer-to-Peer Link
              </div>
              <div style={{ fontSize: 10.5, color: textSecondary, lineHeight: 1.25 }}>
                {transferPhase === 'arrived' ? 'Verified · 0 cloud hops' : `${payload.rate} · Local Wi-Fi`}
              </div>
            </div>
          </motion.div>

          {/* Bottom-left Floating Liquid Glass Speed Card */}
          <motion.div
            className="ac-hero-floating-stat"
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { y: statParallaxY }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: prefersReducedMotion ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: 'rgba(0, 113, 227, 0.16)',
                color: isDark ? '#60B2FF' : '#0071E3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={15} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: textPrimary, lineHeight: 1.2 }}>
                {payload.size} in {payload.time}
              </div>
              <div style={{ fontSize: 10.5, color: textSecondary, lineHeight: 1.25 }}>
                Direct memory stream
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ac-hero-composition"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    rotateX: combinedRotateX,
                    rotateY: pointerRotateY,
                    scale: cameraScale,
                    y: devicesY,
                  }
            }
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.78, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* MacBook-style Laptop */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <LaptopHardware dark={isDark}>
                <div className="ac-hero-laptop-screen">
                  <div className="ac-hero-laptop-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="ac-hero-laptop-dots" style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F56' }} />
                      <span className="ac-hero-laptop-dots" style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
                      <span className="ac-hero-laptop-dots" style={{ width: 8, height: 8, borderRadius: '50%', background: '#27C93F' }} />
                      <span
                        className="ac-hero-laptop-brand"
                        style={{
                          marginLeft: 8,
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: textPrimary,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        ArcCross
                      </span>
                    </div>
                    <div className="ac-hero-laptop-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30B8A6' }} />
                      Local link active
                    </div>
                  </div>

                  {/* MacBook Workspace Grid */}
                  <div className="ac-hero-laptop-grid">
                    {/* Frosted Sidebar */}
                    <div
                      className="ac-hero-laptop-sidebar"
                      style={{
                        background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.46)',
                        backdropFilter: 'saturate(200%) blur(18px)',
                        WebkitBackdropFilter: 'saturate(200%) blur(18px)',
                        borderRadius: 12,
                        border: isDark ? '1px solid rgba(255,255,255,0.16)' : '1px solid rgba(255, 255, 255, 0.88)',
                        padding: '10px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <div style={{ fontSize: 10, fontWeight: 600, color: textSecondary, padding: '0 6px 2px' }}>
                        Nearby
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '6px 8px',
                          borderRadius: 8,
                          background: 'rgba(0, 113, 227, 0.16)',
                          color: isDark ? '#60B2FF' : '#0071E3',
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        <Smartphone size={12} />
                        <span>Pixel 9</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '6px 8px',
                          borderRadius: 8,
                          color: textSecondary,
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        <Laptop size={12} />
                        <span>Studio Mac</span>
                      </div>
                    </div>

                    {/* Transfer Stage */}
                    <div className="ac-hero-laptop-transfer">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: textPrimary,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            Sending to Pixel 9
                          </div>
                          <div className="ac-hero-laptop-sub" style={{ fontSize: 10, color: textSecondary }}>
                            Direct · {payload.rate}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            flexShrink: 0,
                            color: transferPhase === 'arrived' ? (isDark ? '#4ADBC8' : '#1D7F72') : (isDark ? '#60B2FF' : '#0071E3'),
                          }}
                        >
                          {transferPhase === 'arrived' ? 'Delivered' : 'Streaming'}
                        </span>
                      </div>

                      <div
                        className="ac-hero-laptop-filecard"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 11px',
                          borderRadius: 11,
                          background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.68)',
                          border: isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255, 255, 255, 0.92)',
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: 'rgba(0, 113, 227, 0.16)',
                            color: isDark ? '#60B2FF' : '#0071E3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <PayloadIcon size={15} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 11.5,
                              fontWeight: 600,
                              color: textPrimary,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {payload.name}
                          </div>
                          <div style={{ fontSize: 10, color: textSecondary }}>{payload.size}</div>
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            height: 4,
                            borderRadius: 99,
                            background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0, 0, 0, 0.08)',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            key={sendRunKey}
                            style={{
                              height: '100%',
                              borderRadius: 99,
                              background:
                                transferPhase === 'arrived'
                                  ? '#30B8A6'
                                  : 'linear-gradient(90deg, #0071E3, #30B8A6)',
                            }}
                            initial={{ width: prefersReducedMotion ? '100%' : '8%' }}
                            animate={{
                              width: transferPhase === 'sending' ? '74%' : '100%',
                            }}
                            transition={{
                              duration: prefersReducedMotion ? 0 : 1.55,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </LaptopHardware>
            </div>

            {/* Flying Liquid Glass File Arc Indicator */}
            <div className="ac-hero-arc-desktop" aria-hidden="true">
              <svg
                width="96"
                height="50"
                viewBox="0 0 96 50"
                fill="none"
                style={{ overflow: 'visible' }}
              >
                <path
                  d="M 4 34 Q 48 2 92 26"
                  stroke="url(#heroArcGrad)"
                  strokeWidth="2.2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="heroArcGrad" x1="0" y1="0" x2="96" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0071E3" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#30B8A6" stopOpacity="0.98" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                key={`packet-${sendRunKey}`}
                style={{
                  position: 'absolute',
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(40,48,66,0.88) 0%, rgba(20,26,38,0.72) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.86) 0%, rgba(235,246,255,0.58) 100%)',
                  backdropFilter: 'saturate(220%) blur(18px)',
                  WebkitBackdropFilter: 'saturate(220%) blur(18px)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid rgba(255, 255, 255, 0.98)',
                  outline: '1px solid rgba(0, 113, 227, 0.28)',
                  boxShadow:
                    '0 12px 28px rgba(0, 113, 227, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: transferPhase === 'arrived' ? (isDark ? '#4ADBC8' : '#1D7F72') : (isDark ? '#60B2FF' : '#0071E3'),
                }}
                animate={
                  prefersReducedMotion
                    ? { x: 0, y: -4, opacity: 1 }
                    : transferPhase === 'sending'
                      ? { x: [-26, 0, 26], y: [10, -16, 2], scale: [0.92, 1.08, 1], opacity: [0.9, 1, 1] }
                      : { x: 26, y: 2, scale: 0.96, opacity: 0.75 }
                }
                transition={{
                  duration: 1.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {transferPhase === 'arrived' ? <Check size={16} strokeWidth={2.5} /> : <PayloadIcon size={16} />}
              </motion.div>
            </div>

            <div className="ac-hero-arc-mobile" aria-hidden="true">
              <div
                style={{
                  width: 2,
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(0,113,227,0.45), rgba(48,184,166,0.85))',
                  borderRadius: 99,
                }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: isDark ? 'rgba(30, 36, 48, 0.92)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDark ? '1px solid rgba(255,255,255,0.24)' : '1px solid rgba(0, 113, 227, 0.28)',
                  boxShadow: '0 6px 16px rgba(0, 113, 227, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: transferPhase === 'arrived' ? (isDark ? '#4ADBC8' : '#1D7F72') : (isDark ? '#60B2FF' : '#0071E3'),
                }}
                animate={
                  prefersReducedMotion
                    ? { y: 0, opacity: 1 }
                    : transferPhase === 'sending'
                      ? { y: [-12, 12], opacity: [0.85, 1] }
                      : { y: 12, opacity: 0.65 }
                }
                transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {transferPhase === 'arrived' ? <Check size={14} strokeWidth={2.5} /> : <PayloadIcon size={14} />}
              </motion.div>
            </div>

            {/* Android Flagship Phone */}
            <motion.div
              style={{
                position: 'relative',
                zIndex: 3,
                y: prefersReducedMotion ? 0 : phoneParallaxY,
              }}
            >
              <AndroidPhoneHardware dark={isDark}>
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '32px 14px 18px',
                    background: isDark
                      ? 'radial-gradient(circle at 80% 18%, rgba(48, 184, 166, 0.24) 0%, transparent 50%), linear-gradient(180deg, #0D1522 0%, #091418 100%)'
                      : 'radial-gradient(circle at 80% 18%, rgba(48, 184, 166, 0.26) 0%, transparent 50%), linear-gradient(180deg, #E8F2FC 0%, #E2F4F0 100%)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 14,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: textPrimary }}>
                        Pixel 9
                      </span>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 600,
                          color: isDark ? '#4ADBC8' : '#1D7F72',
                          background: isDark ? 'rgba(48, 184, 166, 0.16)' : 'rgba(255, 255, 255, 0.68)',
                          border: isDark ? '1px solid rgba(48, 184, 166, 0.34)' : '1px solid rgba(255, 255, 255, 0.9)',
                          padding: '2px 7px',
                          borderRadius: 99,
                        }}
                      >
                        Paired
                      </span>
                    </div>

                    <div
                      style={{
                        borderRadius: 15,
                        background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.62)',
                        backdropFilter: 'saturate(200%) blur(16px)',
                        WebkitBackdropFilter: 'saturate(200%) blur(16px)',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(255, 255, 255, 0.92)',
                        padding: '10px 10px',
                        boxShadow: isDark ? '0 8px 20px rgba(0, 0, 0, 0.4)' : '0 8px 20px rgba(15, 35, 65, 0.08)',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ fontSize: 9.5, color: textSecondary, marginBottom: 3 }}>
                        From MacBook Pro
                      </div>
                      <div
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: textPrimary,
                          marginBottom: 7,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {payload.name}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: transferPhase === 'arrived' ? (isDark ? '#4ADBC8' : '#1D7F72') : (isDark ? '#60B2FF' : '#0071E3'),
                        }}
                      >
                        {transferPhase === 'arrived' ? (
                          <>
                            <Check size={13} strokeWidth={2.5} />
                            <span>Saved to device</span>
                          </>
                        ) : (
                          <span>Receiving directly...</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Android Pill Handle */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: 12,
                        background:
                          transferPhase === 'arrived'
                            ? (isDark ? '#30B8A6' : '#1D1D1F')
                            : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.65)'),
                        color:
                          transferPhase === 'arrived'
                            ? '#FFFFFF'
                            : textSecondary,
                        border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.9)',
                        fontSize: 11,
                        fontWeight: 600,
                        textAlign: 'center',
                        transition: 'background-color 240ms ease, color 240ms ease',
                      }}
                    >
                      {transferPhase === 'arrived' ? 'Open File' : 'Direct Stream'}
                    </div>
                    <div
                      style={{
                        width: 56,
                        height: 4,
                        borderRadius: 99,
                        background: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(29, 29, 31, 0.22)',
                      }}
                    />
                  </div>
                </div>
              </AndroidPhoneHardware>
            </motion.div>

            <div className="ac-hero-floor-shadow" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Interactive Liquid Glass File-Send Dock */}
        <LiquidGlassCard className="ac-hero-interactive-dock" aria-label="Try live file send preview">
          {HERO_PAYLOADS.map((item, idx) => {
            const Icon = item.icon;
            const active = selectedIdx === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => triggerTransfer(idx)}
                className={`ac-hero-dock-btn ${active ? 'ac-hero-dock-btn--active' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="ac-hero-dock-active"
                    className="ac-hero-dock-pill"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.1 }
                        : { type: 'spring', bounce: 0.16, duration: 0.36 }
                    }
                  />
                )}
                <Icon size={13} />
                <span>{item.name}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => triggerTransfer(selectedIdx)}
            className="ac-hero-dock-btn"
            style={{
              background: isDark ? 'rgba(0, 128, 255, 0.22)' : 'rgba(0, 113, 227, 0.12)',
              color: isDark ? '#60B2FF' : '#0071E3',
              fontWeight: 600,
            }}
            aria-label="Send selected file again"
          >
            <Send size={12} />
            <span>Send now</span>
          </button>
        </LiquidGlassCard>

        {/* Supporting Copy & CTAs */}
        <motion.div
          className="ac-hero-copy-block"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: prefersReducedMotion ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="ac-intro-copy">
            Move files between your devices. Without the friction, without the cloud, without compromise.
          </p>

          <div className="ac-hero-actions">
            <a href="#features" className="ac-btn-primary">
              Explore ArcCross
            </a>
            <a href="#how-it-works" className="ac-btn-secondary">
              <span>Discover how it works</span>
              <ChevronDown size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

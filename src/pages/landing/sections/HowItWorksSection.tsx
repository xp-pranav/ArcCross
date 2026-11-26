import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Laptop,
  Radio,
  RefreshCw,
  Send,
  Smartphone,
} from 'lucide-react';
import { LiquidGlassCard } from '../components';
import { useLandingTheme } from '../LandingThemeContext';

interface StepStage {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  visual: React.ReactNode;
}

const HowItWorksRow: React.FC<{ stage: StepStage; idx: number }> = ({ stage, idx }) => {
  const prefersReducedMotion = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, amount: 'some' });

  return (
    <motion.div
      ref={rowRef}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.54,
        delay: prefersReducedMotion ? 0 : idx * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <LiquidGlassCard className="ac-how-stage-row">
        <div>
          <div className="ac-how-step-num">
            {stage.num} — {stage.title}
          </div>
          <h3 className="ac-feature-heading" style={{ marginBottom: 12 }}>
            {stage.subtitle}
          </h3>
          <p className="ac-intro-copy" style={{ fontSize: 17 }}>
            {stage.description}
          </p>
        </div>

        {/* Image Mask Reveal driven by parent row in-view state */}
        <motion.div
          className="ac-how-step-visual"
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0.4, clipPath: 'inset(0 0 100% 0)' }
          }
          animate={
            isInView || prefersReducedMotion
              ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
              : { opacity: 0.4, clipPath: 'inset(0 0 100% 0)' }
          }
          transition={{
            duration: prefersReducedMotion ? 0.15 : 0.58,
            delay: prefersReducedMotion ? 0 : 0.06,
            ease: [0.77, 0, 0.175, 1],
          }}
        >
          {stage.visual}
        </motion.div>
      </LiquidGlassCard>
    </motion.div>
  );
};

export const HowItWorksSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();

  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#A8AEBA' : '#48484D';
  const blueTint = isDark ? '#60B2FF' : '#0071E3';
  const tealTint = isDark ? '#4ADBC8' : '#1D7F72';

  const cardSurfaceStyle: React.CSSProperties = {
    background: isDark ? 'rgba(24, 30, 44, 0.62)' : 'rgba(255, 255, 255, 0.58)',
    backdropFilter: 'saturate(200%) blur(18px)',
    WebkitBackdropFilter: 'saturate(200%) blur(18px)',
    border: isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(255,255,255,0.92)',
    boxShadow: isDark
      ? '0 10px 26px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.18)'
      : '0 8px 22px rgba(15, 35, 65, 0.07), inset 0 1.5px 0 rgba(255,255,255,0.98)',
  };

  const [scanPulseKey, setScanPulseKey] = useState(0);
  const [peerFound, setPeerFound] = useState(true);
  const [pairCode, setPairCode] = useState('482 913');
  const [pairedOk, setPairedOk] = useState(true);
  const [stepProgress, setStepProgress] = useState(100);
  const stepRafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (stepRafRef.current !== null) cancelAnimationFrame(stepRafRef.current);
    };
  }, []);

  const handleRescan = () => {
    setPeerFound(false);
    setScanPulseKey((k) => k + 1);
    window.setTimeout(() => setPeerFound(true), 520);
  };

  const handleNewCode = () => {
    const a = String(100 + Math.floor(Math.random() * 899));
    const b = String(100 + Math.floor(Math.random() * 899));
    setPairCode(`${a} ${b}`);
    setPairedOk(false);
    window.setTimeout(() => setPairedOk(true), 600);
  };

  const handleSendZip = () => {
    if (prefersReducedMotion) {
      setStepProgress(100);
      return;
    }
    if (stepRafRef.current !== null) cancelAnimationFrame(stepRafRef.current);
    setStepProgress(0);
    const start = performance.now();
    const duration = 950;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setStepProgress(Math.round(eased * 100));
      if (t < 1) {
        stepRafRef.current = requestAnimationFrame(tick);
      }
    };
    stepRafRef.current = requestAnimationFrame(tick);
  };

  const stages: StepStage[] = [
    {
      num: '01',
      title: 'Discover',
      subtitle: 'Your devices find each other.',
      description:
        'Open ArcCross on your laptop and Android phone on the same Wi-Fi network. Nearby hardware appears automatically with zero manual IP entry or port forwarding.',
      visual: (
        <>
          <div className="ac-how-pair-row">
            <div
              style={{
                ...cardSurfaceStyle,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 16,
                zIndex: 2,
              }}
            >
              <Laptop size={18} color={textPrimary} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>MacBook Pro</div>
                <div style={{ fontSize: 11, color: textSecondary }}>Broadcasting</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <motion.div
                key={scanPulseKey}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [0.85, 1.45], opacity: [0.6, 0] }
                }
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  border: `1.5px solid ${blueTint}`,
                }}
              />
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(0, 113, 227, 0.28)',
                  color: blueTint,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(0, 113, 227, 0.16)',
                }}
              >
                <Radio size={17} />
              </div>
            </div>

            <motion.div
              animate={{
                opacity: peerFound ? 1 : 0.45,
                scale: peerFound ? 1 : 0.96,
              }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              style={{
                ...cardSurfaceStyle,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 16,
                border: peerFound
                  ? '1.5px solid rgba(48, 184, 166, 0.6)'
                  : cardSurfaceStyle.border,
                zIndex: 2,
              }}
            >
              <Smartphone size={18} color={tealTint} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>Pixel 9</div>
                <div style={{ fontSize: 11, color: tealTint, fontWeight: 500 }}>
                  {peerFound ? 'Nearby' : 'Locating...'}
                </div>
              </div>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={handleRescan}
            className="ac-control-btn"
            style={{ height: 32, padding: '0 13px', fontSize: 12 }}
          >
            <RefreshCw size={12} />
            <span>Rescan nearby</span>
          </button>
        </>
      ),
    },
    {
      num: '02',
      title: 'Connect',
      subtitle: 'Pair devices securely.',
      description:
        'Confirm the matching six-digit handshake across both screens once. Only devices you explicitly approve can join your local ecosystem.',
      visual: (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              ...cardSurfaceStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '6px 14px',
              padding: '14px 20px',
              borderRadius: 18,
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 12, color: textSecondary, fontWeight: 500 }}>
              Verification Code
            </span>
            <span
              style={{
                fontFamily: 'var(--ac-font-mono)',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: textPrimary,
                whiteSpace: 'nowrap',
              }}
            >
              {pairCode}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: pairedOk ? tealTint : blueTint,
                background: pairedOk ? 'rgba(48, 184, 166, 0.16)' : 'rgba(0, 113, 227, 0.14)',
                padding: '6px 12px',
                borderRadius: 9999,
              }}
            >
              <Check size={13} strokeWidth={2.5} />
              <span>{pairedOk ? 'Confirmed on both devices' : 'Verifying handshake...'}</span>
            </div>

            <button
              type="button"
              onClick={handleNewCode}
              className="ac-control-btn"
              style={{ height: 30, padding: '0 12px', fontSize: 11.5 }}
            >
              New code
            </button>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Transfer',
      subtitle: 'Send files directly.',
      description:
        'Drop any file or folder onto a paired device. Bytes stream straight over your local connection and land immediately in your destination folder.',
      visual: (
        <>
          <div className="ac-how-pair-row">
            <div
              style={{
                ...cardSurfaceStyle,
                padding: '12px 14px',
                borderRadius: 16,
                flex: 1,
              }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>
                Design_Assets.zip
              </div>
              <div style={{ fontSize: 11, color: textSecondary, marginTop: 2 }}>
                1.4 GB · {stepProgress < 100 ? `${stepProgress}%` : 'Sent'}
              </div>
            </div>

            <div className="ac-how-arrow-badge">
              <ArrowRight size={17} />
            </div>

            <div
              style={{
                ...cardSurfaceStyle,
                padding: '12px 14px',
                borderRadius: 16,
                border: stepProgress >= 100
                  ? '1.5px solid rgba(48, 184, 166, 0.6)'
                  : cardSurfaceStyle.border,
                flex: 1,
              }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>
                {stepProgress >= 100 ? 'Saved on Pixel 9' : 'Streaming to Pixel 9'}
              </div>
              <div style={{ fontSize: 11, color: tealTint, fontWeight: 600, marginTop: 2 }}>
                {stepProgress >= 100 ? 'Direct · Complete' : `${stepProgress}% local stream`}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendZip}
            className="ac-control-btn"
            style={{ height: 32, padding: '0 13px', fontSize: 12, color: blueTint }}
          >
            <Send size={12} />
            <span>Drop file now</span>
          </button>
        </>
      ),
    },
  ];

  return (
    <section className="ac-how-section" id="how-it-works" aria-label="How ArcCross works">
      <div className="ac-ambient-canvas" aria-hidden="true">
        <div
          className="ac-mesh-orb ac-mesh-orb--teal"
          style={{ width: 520, height: 460, top: 60, right: '6%' }}
        />
        <div
          className="ac-mesh-orb ac-mesh-orb--blue"
          style={{ width: 520, height: 460, bottom: 60, left: '6%' }}
        />
      </div>

      <div className="ac-container">
        <motion.div
          className="ac-how-header"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="ac-section-headline">
            Three steps.
            <br />
            That&apos;s all.
          </h2>
        </motion.div>

        <div className="ac-how-list">
          {stages.map((stage, idx) => (
            <HowItWorksRow key={stage.num} stage={stage} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

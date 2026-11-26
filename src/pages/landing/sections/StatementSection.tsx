import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Laptop, ShieldCheck, Smartphone, Wifi, Zap } from 'lucide-react';
import { LiquidGlassCard } from '../components';
import { useLandingTheme } from '../LandingThemeContext';

const ECOSYSTEM_PILLARS = [
  { label: '0 Cloud Hops', value: '100% Direct', icon: ShieldCheck, accentLight: '#1D7F72', accentDark: '#4ADBC8' },
  { label: 'Local Link', value: 'Wi-Fi Direct', icon: Wifi, accentLight: '#0071E3', accentDark: '#60B2FF' },
  { label: 'Setup Time', value: 'Under 5s', icon: Zap, accentLight: '#0071E3', accentDark: '#60B2FF' },
  { label: 'Cross-OS', value: 'Mac + Android', icon: Smartphone, accentLight: '#1D7F72', accentDark: '#4ADBC8' },
];

export const StatementSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();

  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#A8AEBA' : '#48484D';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 88%', 'end 65%'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });

  const lightBg = useTransform(smoothProgress, [0, 0.65, 1], ['#FFFFFF', '#EEF3FA', '#E9F0FA']);
  const darkBg = useTransform(smoothProgress, [0, 0.65, 1], ['#06080D', '#070C16', '#070B14']);

  const lineScaleX = useTransform(smoothProgress, [0.15, 0.78], [0, 1]);
  const bridgeParallaxY = useTransform(smoothProgress, [0, 1], [18, -12]);

  return (
    <motion.section
      ref={sectionRef}
      className="ac-statement-section"
      style={{
        backgroundColor: prefersReducedMotion
          ? (isDark ? '#070B14' : '#EEF3FA')
          : (isDark ? darkBg : lightBg),
      }}
      aria-label="Product statement"
    >
      {/* Refractive Mesh Orbs behind Liquid Glass */}
      <div className="ac-ambient-canvas" aria-hidden="true">
        <div
          className="ac-mesh-orb ac-mesh-orb--blue"
          style={{ width: 460, height: 360, bottom: 20, left: '12%' }}
        />
        <div
          className="ac-mesh-orb ac-mesh-orb--teal"
          style={{ width: 440, height: 360, bottom: 16, right: '12%' }}
        />
      </div>

      <div className="ac-container">
        <div className="ac-statement-inner">
          <motion.h2
            className="ac-section-headline"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.62, ease: [0.23, 1, 0.32, 1] }}
          >
            Everything connects.
            <br />
            Nothing gets in the way.
          </motion.h2>

          <motion.p
            className="ac-intro-copy ac-statement-body"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.58, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            Your laptop and phone sit inches apart, yet sharing between them usually means cables, messaging threads, or remote servers. ArcCross establishes a direct local link so your devices act like one workspace.
          </motion.p>

          {/* Liquid Glass Interactive Bridge */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: bridgeParallaxY }}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0.3, scale: 0.97, clipPath: 'inset(0 0 100% 0)' }
            }
            whileInView={{ opacity: 1, scale: 1, clipPath: 'inset(-40px -40px -60px -40px)' }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.56, delay: prefersReducedMotion ? 0 : 0.06, ease: [0.23, 1, 0.32, 1] }}
          >
            <LiquidGlassCard className="ac-statement-bridge">
              <div className="ac-bridge-device">
                <div className="ac-bridge-icon">
                  <Laptop size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>MacBook Pro</div>
                  <div style={{ fontSize: 12, color: textSecondary }}>Source device</div>
                </div>
              </div>

              <div style={{ width: '100%' }}>
                <div className="ac-bridge-track">
                  <motion.div
                    style={{
                      width: '100%',
                      height: '100%',
                      transformOrigin: 'left center',
                      scaleX: prefersReducedMotion ? 1 : lineScaleX,
                      background: 'linear-gradient(90deg, #0071E3, #30B8A6)',
                    }}
                  />
                </div>
                <div className="ac-bridge-label">Direct device-to-device transfer</div>
              </div>

              <div className="ac-bridge-device">
                <div className="ac-bridge-icon" style={{ color: isDark ? '#4ADBC8' : '#1D7F72' }}>
                  <Smartphone size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>Pixel 9</div>
                  <div style={{ fontSize: 12, color: textSecondary }}>Paired Android</div>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* 4 Frosted Liquid Glass Capability Tiles */}
          <div className="ac-statement-metrics">
            {ECOSYSTEM_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{
                    duration: 0.45,
                    delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.04,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <LiquidGlassCard className="ac-metric-glass-tile">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: isDark ? pillar.accentDark : pillar.accentLight }}>
                      <Icon size={14} />
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: textSecondary }}>
                        {pillar.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary, letterSpacing: '-0.02em' }}>
                      {pillar.value}
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

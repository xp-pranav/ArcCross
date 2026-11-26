import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Laptop, ShieldCheck, Smartphone, Wifi } from 'lucide-react';
import { LiquidGlassCard } from '../components';
import { useLandingTheme } from '../LandingThemeContext';

const CTA_CHIPS = [
  { icon: Laptop, label: 'macOS & Desktop' },
  { icon: Smartphone, label: 'Android & Tablet' },
  { icon: Wifi, label: 'Direct Wi-Fi Link' },
  { icon: ShieldCheck, label: 'Zero Cloud Hops' },
];

export const FinalCTASection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();

  return (
    <section className="ac-final-cta-section" id="get-started" aria-label="Open ArcCross">
      <div className="ac-ambient-canvas" aria-hidden="true">
        <div
          className="ac-mesh-orb ac-mesh-orb--blue"
          style={{ width: 560, height: 420, top: 10, left: '14%' }}
        />
        <div
          className="ac-mesh-orb ac-mesh-orb--teal"
          style={{ width: 520, height: 400, bottom: 10, right: '14%' }}
        />
      </div>

      <div className="ac-container">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.62, ease: [0.23, 1, 0.32, 1] }}
        >
          <LiquidGlassCard className="ac-final-cta-card">
            <h2 className="ac-section-headline">Your devices are ready.</h2>
            <p className="ac-intro-copy" style={{ marginTop: 18 }}>
              Bring your devices into one connected ecosystem.
            </p>

            <div style={{ marginTop: 30 }}>
              <a href="#features" className="ac-btn-primary">
                Explore ArcCross
              </a>
            </div>

            <div className="ac-cta-ecosystem-pills" aria-hidden="true">
              {CTA_CHIPS.map((chip) => {
                const Icon = chip.icon;
                return (
                  <span
                    key={chip.label}
                    className="ac-glass-pill"
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: isDark ? '#F5F5F7' : '#48484D',
                    }}
                  >
                    <Icon size={14} color={isDark ? '#60B2FF' : '#0071E3'} />
                    <span>{chip.label}</span>
                  </span>
                );
              })}
            </div>
          </LiquidGlassCard>
        </motion.div>
      </div>
    </section>
  );
};

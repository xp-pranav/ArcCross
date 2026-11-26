import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { CloudOff, Info, Lock, ShieldCheck, Wifi, X } from 'lucide-react';
import {
  AndroidPhoneHardware,
  LaptopHardware,
  LiquidGlassCard,
} from '../components';

const SECURITY_TABS = [
  {
    id: 'handshake',
    label: 'Handshake',
    icon: <Lock size={15} />,
    title: 'Explicit 6-digit device trust',
    detail:
      'Before any file can move, both devices verify a matching session handshake. Trust is stored locally per hardware pair—nothing is registered with a cloud identity server.',
  },
  {
    id: 'transport',
    label: 'Local Transport',
    icon: <Wifi size={15} />,
    title: 'Encrypted peer-to-peer stream',
    detail:
      'Data frames stream straight over your local Wi-Fi link between the sending and receiving device memory. Transfer speeds match your local hardware link, not your upload plan.',
  },
  {
    id: 'zero-cloud',
    label: 'Zero Cloud',
    icon: <CloudOff size={15} />,
    title: 'Zero intermediate storage buckets',
    detail:
      'Your presentations, archives, and raw footage never touch remote storage servers. Once the local transfer completes, no copy exists anywhere outside your two devices.',
  },
];

const PILLARS = [
  {
    title: 'Direct device-to-device',
    desc: 'Files travel across your local connection straight to the receiving device.',
    icon: Wifi,
  },
  {
    title: 'No unnecessary cloud uploads',
    desc: 'Nothing waits in remote storage buckets just to move a file across the desk.',
    icon: CloudOff,
  },
  {
    title: 'No account required',
    desc: 'Open ArcCross on your devices, approve the pairing prompt, and start sharing.',
    icon: ShieldCheck,
  },
];

export const PrivacySection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState(SECURITY_TABS[0].id);

  // Smoothed layered spatial parallax inside dark environment
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });
  const visualY = useTransform(smoothScroll, [0, 1], [24, -22]);
  const ambientOpacity = useTransform(smoothScroll, [0, 0.45, 0.85], [0.35, 1, 0.65]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const activeTab = SECURITY_TABS.find((t) => t.id === activeTabId) ?? SECURITY_TABS[0];

  return (
    <section
      ref={sectionRef}
      className="ac-privacy-section"
      id="privacy"
      aria-label="Privacy architecture"
    >
      <div className="ac-privacy-seam" aria-hidden="true" />
      <motion.div
        className="ac-privacy-ambient"
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { opacity: ambientOpacity }}
      />

      <div className="ac-container">
        <motion.div
          className="ac-privacy-header"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.64, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="ac-section-headline">Your files stay yours.</h2>
          <p className="ac-intro-copy">
            Designed around direct transfers and privacy. No unnecessary cloud uploads. No account required.
          </p>

          <button
            type="button"
            className="ac-privacy-spec-btn"
            onClick={() => setModalOpen(true)}
          >
            <Info size={15} color="#30B8A6" />
            <span>Inspect local link architecture</span>
          </button>
        </motion.div>

        <motion.div
          style={prefersReducedMotion ? undefined : { y: visualY }}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          <LiquidGlassCard dark className="ac-privacy-visual">
            {/* Detached cloud indicator */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 14px',
                  borderRadius: 9999,
                  border: '1px dashed rgba(255, 255, 255, 0.24)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#D1D1D6',
                  fontSize: 12.5,
                  fontWeight: 500,
                }}
              >
                <CloudOff size={14} />
                <span>No cloud storage involved</span>
              </div>
            </div>

            {/* Dark Minimal Device Pair + Direct Connection Line */}
            <div className="ac-privacy-devices">
              <LaptopHardware dark style={{ width: 320 }}>
                <div
                  style={{
                    height: '100%',
                    padding: '16px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#F5F5F7' }}>
                    MacBook Pro
                  </div>
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: 11,
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                    }}
                  >
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: '#F5F5F7' }}>
                      Local Transfer Stream
                    </div>
                    <div style={{ fontSize: 10, color: '#A1A1A6', marginTop: 2 }}>
                      Direct device memory
                    </div>
                  </div>
                  <div style={{ fontSize: 10.5, color: '#30B8A6', fontWeight: 600 }}>
                    Paired peer verified
                  </div>
                </div>
              </LaptopHardware>

              {/* Luminous Direct Connection Line */}
              <div className="ac-privacy-beam">
                <div className="ac-privacy-beam-line" />
                {!prefersReducedMotion && (
                  <motion.div
                    aria-hidden="true"
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.92, 1.18, 0.92] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#30B8A6',
                      boxShadow: '0 0 16px rgba(48, 184, 166, 0.95)',
                    }}
                  />
                )}
              </div>

              <AndroidPhoneHardware dark style={{ width: 126 }}>
                <div
                  style={{
                    height: '100%',
                    padding: '24px 10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: '#F5F5F7' }}>Pixel 9</div>
                  <div
                    style={{
                      padding: 8,
                      borderRadius: 10,
                      background: 'rgba(48, 184, 166, 0.16)',
                      border: '1px solid rgba(48, 184, 166, 0.36)',
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#30B8A6',
                    }}
                  >
                    Direct link
                  </div>
                  <div
                    style={{
                      width: 34,
                      height: 3,
                      borderRadius: 99,
                      background: 'rgba(255, 255, 255, 0.28)',
                      margin: '0 auto',
                    }}
                  />
                </div>
              </AndroidPhoneHardware>
            </div>
          </LiquidGlassCard>
        </motion.div>

        {/* Dark Liquid Glass Bento Pillars */}
        <motion.div
          className="ac-privacy-pillars"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <LiquidGlassCard key={pillar.title} dark className="ac-privacy-pillar-card">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'rgba(48, 184, 166, 0.14)',
                    border: '1px solid rgba(48, 184, 166, 0.28)',
                    color: '#30B8A6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 4,
                  }}
                >
                  <Icon size={16} />
                </div>
                <div className="ac-privacy-pillar-title">{pillar.title}</div>
                <p className="ac-privacy-pillar-desc">{pillar.desc}</p>
              </LiquidGlassCard>
            );
          })}
        </motion.div>
      </div>

      {/* Liquid Glass Modal with Animated Tabs */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="ac-modal-backdrop"
            role="presentation"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="ac-modal-glass"
              role="dialog"
              aria-modal="true"
              aria-label="Local link architecture"
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Local Link Architecture
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setModalOpen(false)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#F5F5F7',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Segmented Tabs */}
              <div
                role="tablist"
                aria-label="Security architecture layers"
                style={{
                  display: 'flex',
                  gap: 6,
                  padding: 4,
                  borderRadius: 9999,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  marginBottom: 20,
                  overflowX: 'auto',
                }}
              >
                {SECURITY_TABS.map((tab) => {
                  const selected = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveTabId(tab.id)}
                      style={{
                        position: 'relative',
                        flex: 1,
                        height: 34,
                        padding: '0 12px',
                        borderRadius: 9999,
                        border: 'none',
                        background: 'transparent',
                        color: selected ? '#1D1D1F' : '#A1A1A6',
                        fontSize: 12.5,
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        zIndex: 1,
                      }}
                    >
                      {selected && (
                        <motion.span
                          layoutId="ac-privacy-modal-tab"
                          transition={
                            prefersReducedMotion
                              ? { duration: 0.1 }
                              : { type: 'spring', bounce: 0.12, duration: 0.34 }
                          }
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 9999,
                            background: '#FFFFFF',
                            zIndex: -1,
                          }}
                        />
                      )}
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  borderRadius: 18,
                  padding: 20,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div style={{ fontSize: 15.5, fontWeight: 600, color: '#F5F5F7', marginBottom: 8 }}>
                  {activeTab.title}
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: '#A1A1A6', margin: 0 }}>
                  {activeTab.detail}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

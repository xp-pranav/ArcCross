import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Laptop, Smartphone, Tablet, Wifi } from 'lucide-react';
import { LiquidGlassCard } from '../LiquidGlassCard';
import { useLandingTheme } from '../../LandingThemeContext';
import { DemoButtons } from './DemoButtons';

interface DiscoveredNode {
  id: string;
  name: string;
  os: string;
  type: 'phone' | 'tablet' | 'desktop';
  paired: boolean;
}

const INITIAL_NODES: DiscoveredNode[] = [
  { id: 'pixel', name: 'Pixel 9', os: 'Android 15', type: 'phone', paired: true },
  { id: 'tab', name: 'Galaxy Tab S10', os: 'Android', type: 'tablet', paired: false },
  { id: 'studio', name: 'Studio Workstation', os: 'macOS', type: 'desktop', paired: false },
];

export const DeviceDiscoveryCard: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();
  const [nodes, setNodes] = useState<DiscoveredNode[]>(INITIAL_NODES);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);

  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#A8AEBA' : '#48484D';
  const blueTint = isDark ? '#60B2FF' : '#0071E3';
  const tealTint = isDark ? '#4ADBC8' : '#1D7F72';

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setVisibleCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 1500);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const togglePair = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, paired: !n.paired } : n))
    );
  };

  const handleReplay = () => {
    setVisibleCount(0);
    setIsPlaying(true);
    window.setTimeout(() => setVisibleCount(1), 220);
  };

  const getIcon = (type: DiscoveredNode['type']) => {
    if (type === 'phone') return <Smartphone size={16} />;
    if (type === 'tablet') return <Tablet size={16} />;
    return <Laptop size={16} />;
  };

  return (
    <LiquidGlassCard className="ac-feature-card" aria-label="Device Discovery">
      <div className="ac-feature-card-visual">
        <div className="ac-feature-card-visual-inner">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ position: 'relative', width: 12, height: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {isPlaying && !prefersReducedMotion && (
                  <motion.span
                    animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#30B8A6',
                    }}
                  />
                )}
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: isPlaying ? '#30B8A6' : '#86868B',
                  }}
                />
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>
                {isPlaying ? 'Scanning local network...' : 'Discovery paused'}
              </span>
            </div>
            <span style={{ fontSize: 11.5, fontWeight: 500, color: textSecondary }}>
              Click any device to pair
            </span>
          </div>

          <div className="ac-card-three-col-grid">
            {nodes.map((node, index) => {
              const appeared = index < visibleCount;
              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => togglePair(node.id)}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  style={{
                    textAlign: 'left',
                    padding: 16,
                    borderRadius: 18,
                    border: node.paired
                      ? '1.5px solid rgba(48, 184, 166, 0.65)'
                      : isDark ? '1.5px solid rgba(255, 255, 255, 0.2)' : '1.5px solid rgba(255, 255, 255, 0.92)',
                    background: isDark ? 'rgba(24, 30, 44, 0.62)' : 'rgba(255, 255, 255, 0.56)',
                    backdropFilter: 'saturate(200%) blur(20px)',
                    WebkitBackdropFilter: 'saturate(200%) blur(20px)',
                    boxShadow: appeared
                      ? isDark
                        ? '0 12px 28px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.2)'
                        : '0 10px 26px rgba(15, 35, 65, 0.08), inset 0 1.5px 0 rgba(255,255,255,0.98)'
                      : 'none',
                    opacity: appeared ? 1 : 0.3,
                    transform: appeared ? 'scale(1)' : 'scale(0.96)',
                    transition:
                      'opacity 280ms var(--ac-ease-out), transform 280ms var(--ac-ease-out), border-color 200ms ease, box-shadow 200ms ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: node.paired
                          ? 'rgba(48, 184, 166, 0.18)'
                          : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                        color: node.paired ? tealTint : textPrimary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getIcon(node.type)}
                    </div>
                    <Wifi size={14} color={appeared ? '#30B8A6' : '#8E94A0'} />
                  </div>

                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>
                      {node.name}
                    </div>
                    <div style={{ fontSize: 11.5, color: textSecondary }}>{node.os}</div>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: node.paired ? tealTint : blueTint,
                    }}
                  >
                    {node.paired ? (
                      <>
                        <Check size={12} strokeWidth={2.5} />
                        <span>Paired</span>
                      </>
                    ) : (
                      <span>Pair device</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="ac-feature-card-footer">
        <div style={{ maxWidth: 460 }}>
          <h3 className="ac-feature-heading" style={{ marginBottom: 8 }}>
            Device Discovery
          </h3>
          <p className="ac-intro-copy" style={{ fontSize: 16 }}>
            Nearby hardware appears automatically in one calm ecosystem. Approve trust once, and your devices remember each other whenever they are close.
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

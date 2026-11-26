import React, { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  CrossDeviceWorkflowCard,
  DeviceDiscoveryCard,
  DirectTransfersCard,
  PrivacyFirstCard,
} from '../components/feature-cards';

const CARD_LABELS = [
  'Direct Transfers',
  'Device Discovery',
  'Privacy First',
  'Cross-device Workflow',
];

export const FeaturesCarouselSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(CARD_LABELS.length - 1, index));
    const cards = track.querySelectorAll<HTMLElement>('.ac-feature-card');
    const target = cards[clamped];
    if (target) {
      const paddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft || '24');
      track.scrollTo({
        left: target.offsetLeft - paddingLeft,
        behavior: 'smooth',
      });
      setActiveIndex(clamped);
    }
  }, []);

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.ac-feature-card'));
    const paddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft || '24');
    const currentLeft = track.scrollLeft + paddingLeft;

    let closest = 0;
    let bestDist = Infinity;
    cards.forEach((card, idx) => {
      const dist = Math.abs(card.offsetLeft - currentLeft);
      if (dist < bestDist) {
        bestDist = dist;
        closest = idx;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section className="ac-features-section" id="features" aria-label="ArcCross Features">
      {/* Ambient Orbs so Liquid Glass feature cards visibly frost & refract */}
      <div className="ac-ambient-canvas" aria-hidden="true">
        <div
          className="ac-mesh-orb ac-mesh-orb--blue"
          style={{ width: 560, height: 420, top: 80, left: '6%' }}
        />
        <div
          className="ac-mesh-orb ac-mesh-orb--teal"
          style={{ width: 540, height: 420, bottom: 40, right: '8%' }}
        />
      </div>

      <div className="ac-container">
        <div className="ac-features-header">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="ac-section-headline">
              Built for how your
              <br />
              devices actually work.
            </h2>
          </motion.div>
          <motion.p
            className="ac-intro-copy"
            style={{ maxWidth: 400 }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.54, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            Explore each interaction directly. Switch files, pair nearby hardware, or test the route yourself.
          </motion.p>
        </div>

        {/* Liquid Glass TabNav Pills with Animated Selection */}
        <div className="ac-tabnav-bar" role="tablist" aria-label="Feature tabs">
          {CARD_LABELS.map((label, idx) => {
            const active = activeIndex === idx;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => scrollToCard(idx)}
                className={`ac-tabnav-pill ${active ? 'ac-tabnav-pill--active' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="ac-feature-tab-pill"
                    className="ac-tabnav-pill-bg"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.12 }
                        : { type: 'spring', bounce: 0.14, duration: 0.38 }
                    }
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Scrollable Track */}
      <div className="ac-carousel-viewport">
        <div
          ref={trackRef}
          className="ac-carousel-track"
          onScroll={handleTrackScroll}
          tabIndex={0}
          aria-label="Interactive feature cards"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              scrollToCard(activeIndex + 1);
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scrollToCard(activeIndex - 1);
            }
          }}
        >
          <DirectTransfersCard />
          <DeviceDiscoveryCard />
          <PrivacyFirstCard />
          <CrossDeviceWorkflowCard />
        </div>
      </div>

      {/* Scroll Indicator Dots & Glass Navigation Paddles */}
      <div className="ac-carousel-nav-row">
        <div className="ac-carousel-dots" role="tablist" aria-label="Feature card indicator">
          {CARD_LABELS.map((label, idx) => (
            <button
              key={label}
              type="button"
              aria-label={`Show ${label}`}
              aria-selected={activeIndex === idx}
              className={`ac-carousel-dot ${activeIndex === idx ? 'ac-carousel-dot--active' : ''}`}
              onClick={() => scrollToCard(idx)}
            />
          ))}
        </div>

        <div className="ac-paddle-group">
          <button
            type="button"
            className="ac-paddle-btn"
            aria-label="Previous feature"
            disabled={activeIndex === 0}
            onClick={() => scrollToCard(activeIndex - 1)}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="ac-paddle-btn"
            aria-label="Next feature"
            disabled={activeIndex === CARD_LABELS.length - 1}
            onClick={() => scrollToCard(activeIndex + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

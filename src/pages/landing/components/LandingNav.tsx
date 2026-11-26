import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { ArcCrossLogo } from '../../../components/common/ArcCrossLogo';
import { useLandingTheme } from '../LandingThemeContext';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'how-it-works', label: 'How it works', href: '#how-it-works' },
  { id: 'privacy', label: 'Privacy', href: '#privacy' },
];

export const LandingNav: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark, toggleDark } = useLandingTheme();
  const [scrolled, setScrolled] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(false);
  const [activeId, setActiveId] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 14);

      const privacyEl = document.getElementById('privacy');
      if (privacyEl) {
        const rect = privacyEl.getBoundingClientRect();
        setOverDarkSection(rect.top <= 58 && rect.bottom >= 26);
      }

      const probeY = 160;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top <= probeY) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navDarkStyle = isDark || overDarkSection;

  const navClasses = [
    'ac-nav',
    scrolled ? 'ac-nav--scrolled' : '',
    navDarkStyle ? 'ac-nav--dark' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={navClasses}>
      <div className="ac-nav-inner">
        <a href="#overview" className="ac-nav-brand" aria-label="ArcCross Overview">
          <ArcCrossLogo
            size={22}
            showText
            variant={navDarkStyle ? 'monochrome' : 'default'}
          />
        </a>

        <nav className="ac-nav-links" aria-label="Landing sections">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`ac-nav-link ${isActive ? 'ac-nav-link--active' : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="ac-nav-active-pill"
                    className="ac-nav-link-pill"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.12 }
                        : { type: 'spring', bounce: 0.14, duration: 0.42 }
                    }
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="ac-nav-actions">
          <button
            type="button"
            className="ac-theme-toggle"
            onClick={toggleDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -30, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 30, scale: 0.8 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link to="/app" className="ac-nav-cta">
            Open ArcCross
          </Link>

          <button
            type="button"
            className="ac-nav-mobile-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Liquid Glass Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="ac-nav-drawer"
            role="dialog"
            aria-label="Mobile navigation"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: -8 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: -8 }
            }
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="ac-nav-drawer-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={15} style={{ opacity: 0.45 }} />
              </a>
            ))}
            <div style={{ paddingTop: 14 }}>
              <Link
                to="/app"
                className="ac-btn-primary"
                style={{ width: '100%' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Open ArcCross
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

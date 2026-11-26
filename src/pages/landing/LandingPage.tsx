import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { LandingNav } from './components';
import { LandingThemeProvider, useLandingTheme } from './LandingThemeContext';
import {
  FeaturesCarouselSection,
  FinalCTASection,
  FooterSection,
  HeroSection,
  HowItWorksSection,
  PrivacySection,
  ScrollExperienceSection,
  StatementSection,
} from './sections';
import '../../styles/landing.css';

const LandingContent: React.FC = () => {
  const { isDark } = useLandingTheme();

  return (
    <div
      className="landing-page-root"
      data-landing-theme={isDark ? 'dark' : 'light'}
    >
      {/* Section 01 — Floating Liquid Glass Navigation + Dark Mode Toggle */}
      <LandingNav />

      <main>
        {/* Section 02 — Spatial Hero */}
        <HeroSection />

        {/* Section 03 — Product Statement */}
        <StatementSection />

        {/* Section 04 — Interactive Horizontal Feature Gallery */}
        <FeaturesCarouselSection />

        {/* Section 05 — Sticky Scroll-Driven Device Experience */}
        <ScrollExperienceSection />

        {/* Section 06 — Interactive How It Works */}
        <HowItWorksSection />

        {/* Section 07 — Full-Width Dark Privacy Architecture */}
        <PrivacySection />

        {/* Section 08 — Framed Liquid Glass Final CTA */}
        <FinalCTASection />
      </main>

      {/* Section 09 — Minimal Footer */}
      <FooterSection />
    </div>
  );
};

export const LandingPage: React.FC = () => {
  // Ensure root scrolling and sticky storytelling work cleanly while preserving globals.css for /app
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;
    const prevHtmlOverflowX = html.style.overflowX;
    const prevBodyOverflowX = body.style.overflowX;

    html.style.height = 'auto';
    body.style.height = 'auto';
    html.style.overflowX = 'clip';
    body.style.overflowX = 'clip';

    return () => {
      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
      html.style.overflowX = prevHtmlOverflowX;
      body.style.overflowX = prevBodyOverflowX;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LandingThemeProvider>
        <LandingContent />
      </LandingThemeProvider>
    </MotionConfig>
  );
};

export default LandingPage;

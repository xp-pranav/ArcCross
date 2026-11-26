import React from 'react';
import { Link } from 'react-router-dom';
import { ArcCrossLogo } from '../../../components/common/ArcCrossLogo';
import { useLandingTheme } from '../LandingThemeContext';

export const FooterSection: React.FC = () => {
  const { isDark } = useLandingTheme();

  return (
    <footer className="ac-footer" id="footer">
      <div className="ac-container">
        <div className="ac-footer-top">
          <ArcCrossLogo size={22} showText variant={isDark ? 'monochrome' : 'default'} />

          <nav className="ac-footer-links" aria-label="Footer navigation">
            <a href="#overview" className="ac-footer-link">
              Overview
            </a>
            <a href="#features" className="ac-footer-link">
              Features
            </a>
            <a href="#privacy" className="ac-footer-link">
              Privacy
            </a>
            <Link
              to="/app"
              className="ac-footer-link"
              style={{ color: isDark ? '#60B2FF' : '#0071E3', fontWeight: 500 }}
            >
              Open App
            </Link>
          </nav>
        </div>

        <div className="ac-footer-bottom">
          <span>Copyright &copy; {new Date().getFullYear()} ArcCross. All rights reserved.</span>
          <span>Direct local transfers between your devices.</span>
        </div>
      </div>
    </footer>
  );
};

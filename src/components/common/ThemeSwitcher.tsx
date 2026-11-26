import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ThemeSwitcher: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => {
  const { settings, setTheme } = useApp();

  const themes: Array<{ key: 'light' | 'dark' | 'system'; label: string; icon: React.ReactNode }> = [
    { key: 'light', label: 'Light', icon: <Sun size={size === 'sm' ? 12 : 14} /> },
    { key: 'dark', label: 'Dark', icon: <Moon size={size === 'sm' ? 12 : 14} /> },
    { key: 'system', label: 'Auto', icon: <Laptop size={size === 'sm' ? 12 : 14} /> },
  ];

  return (
    <div className="macos-segmented-control" role="group" aria-label="Theme selector">
      {themes.map((t) => {
        const isActive = settings.theme === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => setTheme(t.key)}
            className={`macos-segmented-button ${isActive ? 'active' : ''}`}
            title={`Switch to ${t.label} appearance`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

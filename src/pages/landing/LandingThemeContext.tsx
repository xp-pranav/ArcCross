import React, { createContext, useContext, useState } from 'react';

interface LandingThemeContextValue {
  isDark: boolean;
  toggleDark: () => void;
}

const LandingThemeContext = createContext<LandingThemeContextValue>({
  isDark: false,
  toggleDark: () => {},
});

export const LandingThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <LandingThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </LandingThemeContext.Provider>
  );
};

export function useLandingTheme(): LandingThemeContextValue {
  return useContext(LandingThemeContext);
}

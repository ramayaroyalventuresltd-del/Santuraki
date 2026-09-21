import React, { createContext, useContext, useState, useEffect } from 'react';

export type PortalTheme = 'navy-white' | 'midnight-navy';

interface ThemeContextType {
  theme: PortalTheme;
  setTheme: (theme: PortalTheme) => void;
  toggleTheme: () => void;
  isNavyWhite: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<PortalTheme>(() => {
    const saved = localStorage.getItem('fcta_portal_theme');
    return (saved === 'midnight-navy' ? 'midnight-navy' : 'navy-white');
  });

  const setTheme = (newTheme: PortalTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('fcta_portal_theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'navy-white' ? 'midnight-navy' : 'navy-white');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'navy-white') {
      root.classList.remove('theme-midnight-navy');
      root.classList.add('theme-navy-white');
    } else {
      root.classList.remove('theme-navy-white');
      root.classList.add('theme-midnight-navy');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isNavyWhite: theme === 'navy-white',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import React, { createContext, useContext, useEffect, useState } from 'react';

export type AccentColor = 'orange' | 'blue' | 'purple' | 'teal';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  accentColor: 'orange',
  setAccentColor: () => {},
  isSidebarExpanded: false,
  toggleSidebar: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('enttlevo-theme');
    return stored === 'dark';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const stored = localStorage.getItem('enttlevo-accent-color') as AccentColor;
    return ['orange', 'blue', 'purple', 'teal'].includes(stored) ? stored : 'orange';
  });

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem('enttlevo-sidebar-state');
    return stored === 'expanded';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('enttlevo-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('enttlevo-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    if (isSidebarExpanded) {
      root.style.setProperty('--sidebar-width', '280px');
      localStorage.setItem('enttlevo-sidebar-state', 'expanded');
    } else {
      root.style.setProperty('--sidebar-width', '64px');
      localStorage.setItem('enttlevo-sidebar-state', 'collapsed');
    }
  }, [isSidebarExpanded]);

  useEffect(() => {
    localStorage.setItem('enttlevo-accent-color', accentColor);
    const root = document.documentElement;
    
    // Define comprehensive color mappings (RGB format)
    const colors = {
      orange: { 
        primary: '150 73 0', 
        container: '255 128 0', 
        secondary: '109 81 65', 
        tertiary: '85 99 48', 
        raw: '#FF8000' 
      },
      blue: { 
        primary: '0 99 154', 
        container: '0 172 253', 
        secondary: '81 96 109', 
        tertiary: '101 88 124', 
        raw: '#3b82f6' 
      },
      purple: { 
        primary: '133 66 182', 
        container: '168 85 247', 
        secondary: '105 84 104', 
        tertiary: '124 82 91', 
        raw: '#8b5cf6' 
      },
      teal: { 
        primary: '0 107 101', 
        container: '20 184 166', 
        secondary: '78 99 97', 
        tertiary: '74 99 119', 
        raw: '#14b8a6' 
      },
    };
    
    const selected = colors[accentColor];
    root.style.setProperty('--color-primary', selected.primary);
    root.style.setProperty('--color-primary-container', selected.container);
    root.style.setProperty('--color-secondary', selected.secondary);
    root.style.setProperty('--color-tertiary', selected.tertiary);
    root.style.setProperty('--accent-raw', selected.raw);
  }, [accentColor]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const setAccentColor = (color: AccentColor) => setAccentColorState(color);
  const toggleSidebar = () => setIsSidebarExpanded((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ 
      isDark, toggleTheme, accentColor, setAccentColor, isSidebarExpanded, toggleSidebar 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


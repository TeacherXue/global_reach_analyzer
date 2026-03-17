import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    isDark: true,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('gra-theme');
        return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    });

    const isDark = theme === 'dark';

    useEffect(() => {
        localStorage.setItem('gra-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;

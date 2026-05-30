import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check local storage or system preference
    const stored = localStorage.getItem('simulae_theme');
    if (stored) {
      setTheme(stored);
      if (stored === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else {
      // Default to dark
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('simulae_theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('simulae_theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  return { theme, toggleTheme };
}

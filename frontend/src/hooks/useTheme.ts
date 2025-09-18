import { useEffect, useState } from 'react';

export default function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.transition = 'background-color 300ms, color 300ms';
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('useTheme: failed to persist theme or update document', err);
    }
  }, [isDark]);

  return { isDark, setIsDark } as const;
}

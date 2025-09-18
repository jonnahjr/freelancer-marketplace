import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useTheme from '../hooks/useTheme';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { isDark: dark, setIsDark: setDark } = useTheme();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem('user');
      if (u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-surface shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src="/icons/logo.svg" alt="Freelancer Market logo" className="h-8 object-contain" />
          <span className="font-semibold text-lg text-primary hidden sm:inline">FreelancerMarket</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/jobs" className="text-muted hover:text-primary">Jobs</Link>
          <Link to="/post-job" className="text-muted hover:text-primary">Post Job</Link>
          <Link to="/messages" className="text-muted hover:text-primary">Messages</Link>
          {user ? (
            <>
              <Link to="/profile/me" className="text-muted">{user.name || user.email}</Link>
              <button onClick={() => { localStorage.removeItem('accessToken'); localStorage.removeItem('user'); setUser(null); window.location.href = '/'; }} className="ml-3 inline-flex items-center px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-500">Logout</button>
            </>
          ) : (
            <Link to="/login" className="inline-flex items-center px-3 py-1 rounded bg-primary text-white text-sm hover:opacity-90">Sign in</Link>
          )}
          <button
            aria-label="toggle theme"
            aria-pressed={dark}
            onClick={() => setDark(!dark)}
            className="ml-2 p-2 rounded theme-toggle"
            title="Toggle color mode"
          >
            {dark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        <div className="md:hidden">
          <button aria-label="open menu" className="p-2 rounded-md bg-gray-100">Menu</button>
        </div>
      </div>
    </motion.nav>
  );
}

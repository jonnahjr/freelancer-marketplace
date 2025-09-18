import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AuthCallback() {
  const q = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const token = q.get('token');
    const provider = q.get('provider');
    if (token) {
      // store token and navigate to profile
      localStorage.setItem('accessToken', token);
      // fetch user info from backend /auth/me
      (async () => {
        try {
          const res = await fetch(
            `${(window as any).__BACKEND_URL__ || 'http://localhost:3000'}/auth/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const data = await res.json();
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        } catch (e) {
          // ignore
        } finally {
          navigate('/profile/me');
        }
      })();
    } else {
      // no token: handle code or error
      const code = q.get('code');
      if (code && provider) {
        // if you want to exchange code client-side, you can implement here
        // For now, navigate to a mock page
        navigate('/profile/me');
      } else {
        navigate('/login');
      }
    }
  }, [q, navigate]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-bg">
      <div className="bg-surface p-6 rounded-lg shadow text-center">
        <h3 className="text-lg font-semibold text-primary">Signing you in…</h3>
        <p className="text-muted mt-2">Completing authentication flow.</p>
      </div>
    </div>
  );
}

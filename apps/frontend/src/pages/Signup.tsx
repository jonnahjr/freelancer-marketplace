import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(
      `${(window as any).__BACKEND_URL__ || 'http://localhost:3000'}/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      },
    );
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      try {
        const me = await fetch(
          `${(window as any).__BACKEND_URL__ || 'http://localhost:3000'}/auth/me`,
          {
            headers: { Authorization: `Bearer ${data.accessToken}` },
          },
        );
        const meData = await me.json();
        if (meData.user) localStorage.setItem('user', JSON.stringify(meData.user));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Signup: failed to fetch current user after signup', err);
      }
      navigate('/profile/me');
    } else {
      alert(data.error || 'Signup failed');
    }
  }

  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto bg-surface p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-primary">Create your account</h2>
          <form className="space-y-4" onSubmit={submit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-surface"
              placeholder="Full name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-surface"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-surface"
              placeholder="Password"
              type="password"
            />
            <button className="w-full py-2 btn-primary text-white rounded">Create account</button>
          </form>
        </div>
      </main>
    </div>
  );
}

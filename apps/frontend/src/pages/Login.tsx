import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto bg-surface p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Sign in to your account</h2>
          <form className="space-y-4">
            <input className="w-full border rounded px-3 py-2" placeholder="Email" />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Password"
              type="password"
            />
            <div className="flex justify-between items-center">
              <label className="text-sm">
                <input type="checkbox" /> Remember me
              </label>
              <a className="text-sm text-blue-600">Forgot?</a>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded">Sign in</button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-muted">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {
                // Use backend endpoints for real OAuth. If window.__BACKEND_URL__ is set at runtime use it.
              }
              <a
                href={`${(window as any).__BACKEND_URL__ || 'http://localhost:3000'}/auth/google`}
                aria-label="Sign in with Google"
                className="flex items-center justify-center gap-2 px-3 py-2 border rounded hover:shadow"
                role="button"
              >
                <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Google</span>
              </a>
              <a
                href={`${(window as any).__BACKEND_URL__ || 'http://localhost:3000'}/auth/github`}
                aria-label="Sign in with Github"
                className="flex items-center justify-center gap-2 px-3 py-2 border rounded hover:shadow"
                role="button"
              >
                <img src="/icons/github.svg" alt="Github" className="w-5 h-5" />
                <span className="text-sm">Github</span>
              </a>
              <Link
                to="/auth/apple"
                aria-label="Sign in with Apple"
                className="flex items-center justify-center gap-2 px-3 py-2 border rounded hover:shadow"
                role="button"
              >
                <img src="/icons/apple.svg" alt="Apple" className="w-5 h-5" />
                <span className="text-sm">Apple</span>
              </Link>
            </div>

            <p className="mt-3 text-xs text-muted">
              To enable social login you need matching OAuth routes on the backend:{' '}
              <code>/auth/google</code>, <code>/auth/github</code>, <code>/auth/apple</code>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

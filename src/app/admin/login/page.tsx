'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Invalid password');
      router.push('/admin');
    } catch {
      setError('Incorrect password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden relative">
            <Image src="/logo.svg" alt="Fashion Spot" fill className="object-cover" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#F3ECE0]">Admin Panel</h1>
          <p className="text-[#C4A49E] text-sm mt-1">Fashion Spot Mangalore</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-7">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#6B1420]/20 mx-auto mb-6">
            <Lock size={22} className="text-[#C9A24B]" />
          </div>

          <label className="block text-sm text-[#DDD5C8] mb-2">Admin Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 pr-12 bg-[#121212] border border-[#2a2a2a] rounded-xl text-[#F3ECE0] placeholder-[#C4A49E] text-sm"
              id="admin-password-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C4A49E] hover:text-[#C9A24B] transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 burgundy-gradient text-[#F3ECE0] font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
            id="admin-login-button"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-[#C4A49E] text-xs mt-6">
          Fashion Spot Admin — Mangalore
        </p>
      </div>
    </div>
  );
}

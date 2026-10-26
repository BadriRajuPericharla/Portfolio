import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, Check, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onReturnHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Configured admin credentials
  const VALID_EMAILS = [
    'admin@gamedeveloper.com',
    'admin@portfolio.com',
    'admin@unitydev.com',
    'bhagavanpericharla@gmail.com'
  ];
  const VALID_PASS = 'Badri@123-Portfolio.GameDeveloper';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (
      (VALID_EMAILS.includes(trimmedEmail) || trimmedEmail === 'admin') &&
      trimmedPass === VALID_PASS
    ) {
      // Purge any storage to ensure zero persistent session leakage across devices
      if (typeof window !== 'undefined') {
        localStorage.removeItem('badri_admin_logged_in');
        sessionStorage.removeItem('badri_admin_logged_in');
      }
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please verify your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Atmospheric Glows */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: 'var(--color-primary, #FF7A18)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: 'var(--color-secondary, #FFC857)' }}
      />

      <div className="relative w-full max-w-md bg-[#1C1C1C]/95 backdrop-blur-xl border border-[#303030] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Back Link */}
        <button
          onClick={onReturnHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#FF7A18]" />
          <span>Back to Live Portfolio</span>
        </button>

        {/* Enter Credentials */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF7A18] to-[#FFC857] flex items-center justify-center text-white shadow-lg shadow-[#FF7A18]/30 mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
            Portfolio Admin Gate
          </h1>
          <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1.5">
            Credentials required every session. Not saved on any system.
          </p>
        </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium mb-6 animate-in fade-in duration-200">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gamedeveloper.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-[#303030] text-[#FAFAFA] placeholder-[#555555] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A18] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#111111] border border-[#303030] text-[#FAFAFA] placeholder-[#555555] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A18] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#A3A3A3] hover:text-[#FAFAFA] p-0.5"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF7A18] via-[#FF9233] to-[#FF7A18] hover:opacity-95 shadow-lg shadow-[#FF7A18]/30 transition-all hover:scale-[1.01] active:scale-100 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </button>
            </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, Check, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onReturnHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSavePrompt, setShowSavePrompt] = useState(false);

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
      // Credentials verified! Transition to asking user whether to save credentials on this device
      setShowSavePrompt(true);
    } else {
      setError('Invalid credentials. Please verify your email and password.');
    }
  };

  const handleConfirmSave = (saveOnDevice) => {
    if (saveOnDevice) {
      // User chose YES: Persist in localStorage so future visits DO NOT ask for credentials
      if (typeof window !== 'undefined') {
        localStorage.setItem('badri_admin_logged_in', 'true');
        sessionStorage.removeItem('badri_admin_logged_in');
      }
    } else {
      // User chose NO: Persist only in sessionStorage so next visit WILL ask for credentials again
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('badri_admin_logged_in', 'true');
        localStorage.removeItem('badri_admin_logged_in');
      }
    }
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Charcoal & Warm Orange Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7A18]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFC857]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#1C1C1C]/95 backdrop-blur-xl border border-[#303030] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Back Link */}
        <button
          onClick={onReturnHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#FF7A18]" />
          <span>Back to Live Portfolio</span>
        </button>

        {showSavePrompt ? (
          /* STEP 2: Explicit User Choice — Save Data On This Device or Not */
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-[#FF7A18]/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-semibold mb-2">
                Authentication Successful
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#FAFAFA] font-display">
                Save credentials on this device?
              </h2>
              <p className="text-[#A3A3A3] text-xs sm:text-sm mt-2 leading-relaxed">
                Choose whether you want this browser to remember your login session for future visits:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Option 1: YES — Save on this device (Don't ask credentials next time) */}
              <button
                type="button"
                onClick={() => handleConfirmSave(true)}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#FF7A18] via-[#FF9233] to-[#FF7A18] hover:opacity-95 text-white shadow-lg shadow-[#FF7A18]/25 text-left transition-all hover:scale-[1.01] active:scale-100 flex items-start gap-3.5 group border border-[#FF7A18]/50"
              >
                <div className="p-2 rounded-xl bg-black/20 text-white shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-white flex items-center justify-between gap-2">
                    <span>Yes, Save on this Device</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-white/90 shrink-0">
                      Don't Ask Again
                    </span>
                  </div>
                  <div className="text-xs text-white/80 mt-1 leading-snug">
                    Save my session permanently. Future visits will open directly without asking for credentials.
                  </div>
                </div>
              </button>

              {/* Option 2: NO — One-time session (Ask credentials every time) */}
              <button
                type="button"
                onClick={() => handleConfirmSave(false)}
                className="w-full p-4 rounded-2xl bg-[#141414] hover:bg-[#202020] border border-[#303030] hover:border-[#FF7A18]/40 text-left transition-all hover:scale-[1.01] active:scale-100 flex items-start gap-3.5 group"
              >
                <div className="p-2 rounded-xl bg-[#242424] text-[#A3A3A3] group-hover:text-[#FAFAFA] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[#FAFAFA] group-hover:text-[#FF7A18] flex items-center justify-between gap-2">
                    <span>No, Ask Me Every Time</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#A3A3A3] shrink-0">
                      One-Time Only
                    </span>
                  </div>
                  <div className="text-xs text-[#A3A3A3] mt-1 leading-snug">
                    Do not save credentials on this browser. The next time you visit or reopen, it will ask for credentials again.
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* STEP 1: Enter Credentials */
          <>
            {/* Header with Icon */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF7A18] to-[#FFC857] flex items-center justify-center text-white shadow-lg shadow-[#FF7A18]/30 mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
                Portfolio Admin Gate
              </h1>
              <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1.5">
                Manage games, resume, website matter, and hero settings.
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
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF7A18] via-[#FF9233] to-[#FF7A18] hover:opacity-95 shadow-lg shadow-[#FF7A18]/30 transition-all hover:scale-[1.01] active:scale-100"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

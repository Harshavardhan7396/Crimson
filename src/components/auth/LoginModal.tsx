import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LiquidPortal } from '../3d/LiquidPortal';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { login, setAuthPhase } = useAuth();
  const [email, setEmail] = useState('v.singhania@apexlogistics.io');
  const [password, setPassword] = useState('CrimsonApex@2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid corporate email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password, rememberMe);
    } catch (err) {
      setErrorMessage('Authentication gateway timed out. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    login('bodduharshavardhan41@gmail.com', 'GoogleOAuth2026', true);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-black overflow-hidden select-none">
      {/* Dynamic Blood-Red Liquid Portal Canvas Background */}
      <LiquidPortal isExpanding={false} />

      {/* Main Glassmorphism Authentication Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-2xl glass-panel shadow-[0_0_60px_rgba(220,38,38,0.22)] border border-red-800/40">
        
        {/* Large Animated Droplet Logo in Center */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-red-500/40 animate-ping opacity-40" />
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-950 via-red-700 to-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)] flex items-center justify-center border border-red-400/50">
              <div className="w-5 h-7 rounded-full bg-white/90 transform -rotate-12 blur-[0.5px] shadow-[0_0_10px_#fff]" />
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white font-display">
            AETHER <span className="text-red-500 crimson-text-glow">CRIMSON</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono tracking-wider uppercase">
            Global Logistics Command Terminal
          </p>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/70 border border-red-600/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
              Corporate / Personal Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors font-sans cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Remember this terminal</span>
            </label>
            <span className="text-[11px] font-mono text-neutral-500">256-Bit Encrypted</span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Initiating Liquid Portal...
              </span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Enter Logistics Command</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>
          <span className="relative px-3 bg-[#0d0f17] text-[11px] text-neutral-500 uppercase font-mono tracking-wider">
            Or Authorized Single Sign-On
          </span>
        </div>

        {/* Google SSO Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 text-neutral-200 text-xs font-medium transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>Continue with Google Enterprise</span>
        </button>

        {/* Switch to Signup */}
        <div className="mt-6 text-center text-xs text-neutral-400">
          <span>Need a business shipping account? </span>
          <button
            type="button"
            onClick={() => setAuthPhase('auth_signup')}
            className="text-red-400 font-semibold hover:text-red-300 ml-1 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Create Account</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Security watermark */}
        <div className="mt-6 pt-4 border-t border-neutral-900/80 flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-red-500/70" />
          <span>ISO 27001 & DGFT Compliant Logistics Portal</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm p-6 rounded-2xl glass-panel border border-red-800/60 text-left">
            <h3 className="text-base font-bold text-white font-display">Reset Terminal Access</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Enter your registered corporate email. We'll send a cryptographic authorization link to reset your credentials.
            </p>

            {forgotSent ? (
              <div className="my-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 text-xs">
                Authorization email dispatched. Check your inbox and follow instructions.
              </div>
            ) : (
              <div className="my-4">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-700 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotSent(false);
                }}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  onClick={() => {
                    if (forgotEmail) setForgotSent(true);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

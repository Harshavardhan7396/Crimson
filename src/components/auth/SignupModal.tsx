import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LiquidPortal } from '../3d/LiquidPortal';
import { User, Mail, Phone, Lock, Globe, ArrowLeft, Check, Shield } from 'lucide-react';
import { ServiceCategory } from '../../types/logistics';

export const SignupModal: React.FC = () => {
  const { signup, setAuthPhase } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [preferredService, setPreferredService] = useState<ServiceCategory>('import');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic password strength computation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-neutral-800' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-red-600' };
    if (score === 2) return { score: 50, label: 'Moderate', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Strong', color: 'bg-emerald-500' };
    return { score: 100, label: 'Military-Grade', color: 'bg-red-500 shadow-[0_0_10px_#ef4444]' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full business or individual name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('Please accept the Global Freight Terms & Conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signup({
        fullName,
        email,
        phone,
        country,
        preferredService,
        password
      });
    } catch (err) {
      setErrorMessage('Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-black overflow-y-auto select-none py-12">
      <LiquidPortal isExpanding={false} />

      <div className="relative z-10 w-full max-w-lg p-6 sm:p-10 rounded-2xl glass-panel shadow-[0_0_60px_rgba(220,38,38,0.22)] border border-red-800/40 my-auto">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => setAuthPhase('auth_login')}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-4 transition-colors font-mono cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Terminal Login</span>
        </button>

        <div className="text-left mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-white font-display">
            Create Business Account
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Join the Aether Crimson autonomous global freight and cross-border transport network.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/70 border border-red-600/50 text-red-200 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Full Name / Organization
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  placeholder="e.g. Vikram Singhania"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98450 00000"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Country of Operation
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
              Primary Service Preference
            </label>
            <select
              value={preferredService}
              onChange={e => setPreferredService(e.target.value as ServiceCategory)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="import">Importing Freight & Cross-Border Sourcing</option>
              <option value="export">Exporting Consignments to International Markets</option>
              <option value="order_product">Procure & Deliver (Specialized Sourcing)</option>
              <option value="express_delivery">Rapid Urban & Domestic Courier</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Min 8 characters"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat password"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Password Strength Visualization */}
          {password && (
            <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-mono">Password Security Level</span>
                <span className="font-mono text-neutral-200 font-medium">{strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300 rounded-full`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-300">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-red-500"
              />
              <span>
                I agree to the Aether Crimson <span className="text-red-400 underline">Master Logistics Agreement</span> and international customs dispatch protocols.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Provisioning Account & 500 Bonus Pts...
              </span>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Create Enterprise Account (Receive 500 Pts)</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-400">
          <span>Already registered with Aether Crimson? </span>
          <button
            type="button"
            onClick={() => setAuthPhase('auth_login')}
            className="text-red-400 font-semibold hover:text-red-300 ml-1 cursor-pointer"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};

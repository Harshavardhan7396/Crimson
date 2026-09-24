import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Globe, Plane, ShieldCheck, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setAuthPhase } = useAuth();
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Sequence:
    // 0: Droplet (0-1.2s)
    // 1: Globe (1.2-2.4s)
    // 2: Route (2.4-3.6s)
    // 3: Vehicle (3.6-4.5s)
    // 4: Complete -> Login
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2400);
    const t3 = setTimeout(() => setStage(3), 3600);
    const t4 = setTimeout(() => setAuthPhase('auth_login'), 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [setAuthPhase]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-black to-black" />

      {/* Skip Button */}
      <button
        onClick={() => setAuthPhase('auth_login')}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-mono tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Center Cinematic Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Animated Sequence Icon */}
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          {/* Outer Pulse Rings */}
          <div className="absolute inset-0 rounded-full border border-red-600/30 animate-ping opacity-30" />
          <div className="absolute -inset-4 rounded-full border border-red-500/20 animate-pulse-glow" />

          {/* Morphing Stage Element */}
          {stage === 0 && (
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-800 to-red-500 shadow-[0_0_40px_rgba(239,68,68,0.7)] flex items-center justify-center transition-all duration-700 animate-pulse">
              <div className="w-6 h-6 rounded-full bg-white/80 blur-xs" />
            </div>
          )}

          {stage === 1 && (
            <div className="w-24 h-24 rounded-full bg-neutral-950 border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)] flex items-center justify-center transition-all duration-700">
              <Globe className="w-12 h-12 text-red-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          )}

          {stage === 2 && (
            <div className="w-24 h-24 rounded-full bg-neutral-950 border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)] flex items-center justify-center transition-all duration-700">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-1 rounded-full bg-red-600 rotate-45" />
                <div className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#fff]" />
              </div>
            </div>
          )}

          {stage >= 3 && (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-950 to-black border-2 border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.8)] flex items-center justify-center transition-all duration-700 scale-110">
              <Plane className="w-12 h-12 text-white animate-bounce" />
            </div>
          )}
        </div>

        {/* Brand Typography */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white font-display uppercase">
          Aether <span className="text-red-500 crimson-text-glow">Crimson</span>
        </h1>

        <p className="mt-2 text-neutral-400 text-sm tracking-widest uppercase font-mono">
          Connecting Products · Connecting Worlds
        </p>

        {/* Sequence Progress Bar */}
        <div className="w-48 h-1 bg-neutral-900 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 rounded-full"
            style={{ width: `${((stage + 1) / 4) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-6 mt-4 text-[11px] font-mono text-neutral-500">
          <span className={stage >= 0 ? 'text-red-400' : ''}>Droplet</span>
          <span>→</span>
          <span className={stage >= 1 ? 'text-red-400' : ''}>Globe</span>
          <span>→</span>
          <span className={stage >= 2 ? 'text-red-400' : ''}>Route</span>
          <span>→</span>
          <span className={stage >= 3 ? 'text-red-400' : ''}>Transport</span>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-red-500" />
          <span>Autonomous Global Logistics Network</span>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { LiquidPortal } from '../3d/LiquidPortal';
import { Starfield } from '../3d/Starfield';

export const AuthTransition: React.FC = () => {
  const [phase, setPhase] = useState<'expanding' | 'night_sky' | 'emerging'>('expanding');

  useEffect(() => {
    // Stage 1: Liquid droplet explodes / blooms outwards across screen (0-1.1s)
    // Stage 2: Fade to dark night sky with twinkling stars and crimson nebulae (1.1-1.8s)
    // Stage 3: Dashboard interface smoothly emerges
    const t1 = setTimeout(() => {
      setPhase('night_sky');
    }, 1100);

    const t2 = setTimeout(() => {
      setPhase('emerging');
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {phase === 'expanding' && (
        <LiquidPortal isExpanding={true} />
      )}

      {/* Expanding shockwave ring */}
      {phase === 'expanding' && (
        <div className="absolute w-20 h-20 rounded-full bg-red-600/30 animate-ping shadow-[0_0_120px_#ef4444]" />
      )}

      {/* Night sky layer fading in */}
      {(phase === 'night_sky' || phase === 'emerging') && (
        <div className="absolute inset-0 transition-opacity duration-1000 opacity-100">
          <Starfield intensity={1.2} showNebula={true} />
        </div>
      )}

      {/* Center Cinematic Emergence HUD */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="w-16 h-1 bg-red-600 rounded-full animate-pulse shadow-[0_0_20px_#ef4444] mb-3" />
        <h3 className="text-xl font-bold font-display uppercase tracking-widest text-white crimson-text-glow">
          Aether Crimson Logistics
        </h3>
        <p className="text-xs font-mono uppercase tracking-widest text-red-400 mt-1">
          Synchronizing Global Telemetry & Flight Corridors...
        </p>
      </div>
    </div>
  );
};

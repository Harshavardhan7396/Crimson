import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { VEHICLE_OPTIONS } from '../../data/mockLogisticsData';
import { DeliveryVehicleType } from '../../types/logistics';
import { 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Info,
  Scale,
  Compass,
  Zap
} from 'lucide-react';

export const SmartPricingCalculator: React.FC = () => {
  const { calculatePricing, setCurrentView } = useLogistics();

  const [distanceKm, setDistanceKm] = useState(28);
  const [weightKg, setWeightKg] = useState(5);
  const [vehicleType, setVehicleType] = useState<DeliveryVehicleType>('car');
  const [speed, setSpeed] = useState<'standard' | 'express' | 'ultra_priority'>('express');
  const [isInternational, setIsInternational] = useState(false);
  const [declaredValueINR, setDeclaredValueINR] = useState(25000);
  const [insurance, setInsurance] = useState(true);
  const [customsClearance, setCustomsClearance] = useState(false);

  // Dynamic pricing breakdown
  const breakdown = calculatePricing({
    distanceKm,
    weightKg,
    vehicleType,
    speed,
    isInternational,
    declaredValueINR,
    insurance,
    customsClearance
  });

  const selectedVehicleObj = VEHICLE_OPTIONS.find(v => v.id === vehicleType) || VEHICLE_OPTIONS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-red-900/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-600/40 text-red-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Smart Pricing Engine</h2>
            <p className="text-xs text-neutral-400">
              Transparent, algorithmic rate estimation with dynamic distance, weight, vehicle, and corridor factoring.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Interactive Parameters */}
        <div className="lg:col-span-2 space-y-5">
          {/* Scope Toggle: Domestic vs International */}
          <div className="p-5 rounded-2xl glass-panel border border-red-900/30 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              1. Transport Territory
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsInternational(false);
                  setDistanceKm(Math.min(distanceKm, 800));
                  setCustomsClearance(false);
                }}
                className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  !isInternational
                    ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Domestic / Intra-City Transport
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsInternational(true);
                  if (distanceKm < 1000) setDistanceKm(3500);
                  setCustomsClearance(true);
                  if (vehicleType === 'bike' || vehicleType === 'car') setVehicleType('air');
                }}
                className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isInternational
                    ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Cross-Border / International Freight
              </button>
            </div>
          </div>

          {/* Distance & Weight Sliders */}
          <div className="p-5 rounded-2xl glass-panel border border-red-900/30 space-y-5">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              2. Consignment Dimensions & Range
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-red-400" />
                  <span>Transit Distance</span>
                </span>
                <span className="font-mono text-red-400 font-bold tabular-nums">
                  {distanceKm.toLocaleString()} km
                </span>
              </div>
              <input
                type="range"
                min={isInternational ? 500 : 2}
                max={isInternational ? 12000 : 1500}
                step={isInternational ? 100 : 2}
                value={distanceKm}
                onChange={e => setDistanceKm(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                <span>{isInternational ? '500 km' : '2 km (Local Metro)'}</span>
                <span>{isInternational ? '12,000 km (Global)' : '1,500 km (Inter-State)'}</span>
              </div>
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-red-400" />
                  <span>Package Weight</span>
                </span>
                <span className="font-mono text-red-400 font-bold tabular-nums">
                  {weightKg.toLocaleString()} kg
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max={vehicleType === 'sea' ? 5000 : vehicleType === 'air' ? 1000 : 150}
                step={weightKg > 50 ? 5 : 0.5}
                value={weightKg}
                onChange={e => setWeightKg(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                <span>0.5 kg</span>
                <span>{vehicleType === 'sea' ? '5,000 kg' : vehicleType === 'air' ? '1,000 kg' : '150 kg'}</span>
              </div>
            </div>
          </div>

          {/* Vehicle Selection Row */}
          <div className="p-5 rounded-2xl glass-panel border border-red-900/30 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              3. Transport Vehicle Selection
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {VEHICLE_OPTIONS.filter(v => isInternational ? v.isInternational : !v.isInternational).map(v => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleType(v.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    vehicleType === v.id
                      ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white truncate">{v.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-red-400 font-mono mt-0.5">₹{v.perKmRateINR}/km</div>
                </button>
              ))}
            </div>
          </div>

          {/* Speed Tier & Addons */}
          <div className="p-5 rounded-2xl glass-panel border border-red-900/30 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              4. Speed & Protection Addons
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', name: 'Standard', note: 'Nominal Schedule' },
                { id: 'express', name: 'Express', note: '+25% Speed Surge' },
                { id: 'ultra_priority', name: 'Ultra Priority', note: 'Direct Slot Dispatch' }
              ].map(sp => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSpeed(sp.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    speed === sp.id
                      ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold text-white">{sp.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{sp.note}</div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-neutral-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={e => setInsurance(e.target.checked)}
                  className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-red-500"
                />
                <span>High-Value Cargo Insurance (0.8%)</span>
              </label>

              {isInternational && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customsClearance}
                    onChange={e => setCustomsClearance(e.target.checked)}
                    className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-red-500"
                  />
                  <span>Expedited Customs Brokerage</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right Live Calculation Output */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-panel border border-red-900/40 text-neutral-200 space-y-4 sticky top-24">
            <div className="flex items-center gap-2 pb-3 border-b border-red-900/30">
              <Sparkles className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Visual Formula Calculation
              </h3>
            </div>

            {/* Formula visualization string as requested in prompt */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-neutral-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Distance</span>
                <span className="text-white font-semibold">{distanceKm} km</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Package Weight</span>
                <span className="text-white font-semibold">{weightKg} kg</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Service Mode</span>
                <span className="text-white font-semibold">{selectedVehicleObj.name.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Speed Tier</span>
                <span className="text-red-400 font-semibold uppercase">{speed.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Breakdown lines */}
            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between text-neutral-400">
                <span>Base Fleet Fare</span>
                <span className="font-mono text-white">₹{breakdown.baseFare.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Mileage Calculation</span>
                <span className="font-mono text-white">₹{breakdown.distanceCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Weight Tariff</span>
                <span className="font-mono text-white">₹{breakdown.weightCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Speed Multiplier</span>
                <span className="font-mono text-white">₹{breakdown.speedSurcharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Addons & Escrow</span>
                <span className="font-mono text-white">₹{breakdown.addonsCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>GST (18% Statutory)</span>
                <span className="font-mono text-white">₹{breakdown.gstTax.toLocaleString()}</span>
              </div>

              {/* Total Estimated Price */}
              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-semibold text-white">Estimated Price</span>
                  <div className="text-[10px] text-neutral-500 font-mono">Dynamic AI Algorithm</div>
                </div>
                <span className="text-2xl font-extrabold text-red-500 font-mono tabular-nums crimson-text-glow">
                  ₹{breakdown.totalINR.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                Final price may vary based on actual logistics conditions, volumetric dimensional weight, and customs duties.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView('order_create')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Proceed to Booking with this Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

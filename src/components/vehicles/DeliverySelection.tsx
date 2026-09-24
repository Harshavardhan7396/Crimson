import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { VEHICLE_OPTIONS } from '../../data/mockLogisticsData';
import { VehicleViewer } from '../3d/VehicleViewer';
import { DeliveryVehicleType } from '../../types/logistics';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const DeliverySelection: React.FC = () => {
  const { setCurrentView } = useLogistics();
  const [selectedVehicle, setSelectedVehicle] = useState<DeliveryVehicleType>('car');
  const [isExpress, setIsExpress] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-900/20">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-red-400 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Transportation Fleet</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Delivery Service Selection</h2>
          <p className="text-xs text-neutral-400">
            Compare our dedicated fleet vehicles engineered for rapid urban dispatch to global intercontinental freight.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
          <button
            onClick={() => setIsExpress(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              !isExpress ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Standard Transit
          </button>
          <button
            onClick={() => setIsExpress(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isExpress ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Express Priority
          </button>
        </div>
      </div>

      {/* Featured Interactive 3D/Canvas Vehicle Viewer Stage */}
      <VehicleViewer selectedVehicle={selectedVehicle} isExpress={isExpress} />

      {/* Grid of All 5 Fleet Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {VEHICLE_OPTIONS.map(veh => {
          const isSelected = selectedVehicle === veh.id;
          return (
            <div
              key={veh.id}
              onClick={() => setSelectedVehicle(veh.id)}
              className={`p-4 rounded-2xl glass-panel transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? 'border-red-500 bg-red-950/40 shadow-[0_0_25px_rgba(239,68,68,0.25)] scale-[1.02]'
                  : 'border-red-900/20 hover:border-red-800/50 hover:bg-neutral-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {veh.isInternational ? 'International' : 'Urban / Domestic'}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>

                <h4 className="text-sm font-bold text-white font-display">{veh.name}</h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">{veh.tagline}</p>

                <div className="mt-3 pt-3 border-t border-neutral-800/80 space-y-1.5 text-[11px]">
                  <div className="text-neutral-400">
                    <span className="font-mono text-white font-medium">{veh.capacity}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Base Fare</span>
                    <span className="font-mono text-red-400 font-semibold">₹{veh.baseFareINR.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Rate</span>
                    <span className="font-mono text-neutral-200">₹{veh.perKmRateINR}/km</span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVehicle(veh.id);
                  setCurrentView('order_create');
                }}
                className={`w-full mt-4 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
                }`}
              >
                <span>Book This Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

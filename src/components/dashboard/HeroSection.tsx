import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLogistics } from '../../context/LogisticsContext';
import { Globe3D } from '../3d/Globe3D';
import { 
  ArrowRight, 
  Navigation, 
  Plus, 
  Activity, 
  Globe2, 
  Package, 
  Send, 
  Sparkles,
  Plane
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentView, orders } = useLogistics();

  // Animated counters state
  const [counts, setCounts] = useState({
    delivered: 48200,
    active: 1420,
    imports: 12500,
    exports: 19300,
    countries: 180
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCounts(prev => ({
        delivered: prev.delivered + Math.floor(Math.random() * 2),
        active: Math.min(1500, Math.max(1400, prev.active + (Math.random() > 0.5 ? 1 : -1))),
        imports: prev.imports + (Math.random() > 0.7 ? 1 : 0),
        exports: prev.exports + (Math.random() > 0.6 ? 1 : 0),
        countries: 184
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeShipment = orders.find(o => o.status === 'in_transit') || orders[0];

  return (
    <section className="relative space-y-6">
      {/* Top Welcome Greeting & Dynamic System Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-red-900/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All systems operational</span>
            <span className="text-neutral-600">·</span>
            <span>Satellite Uplink Nominal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Welcome back, {user?.fullName || 'Distinguished Partner'}
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Your global logistics journey starts here. Real-time autonomous dispatch across 184 countries.
          </p>
        </div>

        {/* Action Button cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('tracking')}
            className="px-4 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-red-400" />
            <span>Track Active ({orders.filter(o => o.status !== 'delivered').length})</span>
          </button>

          <button
            onClick={() => setCurrentView('order_create')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Consignment</span>
          </button>
        </div>
      </div>

      {/* Center 3D Globe Viewport with Statistics overlay */}
      <div className="relative">
        <Globe3D />

        {/* Overlay Statistics Badges around Globe */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
          <div className="p-3.5 rounded-xl glass-panel border border-red-900/30 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <Package className="w-3.5 h-3.5 text-red-400" />
              <span>Orders Delivered</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
              {counts.delivered.toLocaleString()}+
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">99.8% on-schedule rate</div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-red-900/30 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Active Shipments</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
              {counts.active.toLocaleString()}
            </div>
            <div className="text-[10px] text-red-400 mt-0.5">Live GPS synchronized</div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-red-900/30 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <Plane className="w-3.5 h-3.5 text-red-500" />
              <span>Import Requests</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
              {counts.imports.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Air & Sea customs cleared</div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-red-900/30 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <Send className="w-3.5 h-3.5 text-red-400" />
              <span>Export Requests</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
              {counts.exports.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Global DGFT compliant</div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-red-900/30 text-left col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <Globe2 className="w-3.5 h-3.5 text-red-500" />
              <span>Countries Served</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
              {counts.countries}
            </div>
            <div className="text-[10px] text-red-400 mt-0.5">Direct intermodal links</div>
          </div>
        </div>

        {/* Live Active Shipment Spotlight Banner */}
        {activeShipment && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-neutral-900/80 to-black border border-red-700/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 shrink-0">
                <Plane className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-red-400 uppercase">
                  <span>Priority Telemetry</span>
                  <span>·</span>
                  <span>{activeShipment.orderNumber}</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {activeShipment.title}
                </div>
                <div className="text-xs text-neutral-400">
                  {activeShipment.pickupLocation.split(',')[0]} → {activeShipment.destinationLocation.split(',')[0]}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="text-left md:text-right">
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Live ETA</div>
                <div className="text-sm font-bold text-red-400 font-mono">
                  {activeShipment.estimatedMinutesRemaining > 0 ? `${activeShipment.estimatedMinutesRemaining} mins remaining` : 'Arrived at Destination'}
                </div>
              </div>

              <button
                onClick={() => setCurrentView('tracking')}
                className="px-3.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Track Route</span>
                <ArrowRight className="w-3 h-3 text-red-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Globe, 
  Award, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar,
  Layers
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { orders } = useLogistics();

  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const spendData = [142000, 210000, 185000, 320000, 290000, 412000];
  const maxSpend = Math.max(...spendData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-900/20">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-red-400 mb-1 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Corporate Logistics Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Business Analytics</h2>
          <p className="text-xs text-neutral-400">
            Audit freight expenditure, volumetric throughput, and transit performance across your active supply chains.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300">
          FY 2026 Quarter 3 Telemetry
        </div>
      </div>

      {/* High-Level Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>TOTAL FREIGHT SPEND</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">
            ₹15.59L
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">+18.4% vs last quarter</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>AVG DELIVERY TIME</span>
            <Clock className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">
            4.2 Hours
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 font-mono">Domestic Metro Average</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>COUNTRIES ENGAGED</span>
            <Globe className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">
            14 Nations
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 font-mono">Top: Singapore & UAE</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>REWARD POINTS ACCUMULATED</span>
            <Award className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">
            4,850 pts
          </div>
          <div className="text-[11px] text-amber-400 mt-1 font-mono">Gold Status Active</div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Logistics Spend Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Monthly Freight & Courier Spend</h3>
              <p className="text-xs text-neutral-400">Values represented in INR (₹)</p>
            </div>
            <span className="text-xs font-mono text-red-400">2026 Volume</span>
          </div>

          {/* Clean HTML5 / Tailwind Bar Chart */}
          <div className="h-48 pt-6 flex items-end justify-between gap-3 sm:gap-6 border-b border-neutral-800">
            {spendData.map((val, idx) => {
              const heightPercent = Math.round((val / maxSpend) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{(val / 1000).toFixed(0)}k
                  </span>
                  <div className="w-full max-w-[48px] bg-neutral-900/80 rounded-t-lg overflow-hidden h-40 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-red-900 via-red-600 to-red-500 group-hover:from-red-600 group-hover:to-red-400 transition-all rounded-t-lg shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-neutral-400">{months[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown by Service Type (Donut / Segmented) */}
        <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
          <h3 className="text-base font-bold text-white font-display">Service Distribution</h3>
          <p className="text-xs text-neutral-400">Consignment volume breakdown by pipeline</p>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Air Express Freight', percent: 45, color: 'bg-red-500', count: '18 Consignments' },
              { label: 'Deep Sea Cargo', percent: 25, color: 'bg-red-800', count: '6 TEU Containers' },
              { label: 'Intra-City Courier', percent: 20, color: 'bg-neutral-600', count: '32 Parcels' },
              { label: 'Concierge Sourcing', percent: 10, color: 'bg-amber-600', count: '4 Items' }
            ].map((s, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span className="font-medium">{s.label}</span>
                  <span className="font-mono text-neutral-400">{s.percent}%</span>
                </div>
                <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.percent}%` }} />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">{s.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Package, 
  Users, 
  DollarSign, 
  Activity, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Settings,
  ChevronRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { ShipmentStatus } from '../../types/logistics';

export const AdminDashboard: React.FC = () => {
  const { user, toggleAdminRole } = useAuth();
  const { orders, updateOrderStatus, setCurrentView, setSelectedTrackingOrder } = useLogistics();

  const [adminTab, setAdminTab] = useState<'orders' | 'customers' | 'pricing' | 'support'>('orders');
  const [selectedStatusUpdateId, setSelectedStatusUpdateId] = useState<string>('');
  const [targetStatus, setTargetStatus] = useState<ShipmentStatus>('in_transit');

  // If user role is customer, show authorization guard
  if (user?.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-2xl glass-panel border border-red-800/60 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-600 text-red-500 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">Administrative Authorization Required</h3>
        <p className="text-xs text-neutral-400">
          This portal is reserved for company logistics controllers and terminal dispatchers. Switch to Administrative Command mode to manage shipments.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer"
          >
            Return to Customer View
          </button>
          <button
            onClick={toggleAdminRole}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)] cursor-pointer"
          >
            Authorize Admin Session
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = (orderId: string) => {
    updateOrderStatus(orderId, targetStatus);
    alert(`Consignment status updated to ${targetStatus.replace('_', ' ').toUpperCase()}`);
    setSelectedStatusUpdateId('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-900/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            <span>Corporate Command Operations</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Aether Admin Terminal</h2>
          <p className="text-xs text-neutral-400">
            Global shipment state overrides, customer accounts, and real-time corridor dispatch.
          </p>
        </div>

        <button
          onClick={toggleAdminRole}
          className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
        >
          Exit to Customer Portal
        </button>
      </div>

      {/* Admin Operations Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>TOTAL CUSTOMERS</span>
            <Users className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">1,840</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">+42 this week</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>ACTIVE FREIGHT</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">1,428</div>
          <div className="text-[10px] text-red-400 mt-0.5">Live corridors</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>IMPORT / EXPORT</span>
            <Truck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">32,060</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">Total processed</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-red-900/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>GROSS REVENUE</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">₹42.8M</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Q3 Target Exceeded</div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-1 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 text-xs w-fit">
        {[
          { id: 'orders', label: 'All Consignments & Status Override' },
          { id: 'customers', label: 'Enterprise Accounts' },
          { id: 'pricing', label: 'Tariff Rules' },
          { id: 'support', label: 'Support Inquiries (4)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              adminTab === tab.id
                ? 'bg-red-600 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Management Table with Status Override */}
      {adminTab === 'orders' && (
        <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Live Consignment Dispatch Control</h3>
              <p className="text-xs text-neutral-400">Update checkpoints, override flight corridors, or clear customs manifests.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-neutral-300">
              <thead className="bg-neutral-950/80 text-[10px] font-mono text-neutral-500 uppercase border-b border-neutral-800">
                <tr>
                  <th className="py-2.5 px-3">Order Number</th>
                  <th className="py-2.5 px-3">Consignment</th>
                  <th className="py-2.5 px-3">Route</th>
                  <th className="py-2.5 px-3">Fleet Mode</th>
                  <th className="py-2.5 px-3">Current Status</th>
                  <th className="py-2.5 px-3 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {orders.map(ord => (
                  <tr key={ord.id} className="hover:bg-neutral-900/40">
                    <td className="py-3 px-3 font-mono text-red-400 font-bold">{ord.orderNumber}</td>
                    <td className="py-3 px-3 font-semibold text-white">{ord.title}</td>
                    <td className="py-3 px-3 text-neutral-400">
                      {ord.originCountry} → {ord.destinationCountry}
                    </td>
                    <td className="py-3 px-3 uppercase font-mono text-neutral-300">{ord.vehicleType}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] text-amber-400 capitalize">
                        {ord.status.replace('_', ' ')} ({ord.routeProgressPercent}%)
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <select
                        value={selectedStatusUpdateId === ord.id ? targetStatus : ord.status}
                        onChange={e => {
                          setSelectedStatusUpdateId(ord.id);
                          setTargetStatus(e.target.value as ShipmentStatus);
                          updateOrderStatus(ord.id, e.target.value as ShipmentStatus);
                        }}
                        className="px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-white text-[11px] font-mono cursor-pointer"
                      >
                        <option value="order_confirmed">Order Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="picked_up">Picked Up</option>
                        <option value="in_transit">In Transit</option>
                        <option value="near_destination">Near Destination</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {adminTab === 'customers' && (
        <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
          <h3 className="text-base font-bold text-white font-display">Registered Enterprise Shipper Accounts</h3>
          <div className="space-y-3">
            {[
              { name: 'Vikramaditya Singhania', org: 'Singhania Advanced Optics Ltd', volume: '₹14.2L', tier: 'Gold' },
              { name: 'Kavita Menon', org: 'Menon Biotech Formulations', volume: '₹22.5L', tier: 'Platinum' },
              { name: 'David Chen', org: 'Singapore Semiconductor Consortium', volume: '₹48.9L', tier: 'Platinum' },
              { name: 'Tariq Al-Mansoor', org: 'Emirates Aviation Spares', volume: '₹18.0L', tier: 'Gold' }
            ].map((c, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-black/60 border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{c.name}</div>
                  <div className="text-[11px] text-neutral-400">{c.org}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-neutral-300">{c.volume} volume</span>
                  <span className="font-mono text-xs text-amber-400 font-semibold">{c.tier} Tier</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Rules */}
      {adminTab === 'pricing' && (
        <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
          <h3 className="text-base font-bold text-white font-display">Autonomous Tariff Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/60 border border-neutral-800">
              <span className="text-neutral-400 font-mono">Electric Moto Urban Base</span>
              <div className="text-lg font-bold text-white mt-1">₹180 + ₹14/km</div>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-neutral-800">
              <span className="text-neutral-400 font-mono">Stratosphere Air Express</span>
              <div className="text-lg font-bold text-white mt-1">₹12,500 + ₹95/km</div>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-neutral-800">
              <span className="text-neutral-400 font-mono">Deep-Sea Marine TEU</span>
              <div className="text-lg font-bold text-white mt-1">₹28,000 + ₹32/km</div>
            </div>
          </div>
        </div>
      )}

      {/* Support Requests */}
      {adminTab === 'support' && (
        <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-3">
          <h3 className="text-base font-bold text-white font-display">Active Priority Escalations</h3>
          {[
            { id: 'TKT-901', sender: 'Singhania Optics', issue: 'Cryogenic temperature log verification for Flight AC-409', priority: 'High' },
            { id: 'TKT-902', sender: 'Menon Biotech', issue: 'DGFT Export Licence number revision requested', priority: 'Medium' }
          ].map((t, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-black/60 border border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-mono text-red-400 font-semibold">{t.id} · {t.sender}</div>
                <div className="text-neutral-300 mt-0.5">{t.issue}</div>
              </div>
              <button
                onClick={() => alert('Support ticket marked as resolved by admin.')}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

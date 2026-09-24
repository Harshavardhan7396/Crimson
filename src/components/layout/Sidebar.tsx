import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShoppingBag, 
  Truck, 
  Calculator, 
  PlusCircle, 
  Navigation, 
  PackageCheck, 
  Sparkles, 
  Gift, 
  BarChart3, 
  UserCheck, 
  ShieldCheck, 
  HelpCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useLogistics();
  const { user } = useAuth();

  const menuSections = [
    {
      heading: 'Logistics Command',
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'order_create', label: 'Create Order', icon: PlusCircle, badge: 'New' },
        { id: 'tracking', label: 'Live Tracking', icon: Navigation, badge: 'Active' },
        { id: 'my_orders', label: 'My Consignments', icon: PackageCheck }
      ]
    },
    {
      heading: 'Services & Rates',
      items: [
        { id: 'import', label: 'Import Freight', icon: ArrowDownLeft },
        { id: 'export', label: 'Export Freight', icon: ArrowUpRight },
        { id: 'order_product', label: 'Sourcing & Procure', icon: ShoppingBag },
        { id: 'vehicles', label: 'Fleet & Vehicles', icon: Truck },
        { id: 'pricing', label: 'Pricing Calculator', icon: Calculator }
      ]
    },
    {
      heading: 'Intelligence & Rewards',
      items: [
        { id: 'recommendations', label: 'Recommended For You', icon: Sparkles },
        { id: 'rewards', label: 'Rewards & Gifts', icon: Gift },
        { id: 'analytics', label: 'Business Analytics', icon: BarChart3 }
      ]
    },
    {
      heading: 'Account & Support',
      items: [
        { id: 'profile', label: 'Corporate Profile', icon: UserCheck },
        ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin Command', icon: ShieldCheck, badge: 'HQ' }] : []),
        { id: 'help', label: 'Help & Protocols', icon: HelpCircle }
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-red-900/20 bg-black/60 backdrop-blur-md min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-6 flex-1">
        {menuSections.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 mb-2 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              {section.heading}
            </div>
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-950/60 border border-red-700/50 text-white shadow-[0_0_15px_rgba(220,38,38,0.2)] font-semibold'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-500' : 'text-neutral-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isActive ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Operational Status Footer */}
      <div className="mt-auto pt-4 border-t border-neutral-900">
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
            <span className="text-neutral-400">System Telemetry</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </div>
          <div className="text-[10px] text-neutral-500">
            Kempegowda & Changi corridors synchronized.
          </div>
        </div>
      </div>
    </aside>
  );
};

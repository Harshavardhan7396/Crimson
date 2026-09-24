import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Navigation, 
  PackageCheck, 
  MoreHorizontal,
  X,
  ArrowDownLeft,
  ArrowUpRight,
  ShoppingBag,
  Truck,
  Calculator,
  Gift,
  BarChart3,
  UserCheck,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView } = useLogistics();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'order_create', label: 'Book', icon: PlusCircle },
    { id: 'tracking', label: 'Track', icon: Navigation },
    { id: 'my_orders', label: 'Orders', icon: PackageCheck }
  ];

  const drawerItems = [
    { id: 'import', label: 'Import Freight', icon: ArrowDownLeft },
    { id: 'export', label: 'Export Freight', icon: ArrowUpRight },
    { id: 'order_product', label: 'Sourcing & Procure', icon: ShoppingBag },
    { id: 'vehicles', label: 'Fleet & Vehicles', icon: Truck },
    { id: 'pricing', label: 'Smart Pricing', icon: Calculator },
    { id: 'rewards', label: 'Rewards & Gifts', icon: Gift },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: UserCheck },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin Command', icon: ShieldCheck }] : []),
    { id: 'help', label: 'Help & Docs', icon: HelpCircle }
  ];

  return (
    <>
      {/* Mobile Bottom Fixed Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-red-900/30 px-3 py-2 flex items-center justify-around select-none">
        {mainItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setDrawerOpen(false);
              }}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-red-500 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* More Drawer Button */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            drawerOpen ? 'text-red-400 font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

      {/* Expanded Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end p-4 pb-20">
          <div className="p-5 rounded-2xl glass-panel border border-red-800/40 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="text-sm font-bold text-white font-display">All Services & Utilities</div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {drawerItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setDrawerOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 hover:bg-red-950/40 border border-neutral-800 hover:border-red-800/50 text-left text-xs text-neutral-200 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="truncate font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

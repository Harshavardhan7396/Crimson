import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLogistics } from '../../context/LogisticsContext';
import { NotificationDropdown } from '../notifications/NotificationDropdown';
import { 
  Bell, 
  Plus, 
  ShieldAlert, 
  Menu, 
  X, 
  User as UserIcon,
  LogOut,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { user, logout, toggleAdminRole } = useAuth();
  const { 
    currentView, 
    setCurrentView, 
    unreadNotificationCount 
  } = useLogistics();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'import', label: 'Import' },
    { id: 'export', label: 'Export' },
    { id: 'order_create', label: 'Order' },
    { id: 'tracking', label: 'Tracking' },
    { id: 'my_orders', label: 'My Orders' },
    { id: 'rewards', label: 'Rewards' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-red-900/30 bg-black/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-display uppercase flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#ef4444]" />
            <span>Aether</span>
            <span className="text-red-500 crimson-text-glow">Crimson</span>
          </button>

          {/* Role pill indicator (admin vs customer) */}
          <button
            onClick={toggleAdminRole}
            title="Click to toggle between Customer View and Admin Command"
            className={`hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider transition-colors cursor-pointer border ${
              user?.role === 'admin'
                ? 'bg-red-950/80 text-red-300 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3 h-3 text-red-400" />
            <span>{user?.role === 'admin' ? 'ADMIN CONSOLE' : 'CUSTOMER MODE'}</span>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-neutral-300">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setCurrentView(link.id)}
              className={`transition-colors relative py-1 hover:text-white cursor-pointer whitespace-nowrap ${
                currentView === link.id
                  ? 'text-white font-semibold'
                  : 'text-neutral-400'
              }`}
            >
              <span>{link.label}</span>
              {currentView === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3 relative">
          {/* Create Order / Book Shipment CTA */}
          <button
            onClick={() => setCurrentView('order_create')}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(220,38,38,0.35)] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Book Shipment</span>
            <span className="sm:hidden">Book</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center font-mono animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={notifOpen}
              onClose={() => setNotifOpen(false)}
            />
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-red-900/30 cursor-pointer transition-colors"
            >
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-semibold text-white truncate max-w-[100px]">
                  {user?.fullName?.split(' ')[0]}
                </div>
                <div className="text-[9px] font-mono text-red-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{user?.rewardPoints} pts</span>
                </div>
              </div>
              <img
                src={user?.avatarUrl || '/src/assets/images/avatar_executive_user_1790266147034.jpg'}
                alt={user?.fullName || 'User Avatar'}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-red-500/50"
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-11 z-50 w-56 rounded-xl glass-panel shadow-2xl border border-red-800/40 p-2 text-xs">
                <div className="px-3 py-2 border-b border-neutral-800">
                  <div className="font-semibold text-white truncate">{user?.fullName}</div>
                  <div className="text-[10px] font-mono text-neutral-400 truncate">{user?.email}</div>
                  <div className="mt-1 text-[10px] font-mono text-red-400 font-medium">
                    {user?.rewardTier} Tier Partner
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setCurrentView('profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-200 hover:text-white flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Manage Profile & Addresses</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleAdminRole();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-200 hover:text-white flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>Switch to {user?.role === 'admin' ? 'Customer Mode' : 'Admin Console'}</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-neutral-800">
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-950/60 text-red-400 hover:text-red-300 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit Terminal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

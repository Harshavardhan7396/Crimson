import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Bell, CheckCheck, Trash2, Package, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications, setSelectedTrackingOrder, orders, setCurrentView } = useLogistics();

  if (!isOpen) return null;

  const handleOrderJump = (orderId?: string) => {
    if (orderId) {
      const target = orders.find(o => o.id === orderId);
      if (target) {
        setSelectedTrackingOrder(target);
        setCurrentView('tracking');
        onClose();
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'delivery':
      case 'order':
        return <Package className="w-4 h-4 text-red-400" />;
      case 'reward':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'offer':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl glass-panel shadow-2xl border border-red-800/40 p-4 text-neutral-200">
      <div className="flex items-center justify-between pb-3 border-b border-red-900/20">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-red-500" />
          <h4 className="text-sm font-bold text-white font-display">Notification Center</h4>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-[11px] text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-neutral-900/80 my-2">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-500 font-mono">
            No unread telemetry or dispatch alerts.
          </div>
        ) : (
          notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationAsRead(notif.id);
                if (notif.orderId) handleOrderJump(notif.orderId);
              }}
              className={`py-3 px-2 rounded-xl transition-all cursor-pointer flex gap-3 items-start ${
                notif.read ? 'opacity-60 hover:opacity-100 hover:bg-neutral-900/40' : 'bg-red-950/20 hover:bg-red-950/40'
              }`}
            >
              <div className="mt-0.5 p-2 rounded-lg bg-neutral-900 border border-neutral-800 shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-xs font-semibold text-white truncate">{notif.title}</h5>
                  <span className="text-[10px] text-neutral-500 font-mono shrink-0">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                  {notif.message}
                </p>
                {notif.orderId && (
                  <div className="mt-1.5 inline-flex items-center text-[10px] font-mono text-red-400 hover:underline">
                    Inspect Order {notif.orderId} →
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-2 border-t border-red-900/20 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Aether Crimson Dispatch Stream</span>
        <button
          onClick={onClose}
          className="text-xs text-red-400 hover:text-red-300 font-medium cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

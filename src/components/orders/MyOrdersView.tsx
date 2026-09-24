import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { OrderItem, ShipmentStatus } from '../../types/logistics';
import { OrderDetailModal } from './OrderDetailModal';
import { 
  Package, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Truck, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Plus,
  Navigation
} from 'lucide-react';

export const MyOrdersView: React.FC = () => {
  const { orders, setCurrentView, setSelectedTrackingOrder } = useLogistics();
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'processing' | 'delivered' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<OrderItem | null>(null);

  const filteredOrders = orders.filter(o => {
    // Tab filter
    if (filterTab === 'active' && (o.status === 'delivered' || o.status === 'cancelled')) return false;
    if (filterTab === 'processing' && o.status !== 'processing' && o.status !== 'order_confirmed') return false;
    if (filterTab === 'delivered' && o.status !== 'delivered') return false;
    if (filterTab === 'cancelled' && o.status !== 'cancelled') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q) ||
        o.productType.toLowerCase().includes(q) ||
        o.pickupLocation.toLowerCase().includes(q) ||
        o.destinationLocation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'in_transit':
        return <span className="text-red-400 font-mono text-[11px] font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />In Transit</span>;
      case 'processing':
      case 'order_confirmed':
        return <span className="text-amber-400 font-mono text-[11px] font-semibold">Processing</span>;
      case 'picked_up':
        return <span className="text-blue-400 font-mono text-[11px] font-semibold">Picked Up</span>;
      case 'near_destination':
        return <span className="text-purple-400 font-mono text-[11px] font-semibold">Near Destination</span>;
      case 'delivered':
        return <span className="text-emerald-400 font-mono text-[11px] font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Delivered</span>;
      case 'cancelled':
        return <span className="text-neutral-500 font-mono text-[11px]">Cancelled</span>;
      default:
        return <span className="text-neutral-400 font-mono text-[11px]">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-900/20">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">My Consignments</h2>
          <p className="text-xs text-neutral-400">
            Audit history, real-time telemetry, and commercial invoices for all active and completed freight bookings.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('order_create')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Consignment</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Interactive Segmented Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'active', label: 'Active Transit' },
            { id: 'processing', label: 'Processing' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filterTab === tab.id
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by ID, product, city..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none font-sans"
          />
        </div>
      </div>

      {/* Orders Grid / List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl glass-panel border border-neutral-800 text-neutral-400 text-xs font-mono">
            No consignments found matching the current criteria.
          </div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              onClick={() => setSelectedOrderForModal(order)}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-red-900/30 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Left Column: Order ID & Product info */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-red-400 shrink-0 group-hover:border-red-600/40">
                  <Package className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mb-0.5">
                    <span className="text-red-400 font-bold">{order.orderNumber}</span>
                    <span>·</span>
                    <span className="uppercase">{order.category.replace('_', ' ')}</span>
                    <span>·</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {order.title}
                  </h4>
                  <div className="text-xs text-neutral-400 mt-1 truncate">
                    {order.pickupLocation.split(',')[0]} → {order.destinationLocation.split(',')[0]}
                  </div>
                </div>
              </div>

              {/* Middle Column: Transport Specs */}
              <div className="flex items-center gap-6 text-xs text-neutral-300">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Vehicle</span>
                  <span className="font-semibold uppercase">{order.vehicleType}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Weight</span>
                  <span className="font-mono">{order.weightKg} kg</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Tariff</span>
                  <span className="font-mono text-red-400 font-bold">₹{order.estimatedPriceINR.toLocaleString()}</span>
                </div>
              </div>

              {/* Right Column: Status & Quick Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-900">
                <div className="text-left md:text-right">
                  {getStatusBadge(order.status)}
                  {order.status === 'in_transit' && (
                    <div className="text-[10px] font-mono text-neutral-500">
                      {order.routeProgressPercent}% complete
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTrackingOrder(order);
                    setCurrentView('tracking');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-600/50 text-neutral-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-red-400" />
                  <span className="hidden sm:inline">Track</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrderForModal}
        onClose={() => setSelectedOrderForModal(null)}
      />
    </div>
  );
};

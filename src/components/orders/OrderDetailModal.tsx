import React from 'react';
import { OrderItem } from '../../types/logistics';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Navigation,
  FileText,
  Clock
} from 'lucide-react';

interface OrderDetailModalProps {
  order: OrderItem | null;
  onClose: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  const { setSelectedTrackingOrder, setCurrentView } = useLogistics();

  if (!order) return null;

  const handleTrackLive = () => {
    setSelectedTrackingOrder(order);
    setCurrentView('tracking');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-red-800/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-neutral-200">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-red-900/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase">
              <span>{order.category.replace('_', ' ')}</span>
              <span>·</span>
              <span>{order.orderNumber}</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display mt-1">{order.title}</h3>
            <p className="text-xs text-neutral-400 mt-0.5">{order.productType}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route Summary */}
        <div className="p-4 rounded-xl bg-black/60 border border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Origin & Pickup</div>
            <div className="font-semibold text-white mt-0.5">{order.pickupLocation}</div>
            <div className="text-[11px] text-neutral-400 mt-1">Country: {order.originCountry}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Destination Consignee</div>
            <div className="font-semibold text-white mt-0.5">{order.destinationLocation}</div>
            <div className="text-[11px] text-neutral-400 mt-1">Country: {order.destinationCountry}</div>
          </div>
        </div>

        {/* Technical Specs & Driver */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">Fleet Transport</div>
            <div className="font-bold text-white uppercase mt-0.5">{order.vehicleType}</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">Gross Weight</div>
            <div className="font-bold text-white mt-0.5">{order.weightKg} kg</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">Declared Value</div>
            <div className="font-bold text-red-400 font-mono mt-0.5">₹{order.declaredValueINR.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">Tariff Charged</div>
            <div className="font-bold text-white font-mono mt-0.5">₹{order.estimatedPriceINR.toLocaleString()}</div>
          </div>
        </div>

        {/* Detailed Checkpoint Timeline */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
            Custody Audit Log & Checkpoints
          </h4>
          <div className="space-y-3">
            {order.checkpoints.map(cp => (
              <div key={cp.id} className="flex gap-3 text-xs items-start">
                <div className="mt-1">
                  {cp.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : cp.current ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping inline-block" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-800 border border-neutral-700" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${cp.current ? 'text-red-400' : 'text-neutral-200'}`}>
                      {cp.title}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">{cp.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">{cp.location}</div>
                  {cp.notes && (
                    <div className="text-[10px] font-mono text-neutral-500 mt-0.5 italic">
                      Note: {cp.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action strip */}
        <div className="pt-4 border-t border-red-900/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => alert(`Official Customs Commercial Airway Bill & Tax Invoice for ${order.orderNumber} downloaded.`)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Commercial Invoice</span>
          </button>

          <button
            onClick={handleTrackLive}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Live Satellite Tracking</span>
          </button>
        </div>
      </div>
    </div>
  );
};

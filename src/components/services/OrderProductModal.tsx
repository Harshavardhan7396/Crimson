import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export const OrderProductModal: React.FC = () => {
  const { createNewOrder, setCurrentView } = useLogistics();

  const [productQuery, setProductQuery] = useState('Industrial Dual-Laser Robotic Calibration Station');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/vehicle_fleet_showcase_1790266122316.jpg');
  const [quantity, setQuantity] = useState(2);
  const [preferredCountry, setPreferredCountry] = useState('Germany');
  const [budgetINR, setBudgetINR] = useState(4500000);
  const [deliveryLocation, setDeliveryLocation] = useState('Electronic City Phase 2, Bangalore, India');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express' | 'ultra_priority'>('express');
  const [notes, setNotes] = useState('Requires manufacturer warranty verification and CE certificate compliance.');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewOrder({
      title: productQuery,
      category: 'order_product',
      productType: 'Specialized Procured Machinery',
      originCountry: preferredCountry,
      destinationCountry: 'India',
      pickupLocation: `${preferredCountry} Direct Sourcing Partner Facility`,
      destinationLocation: deliveryLocation,
      vehicleType: 'air',
      weightKg: 45,
      declaredValueINR: budgetINR,
      estimatedPriceINR: Math.round(budgetINR * 0.045), // 4.5% concierge sourcing + transit fee
      speed: deliverySpeed,
      notes
    });

    setIsSuccess(true);
    setTimeout(() => {
      setCurrentView('tracking');
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-red-900/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-600/40 text-red-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Source & Order a Product</h2>
            <p className="text-xs text-neutral-400">
              Submit any international item, industrial tool, or rare commodity. Our global procurement team buys, clears, and delivers directly to you.
            </p>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-10 rounded-2xl glass-panel border border-emerald-600/50 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Procurement Ticket Dispatched</h3>
          <p className="text-sm text-neutral-300 max-w-md mx-auto">
            Our overseas procurement desk has received your item specification. Navigating to live tracking timeline...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
                1. Item You Want Us to Procure
              </h3>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Product Name / Model / Specification Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={productQuery}
                    onChange={e => setProductQuery(e.target.value)}
                    required
                    placeholder="e.g. Sony A9 III High-Speed Camera, Fanuc Servo Motor, Leica Geosystems Scanner"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Quantity Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Preferred Sourcing Country
                  </label>
                  <select
                    value={preferredCountry}
                    onChange={e => setPreferredCountry(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Germany">Germany (Industrial Precision)</option>
                    <option value="Japan">Japan (High-Tech & Robotics)</option>
                    <option value="United States">United States (Consumer & Enterprise)</option>
                    <option value="Singapore">Singapore (Microchips & Optics)</option>
                    <option value="United Kingdom">United Kingdom (Aerospace & Specialty)</option>
                    <option value="South Korea">South Korea (Displays & Batteries)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Target Budget (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="5000"
                    step="10000"
                    value={budgetINR}
                    onChange={e => setBudgetINR(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Product Image / Spec Sheet Preview Reference
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/60 border border-neutral-800">
                  <img
                    src={imageUrl}
                    alt="Procurement sample"
                    referrerPolicy="no-referrer"
                    className="w-16 h-12 object-cover rounded-lg border border-neutral-700"
                  />
                  <div className="text-xs text-neutral-400 font-mono flex-1 truncate">
                    <span>Active reference asset verified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
                2. Fulfillment & Delivery Speed
              </h3>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Final Destination Address in India
                </label>
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={e => setDeliveryLocation(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  Delivery Speed Tier
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'standard', title: 'Standard Air', time: '5–8 Days', mult: '1.0x' },
                    { id: 'express', title: 'Express Freight', time: '2–4 Days', mult: '1.25x' },
                    { id: 'ultra_priority', title: 'Ultra Priority Concierge', time: '24–48 Hrs', mult: '1.55x' }
                  ].map(tier => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setDeliverySpeed(tier.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        deliverySpeed === tier.id
                          ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{tier.title}</div>
                      <div className="text-[10px] text-red-400 font-mono mt-0.5">{tier.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Procurement Directives & Brand Authenticity Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl glass-panel border border-red-900/40 text-neutral-200 space-y-4 sticky top-24">
              <div className="flex items-center gap-2 pb-3 border-b border-red-900/30">
                <Sparkles className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  Concierge Quote
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Target Item Budget</span>
                  <span className="font-mono text-white">₹{budgetINR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Procurement Commission (2.5%)</span>
                  <span className="font-mono text-white">₹{Math.round(budgetINR * 0.025).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Priority International Air Freight</span>
                  <span className="font-mono text-white">₹{Math.round(budgetINR * 0.02).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Authenticity Inspection & Escrow</span>
                  <span className="font-mono text-emerald-400">Included Free</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-white">Estimated Landed Cost</span>
                    <div className="text-[10px] text-neutral-500 font-mono">Customs & delivery included</div>
                  </div>
                  <span className="text-xl font-bold text-red-500 font-mono tabular-nums">
                    ₹{Math.round(budgetINR * 1.045).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400">
                Final price may vary based on actual logistics conditions, currency exchange shifts, and supplier invoices.
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Authorize Sourcing Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

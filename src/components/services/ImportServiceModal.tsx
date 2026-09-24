import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  ArrowDownLeft, 
  UploadCloud, 
  FileText, 
  Plane, 
  Ship, 
  CheckCircle2, 
  AlertCircle,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { DeliveryVehicleType } from '../../types/logistics';

export const ImportServiceModal: React.FC = () => {
  const { createNewOrder, setCurrentView, calculatePricing } = useLogistics();

  const [productName, setProductName] = useState('Semiconductor Lithography Masks');
  const [productCategory, setProductCategory] = useState('High-Tech Electronics');
  const [quantity, setQuantity] = useState(4);
  const [originCountry, setOriginCountry] = useState('Singapore');
  const [destination, setDestination] = useState('Bangalore Technology Corridor, India');
  const [weightKg, setWeightKg] = useState(35);
  const [estimatedValueINR, setEstimatedValueINR] = useState(1200000);
  const [specialInstructions, setSpecialInstructions] = useState('Climate-controlled hermetic vault required. Do not tilt.');
  const [preferredMethod, setPreferredMethod] = useState<DeliveryVehicleType>('air');
  const [uploadedDocName, setUploadedDocName] = useState('Commercial_Invoice_SG_AES.pdf');
  const [isSuccess, setIsSuccess] = useState(false);

  const pricing = calculatePricing({
    distanceKm: 3200, // Singapore to Bangalore
    weightKg,
    vehicleType: preferredMethod,
    speed: 'express',
    isInternational: true,
    declaredValueINR: estimatedValueINR,
    customsClearance: true,
    insurance: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createNewOrder({
      title: productName,
      category: 'import',
      productType: productCategory,
      originCountry,
      destinationCountry: 'India',
      pickupLocation: `Changi International Air Cargo, ${originCountry}`,
      destinationLocation: destination,
      vehicleType: preferredMethod,
      weightKg,
      declaredValueINR: estimatedValueINR,
      estimatedPriceINR: pricing.totalINR,
      notes: specialInstructions
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
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-display">International Import Service</h2>
            <p className="text-xs text-neutral-400">
              Procure and transport cargo from overseas directly to any port or address with automated customs clearance.
            </p>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-10 rounded-2xl glass-panel border border-emerald-600/50 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Import Consignment Registered</h3>
          <p className="text-sm text-neutral-300 max-w-md mx-auto">
            Customs manifest AES-904 generated. Directing your console to live satellite tracking...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
                1. Product & Sourcing Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Product Category
                  </label>
                  <select
                    value={productCategory}
                    onChange={e => setProductCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none cursor-pointer"
                  >
                    <option value="High-Tech Electronics">High-Tech Electronics & Semiconductors</option>
                    <option value="Precision Machinery">Precision Machinery & Robotics</option>
                    <option value="Pharmaceuticals">Pharmaceuticals & Biologicals</option>
                    <option value="Luxury Goods">Luxury Goods & Watches</option>
                    <option value="Automotive Parts">Automotive Components</option>
                    <option value="Raw Materials">Industrial Chemicals & Metals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Quantity / Units
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Total Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={e => setWeightKg(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Declared Value (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="5000"
                    value={estimatedValueINR}
                    onChange={e => setEstimatedValueINR(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
                2. Routing & Delivery Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Origin Country
                  </label>
                  <select
                    value={originCountry}
                    onChange={e => setOriginCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Singapore">Singapore (Changi Hub)</option>
                    <option value="United Arab Emirates">UAE (Dubai Logistics Hub)</option>
                    <option value="Germany">Germany (Frankfurt CargoCity)</option>
                    <option value="United States">USA (JFK Cargo / Chicago)</option>
                    <option value="Japan">Japan (Narita Air Base)</option>
                    <option value="United Kingdom">United Kingdom (Heathrow Terminal 4)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Destination City / Facility
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  Preferred Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferredMethod('air')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      preferredMethod === 'air'
                        ? 'bg-red-950/60 border-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Plane className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Stratosphere Air Express</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Transit: 1–3 Days</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredMethod('sea')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      preferredMethod === 'sea'
                        ? 'bg-red-950/60 border-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Ship className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Deep-Sea Ocean Freight</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Transit: 12–18 Days</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Special Handling / Customs Directives
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Upload Product Invoice / Proforma / Bill of Lading
                </label>
                <div className="p-4 rounded-xl border border-dashed border-neutral-800 hover:border-red-600/50 bg-black/40 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span className="font-mono">{uploadedDocName}</span>
                  </div>
                  <label className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                    <UploadCloud className="w-3.5 h-3.5 text-red-400" />
                    <span>Replace Document</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => {
                        if (e.target.files?.[0]) setUploadedDocName(e.target.files[0].name);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Pricing & Confirmation Sidebar */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl glass-panel border border-red-900/40 text-neutral-200 space-y-4 sticky top-24">
              <div className="flex items-center gap-2 pb-3 border-b border-red-900/30">
                <Calculator className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  Live Tariff Breakdown
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Base Freight ({preferredMethod.toUpperCase()})</span>
                  <span className="font-mono text-white">₹{pricing.baseFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>International Air Distance Cost</span>
                  <span className="font-mono text-white">₹{pricing.distanceCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Weight Surcharge ({weightKg} kg)</span>
                  <span className="font-mono text-white">₹{pricing.weightCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Customs Clearance & Insurance</span>
                  <span className="font-mono text-white">₹{pricing.addonsCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>GST (18% Statutory)</span>
                  <span className="font-mono text-white">₹{pricing.gstTax.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-white">Estimated Price</span>
                    <div className="text-[10px] text-neutral-500 font-mono">All duties included</div>
                  </div>
                  <span className="text-xl font-bold text-red-500 font-mono tabular-nums">
                    ₹{pricing.totalINR.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400">
                Final price may vary based on actual logistics conditions, physical weight verification, and port duties.
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Confirm Import & Generate AES Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

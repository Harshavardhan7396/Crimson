import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  ArrowUpRight, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Calculator,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { DeliveryVehicleType } from '../../types/logistics';

export const ExportServiceModal: React.FC = () => {
  const { createNewOrder, setCurrentView, calculatePricing } = useLogistics();

  const [productName, setProductName] = useState('Aerospace Grade Precision CNC Castings');
  const [quantity, setQuantity] = useState(12);
  const [pickupLocation, setPickupLocation] = useState('Plot 19, Peenya Industrial Complex, Bangalore');
  const [destinationCountry, setDestinationCountry] = useState('United Arab Emirates');
  const [destinationAddress, setDestinationAddress] = useState('Dubai South Aviation District, Hangar 4, Dubai, UAE');
  const [weightKg, setWeightKg] = useState(140);
  const [dimensions, setDimensions] = useState('120×80×75 cm');
  const [productCategory, setProductCategory] = useState('Machinery & Engineering Spares');
  const [specialInstructions, setSpecialInstructions] = useState('Shock sensors attached. Mandatory fumigation certificate included.');
  const [preferredMethod, setPreferredMethod] = useState<DeliveryVehicleType>('air');
  const [documentName, setDocumentName] = useState('Certificate_of_Origin_DGFT.pdf');
  const [isSuccess, setIsSuccess] = useState(false);

  const pricing = calculatePricing({
    distanceKm: 2700, // Bangalore to Dubai
    weightKg,
    vehicleType: preferredMethod,
    speed: 'express',
    isInternational: true,
    declaredValueINR: 850000,
    customsClearance: true,
    insurance: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewOrder({
      title: productName,
      category: 'export',
      productType: productCategory,
      originCountry: 'India',
      destinationCountry,
      pickupLocation,
      destinationLocation: destinationAddress,
      vehicleType: preferredMethod,
      weightKg,
      dimensions,
      declaredValueINR: 850000,
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
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-display">International Export Consignment</h2>
            <p className="text-xs text-neutral-400">
              Ship commercial cargo worldwide with automated DGFT export compliance, airway bills, and customs clearance.
            </p>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-10 rounded-2xl glass-panel border border-emerald-600/50 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Export Cargo Registered</h3>
          <p className="text-sm text-neutral-300 max-w-md mx-auto">
            Consignment dispatched to port consolidation yard. Directing to live tracking console...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
                1. Export Consignment Specification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Commodity / Product Name
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
                    <option value="Machinery & Engineering Spares">Machinery & Engineering Spares</option>
                    <option value="Consumer Electronics">Consumer Electronics & Hardware</option>
                    <option value="Pharmaceuticals">Formulations & Active Ingredients</option>
                    <option value="Textiles & Apparel">Luxury Textiles & Apparel</option>
                    <option value="Agriculture & Spices">Specialty Spices & Coffee</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Quantity
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
                    Weight (kg)
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
                    Crate Dimensions (L×W×H)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={e => setDimensions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
                2. Pickup & International Destination
              </h3>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Factory / Warehouse Pickup Address
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={e => setPickupLocation(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Destination Country
                  </label>
                  <select
                    value={destinationCountry}
                    onChange={e => setDestinationCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none cursor-pointer"
                  >
                    <option value="United Arab Emirates">United Arab Emirates (Dubai / Abu Dhabi)</option>
                    <option value="Singapore">Singapore (Changi Airport / Jurong)</option>
                    <option value="United States">United States (New York / Los Angeles)</option>
                    <option value="Germany">Germany (Hamburg / Frankfurt)</option>
                    <option value="United Kingdom">United Kingdom (London Gateway)</option>
                    <option value="Australia">Australia (Sydney Kingsford)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Destination Port / Consignee Address
                  </label>
                  <input
                    type="text"
                    value={destinationAddress}
                    onChange={e => setDestinationAddress(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Upload Export Compliance Documents (Invoice, Packing List, Certificate of Origin)
                </label>
                <div className="p-4 rounded-xl border border-dashed border-neutral-800 hover:border-red-600/50 bg-black/40 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span className="font-mono">{documentName}</span>
                  </div>
                  <label className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                    <UploadCloud className="w-3.5 h-3.5 text-red-400" />
                    <span>Upload Document</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => {
                        if (e.target.files?.[0]) setDocumentName(e.target.files[0].name);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl glass-panel border border-red-900/40 text-neutral-200 space-y-4 sticky top-24">
              <div className="flex items-center gap-2 pb-3 border-b border-red-900/30">
                <Calculator className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  Export Tariff Estimate
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Base Ocean/Air Freight</span>
                  <span className="font-mono text-white">₹{pricing.baseFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>International Corridor Transit</span>
                  <span className="font-mono text-white">₹{pricing.distanceCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Heavy Payload Handling ({weightKg} kg)</span>
                  <span className="font-mono text-white">₹{pricing.weightCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Customs Documentation & Clearance</span>
                  <span className="font-mono text-white">₹{pricing.addonsCost.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-white">Estimated Price</span>
                    <div className="text-[10px] text-neutral-500 font-mono">Export duties included</div>
                  </div>
                  <span className="text-xl font-bold text-red-500 font-mono tabular-nums">
                    ₹{pricing.totalINR.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400">
                Final price may vary based on actual logistics conditions and terminal cargo handling.
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Dispatch Export Consignment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { VEHICLE_OPTIONS } from '../../data/mockLogisticsData';
import { ServiceCategory, DeliveryVehicleType } from '../../types/logistics';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Package, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check 
} from 'lucide-react';

export const CreateOrderWizard: React.FC = () => {
  const { createNewOrder, calculatePricing, setCurrentView } = useLogistics();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [serviceType, setServiceType] = useState<ServiceCategory>('express_delivery');
  const [packageName, setPackageName] = useState('Confidential R&D Hardware Core');
  const [packageCategory, setPackageCategory] = useState('Hardware & Electronics');
  const [weightKg, setWeightKg] = useState(8);
  const [dimensions, setDimensions] = useState('40×30×25 cm');
  const [declaredValueINR, setDeclaredValueINR] = useState(150000);
  const [pickupAddress, setPickupAddress] = useState('Aether Logistics Station, Whitefield, Bangalore');
  const [pickupCity, setPickupCity] = useState('Bangalore');
  const [pickupCountry, setPickupCountry] = useState('India');
  const [destinationAddress, setDestinationAddress] = useState('Tech Corridor Tower 3, Hyderabad');
  const [destinationCity, setDestinationCity] = useState('Hyderabad');
  const [destinationCountry, setDestinationCountry] = useState('India');
  const [vehicleType, setVehicleType] = useState<DeliveryVehicleType>('car');
  const [scheduleType, setScheduleType] = useState<'instant' | 'same_day' | 'scheduled'>('instant');
  const [scheduledTime, setScheduledTime] = useState('Today, 15:00 - 17:00 IST');
  const [speed, setSpeed] = useState<'standard' | 'express' | 'ultra_priority'>('express');
  const [insurance, setInsurance] = useState(true);
  const [notes, setNotes] = useState('Direct handoff with biometric digital signature.');
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const isInternational = serviceType === 'import' || serviceType === 'export' || pickupCountry !== destinationCountry;
  const distanceKm = isInternational ? 3400 : 570; // e.g. Bangalore to Hyderabad or Overseas

  const pricing = calculatePricing({
    distanceKm,
    weightKg,
    vehicleType,
    speed,
    isInternational,
    declaredValueINR,
    insurance,
    customsClearance: isInternational
  });

  const stepLabels = [
    'Service',
    'Package',
    'Pickup',
    'Destination',
    'Vehicle',
    'Schedule',
    'Tariff',
    'Confirm'
  ];

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Confirm Order
      const newOrder = createNewOrder({
        title: packageName,
        category: serviceType,
        productType: packageCategory,
        pickupLocation: `${pickupAddress}, ${pickupCity}, ${pickupCountry}`,
        destinationLocation: `${destinationAddress}, ${destinationCity}, ${destinationCountry}`,
        originCountry: pickupCountry,
        destinationCountry,
        vehicleType,
        weightKg,
        dimensions,
        declaredValueINR,
        estimatedPriceINR: pricing.totalINR,
        speed,
        notes
      });
      setCreatedOrderNumber(newOrder.orderNumber);
      setCurrentStep(9); // Success screen
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Step Progress */}
      <div className="pb-4 border-b border-red-900/20">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Create New Consignment</h2>
            <p className="text-xs text-neutral-400">Step {Math.min(currentStep, 8)} of 8 — {stepLabels[Math.min(currentStep - 1, 7)]}</p>
          </div>
          {currentStep <= 8 && (
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400">
              {Math.round((currentStep / 8) * 100)}% Completed
            </span>
          )}
        </div>

        {/* Progress Bar with Step Pills */}
        <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300 rounded-full"
            style={{ width: `${(Math.min(currentStep, 8) / 8) * 100}%` }}
          />
        </div>

        <div className="hidden sm:flex items-center justify-between text-[11px] font-mono text-neutral-500">
          {stepLabels.map((label, idx) => (
            <span
              key={idx}
              className={`${idx + 1 === currentStep ? 'text-red-400 font-bold' : idx + 1 < currentStep ? 'text-neutral-300' : ''}`}
            >
              {idx + 1}. {label}
            </span>
          ))}
        </div>
      </div>

      {/* Success Modal / Screen */}
      {currentStep === 9 ? (
        <div className="p-8 sm:p-12 rounded-2xl glass-panel border border-emerald-600/50 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white font-display">Consignment Confirmed & Dispatched</h3>
            <p className="text-sm text-neutral-300 mt-2 max-w-md mx-auto">
              Airway & Ground tracking ID <span className="text-red-400 font-mono font-bold">{createdOrderNumber}</span> generated and synced to satellite control.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-neutral-800 max-w-md mx-auto text-xs space-y-2 text-left">
            <div className="flex justify-between text-neutral-400">
              <span>Item:</span>
              <span className="text-white font-semibold">{packageName}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Fleet Assigned:</span>
              <span className="text-white font-semibold">{vehicleType.toUpperCase()} Express</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Estimated Fare:</span>
              <span className="text-red-400 font-mono font-bold">₹{pricing.totalINR.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('tracking')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(220,38,38,0.4)] cursor-pointer"
            >
              Open Live GPS Tracking Map
            </button>
            <button
              onClick={() => {
                setCurrentStep(1);
                setCurrentView('my_orders');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold cursor-pointer border border-neutral-700"
            >
              View in My Orders
            </button>
          </div>
        </div>
      ) : (
        /* Steps Container */
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-red-900/30 space-y-6">
          
          {/* Step 1: What do you need? */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 1 — What do you need?</h3>
              <p className="text-xs text-neutral-400">Select the primary category of transport or procurement service required.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'import', title: 'Import Consignment', desc: 'Bring products from overseas directly to India with customs clearance.' },
                  { id: 'export', title: 'Export Freight', desc: 'Dispatch manufactured goods or parcels from India to global destinations.' },
                  { id: 'order_product', title: 'Product Sourcing Request', desc: 'Have Aether Crimson source, negotiate, and purchase an international item for you.' },
                  { id: 'express_delivery', title: 'Urban / Domestic Delivery', desc: 'Dedicated intra-city or inter-state high-speed courier by moto, car, or van.' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setServiceType(item.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      serviceType === item.id
                        ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-neutral-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Package Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 2 — Package Information</h3>
              <p className="text-xs text-neutral-400">Enter technical dimensions and physical specifications.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Package Title / Item Description</label>
                  <input
                    type="text"
                    value={packageName}
                    onChange={e => setPackageName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Category</label>
                  <select
                    value={packageCategory}
                    onChange={e => setPackageCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 cursor-pointer"
                  >
                    <option value="Hardware & Electronics">Hardware & Electronics</option>
                    <option value="Confidential Documents">Legal & Financial Documents</option>
                    <option value="Medical & Pharma">Pharma & Medical Samples</option>
                    <option value="Industrial Spares">Industrial Precision Spares</option>
                    <option value="Luxury Goods">Luxury Goods & Jewelry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Total Weight (kg)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={weightKg}
                    onChange={e => setWeightKg(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Dimensions (L×W×H cm)</label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={e => setDimensions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Declared Commercial Value (₹ INR)</label>
                  <input
                    type="number"
                    min="1000"
                    step="5000"
                    value={declaredValueINR}
                    onChange={e => setDeclaredValueINR(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pickup Location */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 3 — Pickup Location</h3>
              <p className="text-xs text-neutral-400">Where should our courier or freight team pick up the cargo?</p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Street Address / Facility Name</label>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={e => setPickupAddress(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">City</label>
                    <input
                      type="text"
                      value={pickupCity}
                      onChange={e => setPickupCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Country</label>
                    <select
                      value={pickupCountry}
                      onChange={e => setPickupCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 cursor-pointer"
                    >
                      <option value="India">India</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Germany">Germany</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Destination */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 4 — Destination</h3>
              <p className="text-xs text-neutral-400">Enter recipient delivery coordinates and facility contact.</p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Recipient Address / Port</label>
                  <input
                    type="text"
                    value={destinationAddress}
                    onChange={e => setDestinationAddress(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">City</label>
                    <input
                      type="text"
                      value={destinationCity}
                      onChange={e => setDestinationCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Destination Country</label>
                    <select
                      value={destinationCountry}
                      onChange={e => setDestinationCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 cursor-pointer"
                    >
                      <option value="India">India</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Delivery Method */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 5 — Delivery Method</h3>
              <p className="text-xs text-neutral-400">Choose the optimal transport fleet archetype for payload and speed.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {VEHICLE_OPTIONS.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicleType(v.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      vehicleType === v.id
                        ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{v.name}</div>
                    <div className="text-[11px] text-neutral-400 mt-1">{v.capacity}</div>
                    <div className="text-[10px] text-red-400 font-mono mt-1">₹{v.perKmRateINR}/km · Base ₹{v.baseFareINR}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Schedule */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 6 — Schedule & Speed</h3>
              <p className="text-xs text-neutral-400">When should our vehicle depart from the origin terminal?</p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'instant', title: 'Instant Pickup', desc: 'Dispatch within 15 mins' },
                  { id: 'same_day', title: 'Same Day Express', desc: 'Delivered by tonight' },
                  { id: 'scheduled', title: 'Custom Scheduled', desc: 'Select reservation slot' }
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScheduleType(s.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      scheduleType === s.id
                        ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{s.title}</div>
                    <div className="text-[10px] text-neutral-400 mt-1">{s.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Time Window / Slot</label>
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={e => setScheduledTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                />
              </div>
            </div>
          )}

          {/* Step 7: Price Estimate */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 7 — Price Estimate</h3>
              <p className="text-xs text-neutral-400">Review transparent breakdown calculated by our logistics engine.</p>

              <div className="p-4 rounded-xl bg-black/60 border border-neutral-800 space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Base Fleet Vehicle Fare</span>
                  <span className="font-mono text-white">₹{pricing.baseFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Distance ({distanceKm} km transit)</span>
                  <span className="font-mono text-white">₹{pricing.distanceCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Weight Tariff ({weightKg} kg)</span>
                  <span className="font-mono text-white">₹{pricing.weightCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Priority Speed Surcharge</span>
                  <span className="font-mono text-white">₹{pricing.speedSurcharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Statutory GST (18%)</span>
                  <span className="font-mono text-white">₹{pricing.gstTax.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-white">Estimated Price</span>
                  <span className="text-2xl font-bold text-red-500 font-mono tabular-nums">
                    ₹{pricing.totalINR.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 font-mono">
                * Estimated Price. Final price may vary based on actual logistics conditions.
              </p>
            </div>
          )}

          {/* Step 8: Confirm Order */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Step 8 — Confirm Order</h3>
              <p className="text-xs text-neutral-400">Verify all booking specifications before satellite broadcast.</p>

              <div className="p-4 rounded-xl bg-black/60 border border-red-900/30 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-neutral-500 font-mono uppercase text-[10px]">Service</span>
                    <div className="text-white font-semibold capitalize">{serviceType.replace('_', ' ')}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono uppercase text-[10px]">Vehicle</span>
                    <div className="text-white font-semibold uppercase">{vehicleType}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono uppercase text-[10px]">Pickup</span>
                    <div className="text-white font-semibold truncate">{pickupAddress}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono uppercase text-[10px]">Destination</span>
                    <div className="text-white font-semibold truncate">{destinationAddress}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex justify-between items-center">
                  <span className="text-xs text-neutral-300">Total Authorization Amount:</span>
                  <span className="text-lg font-bold text-red-500 font-mono">₹{pricing.totalINR.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Special Handover Directives</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
                />
              </div>
            </div>
          )}

          {/* Navigation Control Buttons */}
          <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{currentStep === 8 ? 'Confirm & Dispatch Consignment' : 'Proceed'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

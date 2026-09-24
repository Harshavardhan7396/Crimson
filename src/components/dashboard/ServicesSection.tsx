import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShoppingBag, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { setCurrentView } = useLogistics();

  const services = [
    {
      id: 'import',
      title: 'Global Import Consignment',
      tagline: 'Source, clear customs, and import cargo from 184 nations directly to your doorstep.',
      icon: ArrowDownLeft,
      highlights: ['Customs DGFT Clearance', 'Duty Optimization', 'Door-to-Door Delivery'],
      bgImage: '/src/assets/images/hero_cargo_aircraft_1790266109897.jpg',
      badge: 'Cross-Border',
      actionText: 'Initiate Import Request'
    },
    {
      id: 'export',
      title: 'International Export Freight',
      tagline: 'High-speed air freight & deep-sea container logistics for worldwide export delivery.',
      icon: ArrowUpRight,
      highlights: ['AES / Export Licensure', 'Automated Palletization', 'Port-to-Port & Door'],
      bgImage: '/src/assets/images/vehicle_fleet_showcase_1790266122316.jpg',
      badge: 'Worldwide Dispatch',
      actionText: 'Book Export Consignment'
    },
    {
      id: 'order_product',
      title: 'Sourcing & Procurement',
      tagline: 'Want a hard-to-find international product? We procure, negotiate, verify quality, and deliver.',
      icon: ShoppingBag,
      highlights: ['Factory Direct Sourcing', 'Biometric Inspection', 'Curated Global Currency'],
      bgImage: '/src/assets/images/auth_portal_droplet_1790266133934.jpg',
      badge: 'Concierge Sourcing',
      actionText: 'Request Product Sourcing'
    },
    {
      id: 'order_create',
      title: 'Rapid Intra-City & Metro Delivery',
      tagline: 'Urgent express dispatch with dedicated electric bikes, luxury cars, and heavy commercial vans.',
      icon: Truck,
      highlights: ['Sub-60 Min Delivery', 'Tamper-Evident Envelopes', 'Real-Time Driver Tracking'],
      bgImage: '/src/assets/images/vehicle_fleet_showcase_1790266122316.jpg',
      badge: 'Instant Dispatch',
      actionText: 'Book Instant Courier'
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-red-500 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Service Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display tracking-tight">
            What can we help you with?
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Select a specialized logistics pipeline tailored to your commercial freight or courier requirements.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('order_create')}
          className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
        >
          <span>View Custom Multi-Step Wizard</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Grid of Large Animated Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map(srv => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              onClick={() => setCurrentView(srv.id)}
              className="group relative rounded-2xl glass-panel glass-panel-hover overflow-hidden p-6 sm:p-7 flex flex-col justify-between cursor-pointer border border-red-900/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Subtle Atmospheric Background Scrim */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity duration-500 scale-105 group-hover:scale-100"
                style={{ backgroundImage: `url(${srv.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

              {/* Content Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-700/40 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-800">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display group-hover:text-red-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  {srv.tagline}
                </p>

                {/* Highlights List */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {srv.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="text-[11px] font-sans text-neutral-300 flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="relative z-10 pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span>{srv.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  Instant Quotes & Clearance
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  ArrowRight 
} from 'lucide-react';

export const HelpView: React.FC = () => {
  const { setCurrentView } = useLogistics();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Aether Crimson handle international customs clearance?',
      a: 'We automate filing of electronic shipping bills, AES declarations, and DGFT compliance for imports and exports. In-house licensed customs brokers handle port and airport terminal clearances.'
    },
    {
      q: 'What is the difference between standard and express speed tiers?',
      a: 'Standard transit routes consignments via scheduled hub consolidation (1–3 business days domestic, 5–8 days international). Express guarantees priority flight/vehicle reservation with direct handover.'
    },
    {
      q: 'How are estimated prices calculated?',
      a: 'Rates are dynamically determined using base fleet tariff, actual transit distance, gross/volumetric weight, speed factor, and required statutory duties. Final price reflects actual terminal weigh-in and customs assessment.'
    },
    {
      q: 'Can Aether Crimson source and purchase products internationally on my behalf?',
      a: 'Yes. Our "Source & Procure" service verifies foreign manufacturers, performs escrow payments in local currencies, inspects physical quality, and handles all cross-border shipping to your address.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-red-900/20">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">Help & Operations Protocols</h2>
          <p className="text-xs text-neutral-400">
            Official logistics directives, international customs documentation guidelines, and direct terminal support.
          </p>
        </div>
      </div>

      {/* 24/7 Dispatch Desk Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-red-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-600/40 text-red-400">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-display">Global Terminal Dispatch Hotline</h4>
            <p className="text-xs text-neutral-400">24/7 dedicated support for active air, ocean, and urban freight.</p>
            <div className="text-sm font-mono text-red-400 font-bold mt-1">+91 (080) 4920-8800 · dispatch@aethercrimson.io</div>
          </div>
        </div>

        <button
          onClick={() => {
            const orb = document.querySelector('button[aria-label="Open Nova AI Logistics Assistant"]') as HTMLElement;
            if (orb) orb.click();
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Bot className="w-4 h-4" />
          <span>Consult Nova AI Co-Pilot</span>
        </button>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
        <h3 className="text-base font-bold text-white font-display">Frequently Answered Logistics Questions</h3>

        <div className="divide-y divide-neutral-900">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-2 text-xs font-bold text-white hover:text-red-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-red-400" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </button>
                {isOpen && (
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

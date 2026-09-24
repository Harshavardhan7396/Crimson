import React, { useState, useRef, useEffect } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw, 
  Sparkles, 
  Compass, 
  Package, 
  Truck, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

export const NovaAIChatbot: React.FC = () => {
  const { orders, calculatePricing, setCurrentView, setSelectedTrackingOrder } = useLogistics();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialGreeting: ChatMessage = {
    id: 'msg-init',
    sender: 'nova',
    text: "Greetings. I am Nova AI, your Aether Crimson logistics intelligence co-pilot. I can assist with international import/export clearances, dynamic rate calculations, live satellite tracking, or multi-modal vehicle comparison.",
    timestamp: 'Just now',
    quickActions: [
      { label: 'Track Active Shipment', action: () => handleTrackJump() },
      { label: 'Send Chennai to Bangalore', action: () => handleChennaiBangalorePrompt() },
      { label: 'Compare Fleet Vehicles', action: () => setCurrentView('vehicles') },
      { label: 'Calculate Tariff', action: () => setCurrentView('pricing') }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleTrackJump = () => {
    const active = orders.find(o => o.status === 'in_transit') || orders[0];
    if (active) {
      setSelectedTrackingOrder(active);
      setCurrentView('tracking');
      setIsOpen(false);
    }
  };

  const handleChennaiBangalorePrompt = () => {
    setInputText('I want to send a 10 kg package from Chennai to Bangalore.');
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // AI Cognitive Engine simulation
    setTimeout(() => {
      let replyText = '';
      let quickActions: { label: string; action: () => void }[] | undefined = undefined;

      const lower = userText.toLowerCase();

      if (lower.includes('chennai') && lower.includes('bangalore')) {
        replyText = "Sure. I can help you compare bike, car, and van delivery options. For a 10 kg package across the ~350 km Chennai-Bangalore expressway corridor:\n\n• Stealth Moto: Max 12 kg (₹4,900 est. · ~7 hrs transit)\n• Aether Apex Car: High-security air-conditioned trunk (₹9,800 est. · ~5.5 hrs transit)\n• Vortex Van: Heavy cargo bay (₹18,200 est. · ~6.5 hrs transit)\n\nPlease provide your exact pickup street and destination details to generate an instant booking.";
        quickActions = [
          { label: 'Book Car Delivery', action: () => setCurrentView('order_create') },
          { label: 'Calculate Exact Route', action: () => setCurrentView('pricing') }
        ];
      } else if (lower.includes('track') || lower.includes('status') || lower.includes('where is')) {
        const active = orders.find(o => o.status === 'in_transit') || orders[0];
        replyText = `Your shipment "${active.title}" (${active.orderNumber}) is currently IN TRANSIT. Satellite GPS telemetry reports ${active.routeProgressPercent}% completed with approximately ${active.estimatedMinutesRemaining} minutes remaining until arrival at destination.`;
        quickActions = [
          { label: 'Open Satellite Map', action: () => handleTrackJump() }
        ];
      } else if (lower.includes('import') || lower.includes('customs')) {
        replyText = "Our international import pipeline includes automated DGFT compliance, AES air manifests, and bonded warehouse clearance across 184 nations. Transit via Stratosphere Air Express averages 1–3 business days.";
        quickActions = [
          { label: 'Start Import Booking', action: () => setCurrentView('import') }
        ];
      } else if (lower.includes('export')) {
        replyText = "Export consignments require commercial invoice, packing list, and certificate of origin. We handle container stuffing, port drayage, and international air/ocean carrier manifests.";
        quickActions = [
          { label: 'Start Export Booking', action: () => setCurrentView('export') }
        ];
      } else if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('tariff')) {
        replyText = "Tariffs are computed dynamically using: Base Fleet Fare + (Distance × Mileage Rate) + Volumetric Weight Surcharge + Speed Surge (Express: 1.25x, Ultra: 1.55x). GST is calculated at statutory 18%.";
        quickActions = [
          { label: 'Open Price Calculator', action: () => setCurrentView('pricing') }
        ];
      } else if (lower.includes('reward') || lower.includes('points') || lower.includes('tier')) {
        replyText = "You earn loyalty points for every rupee spent on freight bookings (approximately 5% value back in points). Points can be redeemed for priority airport clearance waivers, local courier discounts, and marine cargo insurance.";
        quickActions = [
          { label: 'View Rewards Catalog', action: () => setCurrentView('rewards') }
        ];
      } else {
        replyText = `Understood. I have logged your inquiry regarding "${userText}". Our automated logistics command is ready to route consignments, optimize trade corridors, or connect you with terminal dispatch leads.`;
        quickActions = [
          { label: 'Create Consignment', action: () => setCurrentView('order_create') },
          { label: 'View Fleet Options', action: () => setCurrentView('vehicles') }
        ];
      }

      const novaReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'nova',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions
      };

      setMessages(prev => [...prev, novaReply]);
      setIsThinking(false);
    }, 1100);
  };

  const handleClear = () => {
    setMessages([initialGreeting]);
  };

  return (
    <>
      {/* Floating Glowing Red Orb in Bottom Right */}
      {!isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-40 select-none">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            aria-label="Open Nova AI Logistics Assistant"
          >
            {/* Outer Sonar Ripples */}
            <div className="absolute -inset-2 rounded-full border border-red-500/40 animate-ping opacity-50" />
            <div className="absolute -inset-1 rounded-full border border-red-600/30 animate-pulse-glow" />

            {/* Glowing Viscous Blood-Red Orb */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-black via-red-800 to-red-500 shadow-[0_0_35px_rgba(239,68,68,0.7)] flex items-center justify-center border border-red-400/60 animate-float">
              <Bot className="w-7 h-7 text-white drop-shadow-[0_0_8px_#fff]" />
            </div>

            {/* Tooltip Badge */}
            <div className="absolute right-16 px-3 py-1.5 rounded-xl bg-black/90 border border-red-800/60 text-[11px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
              <span className="text-red-400 font-bold">Nova AI</span> · Logistics Co-Pilot
            </div>
          </button>
        </div>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 rounded-2xl glass-panel shadow-[0_0_50px_rgba(220,38,38,0.3)] border border-red-700/50 flex flex-col h-[520px] max-h-[82vh] overflow-hidden select-none">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-red-950/90 to-black border-b border-red-900/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-red-900 to-red-500 flex items-center justify-center shadow-[0_0_12px_#ef4444] border border-red-400">
                <Bot className="w-4 h-4 text-white" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                  <span>Nova AI</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800">
                    Active
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-400">Autonomous Freight Intelligence</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-red-700 text-white rounded-tr-none shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                      : 'bg-neutral-900/90 border border-neutral-800 text-neutral-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] font-mono text-neutral-500 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Action Chips */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickActions.map((qa, i) => (
                      <button
                        key={i}
                        onClick={qa.action}
                        className="px-2.5 py-1 rounded-full bg-red-950/60 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{qa.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* AI Thinking Indicator */}
            {isThinking && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-neutral-400 text-xs w-fit">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-mono text-[11px]">Nova is calculating logistics routing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-black/90 border-t border-red-900/30 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask about tariffs, tracking, or corridors..."
              className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:border-red-500 focus:outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white disabled:opacity-40 transition-all cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

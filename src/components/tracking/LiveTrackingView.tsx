import React, { useRef, useEffect, useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  FastForward, 
  Radio, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { ShipmentStatus } from '../../types/logistics';

export const LiveTrackingView: React.FC = () => {
  const { 
    orders, 
    selectedTrackingOrder, 
    setSelectedTrackingOrder, 
    updateOrderStatus 
  } = useLogistics();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTabOrder, setActiveTabOrder] = useState(selectedTrackingOrder);

  // Sync selected order
  useEffect(() => {
    setActiveTabOrder(selectedTrackingOrder);
  }, [selectedTrackingOrder]);

  const currentOrder = activeTabOrder || orders[0];

  // Canvas map rendering for live animated route & moving vehicle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Dark futuristic tactical map background
      ctx.fillStyle = '#06080e';
      ctx.fillRect(0, 0, width, height);

      // Background grid lines (GPS coordinates matrix)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.08)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Simulated topography contour rings
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.05)';
      [120, 220, 340].forEach(r => {
        ctx.beginPath();
        ctx.ellipse(width * 0.45, height * 0.5, r, r * 0.6, 0.2, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Route Waypoints
      const p1 = { x: width * 0.18, y: height * 0.72 }; // Pickup Origin
      const p2 = { x: width * 0.82, y: height * 0.28 }; // Destination
      const cp1 = { x: width * 0.35, y: height * 0.2 };
      const cp2 = { x: width * 0.65, y: height * 0.85 };

      // Draw Main Corridor Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Glowing route pulses
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -t * 20;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // Progress Calculation
      const progress = Math.min(0.98, Math.max(0.02, (currentOrder.routeProgressPercent || 50) / 100));

      // Cubic Bezier interpolation function
      const getBezierPoint = (ratio: number) => {
        const u = 1 - ratio;
        const tt = ratio * ratio;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * ratio;

        const x = uuu * p1.x + 3 * uu * ratio * cp1.x + 3 * u * tt * cp2.x + ttt * p2.x;
        const y = uuu * p1.y + 3 * uu * ratio * cp1.y + 3 * u * tt * cp2.y + ttt * p2.y;
        return { x, y };
      };

      const vehPos = getBezierPoint(progress);

      // Traversed Path glow
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      // Sample points up to progress
      for (let s = 0; s <= progress; s += 0.02) {
        const pt = getBezierPoint(s);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // Pickup Marker (P1)
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.stroke();

      // Destination Marker (P2)
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, 14 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.stroke();

      // Moving Vehicle Marker
      ctx.save();
      ctx.translate(vehPos.x, vehPos.y);

      // Pulsing Sonar Ring
      const pulseR = 14 + (t * 18) % 24;
      const pulseAlpha = Math.max(0, 1 - pulseR / 38);
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(239, 68, 68, ${pulseAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vehicle Core Glow Dot
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 18;
      ctx.fill();

      // Vehicle HUD Tag
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(10, -22, 110, 20);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, -22, 110, 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(
        `${currentOrder.vehicleType.toUpperCase()} · ${currentOrder.routeProgressPercent}%`,
        16,
        -8
      );

      ctx.restore();

      // GPS Telemetry Stamp
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(`GPS LAT: 12.9716° N · LNG: 77.5946° E · BEARING 042° · CORRIDOR AC-${currentOrder.orderNumber}`, 16, height - 14);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [currentOrder]);

  const stages: { status: ShipmentStatus; label: string }[] = [
    { status: 'order_confirmed', label: 'Order Confirmed' },
    { status: 'processing', label: 'Processing' },
    { status: 'picked_up', label: 'Picked Up' },
    { status: 'in_transit', label: 'In Transit' },
    { status: 'near_destination', label: 'Near Destination' },
    { status: 'delivered', label: 'Delivered' }
  ];

  const currentStageIndex = stages.findIndex(s => s.status === currentOrder.status);

  const handleAdvanceSimulation = () => {
    const nextIdx = Math.min(stages.length - 1, currentStageIndex + 1);
    updateOrderStatus(currentOrder.id, stages[nextIdx].status);
  };

  return (
    <div className="space-y-6">
      {/* Top Consignment Header & Order Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-900/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Live Shipment Status</span>
            <span className="text-neutral-600">·</span>
            <span>Orbital Satellite Feed</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display flex items-center gap-3">
            <span>{currentOrder.title}</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-700/50 text-red-300">
              {currentOrder.orderNumber}
            </span>
          </h2>
        </div>

        {/* Consignment Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-neutral-400 hidden sm:inline">Active Consignment:</label>
          <select
            value={currentOrder.id}
            onChange={e => {
              const ord = orders.find(o => o.id === e.target.value);
              if (ord) {
                setSelectedTrackingOrder(ord);
                setActiveTabOrder(ord);
              }
            }}
            className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-red-500 focus:outline-none cursor-pointer"
          >
            {orders.map(o => (
              <option key={o.id} value={o.id}>
                {o.orderNumber} — {o.title.slice(0, 24)} ({o.status.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Large Interactive Map Canvas Viewport */}
      <div className="relative rounded-2xl glass-panel border border-red-900/40 overflow-hidden shadow-2xl">
        <canvas ref={canvasRef} className="w-full block" />

        {/* Floating ETA HUD Card */}
        <div className="absolute top-4 left-4 z-10 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-red-800/40 shadow-xl max-w-xs">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
            <span>LIVE TELEMETRY</span>
            <span className="text-red-400 font-bold">{currentOrder.routeProgressPercent}% COMPLETE</span>
          </div>
          <div className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-500" />
            <span>
              {currentOrder.status === 'delivered'
                ? 'Delivery Completed'
                : `Estimated arrival: ${currentOrder.estimatedMinutesRemaining} minutes`}
            </span>
          </div>
          <div className="text-xs text-neutral-300 mt-1">
            Corridor: {currentOrder.pickupLocation.split(',')[0]} → {currentOrder.destinationLocation.split(',')[0]}
          </div>
        </div>

        {/* Simulation Sandbox Control Overlay */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={handleAdvanceSimulation}
            disabled={currentOrder.status === 'delivered'}
            className="px-3 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-xs font-semibold text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Advance Shipment Status</span>
          </button>
        </div>
      </div>

      {/* 6-Stage Glowing Shipment Timeline */}
      <div className="p-6 rounded-2xl glass-panel border border-red-900/30">
        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-5 flex items-center gap-2 text-red-400">
          <Layers className="w-4 h-4" />
          <span>Consignment Progression Checkpoints</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {stages.map((st, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={st.status}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-red-950/70 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                    : isCompleted
                    ? 'bg-neutral-900/80 border-red-900/40 text-neutral-200'
                    : 'bg-neutral-950/40 border-neutral-900 text-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono">0{idx + 1}</span>
                  {isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-neutral-800" />
                  )}
                </div>

                <div className={`text-xs font-bold leading-snug ${isCurrent ? 'text-white' : ''}`}>
                  {st.label}
                </div>

                <div className="text-[10px] font-mono text-neutral-400 mt-2">
                  {isCurrent ? 'IN PROGRESS' : isCompleted ? 'VERIFIED' : 'PENDING'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Courier & Vehicle Telemetry Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Driver Card */}
        <div className="p-5 rounded-2xl glass-panel border border-red-900/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-950 border border-red-600 flex items-center justify-center font-bold text-red-300 font-display text-lg shrink-0">
            {currentOrder.driverName?.slice(0, 2).toUpperCase() || 'AC'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate">{currentOrder.driverName || 'Lead Pilot / Specialist'}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{currentOrder.driverRating || 4.95} Rating</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">{currentOrder.vehicleRegistration}</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-1">
              {currentOrder.driverPhone || '+91 98450 00000'}
            </div>
          </div>
        </div>

        {/* Cargo Specs */}
        <div className="p-5 rounded-2xl glass-panel border border-red-900/30 text-xs space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Cargo Manifest</div>
          <div className="flex justify-between text-neutral-300">
            <span>Weight:</span>
            <span className="font-mono text-white font-semibold">{currentOrder.weightKg} kg</span>
          </div>
          <div className="flex justify-between text-neutral-300">
            <span>Declared Value:</span>
            <span className="font-mono text-white font-semibold">₹{currentOrder.declaredValueINR.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-neutral-300">
            <span>Speed Tier:</span>
            <span className="font-mono text-red-400 uppercase font-semibold">{currentOrder.speed}</span>
          </div>
        </div>

        {/* Security & Vault Protocol */}
        <div className="p-5 rounded-2xl glass-panel border border-red-900/30 text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Biometric Chain of Custody</span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            {currentOrder.notes || 'Package monitored with tamper-evident cryptographic seal and GPS tracking beacon.'}
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useRef, useEffect } from 'react';
import { DeliveryVehicleType } from '../../types/logistics';
import { VEHICLE_OPTIONS } from '../../data/mockLogisticsData';

interface VehicleViewerProps {
  selectedVehicle: DeliveryVehicleType;
  isExpress?: boolean;
}

export const VehicleViewer: React.FC<VehicleViewerProps> = ({ selectedVehicle, isExpress = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const vehicle = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 260);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 260;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;

    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;

      // 1. Perspective road / flight runway grid
      ctx.save();
      const horizonY = height * 0.75;
      const gridLines = 8;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.18)';
      ctx.lineWidth = 1;

      // Moving transverse grid lines
      for (let i = 0; i < gridLines; i++) {
        const offset = ((i / gridLines) + (t * 0.25) % 1) % 1;
        const lineY = horizonY - 40 + Math.pow(offset, 2) * 90;
        const spread = 80 + Math.pow(offset, 2) * (width * 0.7);

        ctx.beginPath();
        ctx.moveTo(cx - spread * 0.5, lineY);
        ctx.lineTo(cx + spread * 0.5, lineY);
        ctx.stroke();
      }

      // Longitudinal lines converging
      for (let j = -3; j <= 3; j++) {
        ctx.beginPath();
        ctx.moveTo(cx + j * 12, horizonY - 40);
        ctx.lineTo(cx + j * (width * 0.16), height);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Holographic vehicle shadow & glow
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(cx, cy + 32, 10, cx, cy + 32, 110);
      shadowGrad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
      shadowGrad.addColorStop(0.6, 'rgba(185, 28, 28, 0.15)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 32, 110, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Render Vehicle Archetype
      ctx.save();
      ctx.translate(cx, cy + Math.sin(t * 2) * 4); // Floating/Engine vibration

      if (selectedVehicle === 'bike') {
        // High-Tech Stealth Electric Bike
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Wheels
        const wheelAngle = t * 6;
        [-48, 48].forEach(wx => {
          ctx.save();
          ctx.translate(wx, 16);
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.strokeStyle = '#ef4444';
          ctx.stroke();

          // Wheel rim spokes
          for (let s = 0; s < 3; s++) {
            const sa = wheelAngle + (s * Math.PI * 2) / 3;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(sa) * 14, Math.sin(sa) * 14);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          ctx.restore();
        });

        // Frame
        ctx.beginPath();
        ctx.moveTo(-48, 16);
        ctx.lineTo(-12, -4);
        ctx.lineTo(15, -6);
        ctx.lineTo(48, 16);
        ctx.lineTo(8, 16);
        ctx.lineTo(-12, -4);
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // High-tech battery block & courier vault box
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(-28, 0, 26, 12);
        ctx.fillStyle = '#262626';
        ctx.fillRect(-38, -14, 22, 16); // Courier Vault

        // Handlebars & Headlamp beam
        ctx.beginPath();
        ctx.moveTo(15, -6);
        ctx.lineTo(26, -20);
        ctx.lineTo(34, -18);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Headlamp laser
        ctx.beginPath();
        ctx.moveTo(32, -14);
        ctx.lineTo(95, -6);
        ctx.strokeStyle = 'rgba(254, 202, 202, 0.35)';
        ctx.lineWidth = 4;
        ctx.stroke();

      } else if (selectedVehicle === 'car') {
        // Aether Apex Sedan
        ctx.fillStyle = '#18181b';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;

        // Aerodynamic chassis body
        ctx.beginPath();
        ctx.moveTo(-75, 14);
        ctx.lineTo(-65, -2);
        ctx.lineTo(-40, -10);
        ctx.lineTo(-15, -24);
        ctx.lineTo(35, -24);
        ctx.lineTo(60, -4);
        ctx.lineTo(80, 10);
        ctx.lineTo(75, 18);
        ctx.lineTo(-75, 18);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Sleek crimson side accent line
        ctx.beginPath();
        ctx.moveTo(-70, 8);
        ctx.lineTo(75, 8);
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Dark tinted cockpit canopy
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath();
        ctx.moveTo(-10, -20);
        ctx.lineTo(30, -20);
        ctx.lineTo(50, -4);
        ctx.lineTo(-30, -4);
        ctx.closePath();
        ctx.fill();

        // Wheels
        [-46, 46].forEach(wx => {
          ctx.beginPath();
          ctx.arc(wx, 18, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#09090b';
          ctx.fill();
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.stroke();
        });

      } else if (selectedVehicle === 'van') {
        // Vortex Autonomous Van
        ctx.fillStyle = '#171717';
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 2.5;

        // Big Cargo Box Frame
        ctx.beginPath();
        ctx.roundRect(-85, -34, 110, 48, 6);
        ctx.fill();
        ctx.stroke();

        // Front cab
        ctx.beginPath();
        ctx.moveTo(25, 14);
        ctx.lineTo(68, 14);
        ctx.lineTo(72, -2);
        ctx.lineTo(55, -22);
        ctx.lineTo(25, -22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Windshield
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.beginPath();
        ctx.moveTo(30, -18);
        ctx.lineTo(50, -18);
        ctx.lineTo(64, -2);
        ctx.lineTo(30, -2);
        ctx.closePath();
        ctx.fill();

        // Autonomous sensor lidar dome on roof
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(42, -26, 4, 0, Math.PI * 2);
        ctx.fill();

        // Cargo door lines
        ctx.beginPath();
        ctx.moveTo(-35, -34);
        ctx.lineTo(-35, 14);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Wheels
        [-52, 48].forEach(wx => {
          ctx.beginPath();
          ctx.arc(wx, 16, 15, 0, Math.PI * 2);
          ctx.fillStyle = '#09090b';
          ctx.fill();
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.stroke();
        });

      } else if (selectedVehicle === 'air') {
        // Stratosphere Cargo Jet
        ctx.fillStyle = '#1c1917';
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2;

        // Fuselage
        ctx.beginPath();
        ctx.ellipse(0, 0, 92, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Delta Main Wings
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(-5, 46);
        ctx.lineTo(15, 46);
        ctx.lineTo(25, 0);
        ctx.lineTo(15, -46);
        ctx.lineTo(-5, -46);
        ctx.closePath();
        ctx.fillStyle = '#262626';
        ctx.fill();
        ctx.stroke();

        // Tail Fin
        ctx.beginPath();
        ctx.moveTo(-70, -2);
        ctx.lineTo(-88, -28);
        ctx.lineTo(-76, -28);
        ctx.lineTo(-58, -2);
        ctx.closePath();
        ctx.fillStyle = '#dc2626';
        ctx.fill();

        // Twin Engine Jet Flares
        [-18, 18].forEach(ey => {
          ctx.beginPath();
          ctx.ellipse(12, ey, 14, 5, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#0a0a0a';
          ctx.fill();
          ctx.stroke();

          // Afterburner fire trail
          ctx.beginPath();
          ctx.moveTo(26, ey - 3);
          ctx.lineTo(44 + Math.sin(t * 12) * 6, ey);
          ctx.lineTo(26, ey + 3);
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

      } else if (selectedVehicle === 'sea') {
        // Crimson Wave Ultra-Vessel Container Ship
        ctx.fillStyle = '#18181b';
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;

        // Ship hull
        ctx.beginPath();
        ctx.moveTo(-90, 8);
        ctx.lineTo(-85, 22);
        ctx.lineTo(75, 22);
        ctx.lineTo(95, 2);
        ctx.lineTo(82, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Ocean wave water line
        ctx.beginPath();
        for (let w = -110; w <= 110; w += 10) {
          const wy = 22 + Math.sin(w * 0.05 + t * 3) * 3;
          if (w === -110) ctx.moveTo(w, wy);
          else ctx.lineTo(w, wy);
        }
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Stacks of Cargo Containers (Crimson & Steel)
        const colors = ['#dc2626', '#991b1b', '#3f3f46', '#ef4444', '#71717a'];
        for (let c = 0; c < 5; c++) {
          const cxPos = -70 + c * 26;
          for (let row = 0; row < 2; row++) {
            ctx.fillStyle = colors[(c + row) % colors.length];
            ctx.fillRect(cxPos, -8 - row * 12, 22, 10);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(cxPos, -8 - row * 12, 22, 10);
          }
        }

        // Bridge tower & radar mast
        ctx.fillStyle = '#27272a';
        ctx.fillRect(52, -26, 22, 28);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(58, -36, 4, 10); // Exhaust funnel
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [selectedVehicle, isExpress]);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-neutral-950/90 to-black border border-red-900/30 overflow-hidden p-4">
      {/* Visual Header */}
      <div className="flex items-center justify-between z-10 relative mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h4 className="text-base font-bold text-white font-display">{vehicle.name}</h4>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-red-950/60 border border-red-800/40 text-red-300">
          Max {vehicle.maxWeightKg.toLocaleString()} kg payload
        </div>
      </div>

      {/* Dynamic Animated Canvas Stage */}
      <canvas ref={canvasRef} className="w-full block" />

      {/* Live Specs & Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-red-900/20 text-xs">
        <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-neutral-400 text-[10px] uppercase font-mono">Capacity</div>
          <div className="font-semibold text-neutral-200 truncate">{vehicle.capacity}</div>
        </div>
        <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-neutral-400 text-[10px] uppercase font-mono">Cruising Speed</div>
          <div className="font-semibold text-neutral-200 font-mono">{vehicle.speedKmph} km/h</div>
        </div>
        <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-neutral-400 text-[10px] uppercase font-mono">Base Tariff</div>
          <div className="font-semibold text-red-400 font-mono">₹{vehicle.baseFareINR.toLocaleString()}</div>
        </div>
        <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-neutral-400 text-[10px] uppercase font-mono">Environmental Tier</div>
          <div className="font-semibold text-emerald-400 truncate">{vehicle.carbonScore}</div>
        </div>
      </div>
    </div>
  );
};

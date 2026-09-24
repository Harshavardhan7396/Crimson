import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TradeRouteData {
  fromName: string;
  fromCoords: [number, number]; // [lat, lng]
  toName: string;
  toCoords: [number, number];
  vehicleType: 'air' | 'sea' | 'truck' | 'car' | 'bike';
  vehicleName: string;
  transitTime: string;
}

const TRADE_ROUTES: TradeRouteData[] = [
  {
    fromName: 'India (Bangalore/Mumbai)',
    fromCoords: [19.07, 72.87],
    toName: 'UAE (Dubai Hub)',
    toCoords: [25.20, 55.27],
    vehicleType: 'air',
    vehicleName: 'Stratosphere Flight AC-801',
    transitTime: '3h 15m'
  },
  {
    fromName: 'India (Chennai/BLR)',
    fromCoords: [13.08, 80.27],
    toName: 'Singapore (Changi Logistics)',
    toCoords: [1.35, 103.82],
    vehicleType: 'air',
    vehicleName: 'Stratosphere Flight AC-409',
    transitTime: '4h 10m'
  },
  {
    fromName: 'India (Nhava Sheva)',
    fromCoords: [18.95, 72.95],
    toName: 'Europe (Rotterdam Marine Port)',
    toCoords: [51.92, 4.47],
    vehicleType: 'sea',
    vehicleName: 'Crimson Wave Ultra-Vessel',
    transitTime: '14 Days'
  },
  {
    fromName: 'India (New Delhi)',
    fromCoords: [28.61, 77.20],
    toName: 'USA (New York JFK Cargo)',
    toCoords: [40.71, -74.00],
    vehicleType: 'air',
    vehicleName: 'Global Intercontinental Jet 10',
    transitTime: '15h 40m'
  },
  {
    fromName: 'India (Mumbai Port)',
    fromCoords: [18.96, 72.83],
    toName: 'East Africa (Mombasa Port)',
    toCoords: [-4.04, 39.66],
    vehicleType: 'sea',
    vehicleName: 'Pacific Rim Carrier 3',
    transitTime: '6 Days'
  },
  {
    fromName: 'India (Bangalore Tech Corridor)',
    fromCoords: [12.97, 77.59],
    toName: 'India (Hyderabad Hub)',
    toCoords: [17.38, 78.48],
    vehicleType: 'truck',
    vehicleName: 'Vortex Autonomous Van Fleet',
    transitTime: '8h 30m'
  }
];

export const Globe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeRoute, setActiveRoute] = useState<TradeRouteData>(TRADE_ROUTES[0]);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 240);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn('WebGL initialization fallback', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeRadius = 80;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner dark sphere with deep crimson tone
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius - 0.5, 64, 64);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x05070f,
      wireframe: false
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerSphere);

    // 2. Latitude and Longitude subtle wireframe grid
    const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(globeRadius, 24, 24));
    const gridMat = new THREE.LineBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.14
    });
    const grid = new THREE.LineSegments(gridGeo, gridMat);
    globeGroup.add(grid);

    // 3. Globe surface dots representing continents
    // Helper function to convert lat/lng to 3D Cartesian coords
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Generate distributed continent dot cloud
    const dotCount = 1400;
    const dotPositions: number[] = [];
    const dotColors: number[] = [];
    const colorRed = new THREE.Color(0xef4444);
    const colorDim = new THREE.Color(0x3f1212);

    for (let i = 0; i < dotCount; i++) {
      // Semi-realistic distribution clustering around major landmasses
      const lat = (Math.random() - 0.5) * 140; // -70 to 70
      const lng = (Math.random() - 0.5) * 360; // -180 to 180

      const v = latLngToVector3(lat, lng, globeRadius + 0.2);
      dotPositions.push(v.x, v.y, v.z);

      // Highlight areas near India, Europe, Asia, Americas
      const isHub = (lat > 5 && lat < 35 && lng > 60 && lng < 110) || (lat > 35 && lat < 60 && lng > -10 && lng < 35);
      const c = isHub ? colorRed : colorDim;
      dotColors.push(c.r, c.g, c.b);
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const dotCloud = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotCloud);

    // 4. Glowing outer atmosphere rim
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.15, 32, 32);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.95, 0.15, 0.15, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // 5. Build 3D Bezier trade route curves and flowing particles
    interface RouteVisual {
      curve: THREE.CubicBezierCurve3;
      particle: THREE.Mesh;
      vehicleMesh: THREE.Mesh;
      progress: number;
      speed: number;
    }
    const routeVisuals: RouteVisual[] = [];

    TRADE_ROUTES.forEach((route, idx) => {
      const v1 = latLngToVector3(route.fromCoords[0], route.fromCoords[1], globeRadius);
      const v2 = latLngToVector3(route.toCoords[0], route.toCoords[1], globeRadius);

      // Arc height
      const dist = v1.distanceTo(v2);
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const altitude = globeRadius + dist * 0.35;
      mid.normalize().multiplyScalar(altitude);

      // Control points
      const cp1 = v1.clone().lerp(mid, 0.5).normalize().multiplyScalar(altitude * 0.95);
      const cp2 = v2.clone().lerp(mid, 0.5).normalize().multiplyScalar(altitude * 0.95);

      const curve = new THREE.CubicBezierCurve3(v1, cp1, cp2, v2);
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const curveMat = new THREE.LineBasicMaterial({
        color: idx === 0 ? 0xff4d4d : 0xdc2626,
        transparent: true,
        opacity: idx === 0 ? 0.9 : 0.45,
        linewidth: 2
      });
      const curveLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(curveLine);

      // Destination pins / markers
      [v1, v2].forEach((pos, i) => {
        const pinGeo = new THREE.SphereGeometry(1.6, 12, 12);
        const pinMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0xffffff : 0xef4444 });
        const pinMesh = new THREE.Mesh(pinGeo, pinMat);
        pinMesh.position.copy(pos);
        globeGroup.add(pinMesh);

        // Marker halo ring
        const ringGeo = new THREE.RingGeometry(1.8, 3.2, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xef4444,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos.clone().multiplyScalar(1.02));
        ring.lookAt(pos.clone().multiplyScalar(2));
        globeGroup.add(ring);
      });

      // Moving light particle along curve
      const particleGeo = new THREE.SphereGeometry(1.8, 8, 8);
      const particleMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95
      });
      const particle = new THREE.Mesh(particleGeo, particleMat);
      globeGroup.add(particle);

      // Mini 3D vehicle avatar (Jet/Ship/Van represented by aerodynamic tetrahedron)
      const vehicleGeo = new THREE.ConeGeometry(2.5, 5, 4);
      const vehicleMat = new THREE.MeshBasicMaterial({
        color: route.vehicleType === 'sea' ? 0x60a5fa : route.vehicleType === 'truck' ? 0xf59e0b : 0xff3b30
      });
      const vehicleMesh = new THREE.Mesh(vehicleGeo, vehicleMat);
      globeGroup.add(vehicleMesh);

      routeVisuals.push({
        curve,
        particle,
        vehicleMesh,
        progress: (idx * 0.2) % 1,
        speed: 0.003 + (idx % 3) * 0.001
      });
    });

    // Rotate towards Asia/India initially
    globeGroup.rotation.y = -Math.PI * 0.35;
    globeGroup.rotation.x = 0.25;

    // Mouse drag interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        globeGroup.rotation.y += 0.0018;
      }

      // Update route light particles and vehicles
      routeVisuals.forEach(rv => {
        rv.progress += rv.speed;
        if (rv.progress > 1) rv.progress = 0;

        const currentPos = rv.curve.getPointAt(rv.progress);
        rv.particle.position.copy(currentPos);

        const vehiclePos = rv.curve.getPointAt(Math.min(1, rv.progress + 0.04));
        rv.vehicleMesh.position.copy(vehiclePos);
        rv.vehicleMesh.lookAt(rv.curve.getPointAt(Math.min(1, rv.progress + 0.08)));
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleWindowResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight || 480;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleWindowResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [isRotating]);

  return (
    <div className="relative w-full h-[460px] md:h-[540px] flex items-center justify-center overflow-hidden rounded-2xl glass-panel border border-red-900/30">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating interactive route switcher badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-red-800/40 text-xs">
        <div className="flex items-center gap-2 text-neutral-400 uppercase tracking-widest font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Active Trade Corridors</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {TRADE_ROUTES.map((route, i) => (
            <button
              key={i}
              onClick={() => setActiveRoute(route)}
              className={`px-2.5 py-1 rounded text-xs transition-all whitespace-nowrap cursor-pointer ${
                activeRoute.toName === route.toName
                  ? 'bg-red-600/30 border border-red-500 text-white font-medium shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                  : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {route.fromName.split(' ')[0]} → {route.toName.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Active Corridor Card */}
      <div className="absolute bottom-4 left-4 z-10 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-red-900/40 max-w-xs shadow-xl hidden sm:block">
        <div className="text-[11px] font-mono text-red-400 uppercase tracking-wider mb-1">
          Featured Transport
        </div>
        <div className="text-sm font-semibold text-white">
          {activeRoute.fromName} → {activeRoute.toName}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800 text-xs text-neutral-300">
          <span>{activeRoute.vehicleName}</span>
          <span className="font-mono text-red-400 font-semibold">{activeRoute.transitTime}</span>
        </div>
      </div>

      {/* Interactive 3D Control overlay */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-red-900/30 text-xs text-neutral-300 hover:text-white hover:border-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span className={`w-2 h-2 rounded-full ${isRotating ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
          <span>{isRotating ? 'Auto-Rotate ON' : 'Paused (Drag to Spin)'}</span>
        </button>
      </div>

      {/* Background soft red glow accent behind globe */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-red-700/10 blur-3xl" />
      </div>
    </div>
  );
};

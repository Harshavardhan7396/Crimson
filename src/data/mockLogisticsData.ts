import { OrderItem, VehicleOption, RewardCoupon, AppNotification, RecommendationItem } from '../types/logistics';

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'bike',
    name: 'Stealth Electric Moto',
    tagline: 'Hyper-agile urban courier for urgent lightweight parcels',
    capacity: 'Up to 12 kg · 35×25×20 cm',
    maxWeightKg: 12,
    suitableFor: ['Confidential Documents', 'Electronics & Phones', 'Medical Samples', 'Urgent Diplomatic Mail'],
    baseFareINR: 180,
    perKmRateINR: 14,
    speedKmph: 45,
    isInternational: false,
    carbonScore: 'Zero Emissions',
    accentColor: '#ef4444'
  },
  {
    id: 'car',
    name: 'Aether Apex Electric Sedan',
    tagline: 'Climate-controlled high security express transport',
    capacity: 'Up to 150 kg · 4 Large Cases',
    maxWeightKg: 150,
    suitableFor: ['High-Value Luxury Goods', 'Multiple Box Shipments', 'Fragile Equipment', 'Personal Parcels'],
    baseFareINR: 450,
    perKmRateINR: 28,
    speedKmph: 65,
    isInternational: false,
    carbonScore: 'Eco-Electric',
    accentColor: '#dc2626'
  },
  {
    id: 'van',
    name: 'Vortex Autonomous Cargo Van',
    tagline: 'High-payload commercial transport with automated pallet rack',
    capacity: 'Up to 1,200 kg · 8.5 m³ Cargo Volume',
    maxWeightKg: 1200,
    suitableFor: ['Bulk Commercial Inventory', 'Industrial Machinery Parts', 'E-commerce Batches', 'Event Exhibits'],
    baseFareINR: 1400,
    perKmRateINR: 52,
    speedKmph: 60,
    isInternational: false,
    carbonScore: 'Hybrid Electric',
    accentColor: '#b91c1c'
  },
  {
    id: 'air',
    name: 'Stratosphere Cargo Jet (Air Freight)',
    tagline: 'Supersonic global express connecting 180+ global airports',
    capacity: 'Up to 25,000 kg · Intercontinental Freight',
    maxWeightKg: 25000,
    suitableFor: ['Cross-Border Electronics', 'Critical Pharmaceuticals', 'Perishable Luxury Commodities', 'Urgent Spares'],
    baseFareINR: 12500,
    perKmRateINR: 95,
    speedKmph: 850,
    isInternational: true,
    carbonScore: 'SAF Certified',
    accentColor: '#f87171'
  },
  {
    id: 'sea',
    name: 'Crimson Wave Ultra-Vessel (Ocean Freight)',
    tagline: 'Deep-ocean container liner with climate-regulated TEU bays',
    capacity: 'Full & Partial Container (TEU/FEU)',
    maxWeightKg: 100000,
    suitableFor: ['Full Container Load (FCL)', 'Raw Industrial Materials', 'Automotive Assemblies', 'Heavy Machinery'],
    baseFareINR: 28000,
    perKmRateINR: 32,
    speedKmph: 38,
    isInternational: true,
    carbonScore: 'Low Sulphur Bio-Fuel',
    accentColor: '#991b1b'
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ORD-882194',
    orderNumber: 'AC-2026-8821',
    title: 'Precision Microchip Consignment',
    category: 'import',
    productType: 'Semiconductor Wafer Carriers',
    pickupLocation: 'Jurong High-Tech Park, Singapore',
    destinationLocation: 'Whitefield Technology Corridor, Bangalore, India',
    originCountry: 'Singapore',
    destinationCountry: 'India',
    vehicleType: 'air',
    weightKg: 42,
    dimensions: '60×45×40 cm',
    declaredValueINR: 850000,
    estimatedPriceINR: 34500,
    status: 'in_transit',
    createdAt: '2026-09-23T14:30:00Z',
    estimatedDeliveryDate: '2026-09-24T18:00:00Z',
    estimatedMinutesRemaining: 32,
    speed: 'ultra_priority',
    driverName: 'Capt. Siddharth Roy (Air Command Flight AC-409)',
    driverPhone: '+91 98450 11928',
    driverRating: 4.96,
    vehicleRegistration: 'VT-ACX',
    currentCoordinates: [12.985, 77.728],
    pickupCoordinates: [1.352, 103.819],
    destinationCoordinates: [12.971, 77.594],
    routeProgressPercent: 78,
    checkpoints: [
      {
        id: 'cp-1',
        status: 'order_confirmed',
        title: 'Customs Electronic Clearance Confirmed',
        location: 'Singapore Customs Terminal',
        timestamp: 'Sep 23, 14:35',
        completed: true,
        current: false,
        notes: 'Priority air manifest logged under AES-902'
      },
      {
        id: 'cp-2',
        status: 'processing',
        title: 'Hermetic Cargo Loading & Seal Verified',
        location: 'Changi Logistics Terminal C3',
        timestamp: 'Sep 23, 18:20',
        completed: true,
        current: false,
        notes: 'RFID temperature and barometric tags initialized'
      },
      {
        id: 'cp-3',
        status: 'picked_up',
        title: 'Stratosphere Flight AC-409 Departure',
        location: 'Changi Air Cargo Base',
        timestamp: 'Sep 24, 02:10',
        completed: true,
        current: false
      },
      {
        id: 'cp-4',
        status: 'in_transit',
        title: 'In Flight - Descending to Kempegowda Intl Airport',
        location: 'Air Corridor South-East Sector',
        timestamp: 'Sep 24, 08:45',
        completed: false,
        current: true,
        notes: 'Altitude: 14,000 ft. Local ground transfer dispatch standing by.'
      },
      {
        id: 'cp-5',
        status: 'near_destination',
        title: 'Final Mile Armored Courier Dispatch',
        location: 'BLR Hub to Whitefield Tech Park',
        timestamp: 'Pending (Est. 17:15)',
        completed: false,
        current: false
      },
      {
        id: 'cp-6',
        status: 'delivered',
        title: 'Recipient Biometric Verification & Delivery',
        location: 'Bangalore Recipient Facility',
        timestamp: 'Pending (Est. 18:00)',
        completed: false,
        current: false
      }
    ],
    notes: 'Fragile cryogenic casing. Temperature maintained at +4°C.'
  },
  {
    id: 'ORD-774912',
    orderNumber: 'AC-2026-7749',
    title: 'Aerospace Titanium Alloy Extrusions',
    category: 'export',
    productType: 'Aircraft Grade Grade-5 Titanium',
    pickupLocation: 'Peenya Industrial Estate, Bangalore, India',
    destinationLocation: 'Dubai South Aviation City, UAE',
    originCountry: 'India',
    destinationCountry: 'UAE',
    vehicleType: 'air',
    weightKg: 180,
    dimensions: '140×50×50 cm',
    declaredValueINR: 1420000,
    estimatedPriceINR: 58200,
    status: 'processing',
    createdAt: '2026-09-24T06:15:00Z',
    estimatedDeliveryDate: '2026-09-25T14:00:00Z',
    estimatedMinutesRemaining: 180,
    speed: 'express',
    driverName: 'Rajesh Kumar (Freight Terminal Specialist)',
    driverPhone: '+91 97112 44320',
    driverRating: 4.92,
    vehicleRegistration: 'KA-04-TR-9021',
    currentCoordinates: [13.028, 77.514],
    pickupCoordinates: [13.028, 77.514],
    destinationCoordinates: [24.896, 55.161],
    routeProgressPercent: 28,
    checkpoints: [
      {
        id: 'cp-201',
        status: 'order_confirmed',
        title: 'Export Compliance Verified',
        location: 'Bangalore Central DGFT Desk',
        timestamp: 'Sep 24, 06:20',
        completed: true,
        current: false
      },
      {
        id: 'cp-202',
        status: 'processing',
        title: 'Security Scanning & Crate Palletization',
        location: 'Peenya Consolidation Yard',
        timestamp: 'Sep 24, 07:45',
        completed: false,
        current: true,
        notes: 'X-Ray density calibration completed without anomaly'
      },
      {
        id: 'cp-203',
        status: 'in_transit',
        title: 'Transfer to Gulf Express Air Cargo',
        location: 'BLR Terminal 2 Air Cargo',
        timestamp: 'Pending (Est. 12:00)',
        completed: false,
        current: false
      },
      {
        id: 'cp-204',
        status: 'delivered',
        title: 'Dubai South Freezone Handover',
        location: 'DWC Aviation Hub, UAE',
        timestamp: 'Pending (Est. Sep 25)',
        completed: false,
        current: false
      }
    ]
  },
  {
    id: 'ORD-662301',
    orderNumber: 'AC-2026-6623',
    title: 'Automotive LiDAR Sensors Batch',
    category: 'order_product',
    productType: 'Solid-State LiDAR Optical Modules',
    pickupLocation: 'Stuttgart Automation District, Germany',
    destinationLocation: 'Electronic City Phase 1, Bangalore, India',
    originCountry: 'Germany',
    destinationCountry: 'India',
    vehicleType: 'van',
    weightKg: 24,
    declaredValueINR: 640000,
    estimatedPriceINR: 22400,
    status: 'picked_up',
    createdAt: '2026-09-22T09:00:00Z',
    estimatedDeliveryDate: '2026-09-26T12:00:00Z',
    estimatedMinutesRemaining: 480,
    speed: 'standard',
    driverName: 'Vikram Joshi (Intercity Transit Lead)',
    driverPhone: '+91 99014 55823',
    driverRating: 4.88,
    vehicleRegistration: 'KA-51-VN-4402',
    currentCoordinates: [48.775, 9.182],
    pickupCoordinates: [48.775, 9.182],
    destinationCoordinates: [12.845, 77.663],
    routeProgressPercent: 44,
    checkpoints: [
      {
        id: 'cp-301',
        status: 'order_confirmed',
        title: 'Sourcing Agreement Finalized',
        location: 'Stuttgart Sourcing Center',
        timestamp: 'Sep 22, 09:30',
        completed: true,
        current: false
      },
      {
        id: 'cp-302',
        status: 'picked_up',
        title: 'Factory Pickup by Aether Europe Fleet',
        location: 'Baden-Württemberg Logistics Base',
        timestamp: 'Sep 23, 11:15',
        completed: true,
        current: true
      },
      {
        id: 'cp-303',
        status: 'in_transit',
        title: 'Frankfurt Air Freight Hub Consolidated',
        location: 'FRA CargoCity South',
        timestamp: 'Pending (Est. Sep 24)',
        completed: false,
        current: false
      },
      {
        id: 'cp-304',
        status: 'delivered',
        title: 'Delivery to Autonomous Systems Lab',
        location: 'Electronic City, India',
        timestamp: 'Pending (Est. Sep 26)',
        completed: false,
        current: false
      }
    ]
  },
  {
    id: 'ORD-551048',
    orderNumber: 'AC-2026-5510',
    title: 'Legal Patent Deeds & Corporate Seals',
    category: 'express_delivery',
    productType: 'Tamper-Evident Legal Vault Folder',
    pickupLocation: 'Bandra Kurla Complex (BKC), Mumbai',
    destinationLocation: 'Nariman Point, South Mumbai',
    originCountry: 'India',
    destinationCountry: 'India',
    vehicleType: 'bike',
    weightKg: 1.5,
    declaredValueINR: 50000,
    estimatedPriceINR: 420,
    status: 'delivered',
    createdAt: '2026-09-24T05:00:00Z',
    estimatedDeliveryDate: '2026-09-24T06:15:00Z',
    estimatedMinutesRemaining: 0,
    speed: 'ultra_priority',
    driverName: 'Arjun Das (Urban Moto Courier #12)',
    driverPhone: '+91 98201 33499',
    driverRating: 5.0,
    vehicleRegistration: 'MH-02-EV-9011',
    currentCoordinates: [18.925, 72.824],
    pickupCoordinates: [19.068, 72.868],
    destinationCoordinates: [18.925, 72.824],
    routeProgressPercent: 100,
    checkpoints: [
      {
        id: 'cp-401',
        status: 'order_confirmed',
        title: 'Urgent Dispatch Registered',
        location: 'BKC Corporate Desk',
        timestamp: 'Sep 24, 05:02',
        completed: true,
        current: false
      },
      {
        id: 'cp-402',
        status: 'picked_up',
        title: 'Vault Envelope Sealed & Biometric Scanned',
        location: 'Tower 4, BKC',
        timestamp: 'Sep 24, 05:20',
        completed: true,
        current: false
      },
      {
        id: 'cp-403',
        status: 'in_transit',
        title: 'Express Sea Link Transit',
        location: 'Bandra-Worli Sea Link Route',
        timestamp: 'Sep 24, 05:45',
        completed: true,
        current: false
      },
      {
        id: 'cp-404',
        status: 'delivered',
        title: 'Delivered & Signed by Chief Counsel',
        location: 'Mittal Towers, Nariman Point',
        timestamp: 'Sep 24, 06:14',
        completed: true,
        current: true,
        notes: 'Handover OTP: 4492-AC'
      }
    ]
  }
];

export const INITIAL_REWARDS: RewardCoupon[] = [
  {
    id: 'rew-1',
    title: 'Free Express Air Clearance',
    discount: '100% Off Clearance Fee (Up to ₹5,000)',
    pointsRequired: 800,
    category: 'International Freight',
    expiresInDays: 45,
    redeemed: false,
    code: 'AETHER-CLEAREXPRESS'
  },
  {
    id: 'rew-2',
    title: '25% Off Local Moto & Car Delivery',
    discount: 'Save 25% on any domestic metro delivery',
    pointsRequired: 350,
    category: 'Urban Delivery',
    expiresInDays: 30,
    redeemed: false,
    code: 'CRIMSON-URBAN25'
  },
  {
    id: 'rew-3',
    title: 'Complimentary Marine Container Insurance',
    discount: 'Full Lloyd’s Marine Coverage Waiver',
    pointsRequired: 1500,
    category: 'Sea Freight',
    expiresInDays: 60,
    redeemed: false,
    code: 'VORTEX-OCEANSAFE'
  },
  {
    id: 'rew-4',
    title: 'Priority Drone / Air Slot Reservation',
    discount: 'Skip 24-hr queue for peak cargo slots',
    pointsRequired: 1200,
    category: 'VIP Service',
    expiresInDays: 90,
    redeemed: true,
    code: 'VIP-SLOT-UNLOCKED'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Air Shipment In Final Approach',
    message: 'Stratosphere Flight AC-409 with Microchip Consignment is descending to Kempegowda Intl. Estimated arrival in 32 minutes.',
    type: 'delivery',
    timestamp: '5 min ago',
    read: false,
    orderId: 'ORD-882194'
  },
  {
    id: 'notif-2',
    title: 'Gold Tier Upgrade Reward',
    message: 'Congratulations! Your logistics volume surpassed 5,000 km this quarter. 500 bonus points have been credited to your account.',
    type: 'reward',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Export Documentation Verified',
    message: 'Customs declaration for Aerospace Titanium Alloy (ORD-774912) cleared by Bangalore DGFT port authority.',
    type: 'order',
    timestamp: '4 hours ago',
    read: true,
    orderId: 'ORD-774912'
  },
  {
    id: 'notif-4',
    title: 'Special Route Optimization Notice',
    message: 'New direct air corridor opened between Mumbai and Singapore, reducing transit time by 1.8 hours.',
    type: 'offer',
    timestamp: 'Yesterday',
    read: true
  }
];

export const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec-1',
    title: 'Set Express Car as Default',
    subtitle: 'You frequently use express car delivery for intra-city technology dispatches. Save 3 minutes on checkout.',
    type: 'service',
    actionLabel: 'Set as Default',
    targetView: 'profile',
    iconName: 'car'
  },
  {
    id: 'rec-2',
    title: 'Direct Singapore Air Freight Corridor',
    subtitle: 'High frequency route: Consolidate electronics imports via Changi Terminal C for automatic 15% rate advantage.',
    type: 'route',
    actionLabel: 'Explore Route',
    targetView: 'import',
    iconName: 'plane'
  },
  {
    id: 'rec-3',
    title: 'Bulk Export Carbon Neutral Offset',
    subtitle: 'Activate automatic SAF Biofuel credits for your Middle East export shipments to meet ISO-14064 criteria.',
    type: 'discount',
    actionLabel: 'Enable Credits',
    targetView: 'rewards',
    iconName: 'leaf'
  }
];

export type ServiceCategory = 'import' | 'export' | 'order_product' | 'express_delivery';

export type DeliveryVehicleType = 'bike' | 'car' | 'van' | 'air' | 'sea';

export type ShipmentStatus = 
  | 'order_confirmed'
  | 'processing'
  | 'picked_up'
  | 'in_transit'
  | 'near_destination'
  | 'delivered'
  | 'cancelled';

export interface TrackingCheckpoint {
  id: string;
  status: ShipmentStatus;
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  notes?: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  title: string;
  category: ServiceCategory;
  productType: string;
  pickupLocation: string;
  destinationLocation: string;
  originCountry: string;
  destinationCountry: string;
  vehicleType: DeliveryVehicleType;
  weightKg: number;
  dimensions?: string;
  declaredValueINR: number;
  estimatedPriceINR: number;
  status: ShipmentStatus;
  createdAt: string;
  estimatedDeliveryDate: string;
  estimatedMinutesRemaining: number;
  speed: 'standard' | 'express' | 'ultra_priority';
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  vehicleRegistration?: string;
  currentCoordinates: [number, number]; // [lat, lng]
  pickupCoordinates: [number, number];
  destinationCoordinates: [number, number];
  routeProgressPercent: number;
  checkpoints: TrackingCheckpoint[];
  notes?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  role: 'customer' | 'admin';
  preferredService: ServiceCategory;
  preferredVehicle: DeliveryVehicleType;
  avatarUrl: string;
  rewardPoints: number;
  rewardTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  savedAddresses: {
    id: string;
    label: string;
    address: string;
    city: string;
    country: string;
    isDefault: boolean;
  }[];
}

export interface VehicleOption {
  id: DeliveryVehicleType;
  name: string;
  tagline: string;
  capacity: string;
  maxWeightKg: number;
  suitableFor: string[];
  baseFareINR: number;
  perKmRateINR: number;
  speedKmph: number;
  isInternational: boolean;
  carbonScore: string;
  accentColor: string;
}

export interface RewardCoupon {
  id: string;
  title: string;
  discount: string;
  pointsRequired: number;
  category: string;
  expiresInDays: number;
  redeemed: boolean;
  code: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'delivery' | 'reward' | 'system' | 'offer';
  timestamp: string;
  read: boolean;
  orderId?: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'service' | 'route' | 'discount';
  actionLabel: string;
  targetView: string;
  iconName: string;
}

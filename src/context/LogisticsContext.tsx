import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  OrderItem, 
  RewardCoupon, 
  AppNotification, 
  RecommendationItem, 
  DeliveryVehicleType, 
  ShipmentStatus 
} from '../types/logistics';
import { 
  INITIAL_ORDERS, 
  INITIAL_REWARDS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_RECOMMENDATIONS, 
  VEHICLE_OPTIONS 
} from '../data/mockLogisticsData';
import { useAuth } from './AuthContext';

export interface PriceBreakdown {
  baseFare: number;
  distanceCost: number;
  weightCost: number;
  speedSurcharge: number;
  addonsCost: number;
  subtotal: number;
  gstTax: number;
  totalINR: number;
}

interface LogisticsContextType {
  orders: OrderItem[];
  selectedTrackingOrder: OrderItem;
  setSelectedTrackingOrder: (order: OrderItem) => void;
  rewards: RewardCoupon[];
  notifications: AppNotification[];
  recommendations: RecommendationItem[];
  currentView: string;
  setCurrentView: (view: string) => void;
  calculatePricing: (params: {
    distanceKm: number;
    weightKg: number;
    vehicleType: DeliveryVehicleType;
    speed: 'standard' | 'express' | 'ultra_priority';
    isInternational: boolean;
    declaredValueINR?: number;
    insurance?: boolean;
    customsClearance?: boolean;
  }) => PriceBreakdown;
  createNewOrder: (orderData: Partial<OrderItem>) => OrderItem;
  updateOrderStatus: (orderId: string, newStatus: ShipmentStatus, progress?: number, notes?: string) => void;
  redeemReward: (rewardId: string) => boolean;
  markNotificationAsRead: (notifId: string) => void;
  clearAllNotifications: () => void;
  unreadNotificationCount: number;
}

const LogisticsContext = createContext<LogisticsContextType | undefined>(undefined);

export const LogisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('aether_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<OrderItem>(() => {
    return orders.find(o => o.id === 'ORD-882194') || orders[0];
  });

  const [rewards, setRewards] = useState<RewardCoupon[]>(() => {
    const saved = localStorage.getItem('aether_rewards');
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('aether_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [recommendations] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  useEffect(() => {
    localStorage.setItem('aether_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aether_rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('aether_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Simulation tick: periodically animate in_transit orders
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prev => prev.map(order => {
        if (order.status === 'in_transit' && order.routeProgressPercent < 95) {
          const nextPercent = Math.min(95, order.routeProgressPercent + 1);
          const nextRemaining = Math.max(8, order.estimatedMinutesRemaining - 1);
          return {
            ...order,
            routeProgressPercent: nextPercent,
            estimatedMinutesRemaining: nextRemaining
          };
        }
        return order;
      }));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const calculatePricing = ({
    distanceKm,
    weightKg,
    vehicleType,
    speed,
    isInternational,
    declaredValueINR = 0,
    insurance = true,
    customsClearance = false
  }: {
    distanceKm: number;
    weightKg: number;
    vehicleType: DeliveryVehicleType;
    speed: 'standard' | 'express' | 'ultra_priority';
    isInternational: boolean;
    declaredValueINR?: number;
    insurance?: boolean;
    customsClearance?: boolean;
  }): PriceBreakdown => {
    const vehicle = VEHICLE_OPTIONS.find(v => v.id === vehicleType) || VEHICLE_OPTIONS[0];
    
    const baseFare = vehicle.baseFareINR;
    const distanceCost = Math.round(distanceKm * vehicle.perKmRateINR);
    
    // Weight multiplier based on capacity
    const weightFactor = vehicle.maxWeightKg > 100 ? 12 : 25;
    const weightCost = Math.round(weightKg * weightFactor);

    // Speed multiplier
    let speedSurcharge = 0;
    if (speed === 'express') {
      speedSurcharge = Math.round((baseFare + distanceCost) * 0.25);
    } else if (speed === 'ultra_priority') {
      speedSurcharge = Math.round((baseFare + distanceCost) * 0.55);
    }

    // Addons
    let addonsCost = 0;
    if (insurance && declaredValueINR > 0) {
      addonsCost += Math.round(declaredValueINR * 0.008); // 0.8% insurance
    }
    if (customsClearance || isInternational) {
      addonsCost += 2800; // Standard customs brokerage declaration
    }

    const subtotal = baseFare + distanceCost + weightCost + speedSurcharge + addonsCost;
    const gstTax = Math.round(subtotal * 0.18); // 18% GST logistics rate
    const totalINR = subtotal + gstTax;

    return {
      baseFare,
      distanceCost,
      weightCost,
      speedSurcharge,
      addonsCost,
      subtotal,
      gstTax,
      totalINR
    };
  };

  const createNewOrder = (orderData: Partial<OrderItem>): OrderItem => {
    const newId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderNum = `AC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderItem = {
      id: newId,
      orderNumber: orderNum,
      title: orderData.title || 'Special Consignment',
      category: orderData.category || 'express_delivery',
      productType: orderData.productType || 'General Freight',
      pickupLocation: orderData.pickupLocation || 'Bangalore Central Hub',
      destinationLocation: orderData.destinationLocation || 'Destination Terminal',
      originCountry: orderData.originCountry || 'India',
      destinationCountry: orderData.destinationCountry || 'India',
      vehicleType: orderData.vehicleType || 'car',
      weightKg: orderData.weightKg || 5,
      dimensions: orderData.dimensions || '30×25×20 cm',
      declaredValueINR: orderData.declaredValueINR || 25000,
      estimatedPriceINR: orderData.estimatedPriceINR || 1450,
      status: 'order_confirmed',
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: new Date(Date.now() + 86400000).toISOString(),
      estimatedMinutesRemaining: 120,
      speed: orderData.speed || 'express',
      driverName: 'Fleet Unit Assigned (En Route)',
      driverPhone: '+91 80000 12345',
      driverRating: 4.95,
      vehicleRegistration: 'KA-01-NX-5002',
      currentCoordinates: [12.971, 77.594],
      pickupCoordinates: [12.971, 77.594],
      destinationCoordinates: [13.082, 80.270],
      routeProgressPercent: 5,
      checkpoints: [
        {
          id: `cp-${Date.now()}-1`,
          status: 'order_confirmed',
          title: 'Order Confirmed & Route Automated',
          location: orderData.pickupLocation || 'Origin Hub',
          timestamp: 'Just now',
          completed: true,
          current: true,
          notes: 'Automated dispatch beacon broadcast'
        },
        {
          id: `cp-${Date.now()}-2`,
          status: 'processing',
          title: 'Package Inspection & QR Seal Affixed',
          location: 'Origin Processing Center',
          timestamp: 'Pending (Est. 30m)',
          completed: false,
          current: false
        },
        {
          id: `cp-${Date.now()}-3`,
          status: 'in_transit',
          title: 'Transit via Dedicated Corridor',
          location: 'Main Route Corridor',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          id: `cp-${Date.now()}-4`,
          status: 'delivered',
          title: 'Final Handover & Digital Signature',
          location: orderData.destinationLocation || 'Destination Address',
          timestamp: 'Pending',
          completed: false,
          current: false
        }
      ],
      notes: orderData.notes || 'Handle with Aether Crimson VIP care.'
    };

    setOrders(prev => [newOrder, ...prev]);
    setSelectedTrackingOrder(newOrder);

    // Award rewards points (10% of INR price converted to pts)
    const pointsEarned = Math.max(50, Math.round(newOrder.estimatedPriceINR * 0.05));
    if (user) {
      updateProfile({ rewardPoints: user.rewardPoints + pointsEarned });
    }

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Order Confirmed & Route Logged',
      message: `Your booking ${newOrder.orderNumber} for "${newOrder.title}" is confirmed. Track live in real-time.`,
      type: 'order',
      timestamp: 'Just now',
      read: false,
      orderId: newOrder.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: ShipmentStatus, progress?: number, notes?: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const progressMap: Record<ShipmentStatus, number> = {
        order_confirmed: 10,
        processing: 30,
        picked_up: 45,
        in_transit: 65,
        near_destination: 90,
        delivered: 100,
        cancelled: 0
      };

      const finalProgress = progress !== undefined ? progress : progressMap[newStatus];
      const updatedCheckpoints = order.checkpoints.map(cp => {
        if (cp.status === newStatus) {
          return { ...cp, completed: true, current: true, timestamp: 'Updated just now', notes: notes || cp.notes };
        }
        return cp;
      });

      const updated = {
        ...order,
        status: newStatus,
        routeProgressPercent: finalProgress,
        estimatedMinutesRemaining: newStatus === 'delivered' ? 0 : Math.max(0, Math.round(order.estimatedMinutesRemaining * (1 - finalProgress / 100))),
        checkpoints: updatedCheckpoints
      };

      if (selectedTrackingOrder.id === orderId) {
        setSelectedTrackingOrder(updated);
      }
      return updated;
    }));

    // Add notification for status change
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        title: `Shipment Status: ${newStatus.replace('_', ' ').toUpperCase()}`,
        message: `${targetOrder.title} (${targetOrder.orderNumber}) is now ${newStatus.replace('_', ' ')}.`,
        type: 'delivery',
        timestamp: 'Just now',
        read: false,
        orderId
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const redeemReward = (rewardId: string): boolean => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || !user || user.rewardPoints < reward.pointsRequired) {
      return false;
    }

    setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, redeemed: true } : r));
    updateProfile({ rewardPoints: user.rewardPoints - reward.pointsRequired });

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Reward Redeemed!',
      message: `You successfully unlocked "${reward.title}". Coupon code: ${reward.code}`,
      type: 'reward',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
    return true;
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <LogisticsContext.Provider
      value={{
        orders,
        selectedTrackingOrder,
        setSelectedTrackingOrder,
        rewards,
        notifications,
        recommendations,
        currentView,
        setCurrentView,
        calculatePricing,
        createNewOrder,
        updateOrderStatus,
        redeemReward,
        markNotificationAsRead,
        clearAllNotifications,
        unreadNotificationCount
      }}
    >
      {children}
    </LogisticsContext.Provider>
  );
};

export const useLogistics = () => {
  const context = useContext(LogisticsContext);
  if (!context) throw new Error('useLogistics must be used within LogisticsProvider');
  return context;
};

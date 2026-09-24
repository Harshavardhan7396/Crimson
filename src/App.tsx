/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LogisticsProvider, useLogistics } from './context/LogisticsContext';
import { SplashScreen } from './components/auth/SplashScreen';
import { LoginModal } from './components/auth/LoginModal';
import { SignupModal } from './components/auth/SignupModal';
import { AuthTransition } from './components/auth/AuthTransition';
import { Starfield } from './components/3d/Starfield';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

// Views
import { HeroSection } from './components/dashboard/HeroSection';
import { ServicesSection } from './components/dashboard/ServicesSection';
import { RecommendationsSection } from './components/dashboard/RecommendationsSection';
import { ImportServiceModal } from './components/services/ImportServiceModal';
import { ExportServiceModal } from './components/services/ExportServiceModal';
import { OrderProductModal } from './components/services/OrderProductModal';
import { DeliverySelection } from './components/vehicles/DeliverySelection';
import { SmartPricingCalculator } from './components/pricing/SmartPricingCalculator';
import { CreateOrderWizard } from './components/orders/CreateOrderWizard';
import { LiveTrackingView } from './components/tracking/LiveTrackingView';
import { MyOrdersView } from './components/orders/MyOrdersView';
import { RewardsView } from './components/rewards/RewardsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { HelpView } from './components/help/HelpView';
import { NovaAIChatbot } from './components/ai/NovaAIChatbot';

const MainAppContent: React.FC = () => {
  const { authPhase } = useAuth();
  const { currentView } = useLogistics();

  if (authPhase === 'splash') {
    return <SplashScreen />;
  }

  if (authPhase === 'auth_login') {
    return <LoginModal />;
  }

  if (authPhase === 'auth_signup') {
    return <SignupModal />;
  }

  if (authPhase === 'transitioning') {
    return <AuthTransition />;
  }

  // Authenticated State: Dark Night Sky Theme
  return (
    <div className="relative min-h-screen bg-black text-neutral-100 selection:bg-red-600 selection:text-white flex flex-col font-sans">
      {/* Night sky background canvas with bright stars & subtle red nebula */}
      <Starfield intensity={0.9} showNebula={true} />

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Workspace Layout (Sidebar + Viewport) */}
      <div className="relative z-10 flex flex-1 max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto max-w-full">
          {currentView === 'dashboard' && (
            <div className="space-y-10">
              <HeroSection />
              <ServicesSection />
              <RecommendationsSection />
            </div>
          )}

          {currentView === 'import' && <ImportServiceModal />}
          {currentView === 'export' && <ExportServiceModal />}
          {currentView === 'order_product' && <OrderProductModal />}
          {currentView === 'vehicles' && <DeliverySelection />}
          {currentView === 'pricing' && <SmartPricingCalculator />}
          {currentView === 'order_create' && <CreateOrderWizard />}
          {currentView === 'tracking' && <LiveTrackingView />}
          {currentView === 'my_orders' && <MyOrdersView />}
          {currentView === 'recommendations' && <RecommendationsSection />}
          {currentView === 'rewards' && <RewardsView />}
          {currentView === 'analytics' && <AnalyticsView />}
          {currentView === 'profile' && <ProfileView />}
          {currentView === 'admin' && <AdminDashboard />}
          {currentView === 'help' && <HelpView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Floating Glowing Red Orb Nova AI Chatbot */}
      <NovaAIChatbot />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LogisticsProvider>
        <MainAppContent />
      </LogisticsProvider>
    </AuthProvider>
  );
}

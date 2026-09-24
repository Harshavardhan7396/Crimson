import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Car, Plane, Leaf, ArrowRight, Check } from 'lucide-react';

export const RecommendationsSection: React.FC = () => {
  const { recommendations, setCurrentView } = useLogistics();
  const { user, updateProfile } = useAuth();

  const handleAction = (rec: any) => {
    if (rec.id === 'rec-1') {
      updateProfile({ preferredVehicle: 'car' });
      alert('Aether Apex Electric Car has been set as your preferred default transit mode!');
    } else {
      setCurrentView(rec.targetView);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return <Car className="w-5 h-5 text-red-400" />;
      case 'plane':
        return <Plane className="w-5 h-5 text-red-500" />;
      case 'leaf':
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">Recommended For You</h3>
            <p className="text-xs text-neutral-400">
              Personalized intelligence based on your recent shipping volume and frequent routes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map(rec => (
          <div
            key={rec.id}
            className="p-5 rounded-2xl glass-panel glass-panel-hover border border-red-900/30 flex flex-col justify-between transition-all duration-300 hover:border-red-600/50 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-red-600/40 transition-colors">
                  {getIcon(rec.iconName)}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Behavior Metric
                </span>
              </div>

              <h4 className="text-sm font-bold text-white font-display group-hover:text-red-400 transition-colors">
                {rec.title}
              </h4>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                {rec.subtitle}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-500">
                AI Logistics Recommendation
              </span>
              <button
                onClick={() => handleAction(rec)}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-600/50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{rec.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

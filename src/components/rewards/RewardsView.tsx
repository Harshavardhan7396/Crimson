import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  Gift, 
  Sparkles, 
  Award, 
  Check, 
  Copy, 
  CheckCircle2, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const RewardsView: React.FC = () => {
  const { user } = useAuth();
  const { rewards, redeemReward } = useLogistics();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const points = user?.rewardPoints || 2450;
  const tier = user?.rewardTier || 'Gold';

  // Tier threshold calculation
  const nextTierPoints = tier === 'Bronze' ? 1000 : tier === 'Silver' ? 2500 : tier === 'Gold' ? 5000 : 10000;
  const currentTierBase = tier === 'Bronze' ? 0 : tier === 'Silver' ? 1000 : tier === 'Gold' ? 2500 : 5000;
  const progressPercent = Math.min(100, Math.round(((points - currentTierBase) / (nextTierPoints - currentTierBase)) * 100));

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-900/20">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-red-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>VIP Loyalty & Enterprise Freight Privileges</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Your Rewards</h2>
          <p className="text-xs text-neutral-400">
            Earn points when you use our services. Unlock expedited airport queue waivers, freight discounts, and marine protection.
          </p>
        </div>

        {/* Total Points Badge */}
        <div className="p-3.5 rounded-2xl glass-panel border border-amber-500/40 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-400">Available Points</div>
            <div className="text-xl font-extrabold text-white font-mono tabular-nums">
              {points.toLocaleString()} <span className="text-xs text-amber-400 font-sans">pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Status Card with Animated Progress */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-red-900/40 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-red-400 tracking-wider">Current Membership Tier</span>
              <h3 className="text-2xl font-extrabold text-white font-display mt-0.5">
                {tier} Tier Freight Partner
              </h3>
            </div>
            <div className="text-xs font-mono text-neutral-300">
              {nextTierPoints - points > 0 ? (
                <span>{(nextTierPoints - points).toLocaleString()} points needed for Platinum Tier</span>
              ) : (
                <span>Highest Prestige Tier Attained</span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Tier Milestones */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
            <div className={tier === 'Bronze' ? 'text-red-400 font-bold' : 'text-neutral-500'}>
              <div>Bronze</div>
              <div className="text-[9px] text-neutral-600">0 pts</div>
            </div>
            <div className={tier === 'Silver' ? 'text-red-400 font-bold' : 'text-neutral-500'}>
              <div>Silver</div>
              <div className="text-[9px] text-neutral-600">1,000 pts</div>
            </div>
            <div className={tier === 'Gold' ? 'text-amber-400 font-bold' : 'text-neutral-500'}>
              <div>Gold (Current)</div>
              <div className="text-[9px] text-neutral-600">2,500 pts</div>
            </div>
            <div className={tier === 'Platinum' ? 'text-red-400 font-bold' : 'text-neutral-500'}>
              <div>Platinum</div>
              <div className="text-[9px] text-neutral-600">5,000+ pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Privileges & Redeemable Coupons */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-display">Available Privileges & Coupons</h3>
          <span className="text-xs font-mono text-neutral-500">Configurable Business Rewards</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map(rew => {
            const canRedeem = points >= rew.pointsRequired && !rew.redeemed;
            return (
              <div
                key={rew.id}
                className={`p-5 rounded-2xl glass-panel border flex flex-col justify-between transition-all ${
                  rew.redeemed
                    ? 'border-emerald-600/40 bg-emerald-950/20'
                    : 'border-red-900/30 hover:border-red-600/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-neutral-400">
                      {rew.category}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      {rew.pointsRequired} pts
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display">{rew.title}</h4>
                  <p className="text-xs text-neutral-300 mt-1">{rew.discount}</p>

                  <div className="mt-3 text-[11px] font-mono text-neutral-500">
                    Expires in {rew.expiresInDays} days
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between">
                  {rew.redeemed ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Code: {rew.code}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(rew.code)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedCode === rew.code ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => redeemReward(rew.id)}
                      disabled={!canRedeem}
                      className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        canRedeem
                          ? 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                          : 'bg-neutral-900 text-neutral-500 cursor-not-allowed border border-neutral-800'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{canRedeem ? 'Redeem for Privilege' : 'Insufficient Points'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corporate Referral Program */}
      <div className="p-6 rounded-2xl glass-panel border border-red-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase">
            <Share2 className="w-4 h-4" />
            <span>Enterprise Partner Referral</span>
          </div>
          <h4 className="text-base font-bold text-white font-display mt-1">
            Invite Global Suppliers & Earn 1,000 Points Each
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Share your corporate logistics routing key with trading partners to receive automatic billing credits.
          </p>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(`https://aetherlogistics.io/ref/${user?.id || 'AC-PARTNER'}`);
            alert('Corporate referral link copied to clipboard!');
          }}
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Copy className="w-3.5 h-3.5 text-red-400" />
          <span>Copy Invite Link</span>
        </button>
      </div>

      <div className="text-[11px] text-neutral-500 font-mono text-center">
        * Configurable business rewards and promotional points subject to freight volume terms.
      </div>
    </div>
  );
};

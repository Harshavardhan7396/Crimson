import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLogistics } from '../../context/LogisticsContext';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Truck, 
  Shield, 
  Key, 
  Plus, 
  Trash2, 
  Check, 
  Save,
  Award,
  Sparkles
} from 'lucide-react';
import { DeliveryVehicleType } from '../../types/logistics';

export const ProfileView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { orders } = useLogistics();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [country, setCountry] = useState(user?.country || 'India');
  const [preferredVehicle, setPreferredVehicle] = useState<DeliveryVehicleType>(user?.preferredVehicle || 'air');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Address modal state
  const [newAddressOpen, setNewAddressOpen] = useState(false);
  const [addressLabel, setAddressLabel] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressCountry, setAddressCountry] = useState('India');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      phone,
      country,
      preferredVehicle
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressStreet || !addressLabel) return;

    const currentAddresses = user?.savedAddresses || [];
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: addressLabel,
      address: addressStreet,
      city: addressCity,
      country: addressCountry,
      isDefault: currentAddresses.length === 0
    };

    updateProfile({
      savedAddresses: [...currentAddresses, newAddr]
    });

    setAddressLabel('');
    setAddressStreet('');
    setAddressCity('');
    setNewAddressOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    const currentAddresses = user?.savedAddresses || [];
    updateProfile({
      savedAddresses: currentAddresses.filter(a => a.id !== id)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-red-900/20">
        <h2 className="text-2xl font-bold text-white font-display">Corporate Customer Profile</h2>
        <p className="text-xs text-neutral-400">
          Manage corporate credentials, registered factory locations, and automated dispatch preferences.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-2xl glass-panel border border-red-900/40 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <img
          src={user?.avatarUrl || '/src/assets/images/avatar_executive_user_1790266147034.jpg'}
          alt="Profile Avatar"
          referrerPolicy="no-referrer"
          className="w-20 h-20 rounded-2xl object-cover border-2 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
        />

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-white font-display">{user?.fullName}</h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">{user?.email}</p>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{user?.rewardTier} Partner</span>
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 font-bold">
                {user?.rewardPoints} Pts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-neutral-900 text-xs">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Account ID</span>
              <div className="font-mono text-white mt-0.5">{user?.id}</div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Registered Country</span>
              <div className="text-white mt-0.5">{user?.country}</div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Total Shipments</span>
              <div className="font-mono text-white mt-0.5">{orders.length} Consignments</div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Account Security</span>
              <div className="text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>2FA Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
            Account Details & Preferences
          </h4>
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Profile preferences updated!</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Full Legal Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">Preferred Fleet Vehicle</label>
            <select
              value={preferredVehicle}
              onChange={e => setPreferredVehicle(e.target.value as DeliveryVehicleType)}
              className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-neutral-800 text-white text-xs focus:border-red-500 cursor-pointer"
            >
              <option value="bike">Stealth Electric Moto (Urgent Documents)</option>
              <option value="car">Aether Apex Electric Sedan (Executive)</option>
              <option value="van">Vortex Autonomous Cargo Van (Commercial)</option>
              <option value="air">Stratosphere Cargo Jet (International Air)</option>
              <option value="sea">Crimson Wave Ultra-Vessel (Ocean Liner)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>

      {/* Saved Addresses Section */}
      <div className="p-6 rounded-2xl glass-panel border border-red-900/30 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div>
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400">
              Saved Warehouses & Delivery Facilities
            </h4>
            <p className="text-xs text-neutral-400">Pre-fill pickup and recipient locations during booking checkout.</p>
          </div>

          <button
            onClick={() => setNewAddressOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-red-400" />
            <span>Add Facility</span>
          </button>
        </div>

        {/* Address Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(user?.savedAddresses || []).map(addr => (
            <div key={addr.id} className="p-4 rounded-xl bg-black/60 border border-neutral-800 flex justify-between items-start text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">Default</span>
                  )}
                </div>
                <div className="text-neutral-300 mt-1">{addr.address}</div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">{addr.city}, {addr.country}</div>
              </div>

              <button
                onClick={() => handleDeleteAddress(addr.id)}
                className="text-neutral-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                title="Remove address"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* New Address Dialog Form */}
        {newAddressOpen && (
          <form onSubmit={handleAddAddress} className="p-4 rounded-xl bg-neutral-950 border border-red-800/40 space-y-3 text-xs">
            <h5 className="font-bold text-white">Add New Facility / Warehouse</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Facility Name / Label</label>
                <input
                  type="text"
                  value={addressLabel}
                  onChange={e => setAddressLabel(e.target.value)}
                  placeholder="e.g. Hyderabad Assembly Hub"
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">City</label>
                <input
                  type="text"
                  value={addressCity}
                  onChange={e => setAddressCity(e.target.value)}
                  placeholder="e.g. Hyderabad"
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-neutral-400 mb-1">Street Address</label>
                <input
                  type="text"
                  value={addressStreet}
                  onChange={e => setAddressStreet(e.target.value)}
                  placeholder="Street and building coordinates"
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setNewAddressOpen(false)}
                className="px-3 py-1 text-neutral-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
              >
                Save Address
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Security & Access Management */}
      <div className="p-6 rounded-2xl glass-panel border border-red-900/30 text-xs space-y-3">
        <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider text-red-400 flex items-center gap-1.5">
          <Key className="w-4 h-4" />
          <span>Security & API Token Credentials</span>
        </h4>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-black/60 border border-neutral-800">
          <div>
            <div className="font-semibold text-white">Aether Crimson REST / Webhook API Key</div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">ac_live_8902_99af28cd92b8...</div>
          </div>
          <button
            onClick={() => alert('API Key rotated. New key dispatched to registered email.')}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 hover:text-white cursor-pointer"
          >
            Rotate Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

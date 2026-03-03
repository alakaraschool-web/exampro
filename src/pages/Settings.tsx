import React from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Palette,
  ChevronRight,
  Save,
  School
} from 'lucide-react';

const SettingItem = ({ icon: Icon, title, description, action }: any) => (
  <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-6">
      <div className="p-3 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-kenya-green/10 group-hover:text-kenya-green transition-colors">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 font-medium mt-1">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {action}
      <ChevronRight size={20} className="text-slate-300 group-hover:text-kenya-green/40" />
    </div>
  </div>
);

export const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage your profile and security preferences</p>
        </div>
        <div className="divide-y divide-slate-100">
          <SettingItem 
            icon={User} 
            title="Profile Information" 
            description="Update your name, email, and profile photo" 
          />
          <SettingItem 
            icon={Shield} 
            title="Security & Password" 
            description="Change your password and enable 2FA" 
          />
          <SettingItem 
            icon={Bell} 
            title="Notifications" 
            description="Configure how you receive alerts and updates" 
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">School Configuration</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">System-wide settings for Alakara School</p>
        </div>
        <div className="divide-y divide-slate-100">
          <SettingItem 
            icon={School} 
            title="School Profile" 
            description="Edit school name, logo, and contact details" 
          />
          <SettingItem 
            icon={Database} 
            title="Academic Structure" 
            description="Manage classes, streams, and subjects" 
          />
          <SettingItem 
            icon={Globe} 
            title="Regional Settings" 
            description="Set time zone, currency, and language" 
          />
          <SettingItem 
            icon={Palette} 
            title="Report Template" 
            description="Customize the look of generated report cards" 
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
          Discard Changes
        </button>
        <button className="px-8 py-3 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/10 hover:bg-kenya-green/90 transition-all flex items-center gap-2">
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

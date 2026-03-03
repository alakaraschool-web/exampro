import React, { useState } from 'react';
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
  School,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

const SettingItem = ({ icon: Icon, title, description, onClick }: any) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
  >
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
      <ChevronRight size={20} className="text-slate-300 group-hover:text-kenya-green/40" />
    </div>
  </div>
);

export const Settings = ({ role }: { role: string }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@alakara.ac.ke',
    phone: '+254 712 345 678',
    role: 'Principal',
    bio: 'Dedicated educator with 15 years of experience in school administration.'
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [gradingSystem, setGradingSystem] = useState([
    { grade: 'A', min: 80, max: 100, points: 12, remarks: 'Plain' },
    { grade: 'A-', min: 75, max: 79, points: 11, remarks: 'Minus' },
    { grade: 'B+', min: 70, max: 74, points: 10, remarks: 'Plus' },
    { grade: 'B', min: 65, max: 69, points: 9, remarks: 'Plain' },
    { grade: 'B-', min: 60, max: 64, points: 8, remarks: 'Minus' },
    { grade: 'C+', min: 55, max: 59, points: 7, remarks: 'Plus' },
    { grade: 'C', min: 50, max: 54, points: 6, remarks: 'Plain' },
    { grade: 'C-', min: 45, max: 49, points: 5, remarks: 'Minus' },
    { grade: 'D+', min: 40, max: 44, points: 4, remarks: 'Plus' },
    { grade: 'D', min: 35, max: 39, points: 3, remarks: 'Plain' },
    { grade: 'D-', min: 30, max: 34, points: 2, remarks: 'Minus' },
    { grade: 'E', min: 0, max: 29, points: 1, remarks: 'Fail' },
  ]);

  const addGrade = () => {
    setGradingSystem([...gradingSystem, { grade: '', min: 0, max: 0, points: 0, remarks: '' }]);
  };

  const removeGrade = (index: number) => {
    setGradingSystem(gradingSystem.filter((_, i) => i !== index));
  };

  const updateGrade = (index: number, field: string, value: any) => {
    const newSystem = [...gradingSystem];
    newSystem[index] = { ...newSystem[index], [field]: value };
    setGradingSystem(newSystem);
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleApplyChanges = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setActiveModal(null);
    }, 1500);
  };

  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeModal.replace('-', ' ')}</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Configure your system preferences.</p>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 max-h-[60vh] overflow-y-auto">
            {activeModal === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-kenya-green/10 border-4 border-white shadow-md flex items-center justify-center text-kenya-green text-3xl font-bold">
                      JD
                    </div>
                    <button type="button" className="absolute bottom-0 right-0 p-2 bg-kenya-green text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <ImageIcon size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'security' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Current Password</label>
                    <input 
                      type="password" 
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-medium"
                    />
                  </div>
                  <div className="h-px bg-slate-100 my-2" />
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                    <input 
                      type="password" 
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'notifications' && (
              <div className="space-y-6">
                {[
                  { title: 'Email Notifications', desc: 'Receive daily summaries and important alerts via email.' },
                  { title: 'System Messages', desc: 'Get notified about messages from Principal or Admins.' },
                  { title: 'Exam Alerts', desc: 'Notifications when exams are created or processed.' },
                  { title: 'Resource Updates', desc: 'Alerts when new resources are shared in your subjects.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-kenya-green">
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'grading-system' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Grade Ranges</h3>
                  <button 
                    onClick={addGrade}
                    className="flex items-center gap-2 px-4 py-2 bg-kenya-green/10 text-kenya-green rounded-xl text-xs font-bold hover:bg-kenya-green/20 transition-all"
                  >
                    <Plus size={14} /> Add Grade
                  </button>
                </div>
                <div className="space-y-3">
                  {gradingSystem.map((g, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <input 
                        type="text" 
                        value={g.grade} 
                        onChange={(e) => updateGrade(i, 'grade', e.target.value)}
                        placeholder="Grade"
                        className="w-16 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-kenya-green/20 outline-none"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <input 
                          type="number" 
                          value={g.min} 
                          onChange={(e) => updateGrade(i, 'min', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-center focus:ring-2 focus:ring-kenya-green/20 outline-none"
                        />
                        <span className="text-slate-400">-</span>
                        <input 
                          type="number" 
                          value={g.max} 
                          onChange={(e) => updateGrade(i, 'max', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-center focus:ring-2 focus:ring-kenya-green/20 outline-none"
                        />
                      </div>
                      <input 
                        type="number" 
                        value={g.points} 
                        onChange={(e) => updateGrade(i, 'points', parseInt(e.target.value))}
                        placeholder="Pts"
                        className="w-16 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-kenya-green/20 outline-none"
                      />
                      <button 
                        onClick={() => removeGrade(i)}
                        className="p-2 text-slate-300 hover:text-kenya-red transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'school-profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:border-kenya-green hover:text-kenya-green transition-all">
                    <ImageIcon size={24} />
                    <span className="text-[10px] font-bold uppercase">Logo</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <input 
                      type="text" 
                      placeholder="School Name" 
                      defaultValue="Alakara Secondary School"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-bold"
                    />
                    <input 
                      type="text" 
                      placeholder="Motto" 
                      defaultValue="Strive for Excellence"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none text-sm italic"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Email Address" 
                    defaultValue="info@alakara.ac.ke"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none text-sm"
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    defaultValue="+254 700 000 000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none text-sm"
                  />
                </div>
                <textarea 
                  placeholder="Address" 
                  defaultValue="P.O. BOX 123-00100, Nairobi, Kenya"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none text-sm h-24 resize-none"
                />
              </div>
            )}

            {activeModal !== 'grading-system' && activeModal !== 'school-profile' && activeModal !== 'profile' && activeModal !== 'security' && activeModal !== 'notifications' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <SettingsIcon size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Configuration Module</h3>
                  <p className="text-sm text-slate-500 font-medium">This setting module is currently being optimized for your school.</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            <button 
              onClick={() => setActiveModal(null)}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleApplyChanges}
              disabled={showSuccess}
              className="px-8 py-3 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/10 hover:bg-kenya-green/90 transition-all flex items-center gap-2 disabled:bg-emerald-600"
            >
              {showSuccess ? (
                <>
                  <CheckCircle2 size={20} />
                  Changes Applied!
                </>
              ) : (
                <>
                  <Save size={20} />
                  Apply Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {renderModal()}
      
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
            onClick={() => setActiveModal('profile')}
          />
          <SettingItem 
            icon={Shield} 
            title="Security & Password" 
            description="Change your password and enable 2FA" 
            onClick={() => setActiveModal('security')}
          />
          <SettingItem 
            icon={Bell} 
            title="Notifications" 
            description="Configure how you receive alerts and updates" 
            onClick={() => setActiveModal('notifications')}
          />
        </div>
      </div>

      {role !== 'student' && (
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
              onClick={() => setActiveModal('school-profile')}
            />
            <SettingItem 
              icon={Database} 
              title="Academic Structure" 
              description="Manage classes, streams, and subjects" 
              onClick={() => setActiveModal('academic-structure')}
            />
            <SettingItem 
              icon={Palette} 
              title="Grading System" 
              description="Define and adjust grade ranges and points" 
              onClick={() => setActiveModal('grading-system')}
            />
            <SettingItem 
              icon={Globe} 
              title="Regional Settings" 
              description="Set time zone, currency, and language" 
              onClick={() => setActiveModal('regional')}
            />
          </div>
        </div>
      )}

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

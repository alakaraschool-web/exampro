import React, { useState, useEffect } from 'react';
import { 
  School, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X,
  Mail,
  Lock,
  User,
  MapPin,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SchoolData {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'suspended';
  students_count?: number;
  plan: string;
  avatar?: string;
  created_at?: string;
}

export const Schools = () => {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    plan: 'Standard',
    principalName: '',
    principalEmail: '',
    principalPassword: '',
  });

  const isConfigured = (import.meta as any).env.VITE_SUPABASE_URL && (import.meta as any).env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    if (!isConfigured) {
      // Mock data for prototype
      setSchools([
        { id: '1', name: 'Alakara High School', location: 'Nairobi, Kenya', status: 'active', students_count: 1248, plan: 'Premium', avatar: 'AH' },
        { id: '2', name: 'St. Peters Academy', location: 'Mombasa, Kenya', status: 'active', students_count: 850, plan: 'Standard', avatar: 'SP' },
        { id: '3', name: 'Greenwood International', location: 'Kisumu, Kenya', status: 'suspended', students_count: 600, plan: 'Basic', avatar: 'GI' },
        { id: '4', name: 'Sunshine Primary', location: 'Nakuru, Kenya', status: 'active', students_count: 1100, plan: 'Premium', avatar: 'SS' },
      ]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSchools(data || []);
    } catch (err: any) {
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      location: '',
      plan: 'Standard',
      principalName: '',
      principalEmail: '',
      principalPassword: '',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (school: SchoolData) => {
    setModalMode('edit');
    setSelectedSchool(school);
    setFormData({
      name: school.name,
      location: school.location,
      plan: school.plan,
      principalName: '', // Principal details not editable here for simplicity
      principalEmail: '',
      principalPassword: '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!isConfigured) {
      // Mock submission
      if (modalMode === 'add') {
        const newSchool: SchoolData = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name,
          location: formData.location,
          status: 'active',
          students_count: 0,
          plan: formData.plan,
          avatar: formData.name.substring(0, 2).toUpperCase()
        };
        setSchools([newSchool, ...schools]);
      } else if (selectedSchool) {
        setSchools(schools.map(s => s.id === selectedSchool.id ? { ...s, name: formData.name, location: formData.location, plan: formData.plan } : s));
      }
      setShowModal(false);
      setSubmitting(false);
      return;
    }

    try {
      if (modalMode === 'add') {
        // 1. Create School
        const { data: schoolData, error: schoolError } = await supabase
          .from('schools')
          .insert({
            name: formData.name,
            location: formData.location,
            plan: formData.plan,
            status: 'active'
          })
          .select()
          .single();

        if (schoolError) throw schoolError;

        // 2. Create Principal Account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.principalEmail,
          password: formData.principalPassword,
          options: {
            data: {
              full_name: formData.principalName,
              school_id: schoolData.id
            }
          }
        });

        if (authError) throw authError;

        if (authData.user) {
          // 3. Create Principal Profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              full_name: formData.principalName,
              role: 'principal',
              school_id: schoolData.id
            });

          if (profileError) throw profileError;
        }
      } else if (selectedSchool) {
        const { error } = await supabase
          .from('schools')
          .update({
            name: formData.name,
            location: formData.location,
            plan: formData.plan
          })
          .eq('id', selectedSchool.id);

        if (error) throw error;
      }

      fetchSchools();
      setShowModal(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (school: SchoolData) => {
    const newStatus = school.status === 'active' ? 'suspended' : 'active';
    
    if (!isConfigured) {
      setSchools(schools.map(s => s.id === school.id ? { ...s, status: newStatus } : s));
      return;
    }

    try {
      const { error } = await supabase
        .from('schools')
        .update({ status: newStatus })
        .eq('id', school.id);

      if (error) throw error;
      fetchSchools();
    } catch (err: any) {
      console.error('Error updating status:', err);
    }
  };

  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search schools..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          <button 
            onClick={handleOpenAddModal}
            className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus size={20} />
            Register School
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-kenya-green animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map(school => (
            <div key={school.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-xl font-bold group-hover:bg-kenya-green group-hover:text-white transition-all shadow-sm">
                    {school.avatar || school.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5",
                    school.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {school.status === 'active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {school.status}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{school.name}</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">{school.location}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Students</span>
                    <span className="text-sm font-bold text-slate-700">{school.students_count || 0}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Plan</span>
                    <span className="text-sm font-bold text-kenya-green">{school.plan}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenEditModal(school)}
                    className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-xl transition-all hover:bg-slate-800 active:scale-95 flex items-center justify-center gap-2 text-sm"
                  >
                    <ShieldCheck size={18} />
                    Manage
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(school)}
                    className={cn(
                      "p-2.5 rounded-xl transition-all active:scale-95",
                      school.status === 'active' ? "bg-rose-50 text-rose-600 hover:bg-rose-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    )}
                    title={school.status === 'active' ? "Suspend School" : "Activate School"}
                  >
                    {school.status === 'active' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-kenya-green/5 transition-colors">
                <span className="text-xs font-bold text-slate-500 group-hover:text-kenya-green">
                  {school.status === 'suspended' ? 'Account Suspended' : 'Subscription Active'}
                </span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-kenya-green/40" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Register/Edit School Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-kenya-green text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{modalMode === 'add' ? 'Register New School' : 'Edit School Details'}</h2>
                <p className="text-kenya-green-light font-medium opacity-80">
                  {modalMode === 'add' ? 'Onboard a new institution to the system' : `Updating ${selectedSchool?.name}`}
                </p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl flex items-center gap-3">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">School Information</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">School Name</label>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alakara High School"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Nairobi, Kenya"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Subscription Plan</label>
                    <select 
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>

                {modalMode === 'add' && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Principal Account</h3>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Principal Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          required
                          value={formData.principalName}
                          onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                          placeholder="Dr. Jane Doe"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Principal Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          required
                          value={formData.principalEmail}
                          onChange={(e) => setFormData({ ...formData, principalEmail: e.target.value })}
                          placeholder="principal@school.com"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Principal Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="password" 
                          required
                          value={formData.principalPassword}
                          onChange={(e) => setFormData({ ...formData, principalPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-[2] py-4 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/20 hover:bg-kenya-green/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    modalMode === 'add' ? 'Register School' : 'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

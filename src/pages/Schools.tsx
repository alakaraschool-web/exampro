import React from 'react';
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
  ShieldCheck
} from 'lucide-react';

export const Schools = () => {
  const schools = [
    { id: '1', name: 'Alakara High School', location: 'Nairobi, Kenya', status: 'active', students: 1248, plan: 'Premium', avatar: 'AH' },
    { id: '2', name: 'St. Peters Academy', location: 'Mombasa, Kenya', status: 'active', students: 850, plan: 'Standard', avatar: 'SP' },
    { id: '3', name: 'Greenwood International', location: 'Kisumu, Kenya', status: 'inactive', students: 600, plan: 'Basic', avatar: 'GI' },
    { id: '4', name: 'Sunshine Primary', location: 'Nakuru, Kenya', status: 'active', students: 1100, plan: 'Premium', avatar: 'SS' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search schools..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95">
            <Plus size={20} />
            Register School
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map(school => (
          <div key={school.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-xl font-bold group-hover:bg-kenya-green group-hover:text-white transition-all shadow-sm">
                  {school.avatar}
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
                  <span className="text-sm font-bold text-slate-700">{school.students}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Plan</span>
                  <span className="text-sm font-bold text-kenya-green">{school.plan}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  <ShieldCheck size={18} />
                  Manage
                </button>
                <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-kenya-green/5 transition-colors">
              <span className="text-xs font-bold text-slate-500 group-hover:text-kenya-green">Subscription expires in 24 days</span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-kenya-green/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

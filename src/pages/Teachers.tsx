import React from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar,
  ChevronRight,
  Edit,
  Trash2
} from 'lucide-react';

export const Teachers = () => {
  const teachers = [
    { id: '1', name: 'Dr. Alakara', role: 'Principal', subjects: ['Management'], email: 'principal@school.com', phone: '+254 712 345 678', avatar: 'DA' },
    { id: '2', name: 'John Doe', role: 'Senior Teacher', subjects: ['Math', 'Physics'], email: 'john.doe@school.com', phone: '+254 723 456 789', avatar: 'JD' },
    { id: '3', name: 'Jane Smith', role: 'Teacher', subjects: ['English', 'History'], email: 'jane.smith@school.com', phone: '+254 734 567 890', avatar: 'JS' },
    { id: '4', name: 'Robert Wilson', role: 'Teacher', subjects: ['Biology', 'Chemistry'], email: 'robert.w@school.com', phone: '+254 745 678 901', avatar: 'RW' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search teachers..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95">
            <Plus size={20} />
            Add Teacher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-kenya-green/10 text-kenya-green flex items-center justify-center text-xl font-bold group-hover:bg-kenya-green group-hover:text-white transition-all shadow-sm">
                  {teacher.avatar}
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-kenya-red hover:bg-kenya-red/5 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{teacher.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">{teacher.role}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-xs font-medium truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  <span className="text-xs font-medium">{teacher.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map(subject => (
                  <span key={subject} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-kenya-green/5 transition-colors">
              <span className="text-xs font-bold text-slate-500 group-hover:text-kenya-green">View Full Profile</span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-kenya-green/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

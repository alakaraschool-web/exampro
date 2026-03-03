import React from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  ChevronRight,
  Settings,
  GraduationCap
} from 'lucide-react';

export const Subjects = () => {
  const subjects = [
    { id: '1', name: 'Mathematics', code: 'MAT', teachers: 4, students: 1248, color: 'bg-kenya-green' },
    { id: '2', name: 'English Language', code: 'ENG', teachers: 5, students: 1248, color: 'bg-kenya-red' },
    { id: '3', name: 'Physics', code: 'PHY', teachers: 3, students: 450, color: 'bg-kenya-black' },
    { id: '4', name: 'Chemistry', code: 'CHE', teachers: 3, students: 450, color: 'bg-kenya-gold' },
    { id: '5', name: 'Biology', code: 'BIO', teachers: 3, students: 600, color: 'bg-kenya-green' },
    { id: '6', name: 'History', code: 'HIS', teachers: 2, students: 300, color: 'bg-kenya-red' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search subjects..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95">
            <Plus size={20} />
            Add Subject
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${subject.color} text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-kenya-green/10`}>
                  <BookOpen size={28} />
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                  <MoreVertical size={20} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{subject.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Code: {subject.code}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Users size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Teachers</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{subject.teachers} Staff</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <GraduationCap size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Students</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{subject.students} Enrolled</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-kenya-green/5 transition-colors">
              <div className="flex items-center gap-2">
                <Settings size={14} className="text-slate-400 group-hover:text-kenya-green" />
                <span className="text-xs font-bold text-slate-500 group-hover:text-kenya-green">Configure Curriculum</span>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-kenya-green/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Edit,
  Trash2,
  Upload
} from 'lucide-react';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Classes = () => {
  const [classes, setClasses] = useState([
    { id: '1', name: 'Form 4 Red', teacher: 'John Doe', students: 45, average: 78 },
    { id: '2', name: 'Form 4 Blue', teacher: 'Jane Smith', students: 42, average: 72 },
    { id: '3', name: 'Form 3 Green', teacher: 'Robert Wilson', students: 48, average: 65 },
    { id: '4', name: 'Form 2 Blue', teacher: 'Mary Ann', students: 50, average: 68 },
    { id: '5', name: 'Form 1 Red', teacher: 'Peter Pan', students: 44, average: 70 },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search classes..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95">
            <Plus size={20} />
            Create Class
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-kenya-green/10 text-kenya-green flex items-center justify-center text-xl font-bold group-hover:bg-kenya-green group-hover:text-white transition-all shadow-sm">
                  {cls.name.split(' ').map(n => n[0]).join('')}
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

              <h3 className="text-lg font-bold text-slate-900 mb-1">{cls.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">Class Teacher: {cls.teacher}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Students</span>
                  <span className="text-sm font-bold text-slate-700">{cls.students} Learners</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Avg Score</span>
                  <span className="text-sm font-bold text-kenya-green">{cls.average}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  <Users size={18} />
                  Manage Learners
                </button>
                <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors">
                  <Upload size={18} />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-kenya-green/5 transition-colors">
              <span className="text-xs font-bold text-slate-500 group-hover:text-kenya-green">View Performance Trends</span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-kenya-green/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

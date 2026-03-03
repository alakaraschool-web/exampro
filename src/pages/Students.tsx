import React from 'react';
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

export const Students = ({ role }: { role?: string }) => {
  const isClassTeacher = true; // Mock: assume the teacher is a class teacher for now
  const canManage = role !== 'teacher' || isClassTeacher;

  const allStudents = [
    { id: '1', name: 'Sarah Johnson', admission_no: 'ADM-001', class: 'Form 4 Red', performance: 'Excellent', avatar: 'SJ', teacher: 'teacher@school.com' },
    { id: '2', name: 'Michael Chen', admission_no: 'ADM-002', class: 'Form 4 Blue', performance: 'Good', avatar: 'MC', teacher: 'other@school.com' },
    { id: '3', name: 'Amara Okafor', admission_no: 'ADM-003', class: 'Form 3 Green', performance: 'Outstanding', avatar: 'AO', teacher: 'teacher@school.com' },
    { id: '4', name: 'David Smith', admission_no: 'ADM-004', class: 'Form 4 Red', performance: 'Average', avatar: 'DS', teacher: 'teacher@school.com' },
    { id: '5', name: 'Emma Wilson', admission_no: 'ADM-005', class: 'Form 2 Blue', performance: 'Good', avatar: 'EW', teacher: 'other@school.com' },
    { id: '6', name: 'James Brown', admission_no: 'ADM-006', class: 'Form 1 Red', performance: 'Good', avatar: 'JB', teacher: 'other@school.com' },
  ];

  const students = role === 'teacher' 
    ? allStudents.filter(s => s.teacher === 'teacher@school.com')
    : allStudents;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {role === 'teacher' ? (isClassTeacher ? 'My Class Students' : 'My Students') : 'Learner Directory'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {role === 'teacher' 
              ? (isClassTeacher ? 'Manage learners in your assigned class (Form 4 Red).' : 'View learners in your assigned classes.') 
              : 'Manage all students registered in the system.'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter size={18} />
            </button>
            {canManage && (
              <>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all active:scale-95">
                  <Upload size={18} />
                  Bulk Import
                </button>
                <button className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 text-sm transition-all active:scale-95">
                  <Plus size={18} />
                  Add Student
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-bold text-slate-900">Learner Directory</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-kenya-green hover:text-kenya-green/80">
            <FileSpreadsheet size={18} />
            Export CSV
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admission No.</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Performance</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-kenya-green/10 group-hover:text-kenya-green transition-colors">
                      {student.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">Regular Student</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-mono text-slate-600 font-medium">{student.admission_no}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-slate-700">{student.class}</span>
                </td>
                <td className="px-8 py-5">
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold",
                    student.performance === 'Outstanding' ? "bg-emerald-50 text-emerald-600" :
                    student.performance === 'Excellent' ? "bg-kenya-green/10 text-kenya-green" :
                    student.performance === 'Good' ? "bg-amber-50 text-amber-600" :
                    "bg-slate-50 text-slate-600"
                  )}>
                    {student.performance}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-kenya-red hover:bg-kenya-red/5 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all">
                      <BookOpen size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Showing 6 of 1,248 students</span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

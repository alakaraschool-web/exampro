import React, { useState, useEffect } from 'react';
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
  Upload,
  X,
  CheckCircle2
} from 'lucide-react';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabaseService } from '../services/supabaseService';
import { Profile } from '../types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Students = ({ role }: { role?: string }) => {
  const isClassTeacher = true; // Mock: assume the teacher is a class teacher for now
  const canManage = role !== 'teacher' || isClassTeacher;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [newStudent, setNewStudent] = useState({ name: '', admission_no: '', class: 'Form 4 Red' });
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const schoolId = 'placeholder-school-id';
      const data = await supabaseService.getStudents(schoolId);
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const schoolId = 'placeholder-school-id';
      if (editingStudent) {
        await supabaseService.updateProfile(editingStudent.id, {
          full_name: newStudent.name,
          admission_no: newStudent.admission_no,
        });
      } else {
        await supabaseService.createProfile({
          school_id: schoolId,
          full_name: newStudent.name,
          admission_no: newStudent.admission_no,
          role: 'student' as any
        });
      }
      fetchStudents();
      setShowAddModal(false);
      setNewStudent({ name: '', admission_no: '', class: 'Form 4 Red' });
      setEditingStudent(null);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setNewStudent({
      name: student.full_name,
      admission_no: student.admission_no || '',
      class: 'Form 4 Red'
    });
    setShowAddModal(true);
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      try {
        await supabaseService.deleteProfile(id);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Admission No,Class\n"
      + students.map(s => `${s.full_name},${s.admission_no || 'N/A'},Form 4 Red`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkImport = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate import
    alert('Importing students from file...');
    setShowImportModal(false);
  };

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
                <button 
                  onClick={() => setShowImportModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all active:scale-95"
                >
                  <Upload size={18} />
                  Bulk Import
                </button>
                <button 
                  onClick={() => {
                    setEditingStudent(null);
                    setNewStudent({ name: '', admission_no: '', class: 'Form 4 Red' });
                    setShowAddModal(true);
                  }}
                  className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 text-sm transition-all active:scale-95"
                >
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
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 text-sm font-bold text-kenya-green hover:text-kenya-green/80"
          >
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
                      {student.full_name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{student.full_name}</h4>
                      <p className="text-xs text-slate-500 font-medium">Regular Student</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-mono text-slate-600 font-medium">{student.admission_no || 'N/A'}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-slate-700">Form 4 Red</span>
                </td>
                <td className="px-8 py-5">
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 text-slate-600"
                  )}>
                    N/A
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEditStudent(student)}
                      className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteStudent(student.id)}
                      className="p-2 text-slate-400 hover:text-kenya-red hover:bg-kenya-red/5 rounded-lg transition-all"
                    >
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
          <span className="text-xs font-medium text-slate-500">Showing {students.length} of 1,248 students</span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* Bulk Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Bulk Import</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Upload a CSV file to register multiple students.</p>
              </div>
              <button 
                onClick={() => setShowImportModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleBulkImport} className="p-8 space-y-6">
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-kenya-green/5 hover:border-kenya-green/30 transition-all cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-kenya-green transition-colors">
                  <Upload size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700">Click to upload CSV file</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Download template for correct formatting</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/20 hover:bg-kenya-green/90 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Start Import
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Register a new learner in the system.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Admission Number</label>
                  <input 
                    type="text" 
                    required
                    value={newStudent.admission_no}
                    onChange={(e) => setNewStudent({ ...newStudent, admission_no: e.target.value })}
                    placeholder="e.g. ADM-007"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Class</label>
                  <select 
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium appearance-none"
                  >
                    <option>Form 4 Red</option>
                    <option>Form 4 Blue</option>
                    <option>Form 3 Green</option>
                    <option>Form 2 Blue</option>
                    <option>Form 1 Red</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/20 hover:bg-kenya-green/90 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  {editingStudent ? 'Update Student' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

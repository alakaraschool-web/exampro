import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Classes = ({ role }: { role?: string }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [newClass, setNewClass] = useState({ name: '', stream: '', teacher: '' });
  const [classes, setClasses] = useState([
    { id: '1', name: 'Form 4', stream: 'Red', teacher: 'John Doe', students: 45, average: 78 },
    { id: '2', name: 'Form 4', stream: 'Blue', teacher: 'Jane Smith', students: 42, average: 72 },
    { id: '3', name: 'Form 3', stream: 'Green', teacher: 'Robert Wilson', students: 48, average: 65 },
    { id: '4', name: 'Form 2', stream: 'Blue', teacher: 'Mary Ann', students: 50, average: 68 },
    { id: '5', name: 'Form 1', stream: 'Red', teacher: 'Peter Pan', students: 44, average: 70 },
  ]);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      setClasses(classes.map(c => c.id === editingClass.id ? { ...editingClass, ...newClass } : c));
      setEditingClass(null);
    } else {
      const id = (classes.length + 1).toString();
      setClasses([...classes, { ...newClass, id, students: 0, average: 0 }]);
    }
    setShowAddModal(false);
    setNewClass({ name: '', stream: '', teacher: '' });
  };

  const handleEditClass = (cls: any) => {
    setEditingClass(cls);
    setNewClass({
      name: cls.name,
      stream: cls.stream,
      teacher: cls.teacher
    });
    setShowAddModal(true);
  };

  const handleDeleteClass = (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

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
          {role !== 'teacher' && (
            <button 
              onClick={() => {
                setEditingClass(null);
                setNewClass({ name: '', stream: '', teacher: '' });
                setShowAddModal(true);
              }}
              className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus size={20} />
              Create Class
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-kenya-green/10 text-kenya-green flex items-center justify-center text-xl font-bold group-hover:bg-kenya-green group-hover:text-white transition-all shadow-sm">
                  {cls.name[cls.name.length - 1]}
                </div>
                <div className="flex items-center gap-1">
                  {role !== 'teacher' && (
                    <>
                      <button 
                        onClick={() => handleEditClass(cls)}
                        className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClass(cls.id)}
                        className="p-2 text-slate-400 hover:text-kenya-red hover:bg-kenya-red/5 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{cls.name} {cls.stream}</h3>
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
                <button 
                  onClick={() => navigate('/students')}
                  className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
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

      {/* Create/Edit Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingClass ? 'Edit Class' : 'Create New Class'}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Configure a new class and stream.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Class Name</label>
                    <input 
                      type="text" 
                      required
                      value={newClass.name}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      placeholder="e.g. Form 4"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Stream</label>
                    <input 
                      type="text" 
                      required
                      value={newClass.stream}
                      onChange={(e) => setNewClass({ ...newClass, stream: e.target.value })}
                      placeholder="e.g. Red"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Class Teacher</label>
                  <input 
                    type="text" 
                    required
                    value={newClass.teacher}
                    onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                  />
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
                  {editingClass ? 'Update Class' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

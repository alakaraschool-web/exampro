import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  ChevronRight,
  Settings,
  GraduationCap,
  X,
  CheckCircle2,
  Trash2,
  Edit
} from 'lucide-react';

export const Subjects = ({ role }: { role?: string }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [newSubject, setNewSubject] = useState({ name: '', code: '' });
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Mathematics', code: 'MAT', teachers: 4, students: 1248, color: 'bg-kenya-green', allocatedTeachers: ['John Doe', 'Sarah Parker', 'Samuel Okoth', 'Mary Ann'] },
    { id: '2', name: 'English Language', code: 'ENG', teachers: 5, students: 1248, color: 'bg-kenya-red', allocatedTeachers: ['Jane Smith', 'Peter Pan', 'Alice Wonder', 'Bob Builder', 'Charlie Brown'] },
    { id: '3', name: 'Physics', code: 'PHY', teachers: 3, students: 450, color: 'bg-kenya-black', allocatedTeachers: ['John Doe', 'Robert Wilson', 'Isaac Newton'] },
    { id: '4', name: 'Chemistry', code: 'CHE', teachers: 3, students: 450, color: 'bg-kenya-gold', allocatedTeachers: ['Robert Wilson', 'Marie Curie', 'Louis Pasteur'] },
    { id: '5', name: 'Biology', code: 'BIO', teachers: 3, students: 600, color: 'bg-kenya-green', allocatedTeachers: ['Jane Smith', 'Charles Darwin', 'Gregor Mendel'] },
    { id: '6', name: 'History', code: 'HIS', teachers: 2, students: 300, color: 'bg-kenya-red', allocatedTeachers: ['Alice Wonder', 'Herodotus'] },
  ]);

  const colors = ['bg-kenya-green', 'bg-kenya-red', 'bg-kenya-black', 'bg-kenya-gold'];

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...editingSubject, ...newSubject } : s));
      setEditingSubject(null);
    } else {
      const id = (subjects.length + 1).toString();
      const color = colors[subjects.length % colors.length];
      setSubjects([...subjects, { ...newSubject, id, teachers: 0, students: 0, color, allocatedTeachers: [] }]);
    }
    setShowAddModal(false);
    setNewSubject({ name: '', code: '' });
  };

  const handleEditSubject = (subject: any) => {
    setEditingSubject(subject);
    setNewSubject({ name: subject.name, code: subject.code });
    setShowAddModal(true);
  };

  const handleDeleteSubject = (id: string) => {
    if (window.confirm('Are you sure you want to remove this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const handleViewTeachers = (subject: any) => {
    setSelectedSubject(subject);
    setShowTeacherModal(true);
  };

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
          {role !== 'teacher' && (
            <button 
              onClick={() => {
                setEditingSubject(null);
                setNewSubject({ name: '', code: '' });
                setShowAddModal(true);
              }}
              className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus size={20} />
              Add Subject
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Code</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teachers</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Students</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${subject.color} text-white flex items-center justify-center font-bold shadow-sm`}>
                      <BookOpen size={20} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{subject.name}</h4>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-mono text-slate-600 font-medium">{subject.code}</span>
                </td>
                <td className="px-8 py-5">
                  <button 
                    onClick={() => handleViewTeachers(subject)}
                    className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-kenya-green transition-colors"
                  >
                    <Users size={16} className="text-slate-400" />
                    {subject.teachers} Staff
                  </button>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{subject.students} Enrolled</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {role !== 'teacher' && (
                      <>
                        <button 
                          onClick={() => handleEditSubject(subject)}
                          className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="p-2 text-slate-400 hover:text-kenya-red hover:bg-kenya-red/5 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Teachers Modal */}
      {showTeacherModal && selectedSubject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedSubject.name}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Teachers allocated to this subject.</p>
              </div>
              <button 
                onClick={() => setShowTeacherModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-4">
              {selectedSubject.allocatedTeachers.length > 0 ? (
                <div className="space-y-2">
                  {selectedSubject.allocatedTeachers.map((teacher: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-kenya-green/10 text-kenya-green flex items-center justify-center font-bold text-xs">
                        {teacher.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{teacher}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-sm text-slate-500 font-medium">No teachers allocated yet.</p>
                </div>
              )}
              
              <button 
                onClick={() => setShowTeacherModal(false)}
                className="w-full mt-4 px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingSubject ? 'Edit Subject' : 'Add New Subject'}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Configure subject details in the curriculum.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddSubject} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Name</label>
                  <input 
                    type="text" 
                    required
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    placeholder="e.g. Geography"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Code</label>
                  <input 
                    type="text" 
                    required
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    placeholder="e.g. GEO"
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
                  {editingSubject ? 'Update Subject' : 'Add Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

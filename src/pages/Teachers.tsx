import React, { useState } from 'react';
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
  Trash2,
  X,
  CheckCircle2,
  ClipboardList,
  Settings
} from 'lucide-react';

export const Teachers = ({ role }: { role?: string }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    role: 'Teacher',
    subjects: [] as string[],
    phone: ''
  });

  const teachers = [
    { id: '1', name: 'Dr. Alakara', role: 'Principal', subjects: ['Management'], email: 'principal@school.ac.ke', phone: '+254 712 345 678', avatar: 'DA' },
    { id: '2', name: 'John Doe', role: 'Senior Teacher', subjects: ['Math', 'Physics'], email: 'john.doe@school.ac.ke', phone: '+254 723 456 789', avatar: 'JD' },
    { id: '3', name: 'Jane Smith', role: 'Teacher', subjects: ['English', 'History'], email: 'jane.smith@school.ac.ke', phone: '+254 734 567 890', avatar: 'JS' },
    { id: '4', name: 'Robert Wilson', role: 'Teacher', subjects: ['Biology', 'Chemistry'], email: 'robert.w@school.ac.ke', phone: '+254 745 678 901', avatar: 'RW' },
  ];

  const generateEmail = (name: string) => {
    if (!name) return '';
    const cleanName = name.toLowerCase().replace(/\s+/g, '.');
    return `${cleanName}@school.ac.ke`;
  };

  const handleAssign = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowAssignModal(true);
  };

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
          {role === 'principal' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus size={20} />
              Add Teacher
            </button>
          )}
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
                  {role === 'principal' && (
                    <button 
                      onClick={() => handleAssign(teacher)}
                      className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all"
                      title="Assign Roles & Classes"
                    >
                      <ClipboardList size={18} />
                    </button>
                  )}
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

      {/* Assign Modal */}
      {showAssignModal && selectedTeacher && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Assign Responsibilities</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Assign roles, classes, and subjects to {selectedTeacher.name}.</p>
              </div>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Teacher Role</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium appearance-none">
                    <option>Teacher</option>
                    <option>Class Teacher</option>
                    <option>Senior Teacher</option>
                    <option>HOD</option>
                    <option>Deputy Principal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Assigned Class (For Class Teacher)</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium appearance-none">
                    <option>None</option>
                    <option>Form 4 Red</option>
                    <option>Form 4 Blue</option>
                    <option>Form 3 Green</option>
                    <option>Form 2 Blue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Subjects</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Swahili'].map(sub => (
                      <label key={sub} className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-kenya-green focus:ring-kenya-green" />
                        <span className="text-xs font-bold text-slate-700">{sub}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-6 py-4 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/20 hover:bg-kenya-green/90 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Save Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Add New Teacher</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Register a new staff member to the system.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    placeholder="e.g. Samuel Okoth"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Role</label>
                    <select 
                      value={newTeacher.role}
                      onChange={(e) => setNewTeacher({ ...newTeacher, role: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium appearance-none"
                    >
                      <option>Teacher</option>
                      <option>Senior Teacher</option>
                      <option>HOD</option>
                      <option>Deputy Principal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      placeholder="+254..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="p-4 bg-kenya-green/5 rounded-2xl border border-kenya-green/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-kenya-green" />
                    <span className="text-[10px] font-bold text-kenya-green uppercase tracking-wider">Auto-Generated Login</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">
                      {newTeacher.name ? generateEmail(newTeacher.name) : 'waiting for name...'}
                    </span>
                    {newTeacher.name && (
                      <span className="px-2 py-0.5 bg-kenya-green text-white text-[8px] font-bold rounded uppercase">Verified</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-medium">
                    This email will be used as the primary login credential for the teacher.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-4 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/20 hover:bg-kenya-green/90 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Confirm & Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

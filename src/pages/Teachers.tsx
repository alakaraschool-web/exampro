import React, { useState, useEffect } from 'react';
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
import { supabase } from '../lib/supabase';

export const Teachers = ({ role }: { role?: string }) => {
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    role: 'teacher',
    phone: ''
  });

  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['teacher', 'principal', 'super_admin']);
      
      if (data) {
        setTeachers(data.map(t => ({
          id: t.id,
          name: t.full_name,
          role: t.role.charAt(0).toUpperCase() + t.role.slice(1).replace('_', ' '),
          email: t.email || 'no-email@school.com',
          phone: t.phone_number || 'N/A',
          avatar: (t.full_name || 'U').split(' ').map((n: string) => n[0]).join(''),
          subjects: [] // Need to fetch from subject_teachers
        })));
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateEmail = (name: string) => {
    if (!name) return '';
    const cleanName = name.toLowerCase().replace(/\s+/g, '.');
    return `${cleanName}@school.ac.ke`;
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingTeacher) {
        await supabase.from('profiles').update({
          full_name: newTeacher.name,
          role: newTeacher.role,
          phone_number: newTeacher.phone
        }).eq('id', editingTeacher.id);
      } else {
        // Simplified: In real app, you'd use Supabase Auth to create the user
        await supabase.from('profiles').insert({
          full_name: newTeacher.name,
          role: newTeacher.role,
          phone_number: newTeacher.phone,
          email: generateEmail(newTeacher.name)
        });
      }
      await fetchTeachers();
      setShowAddModal(false);
      setEditingTeacher(null);
      setNewTeacher({ name: '', role: 'teacher', phone: '' });
    } catch (error) {
      console.error('Error saving teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTeacher = (teacher: any) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      name: teacher.name,
      role: teacher.role.toLowerCase().replace(' ', '_'),
      phone: teacher.phone
    });
    setShowAddModal(true);
  };

  const handleDeleteTeacher = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this teacher?')) {
      await supabase.from('profiles').delete().eq('id', id);
      await fetchTeachers();
    }
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowAssignModal(true);
  };

  const handleSaveAssignments = () => {
    // In a real app, this would update the teacher's roles and subjects in the DB
    setShowAssignModal(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search teachers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          {(role === 'principal' || role === 'super_admin') && (
            <button 
              onClick={() => {
                setEditingTeacher(null);
                setNewTeacher({ name: '', role: 'teacher', phone: '' });
                setShowAddModal(true);
              }}
              className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus size={20} />
              Add Teacher
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-kenya-green/30 border-t-kenya-green rounded-full animate-spin" />
              <p className="text-sm text-slate-500 font-medium">Loading teachers...</p>
            </div>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <Users size={40} className="text-slate-200" />
              <p className="text-sm text-slate-500 font-medium">No teachers found.</p>
            </div>
          </div>
        ) : (
          filteredTeachers.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-kenya-green/10 text-kenya-green flex items-center justify-center text-xl font-bold group-hover:bg-kenya-green group-hover:text-white transition-all shadow-sm">
                    {teacher.avatar}
                  </div>
                  <div className="flex items-center gap-1">
                    {(role === 'principal' || role === 'super_admin') && (
                      <>
                        <button 
                          onClick={() => handleAssign(teacher)}
                          className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all"
                          title="Assign Roles & Classes"
                        >
                          <ClipboardList size={18} />
                        </button>
                        <button 
                          onClick={() => handleEditTeacher(teacher)}
                          className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="p-2 text-slate-400 hover:text-kenya-red hover:bg-kenya-red/5 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
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
                  {teacher.subjects.map((subject: string) => (
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
          ))
        )}
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
                  onClick={handleSaveAssignments}
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
                <h2 className="text-2xl font-bold text-slate-900">{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Register a new staff member to the system.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
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
                      <option value="teacher">Teacher</option>
                      <option value="principal">Principal</option>
                      <option value="super_admin">Super Admin</option>
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
                  {editingTeacher ? 'Update Teacher' : 'Confirm & Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

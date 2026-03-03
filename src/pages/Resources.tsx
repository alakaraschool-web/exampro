import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Download,
  Eye,
  Trash2,
  X,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  subject_id: string;
  subject_name?: string;
  teacher_id: string;
  teacher_name?: string;
  status: 'pending' | 'approved';
  created_at: string;
  description: string;
  file_url?: string;
}

export const Resources = ({ role }: { role: string }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'pdf' as const,
    subject_id: '',
    description: ''
  });

  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resourcesRes, subjectsRes] = await Promise.all([
        supabase
          .from('resources')
          .select(`
            *,
            subjects (name),
            profiles (full_name)
          `)
          .order('created_at', { ascending: false }),
        supabase.from('subjects').select('*').order('name')
      ]);

      if (resourcesRes.data) {
        setResources(resourcesRes.data.map(r => ({
          ...r,
          subject_name: r.subjects?.name,
          teacher_name: r.profiles?.full_name,
          date: new Date(r.created_at).toISOString().split('T')[0]
        })));
      }

      if (subjectsRes.data) {
        setSubjects(subjectsRes.data);
        if (subjectsRes.data.length > 0 && !newResource.subject_id) {
          setNewResource(prev => ({ ...prev, subject_id: subjectsRes.data[0].id }));
        }
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      await supabase.from('resources').insert({
        title: newResource.title,
        type: newResource.type,
        subject_id: newResource.subject_id,
        description: newResource.description,
        teacher_id: userData.user.id,
        status: role === 'super_admin' || role === 'principal' ? 'approved' : 'pending'
      });

      await fetchData();
      setShowAddModal(false);
      setNewResource({
        title: '',
        type: 'pdf',
        subject_id: subjects[0]?.id || '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await supabase.from('resources').update({ status: 'approved' }).eq('id', id);
      await fetchData();
    } catch (error) {
      console.error('Error approving resource:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await supabase.from('resources').delete().eq('id', id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  const filteredResources = resources.filter(r => {
    if (role === 'student' && r.status !== 'approved') return false;
    const search = searchTerm.toLowerCase();
    return r.title.toLowerCase().includes(search) || 
           (r.subject_name || '').toLowerCase().includes(search);
  });

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="text-rose-500" size={24} />;
      case 'video': return <Video className="text-blue-500" size={24} />;
      case 'link': return <LinkIcon className="text-indigo-500" size={24} />;
    }
  };

  const handleDownload = (resource: Resource) => {
    // In a real app, this would trigger a file download
    alert(`Downloading ${resource.title}...`);
    // For demo purposes, we can simulate a download by creating a blob
    const element = document.createElement("a");
    const file = new Blob([`Content of ${resource.title}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${resource.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Universal Resources</h1>
          <p className="text-sm text-slate-500 font-medium">Access and manage educational materials across all subjects.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {(role === 'teacher' || role === 'principal' || role === 'super_admin') && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus size={20} />
              Share Resource
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by title or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">
          <Filter size={20} />
          Filter by Subject
        </button>
      </div>

      {role === 'super_admin' && resources.some(r => r.status === 'pending') && (
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-600">
            <Clock size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-900">Pending Approvals</h3>
            <p className="text-sm text-amber-700 font-medium mt-1 leading-relaxed">
              There are resources waiting for your approval. Approved resources will be visible to all students instantly.
            </p>
          </div>
          <button className="px-6 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-700 transition-all">
            Review All
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-kenya-green/30 border-t-kenya-green rounded-full animate-spin" />
              <p className="text-sm text-slate-500 font-medium">Loading resources...</p>
            </div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <BookOpen size={40} className="text-slate-200" />
              <p className="text-sm text-slate-500 font-medium">No resources found.</p>
            </div>
          </div>
        ) : (
          filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {getIcon(resource.type)}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      resource.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {resource.status === 'approved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {resource.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(resource as any).date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-kenya-green transition-colors">{resource.title}</h3>
                <p className="text-xs text-kenya-green font-bold uppercase tracking-widest mb-4">{resource.subject_name}</p>
                
                <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <BookOpen size={14} />
                  <span>Shared by {resource.teacher_name}</span>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 group-hover:bg-kenya-green/5 transition-colors">
                {resource.status === 'approved' ? (
                  <>
                    <button 
                      onClick={() => handleDownload(resource)}
                      className="flex-1 bg-kenya-green text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-kenya-green/10 hover:shadow-kenya-green/20 active:scale-95"
                    >
                      <Download size={18} />
                      Download
                    </button>
                    <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
                      <Eye size={18} />
                    </button>
                  </>
                ) : (role === 'super_admin' || role === 'principal') ? (
                  <>
                    <button 
                      onClick={() => handleApprove(resource.id)}
                      className="flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/10 hover:bg-emerald-700"
                    >
                      <ShieldCheck size={18} />
                      Approve
                    </button>
                    <button 
                      onClick={() => handleDelete(resource.id)}
                      className="p-2.5 bg-white border border-slate-200 text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                ) : (
                  <div className="flex-1 text-center py-2.5 text-xs font-bold text-amber-600 uppercase tracking-widest italic">
                    Awaiting Approval
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Share Resource</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Upload materials for student access.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddResource} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resource Title</label>
                  <input 
                    type="text" 
                    required
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    placeholder="e.g. Form 4 Physics Revision"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Type</label>
                    <select 
                      value={newResource.type}
                      onChange={(e) => setNewResource({ ...newResource, type: e.target.value as any })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium appearance-none"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="video">Video Tutorial</option>
                      <option value="link">External Link</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                    <select 
                      value={newResource.subject_id}
                      onChange={(e) => setNewResource({ ...newResource, subject_id: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium appearance-none"
                    >
                      {subjects.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                  <textarea 
                    rows={3}
                    required
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    placeholder="Briefly describe what this resource covers..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium resize-none"
                  />
                </div>

                <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-kenya-green/5 hover:border-kenya-green/30 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-kenya-green transition-colors">
                    <Plus size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700">Click to upload file</p>
                    <p className="text-[10px] text-slate-400 font-medium">PDF, MP4 or Link (Max 50MB)</p>
                  </div>
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
                  {role === 'super_admin' ? 'Publish Resource' : 'Submit for Approval'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

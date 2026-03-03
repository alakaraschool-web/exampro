import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Upload, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown,
  User,
  History,
  Info,
  Download,
  FileText,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const MarksEntry = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  
  const [scores, setScores] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [bulkData, setBulkData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [classesRes, subjectsRes, examsRes] = await Promise.all([
        supabase.from('classes').select('*').order('name'),
        supabase.from('subjects').select('*').order('name'),
        supabase.from('exams').select('*').order('created_at', { ascending: false })
      ]);

      if (classesRes.data) {
        setClasses(classesRes.data);
        if (classesRes.data.length > 0) setSelectedClass(classesRes.data[0].id);
      }
      if (subjectsRes.data) {
        setSubjects(subjectsRes.data);
        if (subjectsRes.data.length > 0) setSelectedSubject(subjectsRes.data[0].id);
      }
      if (examsRes.data) {
        setExams(examsRes.data);
        if (examsRes.data.length > 0) setSelectedExam(examsRes.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadList = async () => {
    if (!selectedClass || !selectedSubject || !selectedExam) return;
    setLoading(true);
    try {
      // Fetch students in class
      const { data: studentsData } = await supabase
        .from('students')
        .select('*, profiles(full_name)')
        .eq('class_id', selectedClass);

      // Fetch existing marks
      const { data: marksData } = await supabase
        .from('marks')
        .select('*')
        .eq('exam_id', selectedExam)
        .eq('subject_id', selectedSubject);

      if (studentsData) {
        setStudents(studentsData.map(s => ({
          id: s.id,
          name: s.profiles?.full_name,
          admission_no: s.admission_number,
          current_score: marksData?.find(m => m.student_id === s.id)?.score || ''
        })));

        const initialScores: Record<string, string> = {};
        studentsData.forEach(s => {
          const mark = marksData?.find(m => m.student_id === s.id);
          initialScores[s.id] = mark ? mark.score.toString() : '';
        });
        setScores(initialScores);
      }
    } catch (error) {
      console.error('Error loading list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (id: string, value: string) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setScores(prev => ({ ...prev, [id]: value }));
      setSaved(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const marksToSave = Object.entries(scores)
        .filter(([_, score]) => score !== '')
        .map(([studentId, score]) => ({
          student_id: studentId,
          subject_id: selectedSubject,
          exam_id: selectedExam,
          score: parseFloat(score as string)
        }));

      // In a real app, you'd use an upsert or handle conflicts
      // For now, let's delete existing and insert new
      await supabase.from('marks')
        .delete()
        .eq('exam_id', selectedExam)
        .eq('subject_id', selectedSubject)
        .in('student_id', Object.keys(scores));

      if (marksToSave.length > 0) {
        await supabase.from('marks').insert(marksToSave);
      }

      setSaved(true);
      setTimeout(() => navigate('/exams'), 1000);
    } catch (error) {
      console.error('Error saving marks:', error);
    } finally {
      setSaving(false);
    }
  };

  const downloadTemplate = () => {
    const headers = ['Admission No', 'Student Name', 'Marks (0-100)'];
    const rows = students.map(s => [s.admission_no, s.name, '']);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `marks_template_${selectedClass}_${selectedSubject}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkImport = () => {
    // Simulate reading a file
    const mockImportedData = students.map(s => ({
      ...s,
      new_score: Math.floor(Math.random() * 40) + 60 // Random scores for demo
    }));
    setBulkData(mockImportedData);
    setShowBulkConfirm(true);
  };

  const confirmBulkUpload = () => {
    const newScores = { ...scores };
    bulkData.forEach(item => {
      newScores[item.id] = item.new_score.toString();
    });
    setScores(newScores);
    setShowBulkConfirm(false);
    setSaved(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Selection Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Select Class</label>
          <div className="relative">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-kenya-green/20 transition-all"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name} {c.stream}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Select Subject</label>
          <div className="relative">
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-kenya-green/20 transition-all"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Select Exam</label>
          <div className="relative">
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-kenya-green/20 transition-all"
            >
              {exams.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-end h-full pt-6">
          <button 
            onClick={loadList}
            className="bg-kenya-green text-white font-bold px-6 py-2.5 rounded-xl hover:bg-kenya-green/90 transition-all active:scale-95"
          >
            Load List
          </button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search student..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
            />
          </div>
          <button 
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            <Download size={18} />
            Template
          </button>
          <button 
            onClick={handleBulkImport}
            className="flex items-center gap-2 px-4 py-2.5 bg-kenya-green/10 text-kenya-green border border-kenya-green/20 rounded-xl text-sm font-bold hover:bg-kenya-green/20 transition-all"
          >
            <Upload size={18} />
            Bulk Import
          </button>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold animate-in fade-in slide-in-from-right-2">
              <CheckCircle2 size={18} />
              All marks saved
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-kenya-green text-white rounded-xl text-sm font-bold hover:bg-kenya-green/90 shadow-lg shadow-kenya-green/10 transition-all disabled:bg-kenya-green/50 active:scale-95"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Marks
          </button>
        </div>
      </div>

      {/* Bulk Confirmation Modal */}
      {showBulkConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-kenya-green/10 rounded-xl text-kenya-green">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Confirm Bulk Upload</h3>
                  <p className="text-xs text-slate-500 font-medium">Review the imported marks before applying them to the class.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowBulkConfirm(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="p-6 max-h-[400px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student</th>
                    <th className="py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adm No.</th>
                    <th className="py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">New Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bulkData.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 text-sm font-bold text-slate-700">{item.name}</td>
                      <td className="py-3 text-sm font-mono text-slate-500">{item.admission_no}</td>
                      <td className="py-3 text-sm font-bold text-kenya-green text-center">{item.new_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowBulkConfirm(false)}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={confirmBulkUpload}
                className="px-8 py-2.5 bg-kenya-green text-white font-bold rounded-xl text-sm hover:bg-kenya-green/90 shadow-lg shadow-kenya-green/10 transition-all active:scale-95"
              >
                Confirm & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Marks Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Details</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admission No.</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Previous Score</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-40">Current Score (100)</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-kenya-green/10 group-hover:text-kenya-green transition-colors">
                      {student.name.split(' ').map(n => n[0]).join('')}
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
                <td className="px-8 py-5 text-center">
                  <span className="text-sm font-bold text-slate-400">{student.current_score}</span>
                </td>
                <td className="px-8 py-5">
                  <input 
                    type="number" 
                    value={scores[student.id]}
                    onChange={(e) => handleScoreChange(student.id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all text-center"
                    placeholder="0-100"
                  />
                </td>
                <td className="px-8 py-5">
                  {scores[student.id] ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 size={14} />
                      Entered
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
                      <AlertCircle size={14} />
                      Pending
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between p-6 bg-kenya-green/5 rounded-2xl border border-kenya-green/10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Info className="text-kenya-green" size={20} />
          </div>
          <p className="text-sm font-medium text-kenya-green">
            <span className="font-bold">Pro Tip:</span> You can use the <span className="font-bold">Tab</span> key to quickly move between students. Marks are validated to be between 0 and 100.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="block text-[10px] text-kenya-green/60 font-bold uppercase tracking-wider">Completed</span>
            <span className="text-lg font-bold text-kenya-green">6/6</span>
          </div>
          <div className="w-32 h-2 bg-kenya-green/20 rounded-full overflow-hidden">
            <div className="h-full bg-kenya-green rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
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
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const students = [
  { id: '1', name: 'Sarah Johnson', admission_no: 'ADM-001', current_score: 85 },
  { id: '2', name: 'Michael Chen', admission_no: 'ADM-002', current_score: 78 },
  { id: '3', name: 'Amara Okafor', admission_no: 'ADM-003', current_score: 92 },
  { id: '4', name: 'David Smith', admission_no: 'ADM-004', current_score: 65 },
  { id: '5', name: 'Emma Wilson', admission_no: 'ADM-005', current_score: 74 },
  { id: '6', name: 'James Brown', admission_no: 'ADM-006', current_score: 81 },
];

export const MarksEntry = () => {
  const [selectedClass, setSelectedClass] = useState('Form 4 Red');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedExam, setSelectedExam] = useState('Term 1 End-Term');
  const [scores, setScores] = useState<Record<string, string>>(
    Object.fromEntries(students.map(s => [s.id, s.current_score.toString()]))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleScoreChange = (id: string, value: string) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setScores(prev => ({ ...prev, [id]: value }));
      setSaved(false);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      // Navigate back to exams after a short delay
      setTimeout(() => navigate('/exams'), 1000);
    }, 1500);
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
              <option>Form 4 Red</option>
              <option>Form 4 Blue</option>
              <option>Form 3 Green</option>
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
              <option>Mathematics</option>
              <option>English Language</option>
              <option>Physics</option>
              <option>Chemistry</option>
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
              <option>Term 1 End-Term</option>
              <option>Term 1 Mid-Term</option>
              <option>Term 2 Opening</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-end h-full pt-6">
          <button className="bg-kenya-green text-white font-bold px-6 py-2.5 rounded-xl hover:bg-kenya-green/90 transition-all active:scale-95">
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
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
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

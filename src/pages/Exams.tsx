import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Play, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  Award,
  TrendingUp,
  Edit,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ExamCard = ({ exam, onProcess }: any) => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleProcess = () => {
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      onProcess(exam.id);
      navigate('/reports');
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-kenya-green/10 rounded-xl text-kenya-green group-hover:bg-kenya-green group-hover:text-white transition-colors">
            <Calendar size={24} />
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5",
            exam.is_processed 
              ? "bg-emerald-50 text-emerald-600" 
              : "bg-amber-50 text-amber-600"
          )}>
            {exam.is_processed ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            {exam.is_processed ? 'Processed' : 'Pending'}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-1">{exam.name}</h3>
        <p className="text-sm text-slate-500 font-medium mb-6">Academic Year {exam.academic_year} • Term {exam.term}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-3 rounded-xl">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Subjects</span>
            <span className="text-sm font-bold text-slate-700">12 Subjects</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Students</span>
            <span className="text-sm font-bold text-slate-700">1,248 Entry</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {!exam.is_processed ? (
            <div className="flex gap-2">
              <button 
                onClick={handleProcess}
                disabled={processing}
                className="flex-1 bg-kenya-green hover:bg-kenya-green/90 disabled:bg-kenya-green/50 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Process Results
                  </>
                )}
              </button>
              <button 
                onClick={() => navigate('/exams/missing')}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl transition-colors text-sm"
              >
                Missing
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/reports')}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              View Reports
            </button>
          )}
          
          <div className="flex items-center gap-1">
            <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs">
              <Edit size={14} />
              Edit Exam
            </button>
            <button className="p-2 text-slate-400 hover:text-kenya-red hover:bg-kenya-red/5 rounded-lg transition-all">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {exam.is_processed && (
        <div className="px-6 py-3 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-700">Processed on {new Date().toLocaleDateString()}</span>
          <ChevronRight size={16} className="text-emerald-400" />
        </div>
      )}
    </div>
  );
};

export const Exams = () => {
  const [exams, setExams] = useState([
    { id: '1', name: 'Term 1 Mid-Term', academic_year: 2024, term: 1, is_processed: true },
    { id: '2', name: 'Term 1 End-Term', academic_year: 2024, term: 1, is_processed: false },
    { id: '3', name: 'Term 2 Opening', academic_year: 2024, term: 2, is_processed: false },
  ]);

  const handleProcess = (id: string) => {
    setExams(exams.map(e => e.id === id ? { ...e, is_processed: true } : e));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search exams..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-kenya-green/10 flex items-center gap-2 transition-all active:scale-95">
            <Plus size={20} />
            Create Exam
          </button>
        </div>
      </div>

      {/* Info Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-4">
          <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
            <AlertCircle className="text-amber-600" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">Manual Processing Required</h4>
            <p className="text-xs text-amber-700 font-medium mt-1">
              Exam results are not automatically processed. Once all marks are entered, the Principal must manually trigger the processing.
            </p>
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex gap-4">
          <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
            <AlertCircle className="text-rose-600" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-900">Missing Marks Detected</h4>
            <p className="text-xs text-rose-700 font-medium mt-1">
              There are 24 students with missing marks in <span className="font-bold">Term 1 End-Term</span>. Processing is disabled until all marks are entered.
            </p>
          </div>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map(exam => (
          <ExamCard key={exam.id} exam={exam} onProcess={handleProcess} />
        ))}
      </div>

      {/* Reports Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Global Reports</h2>
            <p className="text-sm text-slate-500 font-medium">Download school-wide performance analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'School Merit List', icon: FileSpreadsheet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { title: 'Subject Champions', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
            { title: 'Performance Summary', icon: FileText, color: 'text-kenya-green', bg: 'bg-kenya-green/5' },
            { title: 'Grade Distribution', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((report, i) => (
            <button key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-kenya-green/20 hover:bg-kenya-green/5 transition-all group text-left">
              <div className={`p-3 rounded-xl ${report.bg} ${report.color} group-hover:bg-white transition-colors`}>
                <report.icon size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-kenya-green">{report.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

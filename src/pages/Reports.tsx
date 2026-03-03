import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ChevronRight, 
  Printer, 
  Share2,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Layout,
  CheckCircle2,
  X
} from 'lucide-react';
import { generateStudentPDF, generateClassPDF } from '../utils/pdfGenerator';

const ReportCardPreview = ({ student, template }: any) => {
  const handleDownload = () => {
    const reportData = {
      name: student.name,
      admission_no: student.admission_no,
      class: student.class,
      term: 'Term 1',
      year: 2024,
      subjects: [
        { subject: 'Mathematics', score: 98, grade: 'A', remarks: 'Excellent' },
        { subject: 'English', score: 94, grade: 'A', remarks: 'Very Good' },
        { subject: 'Physics', score: 96, grade: 'A', remarks: 'Outstanding' },
        { subject: 'Chemistry', score: 97, grade: 'A', remarks: 'Brilliant' },
        { subject: 'History', score: 97, grade: 'A', remarks: 'Exceptional' },
      ],
      summary: {
        total: '482/500',
        average: '96.4%',
        rank: '1/42'
      },
      principalRemarks: "Sarah continues to demonstrate exceptional academic prowess. Her dedication to her studies is evident in these results. Keep up the excellent work!"
    };
    generateStudentPDF(reportData, template);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in duration-300">
      <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-kenya-green flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-kenya-green/10">
              {student.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                  <BookOpen size={14} /> {student.class}
                </span>
                <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                  <Award size={14} /> Adm: {student.admission_no}
                </span>
                <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar size={14} /> Term 1 End-Term 2024
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Printer size={20} />
            </button>
            <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Share2 size={20} />
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-kenya-green text-white rounded-xl font-bold hover:bg-kenya-green/90 shadow-lg shadow-kenya-green/10 transition-all active:scale-95"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>
        </div>
      </div>

    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Summary */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Marks', value: '482/500', color: 'text-kenya-green' },
              { label: 'Average', value: '96.4%', color: 'text-emerald-600' },
              { label: 'Class Rank', value: '1/42', color: 'text-kenya-gold' },
              { label: 'Stream Rank', value: '1/124', color: 'text-kenya-red' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</span>
                <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Score</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Grade</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { subject: 'Mathematics', score: 98, grade: 'A', remarks: 'Excellent' },
                  { subject: 'English', score: 94, grade: 'A', remarks: 'Very Good' },
                  { subject: 'Physics', score: 96, grade: 'A', remarks: 'Outstanding' },
                  { subject: 'Chemistry', score: 97, grade: 'A', remarks: 'Brilliant' },
                  { subject: 'History', score: 97, grade: 'A', remarks: 'Exceptional' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.subject}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center">{row.score}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-kenya-green/10 text-kenya-green rounded-lg text-xs font-bold">{row.grade}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
          <div className="bg-kenya-green/5 p-6 rounded-2xl border border-kenya-green/10">
            <h3 className="text-sm font-bold text-kenya-green mb-4 flex items-center gap-2">
              <TrendingUp size={18} /> Performance Trend
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Term 3 2023', value: '94.2%', trend: 'up' },
                { label: 'Term 2 2023', value: '92.8%', trend: 'up' },
                { label: 'Term 1 2023', value: '93.5%', trend: 'down' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-kenya-green/70">{item.label}</span>
                  <span className="text-sm font-bold text-kenya-green">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Principal's Remarks</h3>
            <p className="text-sm text-slate-500 font-medium italic leading-relaxed">
              "Sarah continues to demonstrate exceptional academic prowess. Her dedication to her studies is evident in these results. Keep up the excellent work!"
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100" />
              <div>
                <span className="block text-sm font-bold text-slate-900">Dr. Alakara</span>
                <span className="text-xs text-slate-400 font-medium">School Principal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [template, setTemplate] = useState<'standard' | 'detailed' | 'summary'>('standard');
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkOptions, setBulkOptions] = useState({
    class: 'Form 4 Red',
    exams: ['Term 1 End-Term']
  });

  const students = [
    { id: '1', name: 'Sarah Johnson', admission_no: 'ADM-001', class: 'Form 4 Red' },
    { id: '2', name: 'Michael Chen', admission_no: 'ADM-002', class: 'Form 4 Blue' },
    { id: '3', name: 'Amara Okafor', admission_no: 'ADM-003', class: 'Form 3 Green' },
  ];

  const handleBulkDownload = () => {
    setIsBulkDownloading(true);
    const mockReports = students.map(s => ({
      name: s.name,
      admission_no: s.admission_no,
      class: s.class,
      term: 'Term 1',
      year: 2024,
      subjects: [
        { subject: 'Mathematics', score: 85, grade: 'A', remarks: 'Good' },
        { subject: 'English', score: 78, grade: 'B', remarks: 'Satisfactory' },
      ],
      summary: {
        total: '163/200',
        average: '81.5%',
        rank: '5/42'
      },
      principalRemarks: "Consistent effort shown. Maintain the focus."
    }));
    
    setTimeout(() => {
      generateClassPDF(mockReports, bulkOptions.class, template);
      setIsBulkDownloading(false);
      setShowBulkModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Bulk Download Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Bulk Report Generation</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Select parameters for the batch download.</p>
              </div>
              <button 
                onClick={() => setShowBulkModal(false)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Select Class</label>
                  <select 
                    value={bulkOptions.class}
                    onChange={(e) => setBulkOptions({ ...bulkOptions, class: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-kenya-green/20 outline-none font-bold appearance-none"
                  >
                    <option>Form 4 Red</option>
                    <option>Form 4 Blue</option>
                    <option>Form 3 Green</option>
                    <option>Form 2 Blue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Include Exams</label>
                  <div className="space-y-2">
                    {['Term 1 End-Term', 'Term 1 Mid-Term', 'Term 2 Opening'].map(exam => (
                      <label key={exam} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={bulkOptions.exams.includes(exam)}
                          onChange={(e) => {
                            const newExams = e.target.checked 
                              ? [...bulkOptions.exams, exam]
                              : bulkOptions.exams.filter(ex => ex !== exam);
                            setBulkOptions({ ...bulkOptions, exams: newExams });
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-kenya-green focus:ring-kenya-green" 
                        />
                        <span className="text-xs font-bold text-slate-700">{exam}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button 
                  onClick={() => setShowBulkModal(false)}
                  className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBulkDownload}
                  disabled={isBulkDownloading || bulkOptions.exams.length === 0}
                  className="flex-1 px-6 py-4 bg-kenya-green text-white font-bold rounded-2xl shadow-lg shadow-kenya-green/20 hover:bg-kenya-green/90 transition-all flex items-center justify-center gap-2 disabled:bg-kenya-green/50"
                >
                  {isBulkDownloading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Download size={20} />
                  )}
                  Generate Batch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedStudent ? (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search student for report card..." 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
                />
              </div>
              <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors">
                <Filter size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1">
                {(['standard', 'detailed', 'summary'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                      template === t 
                        ? 'bg-kenya-green text-white shadow-lg shadow-kenya-green/20' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowBulkModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-kenya-green text-white rounded-2xl font-bold hover:bg-kenya-green/90 shadow-lg shadow-kenya-green/10 transition-all active:scale-95"
              >
                <Download size={20} />
                Bulk PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
              <div 
                key={student.id} 
                onClick={() => setSelectedStudent(student)}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-kenya-green/10 text-kenya-green flex items-center justify-center font-bold group-hover:bg-kenya-green group-hover:text-white transition-all">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{student.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{student.class}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Adm: {student.admission_no}</span>
                  <div className="flex items-center gap-1 text-kenya-green group-hover:translate-x-1 transition-transform">
                    View Report <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button 
            onClick={() => setSelectedStudent(null)}
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
            Back to Student List
          </button>
          <ReportCardPreview student={selectedStudent} template={template} />
        </>
      )}
    </div>
  );
};

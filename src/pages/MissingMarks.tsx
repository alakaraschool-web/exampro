import React, { useState } from 'react';
import { 
  AlertCircle, 
  Search, 
  Filter, 
  ChevronRight, 
  BookOpen, 
  User,
  ArrowLeft,
  Mail,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MissingMarks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'student' | 'subject'>('student');

  const missingData = [
    {
      id: '1',
      student: 'John Kamau',
      admission: 'ADM-1024',
      class: 'Form 4 Red',
      missingSubjects: ['Mathematics', 'Physics', 'Chemistry'],
      teacher: 'Mr. Mwangi',
      status: 'Critical'
    },
    {
      id: '2',
      student: 'Mary Wambui',
      admission: 'ADM-1056',
      class: 'Form 4 Red',
      missingSubjects: ['History'],
      teacher: 'Mrs. Njeri',
      status: 'Warning'
    },
    {
      id: '3',
      student: 'David Omondi',
      admission: 'ADM-1102',
      class: 'Form 3 Blue',
      missingSubjects: ['Biology', 'Geography'],
      teacher: 'Mr. Otieno',
      status: 'Critical'
    },
    {
      id: '4',
      student: 'Sarah Cherono',
      admission: 'ADM-1245',
      class: 'Form 2 Green',
      missingSubjects: ['English', 'Kiswahili'],
      teacher: 'Ms. Korir',
      status: 'Warning'
    }
  ];

  // Group by subject for subject view
  const subjectGroups = missingData.reduce((acc: any, curr) => {
    curr.missingSubjects.forEach(sub => {
      if (!acc[sub]) {
        acc[sub] = {
          subject: sub,
          teacher: curr.teacher,
          students: []
        };
      }
      acc[sub].students.push({
        name: curr.student,
        class: curr.class,
        admission: curr.admission
      });
    });
    return acc;
  }, {});

  const subjectList = Object.values(subjectGroups);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/exams')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Missing Marks Details</h1>
            <p className="text-sm text-slate-500 font-medium">Term 1 End-Term 2024 • 24 Students Remaining</p>
          </div>
        </div>

        <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setViewMode('student')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              viewMode === 'student' 
                ? 'bg-kenya-green text-white shadow-lg shadow-kenya-green/20' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Student View
          </button>
          <button
            onClick={() => setViewMode('subject')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              viewMode === 'subject' 
                ? 'bg-kenya-green text-white shadow-lg shadow-kenya-green/20' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Subject View
          </button>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-start gap-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm text-rose-600">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-rose-900">Action Required</h3>
          <p className="text-sm text-rose-700 font-medium mt-1 leading-relaxed">
            {viewMode === 'student' 
              ? "The following students have missing marks for the current exam period."
              : "The following subjects have pending mark entries from respective teachers."}
            Results processing is disabled until all marks are entered.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder={viewMode === 'student' ? "Search by student or class..." : "Search by subject or teacher..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">
          <Filter size={20} />
          Filter by Class
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {viewMode === 'student' ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Details</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Missing Subjects</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject Teacher</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {missingData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                        {item.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-slate-900">{item.student}</span>
                        <span className="text-xs text-slate-500 font-medium">{item.class} • {item.admission}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.missingSubjects.map((sub, i) => (
                        <span key={i} className="px-2 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold border border-rose-100">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-slate-600">{item.teacher}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      <AlertCircle size={12} />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all" title="Email Teacher">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all" title="Call Teacher">
                        <Phone size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-kenya-green hover:bg-kenya-green/5 rounded-lg transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Teacher</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Students</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjectList.map((item: any, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-kenya-green/10 text-kenya-green flex items-center justify-center font-bold">
                        <BookOpen size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{item.subject}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-slate-600">{item.teacher}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-rose-600">{item.students.length} Students</span>
                      <div className="flex -space-x-2">
                        {item.students.slice(0, 3).map((s: any, j: number) => (
                          <div key={j} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">
                            {s.name[0]}
                          </div>
                        ))}
                        {item.students.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
                            +{item.students.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center gap-2 px-4 py-2 bg-kenya-green text-white rounded-xl text-xs font-bold hover:bg-kenya-green/90 transition-all">
                        <Mail size={14} />
                        Notify Teacher
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

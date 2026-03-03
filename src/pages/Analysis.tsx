import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  Users, 
  Search, 
  Filter, 
  ChevronRight,
  Star,
  Award,
  BarChart3
} from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { Exam, ProcessedResult } from '../types';

export const Analysis = () => {
  const [activeTab, setActiveTab] = useState('merit');
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      fetchResults();
    }
  }, [selectedExam]);

  const fetchExams = async () => {
    try {
      const schoolId = 'placeholder-school-id';
      const data = await supabaseService.getExams(schoolId);
      setExams(data || []);
      if (data && data.length > 0) {
        setSelectedExam(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await supabaseService.getProcessedResults(selectedExam);
      setResults(data || []);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const topStudents = results
    .sort((a, b) => (b.total_marks || 0) - (a.total_marks || 0))
    .map((r, i) => ({
      rank: i + 1,
      name: r.profiles?.full_name || 'Unknown',
      class: 'Form 4 Red', // This would come from a join in a real app
      score: r.total_marks,
      grade: r.grade,
      trend: 'up'
    }));

  const subjectChampions = [
    { subject: 'Mathematics', student: 'Alice Johnson', score: 98, class: 'Form 4 Red' },
    { subject: 'English', student: 'Bob Smith', score: 95, class: 'Form 4 Blue' },
    { subject: 'Physics', student: 'Charlie Brown', score: 92, class: 'Form 4 Red' },
    { subject: 'Chemistry', student: 'David Wilson', score: 94, class: 'Form 4 Green' },
    { subject: 'Biology', student: 'Eva Green', score: 91, class: 'Form 4 Blue' },
  ];

  const subjectRankings = [
    { subject: 'Mathematics', avg: 72.4, passRate: '88%', trend: 'up' },
    { subject: 'English', avg: 68.1, passRate: '82%', trend: 'down' },
    { subject: 'Physics', avg: 75.2, passRate: '92%', trend: 'up' },
    { subject: 'Chemistry', avg: 64.8, passRate: '75%', trend: 'up' },
    { subject: 'Biology', avg: 70.5, passRate: '85%', trend: 'up' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Academic Analysis</h1>
          <p className="text-slate-500 font-medium mt-1">Detailed performance insights and rankings.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 font-bold text-slate-700"
          >
            {exams.map(exam => (
              <option key={exam.id} value={exam.id}>{exam.name}</option>
            ))}
          </select>
          <button className="bg-kenya-green text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-kenya-green/10 hover:bg-kenya-green/90 transition-all">
            Export Analysis
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'merit', label: 'Merit List', icon: Trophy },
          { id: 'champions', label: 'Subject Champions', icon: Star },
          { id: 'rankings', label: 'Subject Rankings', icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-kenya-green shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6">
        {activeTab === 'merit' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Overall Merit List</h3>
              <div className="flex items-center gap-2">
                <Search size={18} className="text-slate-400" />
                <input type="text" placeholder="Search student..." className="bg-transparent border-none focus:ring-0 text-sm font-medium" />
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rank</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Score</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grade</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topStudents.map((student) => (
                  <tr key={student.rank} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        student.rank === 1 ? 'bg-kenya-gold/20 text-kenya-gold' :
                        student.rank === 2 ? 'bg-slate-200 text-slate-600' :
                        student.rank === 3 ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {student.rank}
                      </div>
                    </td>
                    <td className="px-8 py-4 font-bold text-slate-900">{student.name}</td>
                    <td className="px-8 py-4 text-slate-600 font-medium">{student.class}</td>
                    <td className="px-8 py-4 font-bold text-kenya-green">{student.score}</td>
                    <td className="px-8 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <TrendingUp size={18} className={student.trend === 'up' ? 'text-emerald-500 ml-auto' : 'text-rose-500 ml-auto rotate-180'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'champions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectChampions.map((champ, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-kenya-gold/10 text-kenya-gold flex items-center justify-center shadow-sm">
                    <Medal size={24} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Score</span>
                    <p className="text-xl font-bold text-kenya-green">{champ.score}%</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{champ.subject}</h4>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-kenya-green/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                    {champ.student[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{champ.student}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{champ.class}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rankings' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mean Score</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pass Rate</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjectRankings.map((ranking, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                          {i + 1}
                        </div>
                        <span className="font-bold text-slate-900">{ranking.subject}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-700">{ranking.avg}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                          <div 
                            className="h-full bg-kenya-green rounded-full" 
                            style={{ width: ranking.passRate }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-600">{ranking.passRate}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        ranking.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {ranking.trend === 'up' ? 'Improved' : 'Dropped'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

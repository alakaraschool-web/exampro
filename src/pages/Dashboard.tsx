import React from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}
        </div>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const subjectData = [
  { name: 'Math', avg: 72, target: 80 },
  { name: 'English', avg: 68, target: 75 },
  { name: 'Science', avg: 75, target: 85 },
  { name: 'History', avg: 62, target: 70 },
  { name: 'Geography', avg: 65, target: 75 },
  { name: 'Swahili', avg: 70, target: 80 },
];

const gradeDistribution = [
  { name: 'A', value: 15, color: '#006600' }, // Kenya Green
  { name: 'B', value: 35, color: '#990000' }, // Kenya Red
  { name: 'C', value: 30, color: '#000000' }, // Kenya Black
  { name: 'D', value: 15, color: '#FFD700' }, // Kenya Gold
  { name: 'E', value: 5, color: '#64748b' },
];

const performanceTrend = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 70 },
  { month: 'May', score: 75 },
  { month: 'Jun', score: 78 },
];

export const Dashboard = ({ role }: { role: string }) => {
  if (role === 'student') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="My Average" 
            value="78.5%" 
            icon={TrendingUp} 
            trend="up" 
            trendValue="+2.1%" 
            color="bg-kenya-green" 
          />
          <StatCard 
            title="Class Rank" 
            value="5/42" 
            icon={Award} 
            color="bg-kenya-red" 
          />
          <StatCard 
            title="Subjects" 
            value="8" 
            icon={BookOpen} 
            color="bg-kenya-black" 
          />
          <StatCard 
            title="Attendance" 
            value="98%" 
            icon={Calendar} 
            color="bg-kenya-gold" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-8">My Performance Trend</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend} margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="score" stroke="#006600" strokeWidth={3} dot={{ r: 4, fill: '#006600', strokeWidth: 2, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-8">Subject Breakdown</h2>
            <div className="space-y-6">
              {subjectData.map((sub, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{sub.name}</span>
                    <span className="text-kenya-green">{sub.avg}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-kenya-green rounded-full transition-all duration-1000" 
                      style={{ width: `${sub.avg}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'teacher') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="My Students" 
            value="124" 
            icon={GraduationCap} 
            color="bg-kenya-green" 
          />
          <StatCard 
            title="My Classes" 
            value="4" 
            icon={Users} 
            color="bg-kenya-red" 
          />
          <StatCard 
            title="Class Average" 
            value="72.4%" 
            icon={TrendingUp} 
            trend="up" 
            trendValue="+3.2%" 
            color="bg-kenya-black" 
          />
          <StatCard 
            title="Pending Marks" 
            value="12" 
            icon={Calendar} 
            color="bg-kenya-gold" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-8">Class Performance Comparison</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Form 4 Red', avg: 75, target: 80 },
                  { name: 'Form 4 Blue', avg: 72, target: 80 },
                  { name: 'Form 3 Green', avg: 68, target: 75 },
                  { name: 'Form 2 Blue', avg: 70, target: 75 },
                ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="avg" fill="#006600" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="target" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-8">My Top Students</h2>
            <div className="space-y-6">
              {[
                { name: 'Sarah Johnson', class: 'Form 4 Red', score: 96.4, avatar: 'SJ' },
                { name: 'Amara Okafor', class: 'Form 3 Green', score: 93.6, avatar: 'AO' },
                { name: 'David Smith', class: 'Form 4 Red', score: 92.4, avatar: 'DS' },
              ].map((student, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      {student.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-kenya-green">{student.score}%</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              View All Students
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="1,248" 
          icon={GraduationCap} 
          trend="up" 
          trendValue="+12%" 
          color="bg-kenya-green" 
        />
        <StatCard 
          title="Total Teachers" 
          value="42" 
          icon={Users} 
          trend="up" 
          trendValue="+2" 
          color="bg-kenya-red" 
        />
        <StatCard 
          title="Avg. Performance" 
          value="68.4%" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="+4.2%" 
          color="bg-kenya-black" 
        />
        <StatCard 
          title="Active Exams" 
          value="3" 
          icon={Calendar} 
          color="bg-kenya-gold" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subject Performance */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Subject Performance</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-kenya-green" />
                <span className="text-xs text-slate-500 font-medium">Average</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-xs text-slate-500 font-medium">Target</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="avg" fill="#006600" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="target" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-8">Grade Distribution</h2>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="block text-2xl font-bold text-slate-900">100%</span>
              <span className="text-xs text-slate-500 font-medium">Total</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {gradeDistribution.map((grade) => (
              <div key={grade.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.color }} />
                  <span className="text-sm font-medium text-slate-600">Grade {grade.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{grade.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Students */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Top Performers</h2>
            <button className="text-sm font-bold text-kenya-green hover:text-kenya-green/80">View All</button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Sarah Johnson', class: 'Form 4 Red', score: 482, total: 500, avatar: 'SJ' },
              { name: 'Michael Chen', class: 'Form 4 Blue', score: 475, total: 500, avatar: 'MC' },
              { name: 'Amara Okafor', class: 'Form 3 Green', score: 468, total: 500, avatar: 'AO' },
              { name: 'David Smith', class: 'Form 4 Red', score: 462, total: 500, avatar: 'DS' },
            ].map((student, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-kenya-green/10 group-hover:text-kenya-green transition-colors">
                    {student.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{student.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">{student.score}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Marks</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trend */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">School Performance Trend</h2>
            <div className="p-2 bg-kenya-green/10 rounded-lg">
              <TrendingUp size={20} className="text-kenya-green" />
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrend} margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#006600" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#006600', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-kenya-green/5 rounded-xl flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Award className="text-kenya-green" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-kenya-green">Highest Performance Ever!</p>
              <p className="text-xs text-kenya-green/70 font-medium">The school average has increased by 15% since last year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

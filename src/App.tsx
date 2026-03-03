import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Exams } from './pages/Exams';
import { MissingMarks } from './pages/MissingMarks';
import { MarksEntry } from './pages/MarksEntry';
import { Reports } from './pages/Reports';
import { Resources } from './pages/Resources';
import { Teachers } from './pages/Teachers';
import { Students } from './pages/Students';
import { Subjects } from './pages/Subjects';
import { Settings } from './pages/Settings';
import { Schools } from './pages/Schools';
import { Classes } from './pages/Classes';
import { Login } from './pages/Login';
import { Setup } from './pages/Setup';
import { Analysis } from './pages/Analysis';
import { supabase } from './lib/supabase';

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) setUserRole(data.role);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) setUserRole(data.role);
          });
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserRole(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-kenya-green/30 border-t-kenya-green rounded-full animate-spin" />
      </div>
    );
  }

  if (!userRole) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <DashboardLayout role={userRole} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard role={userRole} />} />
          <Route path="/exams" element={<Exams role={userRole} />} />
          <Route path="/exams/missing" element={<MissingMarks />} />
          <Route path="/marks" element={<MarksEntry />} />
          <Route path="/reports" element={<Reports role={userRole} />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/resources" element={<Resources role={userRole} />} />
          <Route path="/teachers" element={<Teachers role={userRole} />} />
          <Route path="/students" element={<Students role={userRole} />} />
          <Route path="/subjects" element={<Subjects role={userRole} />} />
          <Route path="/classes" element={<Classes role={userRole} />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/settings" element={<Settings role={userRole} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

import React, { useState } from 'react';
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
import { Analysis } from './pages/Analysis';

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
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

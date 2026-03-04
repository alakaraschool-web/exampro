import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Login = ({ onLogin }: { onLogin: (role: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        // Fetch user role from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          // Fallback for demo if profile doesn't exist yet
          let role = 'viewer';
          if (email.includes('admin')) role = 'admin';
          else if (email.includes('teacher')) role = 'teacher';
          onLogin(role);
        } else {
          onLogin(profile.role);
        }
        
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      
      // Fallback for prototype mode if Supabase is not configured
      if (!(import.meta as any).env.VITE_SUPABASE_URL) {
        let role = 'viewer';
        if (email.includes('admin')) role = 'admin';
        else if (email.includes('teacher')) role = 'teacher';
        onLogin(role);
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-kenya-green rounded-2xl text-white shadow-xl shadow-kenya-green/20 mb-6">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Alakara School</h1>
          <p className="text-sm text-kenya-red font-bold tracking-widest uppercase mt-2">Exam Analytics System</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-kenya-green focus:ring-kenya-green" />
                <span className="text-sm font-medium text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm font-bold text-kenya-green hover:text-kenya-green/80">Forgot password?</button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-kenya-green hover:bg-kenya-green/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-kenya-green/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
            <div className="bg-kenya-green/5 p-4 rounded-2xl flex gap-3">
              <AlertCircle className="text-kenya-green shrink-0" size={20} />
              <div className="text-xs text-kenya-green font-medium leading-relaxed">
                <span className="font-bold">Demo Access:</span> Use <span className="font-bold">admin@school.com</span>, <span className="font-bold">principal@school.com</span>, <span className="font-bold">teacher@school.com</span> or <span className="font-bold">student@school.com</span> with any password.
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={() => navigate('/setup')}
                className="text-xs font-bold text-slate-400 hover:text-kenya-green transition-colors uppercase tracking-widest"
              >
                System Initialization (Setup Admin)
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          &copy; 2024 Alakara School Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, ArrowRight, AlertCircle, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          }
        }
      });

      if (authError) throw authError;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              role: role,
              email: email
            }
          ]);

        if (profileError) {
          console.error('Error creating profile:', profileError);
          // We don't throw here because the user is already created in auth
        }
        
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      
      // Fallback for prototype mode
      if (!(import.meta as any).env.VITE_SUPABASE_URL) {
        setSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-kenya-green rounded-2xl text-white shadow-xl shadow-kenya-green/20 mb-6">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Account Created!</h2>
            <p className="text-slate-600 mb-8">
              Your account has been successfully created. You can now sign in to access the system.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-kenya-green hover:bg-kenya-green/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-kenya-green/20 transition-all active:scale-[0.98]"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-kenya-green rounded-2xl text-white shadow-xl shadow-kenya-green/20 mb-6">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-sm text-kenya-red font-bold tracking-widest uppercase mt-2">Join Alakara School Systems</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-green/20 focus:border-kenya-green transition-all font-medium"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'student', label: 'Student' },
                  { id: 'teacher', label: 'Teacher' },
                  { id: 'principal', label: 'Principal' },
                  { id: 'super_admin', label: 'Super Admin' }
                ].map((r) => (
                  <label 
                    key={r.id}
                    className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      role === r.id 
                        ? 'border-kenya-green bg-kenya-green/5 text-kenya-green' 
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="role" 
                      value={r.id} 
                      checked={role === r.id}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold">{r.label}</span>
                  </label>
                ))}
              </div>
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
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-kenya-green hover:text-kenya-green/80">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          &copy; 2024 Alakara School Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
};

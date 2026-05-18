import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        // Find if it's admin or partner
        const role = localStorage.getItem('al_muntaha_role');
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/portal');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02130e] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0l3 10 10 3-10 3-3 10-3-10-10-3 10-3 3-10z\" fill=\"%23d4af37\"/%3E%3C/svg%3E')" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-gold-premium rotate-45 flex items-center justify-center mx-auto mb-6">
            <span className="-rotate-45 text-gold-premium font-urdu font-bold text-3xl">م</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2 uppercase tracking-widest">Admin Control</h1>
          <p className="text-white/40 text-sm">Secure access for AL MUNTAHA TRAVELS SOLUTIONS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Username / Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                required
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin or agent_username"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:border-gold-premium outline-none transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:border-gold-premium outline-none transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs font-bold text-center italic"
            >
              {error}
            </motion.p>
          )}

          <button
            disabled={loading}
            className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                Sign In to Dashboard
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
          Restricted Access Area • Unauthorized access monitored
        </p>
      </motion.div>
    </div>
  );
}

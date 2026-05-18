import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, User, Shield, ShieldOff, Key, X, Check, Users } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { AgentUser } from '../../types';

export default function UserManagement() {
  const { agents, addAgent, deleteAgent, updateAgentStatus } = useSystem();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    agencyName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.name) return;
    addAgent(formData);
    setFormData({ username: '', password: '', name: '', agencyName: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">TRAVEL AGENTS</h2>
          <p className="text-white/40">Manage sub-agents and partner portal access</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-3 px-8 py-4 bg-gold-premium text-black font-bold rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
        >
          <Plus size={20} />
          Register New Agent
        </button>
      </div>

      {/* Agents List */}
      <div className="glass-dark rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Agent / Agency</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Username</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Password</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/40 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {agents.map((agent) => (
                <tr key={agent.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-premium/10 flex items-center justify-center text-gold-premium">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{agent.name}</div>
                        <div className="text-white/40 text-xs">{agent.agencyName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-white/60 font-mono text-sm">{agent.username}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                      <Key size={14} />
                      <span className="font-mono text-sm">{agent.password}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      agent.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => updateAgentStatus(agent.id, agent.status === 'active' ? 'suspended' : 'active')}
                        className={`p-2 rounded-xl transition-colors ${
                          agent.status === 'active' ? 'text-white/40 hover:text-red-500 hover:bg-red-500/10' : 'text-white/40 hover:text-green-500 hover:bg-green-500/10'
                        }`}
                        title={agent.status === 'active' ? 'Suspend Agent' : 'Activate Agent'}
                      >
                        {agent.status === 'active' ? <ShieldOff size={18} /> : <Shield size={18} />}
                      </button>
                      <button 
                        onClick={() => deleteAgent(agent.id)}
                        className="p-2 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-white/20">
                    <Users size={48} className="mx-auto mb-4 opacity-10" />
                    <p>No agents registered yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Agent Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-[#02130e] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 relative z-10 my-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Register Agent</h2>
              <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Full Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" 
                    placeholder="e.g., Ahmed Ali" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Agency Name</label>
                  <input 
                    value={formData.agencyName}
                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" 
                    placeholder="e.g., Al-Falah Travels" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Username</label>
                    <input 
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" 
                      placeholder="Login ID" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Password</label>
                    <input 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-premium/30" 
                      placeholder="Passcode" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full py-5 bg-gold-premium text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                  <Check size={20} />
                  Authorize Agent Account
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

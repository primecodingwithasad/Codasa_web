import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles } from 'lucide-react';
import { User } from '../../types';

interface AuthModalProps {
  allUsers: User[];
  onClose: () => void;
  onSelectUser: (userId: string) => void;
  onCreateAccount: (userData: { displayName: string; email: string; username: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  allUsers,
  onClose,
  onSelectUser,
  onCreateAccount
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      // Find matching user or fallback to demo
      const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      onSelectUser(found ? found.id : allUsers[0].id);
      onClose();
    } else {
      if (!displayName.trim() || !email.trim()) return;
      onCreateAccount({
        displayName: displayName.trim(),
        email: email.trim(),
        username: (username.trim() || displayName.trim()).toLowerCase().replace(/\s+/g, '_')
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm bg-slate-950 ring-1 ring-blue-500/30 flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/Glossy_Neon_C_Tech_Emblem_eab82a8b.png"
                alt="Codasa"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {tab === 'login' ? 'Sign in to Codasa' : 'Create an Account'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Fast Demo Switcher */}
        <div className="my-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Fast 1-Click Demo Profiles</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {allUsers.slice(0, 4).map(u => (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  onSelectUser(u.id);
                  onClose();
                }}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:ring-2 hover:ring-blue-500 text-left flex items-center gap-2 shadow-xs transition-all"
              >
                <img src={u.avatarUrl} alt={u.displayName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{u.displayName}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{u.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Elena Roche"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="elena_design"
                  className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all mt-2 active:scale-95"
          >
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
            className="text-xs text-slate-500 hover:text-blue-600 font-semibold transition-colors"
          >
            {tab === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

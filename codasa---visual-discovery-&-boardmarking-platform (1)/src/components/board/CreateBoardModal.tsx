import React, { useState } from 'react';
import { X, Lock, Bookmark, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/seedData';

interface CreateBoardModalProps {
  onClose: () => void;
  onCreateBoard: (name: string, description: string, isSecret: boolean, category: string) => void;
}

export const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ onClose, onCreateBoard }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [isSecret, setIsSecret] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a board name');
      return;
    }
    onCreateBoard(name.trim(), description.trim(), isSecret, category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Create board
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Nordic Minimal Home or Tokyo Cyberpunk"
              className="w-full h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              placeholder="What are you collecting in this board?"
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              {CATEGORIES.filter(c => c !== 'All' && c !== 'For You' && c !== 'Following').map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Secret / Private Toggle */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={isSecret}
                onChange={e => setIsSecret(e.target.checked)}
                className="mt-1 rounded text-slate-900 focus:ring-slate-900"
              />
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Keep this board secret</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  So only you and invited collaborators can view it.
                </div>
              </div>
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

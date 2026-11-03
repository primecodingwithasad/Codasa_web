import React, { useState } from 'react';
import { X, Lock, Globe, Camera } from 'lucide-react';
import { User } from '../../types';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updates: Partial<User>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [isPrivate, setIsPrivate] = useState(user.isPrivate || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      displayName: displayName.trim(),
      username: username.trim().toLowerCase().replace(/\s+/g, '_'),
      bio: bio.trim(),
      website: website.trim(),
      avatarUrl,
      isPrivate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Edit Profile &amp; Settings
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Avatar selector */}
          <div className="flex items-center gap-4">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-500/30"
            />
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
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
                className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="https://yourportfolio.com"
              className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
            />
          </div>

          {/* Privacy controls */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Privacy &amp; Security
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800 dark:text-slate-200">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={e => setIsPrivate(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500"
              />
              <span>Private Profile (Only approved followers can view your boards)</span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare } from 'lucide-react';
import { Pin, User } from '../../types';

interface ShareModalProps {
  pin: Pin;
  allUsers: User[];
  onClose: () => void;
  onSendDirectMessage: (userId: string, pin: Pin) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  pin,
  allUsers,
  onClose,
  onSendDirectMessage
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.origin + `?pin=${pin.id}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Share this Pin
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pin Preview */}
        <div className="my-4 flex items-center gap-3 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <img src={pin.imageUrl} alt={pin.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{pin.title}</div>
            <div className="text-[11px] text-slate-400 truncate">by {pin.creator.displayName}</div>
          </div>
        </div>

        {/* Send to Codasa Friends */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Send in Codasa Chat
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {allUsers.slice(0, 5).map(u => (
              <button
                key={u.id}
                onClick={() => {
                  onSendDirectMessage(u.id, pin);
                  onClose();
                }}
                className="flex flex-col items-center gap-1 group shrink-0"
              >
                <img
                  src={u.avatarUrl}
                  alt={u.displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-500 transition-all"
                />
                <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold truncate max-w-[50px]">
                  {u.displayName.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm shadow-blue-500/25 transition-all active:scale-95 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Bell, Heart, MessageSquare, Bookmark, UserPlus, CheckCheck } from 'lucide-react';
import { Notification, Pin, Board } from '../../types';

interface NotificationsDrawerProps {
  notifications: Notification[];
  allPins: Pin[];
  allBoards: Board[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onSelectPin: (pin: Pin) => void;
  onSelectBoard: (board: Board) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  allPins,
  allBoards,
  onClose,
  onMarkRead,
  onMarkAllRead,
  onSelectPin,
  onSelectBoard
}) => {
  const [filter, setFilter] = useState<'all' | 'save' | 'comment' | 'follow' | 'invite'>('all');

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />;
      case 'comment':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-500" />;
      case 'save':
        return <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-current" />;
      case 'follow':
        return <UserPlus className="w-3.5 h-3.5 text-emerald-500" />;
      case 'invite':
        return <Bookmark className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const handleClickItem = (n: Notification) => {
    onMarkRead(n.id);
    if (n.pinId) {
      const pin = allPins.find(p => p.id === n.pinId);
      if (pin) {
        onClose();
        onSelectPin(pin);
      }
    } else if (n.boardId) {
      const board = allBoards.find(b => b.id === n.boardId);
      if (board) {
        onClose();
        onSelectBoard(board);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-end animate-in fade-in">
      <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-cyan-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Notifications
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex gap-1 overflow-x-auto no-scrollbar">
          {(['all', 'save', 'comment', 'follow', 'invite'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === tab
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              No notifications to show.
            </div>
          ) : (
            filtered.map(n => (
              <div
                key={n.id}
                onClick={() => handleClickItem(n)}
                className={`p-3 rounded-2xl flex items-start gap-3 cursor-pointer transition-all ${
                  n.read
                    ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40 opacity-70'
                    : 'bg-blue-50/50 dark:bg-blue-950/25 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={n.sender.avatarUrl}
                    alt={n.sender.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow flex items-center justify-center">
                    {getIcon(n.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-xs">
                  <p className="text-slate-800 dark:text-slate-200 leading-snug">
                    <span className="font-bold">{n.sender.displayName}</span> {n.message}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {new Date(n.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {n.pinImage && (
                  <img
                    src={n.pinImage}
                    alt="attachment"
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Send, MessageCircle, Image, ArrowLeft } from 'lucide-react';
import { Message, User, Pin } from '../../types';

interface MessagesModalProps {
  messages: Message[];
  currentUser: User;
  allUsers: User[];
  allPins: Pin[];
  onClose: () => void;
  onSendMessage: (
    receiverId: string,
    text: string,
    pinAttachment?: { id: string; title: string; imageUrl: string }
  ) => void;
  onSelectPin: (pin: Pin) => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  messages,
  currentUser,
  allUsers,
  allPins,
  onClose,
  onSendMessage,
  onSelectPin
}) => {
  const otherUsers = allUsers.filter(u => u.id !== currentUser.id);
  const [selectedUser, setSelectedUser] = useState<User>(otherUsers[0] || allUsers[0]);
  const [inputText, setInputText] = useState('');
  const [attachedPin, setAttachedPin] = useState<Pin | null>(null);
  const [showPinPicker, setShowPinPicker] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  // Messages between currentUser and selectedUser
  const conversation = messages.filter(
    m =>
      (m.senderId === currentUser.id && m.receiverId === selectedUser?.id) ||
      (m.senderId === selectedUser?.id && m.receiverId === currentUser.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedPin) return;

    onSendMessage(
      selectedUser.id,
      inputText.trim(),
      attachedPin
        ? {
            id: attachedPin.id,
            title: attachedPin.title,
            imageUrl: attachedPin.imageUrl
          }
        : undefined
    );

    setInputText('');
    setAttachedPin(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="w-full max-w-4xl h-[88vh] sm:h-[82vh] md:h-[620px] max-h-[700px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
        {/* Left Side: Conversations List (hidden on mobile if viewing chat) */}
        <div
          className={`w-full md:w-80 border-r border-slate-100 dark:border-slate-800 flex-col bg-slate-50/50 dark:bg-slate-950/40 ${
            mobileView === 'chat' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Conversations
              </h3>
            </div>
            <button onClick={onClose} className="md:hidden p-1.5 rounded-full text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {otherUsers.map(user => {
              const isSelected = selectedUser?.id === user.id;
              const lastMsg = messages
                .filter(
                  m =>
                    (m.senderId === currentUser.id && m.receiverId === user.id) ||
                    (m.senderId === user.id && m.receiverId === currentUser.id)
                )
                .slice(-1)[0];

              return (
                <button
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    setMobileView('chat');
                  }}
                  className={`w-full p-2.5 rounded-2xl flex items-center gap-3 text-left transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 shadow-sm ring-1 ring-blue-500/20'
                      : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user.displayName}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {lastMsg ? lastMsg.text : `@${user.username}`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window (shown on mobile when mobileView === 'chat') */}
        <div
          className={`flex-1 flex-col justify-between bg-white dark:bg-slate-900 min-w-0 ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* Mobile Back Button to list */}
              <button
                onClick={() => setMobileView('list')}
                className="md:hidden p-1 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <img
                src={selectedUser.avatarUrl}
                alt={selectedUser.displayName}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0"
              />
              <div className="truncate">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {selectedUser.displayName}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">@{selectedUser.username}</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
            {conversation.length === 0 ? (
              <div className="text-center py-12 sm:py-16 text-slate-400 text-xs">
                No previous messages with {selectedUser.displayName}. Say hi or share an inspiring Pin!
              </div>
            ) : (
              conversation.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-2.5 sm:p-3 text-xs leading-relaxed ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-xs'
                      }`}
                    >
                      {msg.text && <p>{msg.text}</p>}

                      {/* Pin Attachment in chat */}
                      {msg.pinAttachment && (
                        <div
                          onClick={() => {
                            const found = allPins.find(p => p.id === msg.pinAttachment?.id);
                            if (found) {
                              onClose();
                              onSelectPin(found);
                            }
                          }}
                          className={`mt-2 rounded-xl overflow-hidden cursor-pointer border ${
                            isMe ? 'border-blue-400/40' : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <img
                            src={msg.pinAttachment.imageUrl}
                            alt={msg.pinAttachment.title}
                            className="w-full h-28 sm:h-32 object-cover"
                          />
                          <div className="p-1.5 sm:p-2 text-[10px] sm:text-[11px] font-bold truncate bg-black/30">
                            {msg.pinAttachment.title}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Attached Pin preview bar if selected */}
          {attachedPin && (
            <div className="px-3 sm:px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 truncate pr-2">
                <img
                  src={attachedPin.imageUrl}
                  alt={attachedPin.title}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover shrink-0"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                  Attached: {attachedPin.title}
                </span>
              </div>
              <button onClick={() => setAttachedPin(null)} className="text-slate-400 hover:text-slate-600 shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-2 sm:p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={() => setShowPinPicker(!showPinPicker)}
              title="Attach a Pin"
              className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              <Image className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Message ${selectedUser.displayName}...`}
              className="flex-1 h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />

            <button
              type="submit"
              disabled={!inputText.trim() && !attachedPin}
              className="p-2 sm:p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-all shadow-sm shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Pin Picker Drawer */}
          {showPinPicker && (
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 max-h-40 overflow-y-auto shrink-0">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Click a Pin to attach:
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {allPins.slice(0, 12).map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setAttachedPin(p);
                      setShowPinPicker(false);
                    }}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500"
                  >
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

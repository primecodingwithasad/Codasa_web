import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Share2,
  ExternalLink,
  Download,
  MoreHorizontal,
  ChevronDown,
  Check,
  Send,
  Flag,
  Trash2,
  Camera,
  ShoppingBag,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Pin, Board, User, Comment } from '../../types';
import { Store } from '../../services/store';
import { PinCard } from '../feed/PinCard';

interface PinDetailModalProps {
  pin: Pin;
  currentUser: User;
  boards: Board[];
  allPins: Pin[];
  onClose: () => void;
  onSelectPin: (pin: Pin) => void;
  onLikePin: (pinId: string) => void;
  onSavePin: (pinId: string, boardId: string) => void;
  onUnsavePin: (pinId: string) => void;
  onFollowUser: (userId: string) => void;
  onVisualSearch: (pin: Pin) => void;
  onSharePin: (pin: Pin) => void;
  onReportPin: (pin: Pin) => void;
  onDeletePin: (pinId: string) => void;
}

export const PinDetailModal: React.FC<PinDetailModalProps> = ({
  pin,
  currentUser,
  boards,
  allPins,
  onClose,
  onSelectPin,
  onLikePin,
  onSavePin,
  onUnsavePin,
  onFollowUser,
  onVisualSearch,
  onSharePin,
  onReportPin,
  onDeletePin
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string>(boards[0]?.id || 'board_1');
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  useEffect(() => {
    setComments(Store.getComments(pin.id));
  }, [pin.id]);

  const isSaved = currentUser.savedPinIds.includes(pin.id);
  const isLiked = currentUser.likedPinIds.includes(pin.id);
  const isFollowing = currentUser.followingUserIds.includes(pin.creatorId);
  const isOwnPin = currentUser.id === pin.creatorId;

  const selectedBoard = boards.find(b => b.id === selectedBoardId) || boards[0];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = Store.addComment(pin.id, commentText.trim());
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;
    Store.addComment(pin.id, replyText.trim(), parentId);
    setComments(Store.getComments(pin.id));
    setReplyText('');
    setReplyingToId(null);
  };

  const handleDeleteComment = (commentId: string) => {
    Store.deleteComment(commentId, pin.id);
    setComments(Store.getComments(pin.id));
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pin.imageUrl;
    a.download = `codasa-${pin.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    a.target = '_blank';
    a.click();
    setShowMoreMenu(false);
  };

  // Related pins for "More like this"
  const relatedPins = allPins
    .filter(
      p =>
        p.id !== pin.id &&
        (p.category === pin.category || p.tags.some(t => pin.tags.includes(t)))
    )
    .slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md">
      <div className="min-h-full w-full flex flex-col items-center p-3 sm:p-6 max-w-5xl mx-auto">
        {/* Top Floating Close Button */}
        <div className="w-full flex justify-between items-center mb-3 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 text-xs font-bold shadow-lg hover:bg-white transition-all backdrop-blur-md cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Back to Feed</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSharePin(pin)}
              className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 shadow-lg hover:bg-white transition-all cursor-pointer"
              title="Share Pin"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Split Modal Container */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row shrink-0 overflow-hidden">
          {/* Left Side: Pin Image & Visual Search Trigger */}
          <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-950 p-3 sm:p-6 flex flex-col justify-center items-center relative group min-h-[280px] sm:min-h-[440px] md:min-h-[580px]">
            <div className="relative w-full flex items-center justify-center">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('photo-1618221195710-dd6b41faaea6')) {
                    target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80';
                  }
                }}
                className="max-h-[55vh] sm:max-h-[65vh] md:max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-md"
              />

              {/* Visual Search Lens Overlay Button */}
              <button
                onClick={() => onVisualSearch(pin)}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Search inside image</span>
              </button>
            </div>
          </div>

          {/* Right Side: Creator, Metadata, Actions & Comments */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-none md:max-h-[85vh]">
          <div>
            {/* Header Action Bar (Responsive Wrap on Mobile) */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onLikePin(pin.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold transition-all ${
                    isLiked
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-cyan-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-blue-600 dark:text-cyan-400' : ''}`} />
                  <span>{pin.likesCount}</span>
                </button>

                {pin.link && (
                  <a
                    href={pin.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Visit</span>
                  </a>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {showMoreMenu && (
                    <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-in fade-in">
                      <button
                        onClick={handleDownload}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download high-res</span>
                      </button>

                      {isOwnPin && (
                        <button
                          onClick={() => {
                            setShowMoreMenu(false);
                            onDeletePin(pin.id);
                            onClose();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Pin</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setShowMoreMenu(false);
                          onReportPin(pin);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>Report Pin</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Save To Board Dropdown & Button */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <div className="relative">
                  <button
                    onClick={() => setShowBoardDropdown(!showBoardDropdown)}
                    className="h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all max-w-[110px] sm:max-w-[140px]"
                  >
                    <span className="truncate">{selectedBoard?.name || 'Save'}</span>
                    <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  </button>

                  {showBoardDropdown && (
                    <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-in fade-in max-h-56 overflow-y-auto">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                        Select Board
                      </div>
                      {boards.map(b => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setSelectedBoardId(b.id);
                            setShowBoardDropdown(false);
                            onSavePin(pin.id, b.id);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-200"
                        >
                          <span className="truncate">{b.name}</span>
                          {b.id === selectedBoardId && <Check className="w-3 h-3 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (isSaved) {
                      onUnsavePin(pin.id);
                    } else {
                      onSavePin(pin.id, selectedBoardId);
                    }
                  }}
                  className={`h-9 sm:h-10 px-4 sm:px-5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 ${
                    isSaved
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                  }`}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {/* Pin Title & Description */}
            <div className="py-5">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
                {pin.title}
              </h1>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {pin.description}
              </p>

              {/* Shoppable Product Card (if applicable) */}
              {pin.isProduct && (
                <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>${pin.price} {pin.currency || 'USD'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400">In Stock</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Offered by {pin.brand || 'Verified Merchant'}
                      </div>
                    </div>
                  </div>

                  {pin.link && (
                    <a
                      href={pin.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      Buy on Store
                    </a>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pin.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Creator Row */}
            <div className="flex items-center justify-between gap-3 py-4 border-y border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={pin.creator.avatarUrl}
                  alt={pin.creator.displayName}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-900 dark:text-white truncate flex items-center gap-1">
                    <span>{pin.creator.displayName}</span>
                    {pin.creator.isVerified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 truncate">@{pin.creator.username}</div>
                </div>
              </div>

              {!isOwnPin && (
                <button
                  onClick={() => onFollowUser(pin.creatorId)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isFollowing
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            {/* Comments Thread Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Comments ({comments.length})</span>
                </h3>
              </div>

              {/* Comments List */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <div className="text-xs text-slate-400 py-3 text-center">
                    No comments yet. Share what inspired you about this Pin!
                  </div>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="space-y-2">
                      <div className="flex items-start gap-2.5">
                        <img
                          src={c.user.avatarUrl}
                          alt={c.user.displayName}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl">
                            <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                              {c.user.displayName}
                            </span>
                            <span className="text-slate-700 dark:text-slate-300">{c.content}</span>
                          </div>

                          {/* Reply / Delete Actions */}
                          <div className="flex items-center gap-3 mt-1 px-1 text-[11px] text-slate-400">
                            <button
                              onClick={() => setReplyingToId(replyingToId === c.id ? null : c.id)}
                              className="hover:text-slate-600 font-semibold"
                            >
                              Reply
                            </button>
                            {c.user.id === currentUser.id && (
                              <button
                                onClick={() => handleDeleteComment(c.id)}
                                className="hover:text-rose-600"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          {/* Inline Reply Box */}
                          {replyingToId === c.id && (
                            <div className="mt-2 flex items-center gap-2">
                              <input
                                type="text"
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                                placeholder={`Reply to ${c.user.displayName}...`}
                                className="flex-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handleAddReply(c.id)}
                                className="p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                              >
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {/* Nested Replies */}
                          {c.replies && c.replies.length > 0 && (
                            <div className="mt-2 pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-2">
                              {c.replies.map(r => (
                                <div key={r.id} className="flex items-start gap-2">
                                  <img
                                    src={r.user.avatarUrl}
                                    alt={r.user.displayName}
                                    className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
                                  />
                                  <div className="bg-slate-100/70 dark:bg-slate-800/40 p-2 rounded-xl text-xs flex-1">
                                    <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                                      {r.user.displayName}
                                    </span>
                                    <span className="text-slate-700 dark:text-slate-300">{r.content}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Add Comment Input Bar */}
          <form onSubmit={handleAddComment} className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 mt-4">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.displayName}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add a thought or ask about this Pin..."
              className="flex-1 h-10 px-4 rounded-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-sm shadow-blue-500/25"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom "More Like This" Masonry Grid */}
      {relatedPins.length > 0 && (
        <div className="w-full max-w-5xl mt-8 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="font-display font-bold text-base sm:text-lg text-white">More like this</h2>
          </div>
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2.5 sm:gap-3 [column-fill:_balance]">
            {relatedPins.map(relPin => (
              <PinCard
                key={relPin.id}
                pin={relPin}
                currentUser={currentUser}
                boards={boards}
                onSelectPin={selected => {
                  onSelectPin(selected);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onLikePin={onLikePin}
                onSavePin={onSavePin}
                onUnsavePin={onUnsavePin}
                onVisualSearch={onVisualSearch}
                onSharePin={onSharePin}
                onReportPin={onReportPin}
              />
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

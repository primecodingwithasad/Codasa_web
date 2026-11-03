import React, { useState } from 'react';
import {
  Share2,
  Edit3,
  ExternalLink,
  Plus,
  Bookmark,
  Sparkles,
  Users,
  Grid,
  Lock,
  ArrowRight
} from 'lucide-react';
import { User, Pin, Board } from '../../types';
import { PinCard } from '../feed/PinCard';
import { BoardCard } from '../board/BoardCard';

interface ProfileViewProps {
  user: User;
  currentUser: User;
  allPins: Pin[];
  allBoards: Board[];
  allUsers: User[];
  onSelectPin: (pin: Pin) => void;
  onSelectBoard: (board: Board) => void;
  onLikePin: (pinId: string) => void;
  onSavePin: (pinId: string, boardId: string) => void;
  onUnsavePin: (pinId: string) => void;
  onFollowUser: (userId: string) => void;
  onVisualSearch: (pin: Pin) => void;
  onSharePin: (pin: Pin) => void;
  onReportPin: (pin: Pin) => void;
  onOpenCreatePin: () => void;
  onOpenCreateBoard: () => void;
  onOpenEditProfile: () => void;
  onSwitchUser: (userId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  currentUser,
  allPins,
  allBoards,
  allUsers,
  onSelectPin,
  onSelectBoard,
  onLikePin,
  onSavePin,
  onUnsavePin,
  onFollowUser,
  onVisualSearch,
  onSharePin,
  onReportPin,
  onOpenCreatePin,
  onOpenCreateBoard,
  onOpenEditProfile,
  onSwitchUser
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'created' | 'boards'>('saved');
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);

  const handleCopyProfileUrl = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedProfile(true);
    setTimeout(() => setCopiedProfile(false), 2000);
  };

  const isSelf = user.id === currentUser.id;
  const isFollowing = currentUser.followingUserIds.includes(user.id);

  // Pins created by this user
  const createdPins = allPins.filter(p => p.creatorId === user.id);

  // Pins saved by this user
  const savedPins = allPins.filter(p => user.savedPinIds.includes(p.id));

  // Boards owned by this user (or collaborated on)
  const userBoards = allBoards.filter(
    b => b.creatorId === user.id || b.collaborators.some(c => c.id === user.id)
  );

  const followersList = allUsers.filter(u => u.followingUserIds.includes(user.id));
  const followingList = allUsers.filter(u => user.followingUserIds.includes(u.id));

  return (
    <div className="max-w-[2200px] mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Switch Demo User Pill Bar */}
      <div className="mb-6 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-xl mx-auto flex items-center justify-between gap-2 text-xs">
        <span className="font-bold text-slate-500 pl-2">Switch Profile to Test:</span>
        <select
          value={user.id}
          onChange={e => onSwitchUser(e.target.value)}
          className="bg-white dark:bg-slate-700 px-3 py-1.5 rounded-xl font-semibold text-slate-800 dark:text-slate-100 shadow-xs focus:outline-none"
        >
          {allUsers.map(u => (
            <option key={u.id} value={u.id}>
              {u.displayName} (@{u.username})
            </option>
          ))}
        </select>
      </div>

      {/* Profile Header Hero */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-xl ring-4 ring-white dark:ring-slate-800"
          />
          {isSelf && (
            <button
              onClick={onOpenEditProfile}
              className="absolute inset-0 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
            >
              Change
            </button>
          )}
        </div>

        {/* Display Name & Verified */}
        <div className="mt-4 flex items-center gap-2">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {user.displayName}
          </h1>
          {user.isVerified && (
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
              ✓
            </span>
          )}
        </div>

        {/* Username */}
        <div className="text-xs text-slate-500 font-medium mt-0.5">@{user.username}</div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed px-2">
            {user.bio}
          </p>
        )}

        {/* Website Link */}
        {user.website && (
          <a
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 flex items-center gap-1 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{user.website.replace('https://', '')}</span>
          </a>
        )}

        {/* Stats Row (Followers / Following) */}
        <div className="mt-4 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setShowFollowersModal(true)}
            className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
          >
            <span className="font-extrabold text-slate-900 dark:text-white">
              {user.followersCount.toLocaleString()}
            </span>{' '}
            followers
          </button>
          <span className="text-slate-300">·</span>
          <button
            onClick={() => setShowFollowingModal(true)}
            className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
          >
            <span className="font-extrabold text-slate-900 dark:text-white">
              {user.followingCount.toLocaleString()}
            </span>{' '}
            following
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-2">
          {isSelf ? (
            <>
              <button
                onClick={onOpenEditProfile}
                className="px-4 sm:px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleCopyProfileUrl}
                className="px-4 sm:px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedProfile ? 'Copied Link!' : 'Share'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onFollowUser(user.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isFollowing
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>

              <button
                onClick={handleCopyProfileUrl}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title={copiedProfile ? 'Copied!' : 'Share Profile'}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'saved'
              ? 'text-slate-900 dark:text-white'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <span>Saved Pins ({savedPins.length})</span>
          {activeTab === 'saved' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 dark:bg-white rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('boards')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'boards'
              ? 'text-slate-900 dark:text-white'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <span>Boards ({userBoards.length})</span>
          {activeTab === 'boards' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 dark:bg-white rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('created')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'created'
              ? 'text-slate-900 dark:text-white'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <span>Created ({createdPins.length})</span>
          {activeTab === 'created' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 dark:bg-white rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mt-8">
        {activeTab === 'saved' && (
          <div>
            {savedPins.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No saved ideas yet.</p>
                {isSelf && (
                  <p className="text-xs text-slate-400 mt-1">
                    Explore the feed and click Save on ideas you love!
                  </p>
                )}
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2.5 sm:gap-4 [column-fill:_balance]">
                {savedPins.map(pin => (
                  <PinCard
                    key={pin.id}
                    pin={pin}
                    currentUser={currentUser}
                    boards={allBoards}
                    onSelectPin={onSelectPin}
                    onLikePin={onLikePin}
                    onSavePin={onSavePin}
                    onUnsavePin={onUnsavePin}
                    onVisualSearch={onVisualSearch}
                    onSharePin={onSharePin}
                    onReportPin={onReportPin}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'boards' && (
          <div>
            <div className="flex justify-end mb-4">
              {isSelf && (
                <button
                  onClick={onOpenCreateBoard}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Board</span>
                </button>
              )}
            </div>

            {userBoards.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Grid className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No boards created yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {userBoards.map(board => (
                  <BoardCard
                    key={board.id}
                    board={board}
                    allPins={allPins}
                    onClick={() => onSelectBoard(board)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'created' && (
          <div>
            <div className="flex justify-end mb-4">
              {isSelf && (
                <button
                  onClick={onOpenCreatePin}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Pin</span>
                </button>
              )}
            </div>

            {createdPins.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Sparkles className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Nothing created yet.</p>
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2.5 sm:gap-4 [column-fill:_balance]">
                {createdPins.map(pin => (
                  <PinCard
                    key={pin.id}
                    pin={pin}
                    currentUser={currentUser}
                    boards={allBoards}
                    onSelectPin={onSelectPin}
                    onLikePin={onLikePin}
                    onSavePin={onSavePin}
                    onUnsavePin={onUnsavePin}
                    onVisualSearch={onVisualSearch}
                    onSharePin={onSharePin}
                    onReportPin={onReportPin}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Followers Modal */}
      {showFollowersModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              Followers ({followersList.length})
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {followersList.map(f => (
                <div key={f.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={f.avatarUrl} alt={f.displayName} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{f.displayName}</div>
                      <div className="text-[11px] text-slate-400">@{f.username}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowFollowersModal(false)}
              className="mt-4 w-full py-2 rounded-full bg-slate-100 text-xs font-bold text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              Following ({followingList.length})
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {followingList.map(f => (
                <div key={f.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={f.avatarUrl} alt={f.displayName} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{f.displayName}</div>
                      <div className="text-[11px] text-slate-400">@{f.username}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowFollowingModal(false)}
              className="mt-4 w-full py-2 rounded-full bg-slate-100 text-xs font-bold text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  ArrowLeft,
  Lock,
  Users,
  Plus,
  Share2,
  MoreHorizontal,
  Edit2,
  Trash2,
  FolderPlus,
  Check,
  X
} from 'lucide-react';
import { Board, Pin, User } from '../../types';
import { PinCard } from '../feed/PinCard';

interface BoardDetailProps {
  board: Board;
  allPins: Pin[];
  allUsers: User[];
  currentUser: User;
  allBoards: Board[];
  onBack: () => void;
  onSelectPin: (pin: Pin) => void;
  onLikePin: (pinId: string) => void;
  onSavePin: (pinId: string, boardId: string) => void;
  onUnsavePin: (pinId: string) => void;
  onVisualSearch: (pin: Pin) => void;
  onSharePin: (pin: Pin) => void;
  onReportPin: (pin: Pin) => void;
  onAddSection: (boardId: string, sectionName: string) => void;
  onAddCollaborator: (boardId: string, userId: string, role: 'editor' | 'viewer') => void;
  onDeleteBoard: (boardId: string) => void;
  onUpdateBoard: (boardId: string, updates: Partial<Board>) => void;
}

export const BoardDetail: React.FC<BoardDetailProps> = ({
  board,
  allPins,
  allUsers,
  currentUser,
  allBoards,
  onBack,
  onSelectPin,
  onLikePin,
  onSavePin,
  onUnsavePin,
  onVisualSearch,
  onSharePin,
  onReportPin,
  onAddSection,
  onAddCollaborator,
  onDeleteBoard,
  onUpdateBoard
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('all');
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedUserToInvite, setSelectedUserToInvite] = useState(allUsers[0]?.id || '');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(board.name);
  const [editDesc, setEditDesc] = useState(board.description);
  const [editSecret, setEditSecret] = useState(board.isSecret);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isOwner = board.creatorId === currentUser.id;

  // Filter pins belonging to this board
  const boardPins = allPins.filter(p => board.pinIds.includes(p.id));

  // If viewing a specific section
  const currentSection = board.sections.find(s => s.id === activeSectionId);
  const displayedPins =
    activeSectionId === 'all'
      ? boardPins
      : boardPins.filter(p => currentSection?.pinIds.includes(p.id));

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionName.trim()) return;
    onAddSection(board.id, newSectionName.trim());
    setNewSectionName('');
    setShowAddSectionModal(false);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserToInvite) return;
    onAddCollaborator(board.id, selectedUserToInvite, inviteRole);
    setShowInviteModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    onUpdateBoard(board.id, {
      name: editName.trim(),
      description: editDesc.trim(),
      isSecret: editSecret
    });
    setShowEditModal(false);
  };

  return (
    <div className="max-w-[2200px] mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {isOwner && (
            <>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
              >
                <Users className="w-4 h-4 text-blue-500" />
                <span>Invite Collaborators</span>
              </button>

              <button
                onClick={() => setShowEditModal(true)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title="Edit Board"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Board Header Hero */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          {board.isSecret && (
            <span className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Lock className="w-4 h-4" />
            </span>
          )}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            {board.name}
          </h1>
        </div>

        {board.description && (
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed mt-2">
            {board.description}
          </p>
        )}

        {/* Creator & Collaborators Avatars */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex items-center -space-x-2">
            <img
              src={board.creator.avatarUrl}
              alt={board.creator.displayName}
              title={`Creator: ${board.creator.displayName}`}
              className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
            />
            {board.collaborators.map(c => (
              <img
                key={c.id}
                src={c.avatarUrl}
                alt={c.displayName}
                title={`Collaborator (${c.role}): ${c.displayName}`}
                className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
              />
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500 ml-2">
            {boardPins.length} Pins · Created by {board.creator.displayName}
          </span>
        </div>

        {/* Section Tabs & Add Section Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveSectionId('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeSectionId === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            All Pins ({boardPins.length})
          </button>

          {board.sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionId(sec.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeSectionId === sec.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {sec.name} ({sec.pinIds.length})
            </button>
          ))}

          {isOwner && (
            <button
              onClick={() => setShowAddSectionModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-500 text-slate-600 dark:text-slate-400 text-xs font-semibold transition-colors"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Add section</span>
            </button>
          )}
        </div>
      </div>

      {/* Pins Masonry Grid */}
      {displayedPins.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-sm">No Pins saved in this section yet.</p>
          <p className="text-xs text-slate-400 mt-1">
            Browse the feed to save inspiring ideas into {board.name}!
          </p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2.5 sm:gap-4 [column-fill:_balance]">
          {displayedPins.map(pin => (
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

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              Add a board section
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Sections help organize ideas inside a board (e.g. &ldquo;Living Room&rdquo;, &ldquo;Lighting&rdquo;).
            </p>
            <form onSubmit={handleCreateSection} className="space-y-4">
              <input
                type="text"
                value={newSectionName}
                onChange={e => setNewSectionName(e.target.value)}
                placeholder="Section name"
                className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSectionModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Collaborator Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              Invite collaborators to {board.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Collaborators can save pins, create sections, and curate alongside you.
            </p>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select User
                </label>
                <select
                  value={selectedUserToInvite}
                  onChange={e => setSelectedUserToInvite(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
                >
                  {allUsers
                    .filter(u => u.id !== currentUser.id && !board.collaborators.some(c => c.id === u.id))
                    .map(u => (
                      <option key={u.id} value={u.id}>
                        {u.displayName} (@{u.username})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Permissions
                </label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
                >
                  <option value="editor">Editor (Can add &amp; organize Pins)</option>
                  <option value="viewer">Viewer (Can view private board)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Board Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
              Edit Board
            </h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editSecret}
                  onChange={e => setEditSecret(e.target.checked)}
                />
                <span className="text-xs font-semibold">Keep board secret</span>
              </label>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                {confirmDelete ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteBoard(board.id);
                        onBack();
                      }}
                      className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors"
                    >
                      Confirm Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-700"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Board</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setConfirmDelete(false);
                    }}
                    className="px-3 py-1.5 text-xs text-slate-500 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

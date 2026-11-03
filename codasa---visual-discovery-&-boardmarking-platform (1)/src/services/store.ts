import {
  User,
  Pin,
  Board,
  Comment,
  Notification,
  Message,
  Report,
  AnalyticsData
} from '../types';
import {
  SEED_USERS,
  SEED_PINS,
  SEED_BOARDS,
  SEED_COMMENTS,
  SEED_NOTIFICATIONS,
  SEED_MESSAGES,
  SEED_REPORTS,
  SEED_ANALYTICS
} from '../data/seedData';

const STORAGE_KEY_PREFIX = 'codasa_v1_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to parse ${key} from localStorage`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage`, e);
  }
}

type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
  listeners.forEach(fn => fn());
}

export const Store = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // State
  getUsers(): User[] {
    return loadFromStorage('users', SEED_USERS);
  },

  getCurrentUser(): User {
    const users = this.getUsers();
    const currentId = loadFromStorage('current_user_id', 'user_demo');
    const user = users.find(u => u.id === currentId);
    return user || users[0] || SEED_USERS[0];
  },

  setCurrentUser(userId: string) {
    saveToStorage('current_user_id', userId);
    emitChange();
  },

  updateCurrentUser(updates: Partial<User>) {
    const users = this.getUsers();
    const current = this.getCurrentUser();
    const updatedUsers = users.map(u => (u.id === current.id ? { ...u, ...updates } : u));
    saveToStorage('users', updatedUsers);
    emitChange();
  },

  getPins(): Pin[] {
    return loadFromStorage('pins', SEED_PINS);
  },

  getPinById(id: string): Pin | undefined {
    return this.getPins().find(p => p.id === id);
  },

  createPin(pinData: Omit<Pin, 'id' | 'likesCount' | 'savesCount' | 'commentsCount' | 'createdAt'>): Pin {
    const pins = this.getPins();
    const newPin: Pin = {
      ...pinData,
      id: 'pin_' + Date.now(),
      likesCount: 0,
      savesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };
    const updatedPins = [newPin, ...pins];
    saveToStorage('pins', updatedPins);

    // If a board was selected, also add it to that board
    if (newPin.boardId) {
      this.savePinToBoard(newPin.id, newPin.boardId, false);
    }

    emitChange();
    return newPin;
  },

  deletePin(pinId: string) {
    const pins = this.getPins().filter(p => p.id !== pinId);
    saveToStorage('pins', pins);

    // Remove from boards
    const boards = this.getBoards().map(b => ({
      ...b,
      pinIds: b.pinIds.filter(id => id !== pinId),
      sections: b.sections.map(s => ({
        ...s,
        pinIds: s.pinIds.filter(id => id !== pinId)
      }))
    }));
    saveToStorage('boards', boards);

    emitChange();
  },

  toggleLikePin(pinId: string) {
    const currentUser = this.getCurrentUser();
    const isLiked = currentUser.likedPinIds.includes(pinId);
    const updatedLikedPinIds = isLiked
      ? currentUser.likedPinIds.filter(id => id !== pinId)
      : [...currentUser.likedPinIds, pinId];

    this.updateCurrentUser({ likedPinIds: updatedLikedPinIds });

    const pins = this.getPins().map(p => {
      if (p.id === pinId) {
        return {
          ...p,
          likesCount: Math.max(0, p.likesCount + (isLiked ? -1 : 1))
        };
      }
      return p;
    });
    saveToStorage('pins', pins);

    // If newly liked, add notification to pin creator
    if (!isLiked) {
      const pin = this.getPinById(pinId);
      if (pin && pin.creatorId !== currentUser.id) {
        this.addNotification({
          type: 'like',
          sender: {
            id: currentUser.id,
            username: currentUser.username,
            displayName: currentUser.displayName,
            avatarUrl: currentUser.avatarUrl
          },
          pinId: pin.id,
          pinImage: pin.imageUrl,
          message: `liked your Pin "${pin.title}"`
        });
      }
    }

    emitChange();
  },

  savePinToBoard(pinId: string, boardId: string, notify = true) {
    const currentUser = this.getCurrentUser();
    const boards = this.getBoards();
    const targetBoard = boards.find(b => b.id === boardId);

    if (targetBoard && !targetBoard.pinIds.includes(pinId)) {
      targetBoard.pinIds.unshift(pinId);
      saveToStorage('boards', boards);
    }

    if (!currentUser.savedPinIds.includes(pinId)) {
      this.updateCurrentUser({
        savedPinIds: [pinId, ...currentUser.savedPinIds]
      });
    }

    const pins = this.getPins().map(p => {
      if (p.id === pinId) {
        return { ...p, savesCount: p.savesCount + 1 };
      }
      return p;
    });
    saveToStorage('pins', pins);

    if (notify) {
      const pin = this.getPinById(pinId);
      if (pin && pin.creatorId !== currentUser.id) {
        this.addNotification({
          type: 'save',
          sender: {
            id: currentUser.id,
            username: currentUser.username,
            displayName: currentUser.displayName,
            avatarUrl: currentUser.avatarUrl
          },
          pinId: pin.id,
          pinImage: pin.imageUrl,
          boardId: targetBoard?.id,
          boardName: targetBoard?.name,
          message: `saved your Pin "${pin.title}" to ${targetBoard?.name || 'a board'}`
        });
      }
    }

    emitChange();
  },

  unsavePin(pinId: string, boardId?: string) {
    const currentUser = this.getCurrentUser();
    this.updateCurrentUser({
      savedPinIds: currentUser.savedPinIds.filter(id => id !== pinId)
    });

    if (boardId) {
      const boards = this.getBoards().map(b => {
        if (b.id === boardId) {
          return {
            ...b,
            pinIds: b.pinIds.filter(id => id !== pinId),
            sections: b.sections.map(s => ({
              ...s,
              pinIds: s.pinIds.filter(id => id !== pinId)
            }))
          };
        }
        return b;
      });
      saveToStorage('boards', boards);
    }

    const pins = this.getPins().map(p => {
      if (p.id === pinId) {
        return { ...p, savesCount: Math.max(0, p.savesCount - 1) };
      }
      return p;
    });
    saveToStorage('pins', pins);

    emitChange();
  },

  getBoards(): Board[] {
    return loadFromStorage('boards', SEED_BOARDS);
  },

  getBoardById(id: string): Board | undefined {
    return this.getBoards().find(b => b.id === id);
  },

  createBoard(name: string, description = '', isSecret = false, category = 'General', coverImage = ''): Board {
    const currentUser = this.getCurrentUser();
    const boards = this.getBoards();
    const newBoard: Board = {
      id: 'board_' + Date.now(),
      name,
      description,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      isSecret,
      creatorId: currentUser.id,
      creator: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl
      },
      pinIds: [],
      sections: [],
      collaborators: [],
      category,
      createdAt: new Date().toISOString()
    };
    const updated = [newBoard, ...boards];
    saveToStorage('boards', updated);
    emitChange();
    return newBoard;
  },

  updateBoard(boardId: string, updates: Partial<Board>) {
    const boards = this.getBoards().map(b => (b.id === boardId ? { ...b, ...updates } : b));
    saveToStorage('boards', boards);
    emitChange();
  },

  deleteBoard(boardId: string) {
    const boards = this.getBoards().filter(b => b.id !== boardId);
    saveToStorage('boards', boards);
    emitChange();
  },

  addSectionToBoard(boardId: string, sectionName: string) {
    const boards = this.getBoards().map(b => {
      if (b.id === boardId) {
        return {
          ...b,
          sections: [
            ...b.sections,
            { id: 'sec_' + Date.now(), name: sectionName, pinIds: [] }
          ]
        };
      }
      return b;
    });
    saveToStorage('boards', boards);
    emitChange();
  },

  movePinToSection(boardId: string, sectionId: string, pinId: string) {
    const boards = this.getBoards().map(b => {
      if (b.id === boardId) {
        return {
          ...b,
          sections: b.sections.map(s => {
            if (s.id === sectionId && !s.pinIds.includes(pinId)) {
              return { ...s, pinIds: [...s.pinIds, pinId] };
            }
            return { ...s, pinIds: s.pinIds.filter(id => id !== pinId) };
          })
        };
      }
      return b;
    });
    saveToStorage('boards', boards);
    emitChange();
  },

  addCollaborator(boardId: string, userId: string, role: 'editor' | 'viewer') {
    const user = this.getUsers().find(u => u.id === userId);
    if (!user) return;
    const boards = this.getBoards().map(b => {
      if (b.id === boardId) {
        const existing = b.collaborators.filter(c => c.id !== userId);
        return {
          ...b,
          collaborators: [
            ...existing,
            {
              id: user.id,
              username: user.username,
              displayName: user.displayName,
              avatarUrl: user.avatarUrl,
              role
            }
          ]
        };
      }
      return b;
    });
    saveToStorage('boards', boards);

    this.addNotification({
      type: 'invite',
      sender: {
        id: this.getCurrentUser().id,
        username: this.getCurrentUser().username,
        displayName: this.getCurrentUser().displayName,
        avatarUrl: this.getCurrentUser().avatarUrl
      },
      boardId,
      boardName: this.getBoardById(boardId)?.name,
      message: `invited you to collaborate on board "${this.getBoardById(boardId)?.name}"`
    });

    emitChange();
  },

  getComments(pinId: string): Comment[] {
    const comments = loadFromStorage('comments', SEED_COMMENTS);
    return comments.filter(c => c.pinId === pinId);
  },

  addComment(pinId: string, content: string, parentId?: string): Comment {
    const currentUser = this.getCurrentUser();
    const allComments = loadFromStorage('comments', SEED_COMMENTS);
    const newComment: Comment = {
      id: 'comm_' + Date.now(),
      pinId,
      user: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl
      },
      content,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      parentId
    };

    let updatedComments: Comment[];
    if (parentId) {
      updatedComments = allComments.map(c => {
        if (c.id === parentId) {
          const replies = c.replies || [];
          return { ...c, replies: [...replies, newComment] };
        }
        return c;
      });
    } else {
      updatedComments = [newComment, ...allComments];
    }

    saveToStorage('comments', updatedComments);

    // Increment pin commentsCount
    const pins = this.getPins().map(p => {
      if (p.id === pinId) {
        return { ...p, commentsCount: p.commentsCount + 1 };
      }
      return p;
    });
    saveToStorage('pins', pins);

    // Notify creator
    const pin = this.getPinById(pinId);
    if (pin && pin.creatorId !== currentUser.id) {
      this.addNotification({
        type: 'comment',
        sender: {
          id: currentUser.id,
          username: currentUser.username,
          displayName: currentUser.displayName,
          avatarUrl: currentUser.avatarUrl
        },
        pinId: pin.id,
        pinImage: pin.imageUrl,
        message: `commented: "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}"`
      });
    }

    emitChange();
    return newComment;
  },

  deleteComment(commentId: string, pinId: string) {
    const allComments = loadFromStorage('comments', SEED_COMMENTS);
    const updated = allComments
      .filter(c => c.id !== commentId)
      .map(c => {
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.filter(r => r.id !== commentId)
          };
        }
        return c;
      });
    saveToStorage('comments', updated);

    const pins = this.getPins().map(p => {
      if (p.id === pinId) {
        return { ...p, commentsCount: Math.max(0, p.commentsCount - 1) };
      }
      return p;
    });
    saveToStorage('pins', pins);

    emitChange();
  },

  toggleFollowUser(targetUserId: string) {
    const currentUser = this.getCurrentUser();
    const isFollowing = currentUser.followingUserIds.includes(targetUserId);

    const updatedFollowing = isFollowing
      ? currentUser.followingUserIds.filter(id => id !== targetUserId)
      : [...currentUser.followingUserIds, targetUserId];

    this.updateCurrentUser({ followingUserIds: updatedFollowing });

    // Update target user followersCount
    const users = this.getUsers().map(u => {
      if (u.id === targetUserId) {
        return {
          ...u,
          followersCount: Math.max(0, u.followersCount + (isFollowing ? -1 : 1))
        };
      }
      return u;
    });
    saveToStorage('users', users);

    if (!isFollowing) {
      this.addNotification({
        type: 'follow',
        sender: {
          id: currentUser.id,
          username: currentUser.username,
          displayName: currentUser.displayName,
          avatarUrl: currentUser.avatarUrl
        },
        message: 'started following you'
      });
    }

    emitChange();
  },

  getNotifications(): Notification[] {
    return loadFromStorage('notifications', SEED_NOTIFICATIONS);
  },

  addNotification(notifData: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
    const notifs = this.getNotifications();
    const newNotif: Notification = {
      ...notifData,
      id: 'notif_' + Date.now(),
      createdAt: new Date().toISOString(),
      read: false
    };
    saveToStorage('notifications', [newNotif, ...notifs]);
    emitChange();
  },

  markNotificationAsRead(id: string) {
    const notifs = this.getNotifications().map(n => (n.id === id ? { ...n, read: true } : n));
    saveToStorage('notifications', notifs);
    emitChange();
  },

  markAllNotificationsAsRead() {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    saveToStorage('notifications', notifs);
    emitChange();
  },

  getMessages(): Message[] {
    return loadFromStorage('messages', SEED_MESSAGES);
  },

  sendMessage(receiverId: string, text: string, pinAttachment?: { id: string; title: string; imageUrl: string }) {
    const currentUser = this.getCurrentUser();
    const messages = this.getMessages();
    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      receiverId,
      text,
      pinAttachment,
      createdAt: new Date().toISOString(),
      read: false
    };
    saveToStorage('messages', [...messages, newMsg]);
    emitChange();
    return newMsg;
  },

  getReports(): Report[] {
    return loadFromStorage('reports', SEED_REPORTS);
  },

  createReport(reportData: Omit<Report, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName'>) {
    const currentUser = this.getCurrentUser();
    const reports = this.getReports();
    const newReport: Report = {
      ...reportData,
      id: 'rep_' + Date.now(),
      reporterId: currentUser.id,
      reporterName: currentUser.displayName,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    saveToStorage('reports', [newReport, ...reports]);
    emitChange();
  },

  updateReportStatus(reportId: string, status: 'resolved' | 'dismissed') {
    const reports = this.getReports().map(r => (r.id === reportId ? { ...r, status } : r));
    saveToStorage('reports', reports);
    emitChange();
  },

  getAnalytics(): AnalyticsData {
    return SEED_ANALYTICS;
  },

  resetToDefault() {
    localStorage.clear();
    emitChange();
  }
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from './hooks/useStore';
import { Navbar } from './components/layout/Navbar';
import { CategoryBar } from './components/feed/CategoryBar';
import { MasonryFeed } from './components/feed/MasonryFeed';
import { PinDetailModal } from './components/pin/PinDetailModal';
import { CreatePinModal } from './components/pin/CreatePinModal';
import { CreateBoardModal } from './components/board/CreateBoardModal';
import { BoardDetail } from './components/board/BoardDetail';
import { ProfileView } from './components/profile/ProfileView';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { ExploreView } from './components/explore/ExploreView';
import { VisualSearchModal } from './components/search/VisualSearchModal';
import { MessagesModal } from './components/messages/MessagesModal';
import { NotificationsDrawer } from './components/notifications/NotificationsDrawer';
import { AnalyticsModal } from './components/analytics/AnalyticsModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AuthModal } from './components/auth/AuthModal';
import { ShareModal } from './components/common/ShareModal';
import { ReportModal } from './components/common/ReportModal';
import { Pin, Board, User } from './types';

export default function App() {
  const {
    currentUser,
    users,
    pins,
    boards,
    notifications,
    messages,
    reports,
    analytics,
    actions
  } = useStore();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'profile' | 'board'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [feedMode, setFeedMode] = useState<'for-you' | 'trending' | 'following'>('for-you');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Entities
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [viewingUser, setViewingUser] = useState<User>(currentUser);

  // Modals state
  const [isCreatePinOpen, setIsCreatePinOpen] = useState(false);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [visualSearchPin, setVisualSearchPin] = useState<Pin | null>(null);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [sharingPin, setSharingPin] = useState<Pin | null>(null);
  const [reportingPin, setReportingPin] = useState<Pin | null>(null);

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('codasa_dark') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('codasa_dark', String(darkMode));
  }, [darkMode]);

  // Sync viewing user when current user changes
  useEffect(() => {
    if (activeTab === 'profile' && viewingUser.id === currentUser.id) {
      setViewingUser(currentUser);
    }
  }, [currentUser, activeTab]);

  // Check URL query parameters (e.g. ?pin=pin_1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pinId = params.get('pin');
    if (pinId) {
      const pin = actions.getPinById(pinId);
      if (pin) setSelectedPin(pin);
    }
  }, [pins]);

  // Unread counts
  const unreadNotifsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = messages.filter(
    m => m.receiverId === currentUser.id && !m.read
  ).length;

  // Filtered & Ranked Feed Pins
  const filteredPins = useMemo(() => {
    let result = [...pins];

    // Global Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.creator.displayName.toLowerCase().includes(q) ||
          p.creator.username.toLowerCase().includes(q)
      );
      return result;
    }

    // Category Filter
    if (selectedCategory !== 'All' && selectedCategory !== 'For You' && selectedCategory !== 'Following') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Feed Mode Algorithm
    if (feedMode === 'trending') {
      result.sort((a, b) => b.savesCount + b.likesCount - (a.savesCount + a.likesCount));
    } else if (feedMode === 'following') {
      result = result.filter(p => currentUser.followingUserIds.includes(p.creatorId));
    } else {
      // 'for-you': personalized scoring based on user's interests & followed creators
      result.sort((a, b) => {
        const aInterestScore = currentUser.interests.includes(a.category) ? 5 : 0;
        const bInterestScore = currentUser.interests.includes(b.category) ? 5 : 0;
        const aFollowScore = currentUser.followingUserIds.includes(a.creatorId) ? 3 : 0;
        const bFollowScore = currentUser.followingUserIds.includes(b.creatorId) ? 3 : 0;
        return bInterestScore + bFollowScore - (aInterestScore + aFollowScore);
      });
    }

    return result;
  }, [pins, searchQuery, selectedCategory, feedMode, currentUser]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Sticky Global Navbar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          if (tab === 'profile') setViewingUser(currentUser);
        }}
        searchQuery={searchQuery}
        setSearchQuery={q => {
          setSearchQuery(q);
          if (activeTab !== 'home') setActiveTab('home');
        }}
        onOpenCreatePin={() => setIsCreatePinOpen(true)}
        onOpenCreateBoard={() => setIsCreateBoardOpen(true)}
        onOpenVisualSearch={() => {
          setVisualSearchPin(null);
          setIsVisualSearchOpen(true);
        }}
        onOpenMessages={() => setIsMessagesOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSettings={() => setIsEditProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
        unreadMessagesCount={unreadMessagesCount}
        onSelectPin={pin => setSelectedPin(pin)}
        allPins={pins}
        allUsers={users}
        onSelectUser={u => {
          setViewingUser(u);
          setActiveTab('profile');
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main View Switching with responsive bottom padding for mobile navbar */}
      <main className="pb-20 md:pb-8 min-h-[calc(100vh-4rem)]">
        {activeTab === 'home' && (
          <>
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={cat => {
                setSelectedCategory(cat);
                setSearchQuery('');
              }}
              feedMode={feedMode}
              onChangeFeedMode={mode => setFeedMode(mode)}
            />

            <MasonryFeed
              pins={filteredPins}
              currentUser={currentUser}
              boards={boards}
              onSelectPin={pin => setSelectedPin(pin)}
              onLikePin={pinId => actions.toggleLikePin(pinId)}
              onSavePin={(pinId, boardId) => actions.savePinToBoard(pinId, boardId)}
              onUnsavePin={pinId => actions.unsavePin(pinId)}
              onVisualSearch={pin => {
                setVisualSearchPin(pin);
                setIsVisualSearchOpen(true);
              }}
              onSharePin={pin => setSharingPin(pin)}
              onReportPin={pin => setReportingPin(pin)}
              onResetFilters={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setFeedMode('for-you');
              }}
            />
          </>
        )}

        {activeTab === 'explore' && (
          <ExploreView
            allPins={pins}
            allBoards={boards}
            allUsers={users}
            currentUser={currentUser}
            onSelectPin={pin => setSelectedPin(pin)}
            onSelectBoard={board => {
              setSelectedBoard(board);
              setActiveTab('board');
            }}
            onSelectCategory={cat => {
              setSelectedCategory(cat);
              setActiveTab('home');
            }}
            onLikePin={pinId => actions.toggleLikePin(pinId)}
            onSavePin={(pinId, boardId) => actions.savePinToBoard(pinId, boardId)}
            onUnsavePin={pinId => actions.unsavePin(pinId)}
            onFollowUser={userId => actions.toggleFollowUser(userId)}
            onVisualSearch={pin => {
              setVisualSearchPin(pin);
              setIsVisualSearchOpen(true);
            }}
            onSharePin={pin => setSharingPin(pin)}
            onReportPin={pin => setReportingPin(pin)}
          />
        )}

        {activeTab === 'board' && selectedBoard && (
          <BoardDetail
            board={selectedBoard}
            allPins={pins}
            allUsers={users}
            currentUser={currentUser}
            allBoards={boards}
            onBack={() => setActiveTab('home')}
            onSelectPin={pin => setSelectedPin(pin)}
            onLikePin={pinId => actions.toggleLikePin(pinId)}
            onSavePin={(pinId, boardId) => actions.savePinToBoard(pinId, boardId)}
            onUnsavePin={pinId => actions.unsavePin(pinId, selectedBoard.id)}
            onVisualSearch={pin => {
              setVisualSearchPin(pin);
              setIsVisualSearchOpen(true);
            }}
            onSharePin={pin => setSharingPin(pin)}
            onReportPin={pin => setReportingPin(pin)}
            onAddSection={(bId, name) => actions.addSectionToBoard(bId, name)}
            onAddCollaborator={(bId, uId, role) => actions.addCollaborator(bId, uId, role)}
            onDeleteBoard={bId => actions.deleteBoard(bId)}
            onUpdateBoard={(bId, updates) => actions.updateBoard(bId, updates)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={viewingUser}
            currentUser={currentUser}
            allPins={pins}
            allBoards={boards}
            allUsers={users}
            onSelectPin={pin => setSelectedPin(pin)}
            onSelectBoard={board => {
              setSelectedBoard(board);
              setActiveTab('board');
            }}
            onLikePin={pinId => actions.toggleLikePin(pinId)}
            onSavePin={(pinId, boardId) => actions.savePinToBoard(pinId, boardId)}
            onUnsavePin={pinId => actions.unsavePin(pinId)}
            onFollowUser={userId => actions.toggleFollowUser(userId)}
            onVisualSearch={pin => {
              setVisualSearchPin(pin);
              setIsVisualSearchOpen(true);
            }}
            onSharePin={pin => setSharingPin(pin)}
            onReportPin={pin => setReportingPin(pin)}
            onOpenCreatePin={() => setIsCreatePinOpen(true)}
            onOpenCreateBoard={() => setIsCreateBoardOpen(true)}
            onOpenEditProfile={() => setIsEditProfileOpen(true)}
            onSwitchUser={userId => {
              actions.setCurrentUser(userId);
              const target = users.find(u => u.id === userId);
              if (target) setViewingUser(target);
            }}
          />
        )}
      </main>

      {/* Pin Detail Split Modal */}
      {selectedPin && (
        <PinDetailModal
          pin={selectedPin}
          currentUser={currentUser}
          boards={boards}
          allPins={pins}
          onClose={() => setSelectedPin(null)}
          onSelectPin={pin => setSelectedPin(pin)}
          onLikePin={pinId => actions.toggleLikePin(pinId)}
          onSavePin={(pinId, boardId) => actions.savePinToBoard(pinId, boardId)}
          onUnsavePin={pinId => actions.unsavePin(pinId)}
          onFollowUser={userId => actions.toggleFollowUser(userId)}
          onVisualSearch={pin => {
            setVisualSearchPin(pin);
            setIsVisualSearchOpen(true);
          }}
          onSharePin={pin => setSharingPin(pin)}
          onReportPin={pin => setReportingPin(pin)}
          onDeletePin={pinId => actions.deletePin(pinId)}
        />
      )}

      {/* Create Pin Modal */}
      {isCreatePinOpen && (
        <CreatePinModal
          currentUser={currentUser}
          boards={boards}
          onClose={() => setIsCreatePinOpen(false)}
          onCreatePin={pinData => actions.createPin(pinData)}
          onOpenCreateBoard={() => {
            setIsCreatePinOpen(false);
            setIsCreateBoardOpen(true);
          }}
        />
      )}

      {/* Create Board Modal */}
      {isCreateBoardOpen && (
        <CreateBoardModal
          onClose={() => setIsCreateBoardOpen(false)}
          onCreateBoard={(name, desc, isSecret, cat) => {
            const newBoard = actions.createBoard(name, desc, isSecret, cat);
            setSelectedBoard(newBoard);
            setActiveTab('board');
          }}
        />
      )}

      {/* Visual Search Lens Modal */}
      {isVisualSearchOpen && (
        <VisualSearchModal
          initialPin={visualSearchPin}
          allPins={pins}
          currentUser={currentUser}
          boards={boards}
          onClose={() => {
            setIsVisualSearchOpen(false);
            setVisualSearchPin(null);
          }}
          onSelectPin={pin => setSelectedPin(pin)}
          onLikePin={pinId => actions.toggleLikePin(pinId)}
          onSavePin={(pinId, boardId) => actions.savePinToBoard(pinId, boardId)}
          onUnsavePin={pinId => actions.unsavePin(pinId)}
          onSharePin={pin => setSharingPin(pin)}
          onReportPin={pin => setReportingPin(pin)}
        />
      )}

      {/* Direct Messaging Modal */}
      {isMessagesOpen && (
        <MessagesModal
          messages={messages}
          currentUser={currentUser}
          allUsers={users}
          allPins={pins}
          onClose={() => setIsMessagesOpen(false)}
          onSendMessage={(receiverId, text, pinAttachment) =>
            actions.sendMessage(receiverId, text, pinAttachment)
          }
          onSelectPin={pin => {
            setIsMessagesOpen(false);
            setSelectedPin(pin);
          }}
        />
      )}

      {/* Notification Drawer */}
      {isNotificationsOpen && (
        <NotificationsDrawer
          notifications={notifications}
          allPins={pins}
          allBoards={boards}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkRead={id => actions.markNotificationAsRead(id)}
          onMarkAllRead={() => actions.markAllNotificationsAsRead()}
          onSelectPin={pin => setSelectedPin(pin)}
          onSelectBoard={board => {
            setSelectedBoard(board);
            setActiveTab('board');
          }}
        />
      )}

      {/* Creator Analytics Modal */}
      {isAnalyticsOpen && (
        <AnalyticsModal
          analytics={analytics}
          onClose={() => setIsAnalyticsOpen(false)}
          onSelectPin={pinId => {
            const p = pins.find(item => item.id === pinId);
            if (p) setSelectedPin(p);
          }}
        />
      )}

      {/* Admin Moderation Console */}
      {isAdminOpen && (
        <AdminDashboard
          reports={reports}
          onClose={() => setIsAdminOpen(false)}
          onUpdateReportStatus={(id, status) => actions.updateReportStatus(id, status)}
          onDeletePin={pinId => actions.deletePin(pinId)}
        />
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={updates => actions.updateCurrentUser(updates)}
        />
      )}

      {/* Auth / Account Switcher Modal */}
      {isAuthOpen && (
        <AuthModal
          allUsers={users}
          onClose={() => setIsAuthOpen(false)}
          onSelectUser={userId => {
            actions.setCurrentUser(userId);
            const user = users.find(u => u.id === userId);
            if (user) setViewingUser(user);
          }}
          onCreateAccount={data => {
            const newUser: User = {
              id: 'user_' + Date.now(),
              username: data.username,
              displayName: data.displayName,
              email: data.email,
              avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
              bio: 'New explorer on Codasa.',
              followersCount: 0,
              followingCount: 0,
              interests: ['Design', 'Home Decor'],
              role: 'user',
              savedPinIds: [],
              likedPinIds: [],
              followingUserIds: []
            };
            const updated = [...users, newUser];
            localStorage.setItem('codasa_v1_users', JSON.stringify(updated));
            actions.setCurrentUser(newUser.id);
            setViewingUser(newUser);
            setIsOnboardingOpen(true);
          }}
        />
      )}

      {/* Onboarding Interests Modal */}
      {isOnboardingOpen && (
        <OnboardingModal
          currentInterests={currentUser.interests}
          onComplete={selected => {
            actions.updateCurrentUser({ interests: selected });
            setIsOnboardingOpen(false);
          }}
          onSkip={() => setIsOnboardingOpen(false)}
        />
      )}

      {/* Share Pin Modal */}
      {sharingPin && (
        <ShareModal
          pin={sharingPin}
          allUsers={users}
          onClose={() => setSharingPin(null)}
          onSendDirectMessage={(userId, pin) => {
            actions.sendMessage(userId, `Shared Pin: ${pin.title}`, {
              id: pin.id,
              title: pin.title,
              imageUrl: pin.imageUrl
            });
            setIsMessagesOpen(true);
          }}
        />
      )}

      {/* Report Pin Modal */}
      {reportingPin && (
        <ReportModal
          pin={reportingPin}
          onClose={() => setReportingPin(null)}
          onSubmitReport={data => actions.createReport(data)}
        />
      )}
    </div>
  );
}

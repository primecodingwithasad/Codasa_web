import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  MessageCircle,
  Plus,
  Compass,
  Home,
  BarChart2,
  Moon,
  Sun,
  ShieldCheck,
  LogOut,
  User as UserIcon,
  Bookmark,
  Camera,
  X,
  Clock,
  TrendingUp,
  Sparkles,
  Menu
} from 'lucide-react';
import { User, Pin } from '../../types';
import { POPULAR_TAGS } from '../../data/seedData';

interface NavbarProps {
  currentUser: User;
  activeTab: 'home' | 'explore' | 'profile' | 'board';
  setActiveTab: (tab: 'home' | 'explore' | 'profile' | 'board') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCreatePin: () => void;
  onOpenCreateBoard: () => void;
  onOpenVisualSearch: () => void;
  onOpenMessages: () => void;
  onOpenNotifications: () => void;
  onOpenAnalytics: () => void;
  onOpenAdmin: () => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
  unreadNotifsCount: number;
  unreadMessagesCount: number;
  onSelectPin: (pin: Pin) => void;
  allPins: Pin[];
  allUsers: User[];
  onSelectUser: (user: User) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenCreatePin,
  onOpenCreateBoard,
  onOpenVisualSearch,
  onOpenMessages,
  onOpenNotifications,
  onOpenAnalytics,
  onOpenAdmin,
  onOpenSettings,
  onOpenAuth,
  unreadNotifsCount,
  unreadMessagesCount,
  onSelectPin,
  allPins,
  allUsers,
  onSelectUser,
  darkMode,
  setDarkMode
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Japandi aesthetic',
    'Cast concrete villa',
    'Custom mechanical keyboards'
  ]);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(e.target as Node)) {
        setShowCreateDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      if (!recentSearches.includes(searchQuery.trim())) {
        setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 5)]);
      }
      setIsSearchFocused(false);
      setMobileSearchActive(false);
      if (activeTab !== 'home') setActiveTab('home');
    }
  };

  const clearRecent = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  const filteredSuggestions = searchQuery.trim()
    ? allPins
        .filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const matchedUsers = searchQuery.trim()
    ? allUsers
        .filter(u =>
          u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 3)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors w-full">
        <div className="max-w-[2200px] mx-auto px-2 sm:px-4 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Brand Logo & Desktop Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('home');
              }}
              className="flex items-center gap-2 p-1 sm:px-2 sm:py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left group"
              title="Codasa Home"
            >
              {/* Glossy Neon C Tech Emblem Logo */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md shadow-blue-500/25 ring-1 ring-blue-500/20 group-hover:scale-105 transition-transform shrink-0 bg-slate-950 flex items-center justify-center">
                <img
                  src="/assets/aistudio/Glossy_Neon_C_Tech_Emblem_eab82a8b.png"
                  alt="Codasa Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden xs:inline-block font-display font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                Codasa<span className="text-cyan-500">.</span>
              </span>
            </button>

            {/* Desktop Navigation Links (hidden on phone, available in bottom bar) */}
            <nav className="hidden md:flex items-center gap-1 ml-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('home');
                }}
                className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'home'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveTab('explore')}
                className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'explore'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                Explore
              </button>

              {/* Create Dropdown */}
              <div className="relative" ref={createMenuRef}>
                <button
                  onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                  className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 flex items-center gap-1 transition-all"
                >
                  <span>Create</span>
                  <Plus className="w-3.5 h-3.5 text-blue-500" />
                </button>

                {showCreateDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <button
                      onClick={() => {
                        setShowCreateDropdown(false);
                        onOpenCreatePin();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Create Pin</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Share photo, link or art</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowCreateDropdown(false);
                        onOpenCreateBoard();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400 flex items-center justify-center shrink-0">
                        <Bookmark className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Create Board</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Curate a new collection</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Fluid Global Search Bar with Autocomplete & Lens */}
          <div className="flex-1 max-w-2xl min-w-0 relative px-1 sm:px-2" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 sm:left-3.5 pointer-events-none shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search ideas, aesthetics, design..."
                className="w-full h-9 sm:h-11 pl-9 sm:pl-10 pr-16 sm:pr-20 bg-slate-100/90 dark:bg-slate-800/80 rounded-full text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all truncate"
              />

              <div className="absolute right-1.5 sm:right-2 flex items-center gap-0.5 sm:gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Visual Search Lens Button */}
                <button
                  type="button"
                  onClick={onOpenVisualSearch}
                  title="Visual Search by Image"
                  className="p-1 sm:p-1.5 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />
                </button>
              </div>
            </form>

            {/* Autocomplete Dropdown - Constrained to Viewport Width on Mobile */}
            {isSearchFocused && (
              <div className="absolute top-11 sm:top-13 left-0 right-0 sm:left-0 sm:right-0 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-3 sm:p-4 z-50 animate-in fade-in max-h-[70vh] overflow-y-auto">
                {!searchQuery.trim() ? (
                  <div className="space-y-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                          <span>Recent Searches</span>
                          <button
                            onClick={() => setRecentSearches([])}
                            className="hover:underline normal-case text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map(term => (
                            <div
                              key={term}
                              onClick={() => {
                                setSearchQuery(term);
                                setIsSearchFocused(false);
                              }}
                              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{term}</span>
                              </div>
                              <button
                                onClick={e => clearRecent(term, e)}
                                className="text-slate-300 hover:text-slate-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending tags */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                        <span>Trending</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_TAGS.slice(0, 8).map(tag => (
                          <button
                            key={tag}
                            onClick={() => {
                              setSearchQuery(tag);
                              setIsSearchFocused(false);
                            }}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matchedUsers.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                          Creators
                        </div>
                        <div className="space-y-1">
                          {matchedUsers.map(u => (
                            <div
                              key={u.id}
                              onClick={() => {
                                onSelectUser(u);
                                setIsSearchFocused(false);
                              }}
                              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <img
                                src={u.avatarUrl}
                                alt={u.displayName}
                                className="w-7 h-7 rounded-full object-cover shrink-0"
                              />
                              <div className="truncate">
                                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                  {u.displayName}
                                </div>
                                <div className="text-[10px] text-slate-400">@{u.username}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredSuggestions.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                          Ideas &amp; Pins
                        </div>
                        <div className="space-y-1">
                          {filteredSuggestions.map(pin => (
                            <div
                              key={pin.id}
                              onClick={() => {
                                onSelectPin(pin);
                                setIsSearchFocused(false);
                              }}
                              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <img
                                src={pin.imageUrl}
                                alt={pin.title}
                                className="w-8 h-8 rounded-lg object-cover shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                                  {pin.title}
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">
                                  by {pin.creator.displayName}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons & Profile Menu */}
          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
            {/* Creator Analytics (hidden on mobile, in dropdown/profile) */}
            <button
              onClick={onOpenAnalytics}
              title="Creator Analytics"
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors hidden lg:flex"
            >
              <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Notifications Button (hidden on phone, available in mobile bottom bar) */}
            <button
              onClick={onOpenNotifications}
              title="Notifications"
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors relative hidden md:flex"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Messages Button (hidden on phone, in mobile bottom bar) */}
            <button
              onClick={onOpenMessages}
              title="Messages"
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors relative hidden md:flex"
            >
              <MessageCircle className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-cyan-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-1.5 sm:p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Current User Avatar with Rich Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-0.5 sm:p-1 rounded-full hover:ring-2 hover:ring-blue-500/40 transition-all focus:outline-none"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.displayName}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div
                    onClick={() => {
                      setShowUserDropdown(false);
                      setActiveTab('profile');
                    }}
                    className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.displayName}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {currentUser.displayName}
                        </div>
                        <div className="text-xs text-slate-500 truncate">@{currentUser.username}</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setActiveTab('profile');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      <span>Your Profile &amp; Boards</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenAnalytics();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <BarChart2 className="w-4 h-4 text-slate-500" />
                      <span>Creator Analytics</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenAdmin();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-500" />
                      <span>Admin &amp; Moderation</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenSettings();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-slate-500" />
                      <span>Settings &amp; Privacy</span>
                    </button>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenAuth();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Switch Account / Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Native Mobile Bottom Navigation Bar (Active on Mobile & Small Tablets <768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-3 py-1.5 flex items-center justify-around shadow-lg pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        <button
          onClick={() => {
            setSearchQuery('');
            setActiveTab('home');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'explore'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Explore</span>
        </button>

        {/* Elevated Create Floating Button */}
        <button
          onClick={onOpenCreatePin}
          title="Create Pin"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30 active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenNotifications}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="text-[10px]">Alerts</span>
          {unreadNotifsCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {unreadNotifsCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenMessages}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 relative"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px]">Inbox</span>
          {unreadMessagesCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-cyan-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.displayName}
            className={`w-5 h-5 rounded-full object-cover ${
              activeTab === 'profile' ? 'ring-2 ring-blue-600' : ''
            }`}
          />
          <span className="text-[10px]">You</span>
        </button>
      </nav>
    </>
  );
};

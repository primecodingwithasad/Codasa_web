import React from 'react';
import { Sparkles, TrendingUp, Users } from 'lucide-react';
import { Pin, Board, User } from '../../types';
import { PinCard } from '../feed/PinCard';

interface ExploreViewProps {
  allPins: Pin[];
  allBoards: Board[];
  allUsers: User[];
  currentUser: User;
  onSelectPin: (pin: Pin) => void;
  onSelectBoard: (board: Board) => void;
  onSelectCategory: (cat: string) => void;
  onLikePin: (pinId: string) => void;
  onSavePin: (pinId: string, boardId: string) => void;
  onUnsavePin: (pinId: string) => void;
  onFollowUser: (userId: string) => void;
  onVisualSearch: (pin: Pin) => void;
  onSharePin: (pin: Pin) => void;
  onReportPin: (pin: Pin) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  allPins,
  allBoards,
  allUsers,
  currentUser,
  onSelectPin,
  onSelectBoard,
  onSelectCategory,
  onLikePin,
  onSavePin,
  onUnsavePin,
  onFollowUser,
  onVisualSearch,
  onSharePin,
  onReportPin
}) => {
  const editorialPin = allPins[0];

  const curatedTopics = [
    {
      title: 'Scandinavian Warmth',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      count: '42K ideas'
    },
    {
      title: 'Brutalist Havens',
      category: 'Architecture',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      count: '38K ideas'
    },
    {
      title: 'Tokyo Cyberpunk',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      count: '59K ideas'
    },
    {
      title: 'Slow Ferment Baking',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      count: '27K ideas'
    }
  ];

  const featuredCreators = allUsers.filter(u => u.id !== currentUser.id).slice(0, 4);

  return (
    <div className="max-w-[2200px] mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* Editorial Hero Banner */}
      {editorialPin && (
        <div
          onClick={() => onSelectPin(editorialPin)}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 cursor-pointer shadow-xl group min-h-[260px] sm:min-h-[380px] md:min-h-[440px] flex items-end"
        >
          <img
            src={editorialPin.imageUrl}
            alt={editorialPin.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative p-4 sm:p-8 md:p-10 max-w-2xl z-10 text-white">
            <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 inline-block">
              Today&apos;s Editorial Spotlight
            </span>
            <h1 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight">
              {editorialPin.title}
            </h1>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-slate-200 line-clamp-2">
              {editorialPin.description}
            </p>
            <div className="mt-3 sm:mt-4 flex items-center gap-2.5">
              <img
                src={editorialPin.creator.avatarUrl}
                alt={editorialPin.creator.displayName}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-white"
              />
              <span className="text-[11px] sm:text-xs font-bold text-white">
                Curated by {editorialPin.creator.displayName}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Trending Topics Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
              Trending Collections &amp; Themes
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {curatedTopics.map(topic => (
            <div
              key={topic.title}
              onClick={() => onSelectCategory(topic.category)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                <div className="font-display font-bold text-xs sm:text-base leading-tight">
                  {topic.title}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium mt-0.5">
                  {topic.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Creators Spotlight */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
              Creators Inspiring the Feed
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {featuredCreators.map(creator => {
            const isFollowing = currentUser.followingUserIds.includes(creator.id);
            return (
              <div
                key={creator.id}
                className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col items-center text-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.displayName}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 shadow"
                  />
                  <div className="mt-2.5 sm:mt-3 font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{creator.displayName}</span>
                    {creator.isVerified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">@{creator.username}</div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {creator.bio}
                  </p>
                </div>

                <div className="mt-4 w-full">
                  <button
                    onClick={() => onFollowUser(creator.id)}
                    className={`w-full py-2 rounded-full text-xs font-bold transition-all ${
                      isFollowing
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/25'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fresh Curated Pins Grid */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4 px-1">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
            Daily Visual Discoveries
          </h2>
        </div>

        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2.5 sm:gap-4 [column-fill:_balance]">
          {allPins.slice(1).map(pin => (
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
      </div>
    </div>
  );
};

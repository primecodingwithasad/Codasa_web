import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  MoreHorizontal,
  Camera,
  Check,
  ChevronDown,
  Download,
  Flag,
  EyeOff
} from 'lucide-react';
import { Pin, Board, User } from '../../types';

interface PinCardProps {
  pin: Pin;
  currentUser: User;
  boards: Board[];
  onSelectPin: (pin: Pin) => void;
  onLikePin: (pinId: string) => void;
  onSavePin: (pinId: string, boardId: string) => void;
  onUnsavePin: (pinId: string) => void;
  onVisualSearch: (pin: Pin) => void;
  onSharePin: (pin: Pin) => void;
  onReportPin: (pin: Pin) => void;
  onHidePin?: (pinId: string) => void;
}

export const PinCard: React.FC<PinCardProps> = ({
  pin,
  currentUser,
  boards,
  onSelectPin,
  onLikePin,
  onSavePin,
  onUnsavePin,
  onVisualSearch,
  onSharePin,
  onReportPin,
  onHidePin
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isSaved = currentUser.savedPinIds.includes(pin.id);
  const isLiked = currentUser.likedPinIds.includes(pin.id);

  const defaultBoard = boards[0] || { id: 'board_default', name: 'Profile' };
  const [selectedBoardId, setSelectedBoardId] = useState<string>(defaultBoard.id);

  const boardMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (boardMenuRef.current && !boardMenuRef.current.contains(e.target as Node)) {
        setShowBoardDropdown(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      onUnsavePin(pin.id);
    } else {
      onSavePin(pin.id, selectedBoardId);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikePin(pin.id);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = pin.imageUrl;
    a.download = `codasa-${pin.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    a.target = '_blank';
    a.click();
    setShowMoreMenu(false);
  };

  const selectedBoard = boards.find(b => b.id === selectedBoardId) || boards[0];

  return (
    <div
      className="group relative mb-3 sm:mb-5 break-inside-avoid select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowBoardDropdown(false);
        setShowMoreMenu(false);
      }}
    >
      {/* Image Container with Rounded Pinterest Silhouette */}
      <div
        onClick={() => onSelectPin(pin)}
        className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-slate-100 dark:bg-slate-800 cursor-zoom-in transition-all duration-300 shadow-xs hover:shadow-xl active:scale-[0.99] group-hover:scale-[1.01]"
      >
        {/* Skeleton blur placeholder */}
        {!imageLoaded && (
          <div
            className="w-full bg-slate-200 dark:bg-slate-700 animate-pulse"
            style={{ paddingBottom: `${(1 / pin.aspectRatio) * 100}%` }}
          />
        )}

        <img
          src={pin.imageUrl}
          alt={pin.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('photo-1618221195710-dd6b41faaea6')) {
              target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';
            }
          }}
          className={`w-full object-cover transition-opacity duration-300 block ${
            imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          style={{ aspectRatio: pin.aspectRatio }}
        />

        {/* Product / Price badge overlay (if shoppable pin) */}
        {pin.isProduct && (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-sm">
            <span>${pin.price}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-200 truncate max-w-[70px] sm:max-w-none">{pin.brand || 'Shop'}</span>
          </div>
        )}

        {/* Dark Dim Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-black/35 transition-opacity duration-200 pointer-events-none hidden md:block ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Controls Layer (Desktop & Tablet) */}
        {isHovered && (
          <div className="absolute inset-0 p-2.5 sm:p-3 flex-col justify-between z-20 hidden md:flex">
            {/* Top Bar: Board Selector & Save Button */}
            <div className="flex items-center justify-between gap-1.5" onClick={e => e.stopPropagation()}>
              {/* Board Selector Pill */}
              <div className="relative" ref={boardMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowBoardDropdown(!showBoardDropdown)}
                  className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-full bg-white/95 dark:bg-slate-900/95 hover:bg-white text-slate-800 dark:text-slate-100 text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-sm backdrop-blur-md transition-all max-w-[120px] sm:max-w-[140px]"
                >
                  <span className="truncate">{selectedBoard?.name || 'Save'}</span>
                  <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-70" />
                </button>

                {showBoardDropdown && (
                  <div className="absolute left-0 mt-1 w-48 sm:w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-in fade-in max-h-56 overflow-y-auto">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Choose Board
                    </div>
                    {boards.map(b => (
                      <button
                        key={b.id}
                        type="button"
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

              {/* Primary Save Button */}
              <button
                type="button"
                onClick={handleSaveClick}
                className={`h-8 sm:h-9 px-3.5 sm:px-4 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isSaved
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Bottom Bar: Link, Visual Search, Share, More */}
            <div className="flex items-center justify-between gap-1" onClick={e => e.stopPropagation()}>
              {/* Destination Link */}
              {pin.link ? (
                <a
                  href={pin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-7 sm:h-8 px-2 sm:px-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-sm backdrop-blur-md hover:bg-white transition-all max-w-[110px] sm:max-w-[130px] truncate"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="truncate">{new URL(pin.link).hostname.replace('www.', '')}</span>
                </a>
              ) : (
                <div />
              )}

              {/* Quick Actions Right */}
              <div className="flex items-center gap-1">
                {/* Visual Search Lens */}
                <button
                  type="button"
                  onClick={() => onVisualSearch(pin)}
                  title="Find visually similar ideas"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 shadow-sm backdrop-blur-md transition-all hover:scale-105"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={() => onSharePin(pin)}
                  title="Share Pin"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 shadow-sm backdrop-blur-md transition-all hover:scale-105"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                {/* More Menu Dropdown */}
                <div className="relative" ref={moreMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    title="More actions"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 shadow-sm backdrop-blur-md transition-all hover:scale-105"
                  >
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>

                  {showMoreMenu && (
                    <div className="absolute right-0 bottom-9 w-44 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-in fade-in">
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download image</span>
                      </button>

                      {onHidePin && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowMoreMenu(false);
                            onHidePin(pin.id);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide this Pin</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setShowMoreMenu(false);
                          onReportPin(pin);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>Report Pin</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pin Card Metadata Footer with Mobile-Friendly Quick Actions */}
      <div className="mt-1.5 sm:mt-2 px-0.5 sm:px-1">
        <h3
          onClick={() => onSelectPin(pin)}
          className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-1 hover:underline cursor-pointer"
        >
          {pin.title}
        </h3>

        <div className="mt-0.5 sm:mt-1 flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 min-w-0 pr-1">
            <img
              src={pin.creator.avatarUrl}
              alt={pin.creator.displayName}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0"
            />
            <span className="truncate text-[10px] sm:text-xs font-medium text-slate-700 dark:text-slate-300">
              {pin.creator.displayName}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Quick Mobile Save Button (visible on touch devices) */}
            <button
              onClick={handleSaveClick}
              className={`md:hidden px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                isSaved
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>

            {/* Quick Like Button & Count */}
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                isLiked ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-[10px] sm:text-[11px] font-semibold">{pin.likesCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

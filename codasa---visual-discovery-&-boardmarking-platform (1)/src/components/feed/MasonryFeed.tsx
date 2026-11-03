import React, { useState } from 'react';
import { PinCard } from './PinCard';
import { Pin, Board, User } from '../../types';
import { Sparkles, Frown, Loader2 } from 'lucide-react';

interface MasonryFeedProps {
  pins: Pin[];
  currentUser: User;
  boards: Board[];
  onSelectPin: (pin: Pin) => void;
  onLikePin: (pinId: string) => void;
  onSavePin: (pinId: string, boardId: string) => void;
  onUnsavePin: (pinId: string) => void;
  onVisualSearch: (pin: Pin) => void;
  onSharePin: (pin: Pin) => void;
  onReportPin: (pin: Pin) => void;
  onResetFilters?: () => void;
}

export const MasonryFeed: React.FC<MasonryFeedProps> = ({
  pins,
  currentUser,
  boards,
  onSelectPin,
  onLikePin,
  onSavePin,
  onUnsavePin,
  onVisualSearch,
  onSharePin,
  onReportPin,
  onResetFilters
}) => {
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hiddenPinIds, setHiddenPinIds] = useState<string[]>([]);

  const handleHidePin = (pinId: string) => {
    setHiddenPinIds(prev => [...prev, pinId]);
  };

  const activePins = pins.filter(p => !hiddenPinIds.includes(p.id));
  const displayedPins = activePins.slice(0, visibleCount);
  const hasMore = visibleCount < activePins.length;

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 500);
  };

  if (activePins.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 sm:py-24 px-4 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Frown className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-1">
          No matching Pins found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-5">
          Try adjusting your search terms or exploring other curated topics.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold transition-all shadow-sm"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[2200px] mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-5">
      {/* Responsive Masonry Columns for Mobile (320px+), Tablet, Laptop, Desktop & Ultra-wide */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2.5 sm:gap-4 [column-fill:_balance]">
        {displayedPins.map(pin => (
          <PinCard
            key={pin.id}
            pin={pin}
            currentUser={currentUser}
            boards={boards}
            onSelectPin={onSelectPin}
            onLikePin={onLikePin}
            onSavePin={onSavePin}
            onUnsavePin={onUnsavePin}
            onVisualSearch={onVisualSearch}
            onSharePin={onSharePin}
            onReportPin={onReportPin}
            onHidePin={handleHidePin}
          />
        ))}
      </div>

      {/* Infinite Scroll Trigger / Load More */}
      <div className="py-8 sm:py-12 flex justify-center">
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 shadow-xs active:scale-95"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Loading more inspiration...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>Load More Pins ({activePins.length - visibleCount} remaining)</span>
              </>
            )}
          </button>
        ) : (
          <div className="text-center text-[11px] sm:text-xs font-semibold text-slate-400">
            You&apos;ve reached the edge of this visual feed · Spark new ideas anytime!
          </div>
        )}
      </div>
    </div>
  );
};

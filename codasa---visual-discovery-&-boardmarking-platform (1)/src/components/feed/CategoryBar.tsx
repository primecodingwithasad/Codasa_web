import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Flame, Users } from 'lucide-react';
import { CATEGORIES } from '../../data/seedData';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  feedMode: 'for-you' | 'following' | 'trending';
  onChangeFeedMode: (mode: 'for-you' | 'following' | 'trending') => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  feedMode,
  onChangeFeedMode
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-14 sm:top-16 z-30 border-b border-slate-100 dark:border-slate-800 py-2 transition-colors">
      <div className="max-w-[2200px] mx-auto px-2 sm:px-4 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Left: Feed Algorithm Segmented Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-full w-fit shrink-0 overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => onChangeFeedMode('for-you')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all ${
              feedMode === 'for-you'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300" />
            <span>For You</span>
          </button>

          <button
            onClick={() => onChangeFeedMode('trending')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all ${
              feedMode === 'trending'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
            <span>Trending</span>
          </button>

          <button
            onClick={() => onChangeFeedMode('following')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all ${
              feedMode === 'following'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-300" />
            <span>Following</span>
          </button>
        </div>

        {/* Right: Scrollable Category Chips */}
        <div className="relative flex items-center flex-1 min-w-0">
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-0 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-600 dark:text-slate-200 hover:scale-105 transition-transform shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth px-0.5 sm:px-8 py-0.5 w-full"
          >
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-0 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-600 dark:text-slate-200 hover:scale-105 transition-transform shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

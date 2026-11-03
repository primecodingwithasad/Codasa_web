import React from 'react';
import { Lock, Users, Pin as PinIcon } from 'lucide-react';
import { Board, Pin } from '../../types';

interface BoardCardProps {
  board: Board;
  allPins: Pin[];
  onClick: () => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board, allPins, onClick }) => {
  // Find pins that belong to this board for collage preview
  const boardPins = allPins.filter(p => board.pinIds.includes(p.id));
  const pin0 = boardPins[0]?.imageUrl || board.coverImage;
  const pin1 = boardPins[1]?.imageUrl;
  const pin2 = boardPins[2]?.imageUrl;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer select-none transition-all duration-300"
    >
      {/* 3-Image Collage Box */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800 shadow-sm group-hover:shadow-xl group-hover:scale-[1.01] transition-all">
        {pin1 && pin2 ? (
          <div className="grid grid-cols-3 gap-1 h-full w-full">
            {/* Left Main (2 cols wide) */}
            <div className="col-span-2 h-full overflow-hidden">
              <img
                src={pin0}
                alt={board.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Right Stack (2 images stacked) */}
            <div className="grid grid-rows-2 gap-1 h-full overflow-hidden">
              <img
                src={pin1}
                alt={board.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <img
                src={pin2}
                alt={board.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ) : (
          <img
            src={pin0}
            alt={board.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Secret / Collaborator Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {board.isSecret && (
            <span className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white shadow-sm" title="Secret Board">
              <Lock className="w-3.5 h-3.5" />
            </span>
          )}
          {board.collaborators.length > 0 && (
            <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
              <Users className="w-3 h-3" />
              <span>+{board.collaborators.length}</span>
            </span>
          )}
        </div>
      </div>

      {/* Board Metadata Footer */}
      <div className="mt-2.5 px-1">
        <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate group-hover:text-rose-600 transition-colors">
          {board.name}
        </h4>
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
          <span>{board.pinIds.length} Pins</span>
          <span>·</span>
          <span>{board.category}</span>
        </div>
      </div>
    </div>
  );
};

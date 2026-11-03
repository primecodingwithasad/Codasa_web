import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  currentInterests: string[];
  onComplete: (selected: string[]) => void;
  onSkip: () => void;
}

const INTEREST_TOPICS = [
  { name: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80' },
  { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=80' },
  { name: 'Design', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80' },
  { name: 'Photography', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80' },
  { name: 'Food', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80' },
  { name: 'Technology', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80' },
  { name: 'Travel', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80' },
  { name: 'Art', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80' },
  { name: 'DIY', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=300&q=80' }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  currentInterests,
  onComplete,
  onSkip
}) => {
  const [selected, setSelected] = useState<string[]>(
    currentInterests.length > 0 ? currentInterests : ['Design', 'Architecture', 'Home Decor']
  );

  const toggleInterest = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-slate-100 dark:border-slate-800">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/30 flex items-center justify-center mx-auto mb-4 bg-slate-950">
          <img
            src="/assets/aistudio/Glossy_Neon_C_Tech_Emblem_eab82a8b.png"
            alt="Codasa"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          Welcome to Codasa
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Pick 3 or more topics you love to help us personalize your visual discovery feed.
        </p>

        {/* Grid of Interests */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-h-[50vh] overflow-y-auto p-1">
          {INTEREST_TOPICS.map(topic => {
            const isSelected = selected.includes(topic.name);
            return (
              <div
                key={topic.name}
                onClick={() => toggleInterest(topic.name)}
                className={`relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer group transition-all select-none ${
                  isSelected
                    ? 'ring-3 ring-blue-500 scale-[1.02] shadow-md'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                <img
                  src={topic.image}
                  alt={topic.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 transition-colors ${
                    isSelected ? 'bg-black/30' : 'bg-black/50 group-hover:bg-black/40'
                  }`}
                />

                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <span className="font-bold text-xs text-white drop-shadow">
                    {topic.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Skip for now
          </button>

          <button
            onClick={() => onComplete(selected)}
            disabled={selected.length === 0}
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>Finish &amp; Personalize Feed ({selected.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

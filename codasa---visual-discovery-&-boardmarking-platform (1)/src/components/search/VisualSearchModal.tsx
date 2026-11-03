import React, { useState, useEffect } from 'react';
import { X, Camera, Sparkles, UploadCloud, Sliders, Check } from 'lucide-react';
import { Pin, Board, User } from '../../types';
import { PinCard } from '../feed/PinCard';

interface VisualSearchModalProps {
  initialPin?: Pin | null;
  allPins: Pin[];
  currentUser: User;
  boards: Board[];
  onClose: () => void;
  onSelectPin: (pin: Pin) => void;
  onLikePin: (pinId: string) => void;
  onSavePin: (pinId: string, boardId: string) => void;
  onUnsavePin: (pinId: string) => void;
  onSharePin: (pin: Pin) => void;
  onReportPin: (pin: Pin) => void;
}

export const VisualSearchModal: React.FC<VisualSearchModalProps> = ({
  initialPin,
  allPins,
  currentUser,
  boards,
  onClose,
  onSelectPin,
  onLikePin,
  onSavePin,
  onUnsavePin,
  onSharePin,
  onReportPin
}) => {
  const [searchImageUrl, setSearchImageUrl] = useState<string>(
    initialPin?.imageUrl ||
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  );
  const [selectedPin, setSelectedPin] = useState<Pin | null>(initialPin || null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedTags, setDetectedTags] = useState<string[]>(
    initialPin?.tags || ['Minimalist', 'Interior', 'Aesthetic']
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setSearchImageUrl(ev.target?.result as string);
        setSelectedPin(null);
        triggerVisualScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerVisualScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // simulate smart computer vision object detection
      setDetectedTags(['Modern', 'Minimalism', 'Interior', 'Organic Textures']);
      setIsScanning(false);
    }, 700);
  };

  useEffect(() => {
    if (initialPin) {
      setSearchImageUrl(initialPin.imageUrl);
      setSelectedPin(initialPin);
      setDetectedTags(initialPin.tags);
    }
  }, [initialPin]);

  // Find visually matched pins based on tag overlap or category
  const matchedPins = allPins.filter(p => {
    if (selectedPin && p.id === selectedPin.id) return false;
    const hasTagOverlap = p.tags.some(t => detectedTags.includes(t));
    const sameCategory = selectedPin ? p.category === selectedPin.category : false;
    return hasTagOverlap || sameCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex flex-col items-center p-2.5 sm:p-6 animate-in fade-in">
      {/* Header Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              Visual Lens Discovery
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-300">
              Explore visually similar items, aesthetics, and inspirations
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid: Left is Source Image with Lens Box, Right is Matches */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
        {/* Source Image Panel */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[3/4] flex items-center justify-center group">
            <img
              src={searchImageUrl}
              alt="Visual search source"
              className="w-full h-full object-cover"
            />

            {/* Visual Focus Bounding Box (Pinterest-style Lens frame) */}
            <div className="absolute inset-6 sm:inset-8 border-2 border-white/90 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] pointer-events-none transition-all">
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white rounded-full shadow" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white rounded-full shadow" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white rounded-full shadow" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white rounded-full shadow" />
            </div>

            {/* Scanning indicator */}
            {isScanning && (
              <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mb-2" />
                <span className="text-xs font-bold">Scanning visual elements...</span>
              </div>
            )}
          </div>

          {/* Upload New Photo option */}
          <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
            <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors">
              <UploadCloud className="w-4 h-4 text-blue-500" />
              <span>Upload another image</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Detected Visual Features */}
          <div className="mt-3 sm:mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Detected Visual Attributes
            </div>
            <div className="flex flex-wrap gap-1.5">
              {detectedTags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel: Matching Pins Grid */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Visually Similar Results</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 text-xs font-extrabold">
                {matchedPins.length}
              </span>
            </div>
          </div>

          <div className="flex-1 max-h-[60vh] md:max-h-[70vh] overflow-y-auto pr-1">
            {matchedPins.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                No matching visual ideas found for this region. Try uploading another image.
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 gap-2.5 sm:gap-3 [column-fill:_balance]">
                {matchedPins.map(pin => (
                  <PinCard
                    key={pin.id}
                    pin={pin}
                    currentUser={currentUser}
                    boards={boards}
                    onSelectPin={p => {
                      onClose();
                      onSelectPin(p);
                    }}
                    onLikePin={onLikePin}
                    onSavePin={onSavePin}
                    onUnsavePin={onUnsavePin}
                    onVisualSearch={p => {
                      setSelectedPin(p);
                      setSearchImageUrl(p.imageUrl);
                      setDetectedTags(p.tags);
                    }}
                    onSharePin={onSharePin}
                    onReportPin={onReportPin}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

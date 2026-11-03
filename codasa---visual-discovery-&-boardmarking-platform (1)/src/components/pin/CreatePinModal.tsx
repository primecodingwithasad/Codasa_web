import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  Link as LinkIcon,
  Sparkles,
  ShoppingBag,
  Plus,
  Loader2,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { Board, User, Pin } from '../../types';

interface CreatePinModalProps {
  currentUser: User;
  boards: Board[];
  onClose: () => void;
  onCreatePin: (pinData: Omit<Pin, 'id' | 'likesCount' | 'savesCount' | 'commentsCount' | 'createdAt'>) => void;
  onOpenCreateBoard: () => void;
}

export const CreatePinModal: React.FC<CreatePinModalProps> = ({
  currentUser,
  boards,
  onClose,
  onCreatePin,
  onOpenCreateBoard
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState<string>(boards[0]?.id || '');
  const [tags, setTags] = useState<string[]>(['Design', 'Aesthetic']);
  const [currentTagInput, setCurrentTagInput] = useState('');
  const [category, setCategory] = useState('Design');
  const [isProduct, setIsProduct] = useState(false);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [brand, setBrand] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setError('Image file must be under 15MB');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onload = event => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    setImageUrl(inputUrl.trim());
    setInputUrl('');
  };

  const handleAddTag = () => {
    const trimmed = currentTagInput.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setCurrentTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Spark AI Copy Generation using Gemini
  const handleSparkAi = async () => {
    const topicQuery = title || tags.join(', ') || category;
    if (!topicQuery) {
      setError('Enter a title or tags first so AI has context!');
      return;
    }
    setIsGeneratingAi(true);
    setError('');

    try {
      const res = await fetch('/api/ai/magic-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicQuery, context: category })
      });
      const data = await res.json();
      if (data?.data) {
        if (!title) setTitle(data.data.title);
        setDescription(data.data.description);
        if (data.data.tags && Array.isArray(data.data.tags)) {
          setTags(prev => Array.from(new Set([...prev, ...data.data.tags])));
        }
        if (data.data.category) setCategory(data.data.category);
      }
    } catch (e) {
      // Fallback
      setDescription(
        `A refined study in organic geometry, clean daylight, and balanced textures for quiet inspiration.`
      );
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Please upload an image or paste a photo URL');
      return;
    }
    if (!title.trim()) {
      setError('Please provide a title for your Pin');
      return;
    }

    const board = boards.find(b => b.id === selectedBoardId);

    onCreatePin({
      title: title.trim(),
      description: description.trim(),
      imageUrl,
      link: link.trim() || undefined,
      creatorId: currentUser.id,
      creator: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
        isVerified: currentUser.isVerified
      },
      boardId: selectedBoardId || undefined,
      boardName: board?.name,
      tags: tags.length > 0 ? tags : ['Creative'],
      category: category || 'Design',
      aspectRatio: 0.75, // Standard portrait
      isProduct,
      price: isProduct ? price : undefined,
      brand: isProduct ? brand : undefined,
      inStock: isProduct ? true : undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Create a new Pin
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Form - scrollable body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 overflow-y-auto">
          {/* Left Column: Media Upload & Preview */}
          <div className="md:col-span-5 flex flex-col justify-between">
            {/* Mode Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setActiveMode('upload')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeMode === 'upload'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('url')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeMode === 'url'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Save from URL
              </button>
            </div>

            {/* Upload Area / Image Preview */}
            {imageUrl ? (
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group aspect-[3/4] flex items-center justify-center">
                <img src={imageUrl} alt="Pin preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-all"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : activeMode === 'upload' ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all aspect-[3/4] bg-slate-50/50 dark:bg-slate-800/20"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-3 sm:mb-4">
                  <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                  Choose a file or drag &amp; drop
                </div>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  We recommend high quality .jpg or .png files under 15MB
                </p>
                <span className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-sm">
                  Browse Files
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="aspect-[3/4] rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-center items-center">
                <ImageIcon className="w-10 h-10 text-slate-300 mb-3" />
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3 text-center">
                  Paste high-res image link
                </div>
                <div className="w-full flex gap-2">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={e => setInputUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleUrlLoad}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                  >
                    Load
                  </button>
                </div>
              </div>
            )}

            {/* Quick Sample Photos for instant testing */}
            {!imageUrl && (
              <div className="mt-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Or pick a photo preset:
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
                    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80',
                    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(preset)}
                      className="rounded-lg overflow-hidden h-12 hover:ring-2 hover:ring-rose-500 transition-all"
                    >
                      <img src={preset} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pin Details & Settings */}
          <div className="md:col-span-7 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-medium">
                {error}
              </div>
            )}

            {/* Title with AI Spark Button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Title *
                </label>
                <button
                  type="button"
                  onClick={handleSparkAi}
                  disabled={isGeneratingAi}
                  className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-400 transition-colors"
                >
                  {isGeneratingAi ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>Spark AI Copy</span>
                </button>
              </div>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Give your Pin an inspiring title"
                className="w-full h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Tell everyone what this Pin is about, materials, or recipes..."
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Destination Link */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Destination Link
              </label>
              <div className="relative flex items-center">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="url"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  placeholder="https://yourwebsite.com/article"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Board Selector & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Board
                  </label>
                  <button
                    type="button"
                    onClick={onOpenCreateBoard}
                    className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New Board</span>
                  </button>
                </div>
                <select
                  value={selectedBoardId}
                  onChange={e => setSelectedBoardId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                >
                  {boards.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} {b.isSecret ? '(Secret)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                >
                  {[
                    'Architecture',
                    'Home Decor',
                    'Design',
                    'Fashion',
                    'Photography',
                    'Food',
                    'Technology',
                    'Travel',
                    'Art',
                    'DIY'
                  ].map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Topic Tags Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Topic Tags (press Enter to add)
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={currentTagInput}
                  onChange={e => setCurrentTagInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="e.g. Minimalist, Nordic, Teak"
                  className="flex-1 h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
                  >
                    <span>#{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Shoppable Pin Toggle */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isProduct}
                  onChange={e => setIsProduct(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                  <span>Make this a Shoppable / Product Pin</span>
                </span>
              </label>

              {isProduct && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 animate-in fade-in">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Price ($ USD)
                    </label>
                    <input
                      type="number"
                      value={price || ''}
                      onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                      placeholder="95.00"
                      className="w-full h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Brand / Store Name
                    </label>
                    <input
                      type="text"
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                      placeholder="Studio Koto"
                      className="w-full h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Publish Pin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

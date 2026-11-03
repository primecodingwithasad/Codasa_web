import React, { useState } from 'react';
import { X, Flag, AlertTriangle } from 'lucide-react';
import { Pin, Report } from '../../types';

interface ReportModalProps {
  pin: Pin;
  onClose: () => void;
  onSubmitReport: (data: Omit<Report, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName'>) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ pin, onClose, onSubmitReport }) => {
  const [reason, setReason] = useState<Report['reason']>('spam');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport({
      targetType: 'pin',
      targetId: pin.id,
      targetTitle: pin.title,
      targetPreview: pin.imageUrl,
      reason,
      details: details.trim() || `User reported this Pin for ${reason}.`
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 flex items-center justify-center mx-auto">
              ✓
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Report Submitted
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Thank you for keeping Codasa inspiring and safe. Our moderation team will review this within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-rose-600">
            <Flag className="w-4 h-4" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Report this Pin
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="text-xs text-slate-500">
            Why are you reporting <span className="font-semibold text-slate-800 dark:text-slate-200">&ldquo;{pin.title}&rdquo;</span>?
          </div>

          <div className="space-y-2">
            {[
              { id: 'spam', label: 'Spam, advertising bot or suspicious link' },
              { id: 'inappropriate', label: 'Inappropriate or sexually explicit material' },
              { id: 'misleading', label: 'Misleading information or deceptive product' },
              { id: 'copyright', label: 'Copyright or intellectual property infringement' },
              { id: 'harassment', label: 'Hate speech or harassment' }
            ].map(r => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-colors ${
                  reason === r.id
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  checked={reason === r.id}
                  onChange={() => setReason(r.id as any)}
                  className="text-rose-600 focus:ring-rose-500"
                />
                <span>{r.label}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              rows={2}
              placeholder="Tell us what specifically violates community guidelines..."
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
            >
              Submit Report
            </button>
          </div>
        </form>
          </>
        )}
      </div>
    </div>
  );
};

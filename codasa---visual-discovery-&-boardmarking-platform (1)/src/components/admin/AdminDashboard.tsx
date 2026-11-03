import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle, Ban, Trash2, Eye } from 'lucide-react';
import { Report } from '../../types';

interface AdminDashboardProps {
  reports: Report[];
  onClose: () => void;
  onUpdateReportStatus: (id: string, status: 'resolved' | 'dismissed') => void;
  onDeletePin: (pinId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  reports,
  onClose,
  onUpdateReportStatus,
  onDeletePin
}) => {
  const [filter, setFilter] = useState<'pending' | 'resolved' | 'dismissed' | 'all'>('pending');

  const filteredReports =
    filter === 'all' ? reports : reports.filter(r => r.status === filter);

  const pendingCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <span>Codasa Moderation &amp; Trust</span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold">
                    {pendingCount} Pending
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">
                Audit community reports, spam signals, and automated content flags
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 my-5">
          {(['pending', 'resolved', 'dismissed', 'all'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-colors ${
                filter === tab
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reports Table / Card List */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {filteredReports.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              No reports in this category. Community is safe and clean!
            </div>
          ) : (
            filteredReports.map(rep => (
              <div
                key={rep.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  {rep.targetPreview && (
                    <img
                      src={rep.targetPreview}
                      alt="preview"
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0 text-xs">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {rep.targetTitle || `Target ID: ${rep.targetId}`}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-extrabold uppercase text-[10px]">
                        {rep.reason}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rep.status === 'pending'
                            ? 'bg-rose-50 text-rose-600'
                            : rep.status === 'resolved'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {rep.status}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {rep.details}
                    </p>

                    <div className="text-[11px] text-slate-400 mt-1">
                      Reported by <span className="font-semibold">{rep.reporterName}</span> ·{' '}
                      {new Date(rep.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Moderation Actions */}
                {rep.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => onUpdateReportStatus(rep.id, 'dismissed')}
                      className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                    >
                      Dismiss
                    </button>

                    <button
                      onClick={() => {
                        if (rep.targetType === 'pin') {
                          onDeletePin(rep.targetId);
                        }
                        onUpdateReportStatus(rep.id, 'resolved');
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Take Action</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

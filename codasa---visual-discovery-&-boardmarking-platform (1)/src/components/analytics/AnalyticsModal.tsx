import React from 'react';
import { X, BarChart2, TrendingUp, Eye, Bookmark, MousePointer, Award } from 'lucide-react';
import { AnalyticsData, Pin } from '../../types';

interface AnalyticsModalProps {
  analytics: AnalyticsData;
  onClose: () => void;
  onSelectPin: (pinId: string) => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ analytics, onClose, onSelectPin }) => {
  const maxImpressions = Math.max(...analytics.weeklyStats.map(s => s.impressions));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh] border border-slate-100 dark:border-slate-800 p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                Creator Analytics &amp; Insights
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Last 30 days performance across your Pins and curated Boards
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Core Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full">
                +24.8%
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {analytics.impressions.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
              Impressions
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <Bookmark className="w-4 h-4 text-cyan-500" />
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full">
                +18.2%
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {analytics.saves.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
              Total Saves
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <MousePointer className="w-4 h-4 text-indigo-500" />
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full">
                +31.0%
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {analytics.clicks.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
              Outbound Clicks
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full">
                High
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {analytics.engagementRate}%
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
              Engagement Rate
            </div>
          </div>
        </div>

        {/* Weekly Stats Bar Chart */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Weekly Reach &amp; Discovery Volume
            </h3>
            <span className="text-[11px] sm:text-xs text-slate-400">Sun - Sat</span>
          </div>

          <div className="h-36 sm:h-40 flex items-end gap-2 sm:gap-6 pt-4 px-1 sm:px-2">
            {analytics.weeklyStats.map(stat => {
              const heightPercent = (stat.impressions / maxImpressions) * 100;
              return (
                <div key={stat.day} className="flex-1 flex flex-col items-center gap-1.5 sm:gap-2 group">
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {(stat.impressions / 1000).toFixed(1)}k
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t-xl overflow-hidden h-24 sm:h-28 flex items-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-blue-600 group-hover:bg-blue-500 rounded-t-xl transition-all duration-500"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300">
                    {stat.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Pins */}
        <div className="mt-8">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Top Performing Pins</span>
          </h3>

          <div className="space-y-2">
            {analytics.topPins.map((pin, i) => (
              <div
                key={pin.id}
                onClick={() => {
                  onClose();
                  onSelectPin(pin.id);
                }}
                className="p-2.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-slate-400 w-4 text-center">
                    #{i + 1}
                  </span>
                  <img
                    src={pin.imageUrl}
                    alt={pin.title}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {pin.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {pin.saves.toLocaleString()} saves · {pin.impressions.toLocaleString()} views
                    </div>
                  </div>
                </div>

                <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  {pin.clicks.toLocaleString()} clicks
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

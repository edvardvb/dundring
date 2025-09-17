'use client';

import { CalendarWeek } from '@/types/calendar';
import { formatTime, formatDistance } from '@/utils/calendar';

interface WeeklySummaryProps {
  week: CalendarWeek;
  weekNumber: number;
  className?: string;
}

export function WeeklySummary({
  week,
  weekNumber,
  className,
}: WeeklySummaryProps) {
  const { summary } = week;

  return (
    <div
      className={`bg-slate-800 border border-slate-700 rounded-lg p-4 ${className}`}
    >
      <h4 className="text-sm font-medium text-slate-300 mb-3">
        Week {weekNumber}
      </h4>

      <div className="space-y-2">
        {/* TSS */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">TSS</span>
          <span className="text-sm font-medium text-white">
            {Math.round(summary.tss)}
          </span>
        </div>

        {/* Time */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">Time</span>
          <span className="text-sm font-medium text-white">
            {formatTime(summary.totalTime)}
          </span>
        </div>

        {/* Distance */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">Distance</span>
          <span className="text-sm font-medium text-white">
            {summary.totalDistance > 0
              ? formatDistance(summary.totalDistance)
              : '0 km'}
          </span>
        </div>

        {/* Activity Count */}
        {summary.activityCount > 0 && (
          <div className="flex justify-between items-center pt-1 border-t border-slate-700">
            <span className="text-xs text-slate-400">Activities</span>
            <span className="text-sm font-medium text-white">
              {summary.activityCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { CalendarDay as CalendarDayType } from '@/types/calendar';
import { ActivityItem } from '@/components/ActivityItem';

interface CalendarDayProps {
  day: CalendarDayType;
}

export function CalendarDay({ day }: CalendarDayProps) {
  const isToday = new Date().toDateString() == day.date.toDateString();

  return (
    <div
      className={`
        h-full p-2 border border-slate-700 bg-slate-800
        ${!day.isCurrentMonth ? 'opacity-50' : ''}
        ${isToday ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      {/* Day number */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={`
            text-sm
            ${
              isToday
                ? 'text-blue-400 font-bold'
                : `${
                    !day.isCurrentMonth ? 'text-slate-500' : 'text-slate-200'
                  } font-medium`
            }
          `}
        >
          {day.dayNumber}
        </span>
      </div>

      {/* Activities */}
      <div className="space-y-1">
        {day.activities.map((activity, index) => (
          <ActivityItem key={activity.id || index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

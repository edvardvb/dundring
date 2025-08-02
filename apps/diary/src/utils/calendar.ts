import * as icu from '@intervals-icu/js-data-model';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isSameMonth,
} from 'date-fns';
import {
  CalendarData,
  CalendarWeek,
  CalendarDay,
  WeeklySummary,
  ACTIVITY_TYPE_COLORS,
} from '@/types/calendar';

/**
 * Groups activities by date (YYYY-MM-DD format)
 */
export const groupActivitiesByDate = (
  activities: icu.Activity[]
): Record<string, icu.Activity[]> => {
  return activities.reduce(
    (groups, activity) => {
      if (!activity.start_date) return groups;

      const dateKey = activity.start_date.split('T')[0]; // Get YYYY-MM-DD part
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
      return groups;
    },
    {} as Record<string, icu.Activity[]>
  );
};

/**
 * Calculates weekly summary from activities
 */
export const calculateWeeklySummary = (
  activities: icu.Activity[]
): WeeklySummary => {
  return activities.reduce(
    (summary, activity) => {
      // Helper function to safely convert to number
      const toNumber = (value: unknown): number => {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') return parseFloat(value) || 0;
        return 0;
      };

      return {
        tss: summary.tss + toNumber(activity.icu_training_load),
        totalTime: summary.totalTime + toNumber(activity.moving_time),
        totalDistance: summary.totalDistance + toNumber(activity.distance),
        activityCount: summary.activityCount + 1,
      };
    },
    {
      tss: 0,
      totalTime: 0,
      totalDistance: 0,
      activityCount: 0,
    } as WeeklySummary
  );
};

/**
 * Formats time in seconds to HH:MM format
 */
export const formatTime = (
  seconds: number,
  includeSeconds: boolean = false
): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return includeSeconds
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    : `${hours}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Formats distance in meters to km with one decimal
 */
export const formatDistance = (meters: number): string => {
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
};

/**
 * Gets activity type configuration
 */
export const getActivityTypeConfig = (activityType: string | undefined) => {
  if (!activityType) return ACTIVITY_TYPE_COLORS.Default;

  const normalizedType =
    activityType.charAt(0).toUpperCase() + activityType.slice(1).toLowerCase();
  return ACTIVITY_TYPE_COLORS[normalizedType] || ACTIVITY_TYPE_COLORS.Default;
};

/**
 * Generates calendar data for a given month and activities
 */
export const generateCalendarData = (
  activities: icu.Activity[],
  start_date: Date
): CalendarData => {
  const monthStart = startOfMonth(start_date);
  const monthEnd = endOfMonth(start_date);

  // Get the calendar view range (includes days from previous/next month to fill grid)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  // Group activities by date
  const activitiesByDate = groupActivitiesByDate(activities);

  // Generate weeks
  const weeks = eachWeekOfInterval(
    { start: calendarStart, end: calendarEnd },
    { weekStartsOn: 1 }
  ).map((weekStart): CalendarWeek => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const days: CalendarDay[] = daysInWeek.map((date): CalendarDay => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayActivities = activitiesByDate[dateKey] || [];

      return {
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: isSameMonth(date, start_date),
        activities: dayActivities,
      };
    });

    // Calculate weekly summary from all activities in this week
    const weekActivities = days.flatMap((day) => day.activities);
    const summary = calculateWeeklySummary(weekActivities);

    return {
      days,
      weekStartDate: weekStart,
      summary,
    };
  });

  return {
    weeks,
    monthName: format(start_date, 'MMMM yyyy'),
  };
};

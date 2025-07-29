import * as icu from '@intervals-icu/js-data-model';

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  activities: icu.Activity[];
}

export interface CalendarWeek {
  days: CalendarDay[];
  weekStartDate: Date;
  summary: WeeklySummary;
}

export interface WeeklySummary {
  tss: number;
  totalTime: number; // in seconds
  totalDistance: number; // in meters
  activityCount: number;
}

export interface CalendarData {
  weeks: CalendarWeek[];
  monthName: string;
}

export interface ActivityTypeConfig {
  name: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
}

export const ACTIVITY_TYPE_COLORS: Record<string, ActivityTypeConfig> = {
  Ride: {
    name: 'Ride',
    color: '#ffffff',
    backgroundColor: '#10b981', // emerald-500
    borderColor: '#059669', // emerald-600
  },
  Run: {
    name: 'Run',
    color: '#ffffff',
    backgroundColor: '#f59e0b', // amber-500
    borderColor: '#d97706', // amber-600
  },
  Swim: {
    name: 'Swim',
    color: '#ffffff',
    backgroundColor: '#3b82f6', // blue-500
    borderColor: '#2563eb', // blue-600
  },
  Default: {
    name: 'Activity',
    color: '#ffffff',
    backgroundColor: '#6b7280', // gray-500
    borderColor: '#4b5563', // gray-600
  },
};

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

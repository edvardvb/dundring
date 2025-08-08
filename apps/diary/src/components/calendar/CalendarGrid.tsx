import { CalendarData, DAYS_OF_WEEK } from '@/types/calendar';
import { CalendarDay } from './CalendarDay';
import { WeeklySummary } from './WeeklySummary';
import { MonthNavigation } from './MonthNavigation';
import { DecorativeBox } from '@/components/ui';
import { Grid } from '@radix-ui/themes';
import { Fragment } from 'react';

interface CalendarGridProps {
  calendarData: CalendarData;
}

export function CalendarGrid({ calendarData }: CalendarGridProps) {
  return (
    <div className="flex gap-4 min-h-screen bg-slate-900 text-white p-6">
      {/* Main Calendar Grid */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">DundringDiary</h1>
          <h2 className="text-xl text-slate-300">{calendarData.monthName}</h2>
          <MonthNavigation />
        </div>

        {/* Calendar Grid */}
        <Grid
          columns="8"
          gap="1"
          rows={`repeat(${calendarData.weeks.length + 1}, auto)`}
          width="auto"
        >
          {/* Header - Days of week */}
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-slate-400 border-b border-slate-700"
            >
              {day}
            </div>
          ))}

          <div
            key="summary"
            className="p-3 text-center text-sm font-medium text-slate-400 border-b border-slate-700"
          >
            Weekly Summary
          </div>

          {calendarData.weeks.map((week) => (
            <Fragment key={week.weekStartDate.getTime()}>
              {week.days.map((day, index) => (
                <DecorativeBox key={`${day.date.getTime()}-${index}`}>
                  <CalendarDay key={day.date.getTime()} day={day} />
                </DecorativeBox>
              ))}
              <WeeklySummary
                key={week.weekStartDate.getTime()}
                week={week}
                weekNumber={calendarData.weeks.indexOf(week) + 1}
              />
            </Fragment>
          ))}
        </Grid>
      </div>
    </div>
  );
}

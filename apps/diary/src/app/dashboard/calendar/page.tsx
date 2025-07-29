import * as icu from '@intervals-icu/js-data-model';
import { CalendarGrid } from '@/components/CalendarGrid';
import { generateCalendarData } from '@/utils/calendar';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';

const getActivities = async (start_date: Date) => {
  if (
    !process.env.INTERVALS_ICU_B64_AUTH ||
    !process.env.INTERVALS_ICU_ATHLETE_ID
  ) {
    throw new Error('Missing environment variables for Intervals.icu API');
  }

  const monthStart = startOfMonth(start_date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const monthEnd = endOfMonth(start_date);
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const res = await fetch(
    `https://intervals.icu/api/v1/athlete/${
      process.env.INTERVALS_ICU_ATHLETE_ID
    }/activities?oldest=${calendarStart.toISOString().split('T')[0]}&newest=${
      calendarEnd.toISOString().split('T')[0]
    } `,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: `Basic ${process.env.INTERVALS_ICU_B64_AUTH}`,
      },
    }
  );
  const activities = (await res.json()) as icu.Activity[];
  console.log('Fetched activities:', activities);
  return activities;
};

export default async function Page(props: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await props.searchParams;
  console.log('Params:', params);
  const start_date = params.date ? new Date(params.date) : new Date();

  const activities = await getActivities(start_date);

  const calendarData = generateCalendarData(activities, start_date);

  return <CalendarGrid calendarData={calendarData} />;
}

'use server';

import * as icu from '@intervals-icu/js-data-model';

export async function getActivity(id: string): Promise<icu.Activity | null> {
  if (!process.env.INTERVALS_ICU_B64_AUTH) {
    throw new Error('Missing environment variables for Intervals.icu API');
  }
  console.log('Fetching activity with ID:', id);

  const res = await fetch(`https://intervals.icu/api/v1/activity/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Basic ${process.env.INTERVALS_ICU_B64_AUTH}`,
    },
  });
  const activity = (await res.json()) as icu.Activity;
  return activity;
}

'use client';

import { Button } from '@radix-ui/themes';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/dist/client/components/navigation';
import * as dnf from 'date-fns';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';

export const MonthNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const current_date = searchParams.has('date')
    ? new Date(searchParams.get('date')!)
    : new Date();

  const handlePrevMonth = () => {
    const params = new URLSearchParams(searchParams);

    const prevMonth = dnf.subMonths(current_date, 1);
    const startOfPrevMonth = dnf.setDate(prevMonth, 1);

    params.set('date', startOfPrevMonth.toISOString().split('T')[0]);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleNextMonth = () => {
    const params = new URLSearchParams(searchParams);

    const nextMonth = dnf.addMonths(current_date, 1);
    const startOfNextMonth = dnf.setDate(nextMonth, 1);

    params.set('date', startOfNextMonth.toISOString().split('T')[0]);

    replace(`${pathname}?${params.toString()}`);
  };

  const resetMonth = () => {
    replace(pathname);
  };

  return (
    <div className="flex mb-4 mt-4">
      <div className="mr-4">
        <Button onClick={handlePrevMonth}>Prev</Button>
      </div>
      <div className="mr-4">
        <Button onClick={handleNextMonth}>Next</Button>
      </div>
      <div>
        <Button onClick={resetMonth}>
          <CounterClockwiseClockIcon />
        </Button>
      </div>
    </div>
  );
};

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';

interface ActivityHeaderProps {
  activityName: string;
  startDate?: string;
}

export function ActivityHeader({
  activityName,
  startDate,
}: ActivityHeaderProps) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <Dialog.Title className="text-2xl font-semibold">
          {activityName || 'Activity'}
        </Dialog.Title>
        <Dialog.Close asChild>
          <Button className="text-slate-400 hover:text-white w-6 h-6 flex items-center justify-center">
            <Cross1Icon />
          </Button>
        </Dialog.Close>
      </div>
      <div className="text-slate-400 text-sm mb-4">{formatDate(startDate)}</div>
    </>
  );
}

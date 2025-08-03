'use client';

import * as icu from '@intervals-icu/js-data-model';
import * as Dialog from '@radix-ui/react-dialog';
import { ActivityModal } from '@/components/ActivityModal';

import { useState } from 'react';
import { ActivityItem } from '@/components/ActivityItem';

interface ActivityItemProps {
  activity: icu.Activity;
}

export function ActivityItemWrapper({ activity }: ActivityItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog.Root modal open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>
        <div className="mb-2" id={`activity-${activity.id}`}>
          <ActivityItem activity={activity} />
        </div>
      </Dialog.Trigger>

      <ActivityModal activityId={activity.id!} isOpen={isModalOpen} />
    </Dialog.Root>
  );
}

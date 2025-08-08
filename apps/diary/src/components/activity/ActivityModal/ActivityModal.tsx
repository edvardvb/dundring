'use client';

import * as icu from '@intervals-icu/js-data-model';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { getActivityTypeConfig } from '@/utils/calendar';
import { Flex } from '@radix-ui/themes';
import { getRoute } from '@/utils/getActivity';
import {
  ActivityHeader,
  ActivityStats,
  ActivityDataTable,
  ActivityMap,
} from './index';

interface ActivityModalProps {
  activity: icu.Activity;
  isOpen: boolean;
}

interface ActivityMapDataProps {
  bounds: [number, number][];
  latlngs: [number, number][];
  weather: object;
  route: object;
}

export default function ActivityModal({
  activity,
  isOpen,
}: ActivityModalProps) {
  const [route, setRoute] = useState<ActivityMapDataProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dynamically import the map component to avoid SSR issues

  useEffect(() => {
    if (isOpen && !route) {
      setIsLoading(true);
      getRoute(activity.id!)
        .then((fetchedRoute) => {
          if (fetchedRoute) {
            setRoute(fetchedRoute);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch route:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, activity, route]);

  if (!route && isLoading) {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white p-6 rounded-lg shadow-xl z-50 w-7xl max-w-[90vw]">
          <Dialog.Title className="text-2xl font-semibold">
            Loading activity...
          </Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    );
  }

  if (!route) {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white p-6 rounded-lg shadow-xl z-50 w-7xl max-w-[90vw]">
          <Dialog.Title className="text-2xl font-semibold">
            Loading activity failed
          </Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    );
  }

  console.log('Activity data:', activity);
  const typeConfig = getActivityTypeConfig(activity.type);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white p-6 rounded-lg shadow-xl z-50 w-7xl max-w-[90vw]">
        <ActivityHeader
          activityName={activity.name || ''}
          startDate={activity.start_date}
        />

        <ActivityStats activity={activity} />

        <Flex
          direction="row"
          justify="between"
          className="mt-4 mb-6"
          style={{ gap: '1.5rem' }}
        >
          <ActivityDataTable activity={activity} />

          <div
            className="h-96 w-full max-w-1/3"
            style={
              {
                background: typeConfig.borderColor,
                borderRadius: '10px',
                border: `7px solid ${typeConfig.borderColor}`,
                boxShadow: `0 1px 20px -5px ${typeConfig.borderColor}`,
              } as React.CSSProperties
            }
          >
            <ActivityMap
              route={route.latlngs}
              bounds={route.bounds}
              id="map"
              className="h-full w-full"
            />
          </div>
        </Flex>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

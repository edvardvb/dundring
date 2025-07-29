'use client';

import * as icu from '@intervals-icu/js-data-model';
import {
  getActivityTypeConfig,
  formatTime,
  formatDistance,
} from '@/utils/calendar';
import * as Dialog from '@radix-ui/react-dialog';
import { ActivityModal } from '@/components/ActivityModal';
import { useState } from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import { BarChartIcon, TimerIcon, WidthIcon } from '@radix-ui/react-icons';

interface ActivityItemProps {
  activity: icu.Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const typeConfig = getActivityTypeConfig(activity.type);

  // Helper function to safely convert to number
  const toNumber = (value: unknown): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
  };

  const movingTime = toNumber(activity.moving_time);
  const distance = toNumber(activity.distance);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>
        <div className="mb-2">
          <Flex
            direction="column"
            justify="between"
            height="auto"
            style={
              {
                background: `linear-gradient(to top right, ${typeConfig.backgroundColor}, ${typeConfig.borderColor})`,
                boxShadow: `0 1px 20px -5px ${typeConfig.borderColor}`,
                borderRadius: 'var(--radius-3)',
                '--gray-12': 'white',
              } as React.CSSProperties
            }
          >
            <Text weight="bold" mt="3" mx="3" size="2">
              {activity.name || typeConfig.name}
            </Text>
            <Box>
              <Flex
                direction="column"
                justify="center"
                gap="1"
                mb="2"
                mx="3"
                mt="2"
              >
                <Text size="2">
                  <Flex direction="row" align="center" gap="2">
                    <TimerIcon />
                    {formatTime(movingTime)}h
                  </Flex>
                </Text>
                <Text size="2">
                  <Flex direction="row" align="center" gap="1">
                    <WidthIcon />
                    {distance > 0 && formatDistance(distance)}
                  </Flex>
                </Text>
                <Text size="2">
                  <Flex direction="row" align="center" gap="1">
                    <BarChartIcon />
                    {Math.round(toNumber(activity.icu_training_load))} TSS
                  </Flex>
                </Text>
              </Flex>
            </Box>
          </Flex>
        </div>
      </Dialog.Trigger>

      <ActivityModal activity={activity} />
    </Dialog.Root>
  );
}

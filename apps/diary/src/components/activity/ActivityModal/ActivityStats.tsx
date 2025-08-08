'use client';

import {
  getActivityTypeConfig,
  formatTime,
  formatDistance,
} from '@/utils/calendar';
import { TimerIcon, WidthIcon, BarChartIcon } from '@radix-ui/react-icons';
import { Flex, Box } from '@radix-ui/themes';
import * as icu from '@intervals-icu/js-data-model';

interface ActivityStatsProps {
  activity: icu.Activity;
}

export function ActivityStats({ activity }: ActivityStatsProps) {
  const typeConfig = getActivityTypeConfig(activity.type);

  // Helper function to safely convert to number
  const toNumber = (value: unknown): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
  };

  return (
    <Box
      height="auto"
      style={
        {
          background: `linear-gradient(to top right, ${typeConfig.backgroundColor}, ${typeConfig.borderColor})`,
          boxShadow: `0 1px 20px -5px ${typeConfig.borderColor}`,
          borderRadius: '10px',
        } as React.CSSProperties
      }
    >
      <Box>
        <Flex
          direction="row"
          align="center"
          style={{ justifyContent: 'space-evenly' }}
          className="mb-2 p-4"
          width="100%"
        >
          <div className="px-10 text-2xl font-medium">
            {activity.type || 'Activity'}
          </div>
          <div style={{ borderLeft: '2px solid white', height: '5rem' }}></div>
          <Flex
            direction="row"
            style={{ justifyContent: 'space-evenly' }}
            gap="6"
            height="100px"
            className="text-2xl"
            width="100%"
          >
            <Flex direction="row" align="center">
              <TimerIcon
                className="mr-2"
                style={{
                  width: 'var(--text-2xl)',
                  height: 'var(--text-2xl)',
                }}
              />
              {formatTime(activity.moving_time!)}h
            </Flex>
            <Flex direction="row" align="center">
              <WidthIcon
                className="mr-2"
                style={{
                  width: 'var(--text-2xl)',
                  height: 'var(--text-2xl)',
                }}
              />
              {activity.distance! > 0 && formatDistance(activity.distance!)}
            </Flex>
            <Flex direction="row" align="center">
              <BarChartIcon
                className="mr-2"
                style={{
                  width: 'var(--text-2xl)',
                  height: 'var(--text-2xl)',
                }}
              />
              {Math.round(toNumber(activity.icu_training_load))} TSS
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

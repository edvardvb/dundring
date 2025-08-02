'use client';

import * as icu from '@intervals-icu/js-data-model';
import * as Dialog from '@radix-ui/react-dialog';
import {
  formatTime,
  formatDistance,
  getActivityTypeConfig,
} from '@/utils/calendar';
import {
  Button,
  Flex,
  Box,
  Text,
  DataList,
  Table,
  Theme,
} from '@radix-ui/themes';
import {
  Cross1Icon,
  TimerIcon,
  WidthIcon,
  BarChartIcon,
} from '@radix-ui/react-icons';

interface ActivityModalProps {
  activity: icu.Activity;
}

export function ActivityModal({ activity }: ActivityModalProps) {
  const typeConfig = getActivityTypeConfig(activity.type);

  // Helper function to safely convert to number
  const toNumber = (value: unknown): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const toKph = (value: number) => {
    return value > 0 ? (value * 3.6).toFixed(1) : 'N/A';
  };

  const FormattedDataListItem = ({
    label,
    value,
    unit,
  }: {
    label: string;
    value: string | number | undefined;
    unit?: string;
  }) => (
    <>
      <DataList.Item>
        <DataList.Label minWidth="88px">
          <Text className="text-slate-300">{label}</Text>
        </DataList.Label>
        <DataList.Value className="pl-5">
          {value}
          {unit && ` ${unit}`}
        </DataList.Value>
      </DataList.Item>
    </>
  );

  const FormattedTableRow = ({
    label,
    avgValue,
    maxValue,
  }: {
    label: string;
    avgValue: number | string | undefined;
    maxValue: number | string | undefined;
  }) => (
    <Table.Row>
      <Table.RowHeaderCell>{label}</Table.RowHeaderCell>
      <Table.Cell>{avgValue}</Table.Cell>
      <Table.Cell>{maxValue}</Table.Cell>
    </Table.Row>
  );

  //console.log(activity);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white p-6 rounded-lg shadow-xl z-50 w-7xl max-w-[90vw]">
        <div className="flex justify-between items-start">
          <Dialog.Title className="text-2xl font-semibold">
            {activity.name || 'Activity'}
          </Dialog.Title>
          <Dialog.Close asChild>
            <Button className="text-slate-400 hover:text-white w-6 h-6 flex items-center justify-center">
              <Cross1Icon />
            </Button>
          </Dialog.Close>
        </div>
        <div className="text-slate-400 text-sm mb-4">
          {formatDate(activity.start_date)}
        </div>

        <Box
          height="auto"
          style={
            {
              background: `linear-gradient(to top right, ${typeConfig.backgroundColor}, ${typeConfig.borderColor})`,
              boxShadow: `0 1px 20px -5px ${typeConfig.borderColor}`,
              borderRadius: '10px',
              '--gray-12': 'white',
            } as React.CSSProperties
          }
        >
          <Box className="">
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
              <div
                style={{ borderLeft: '2px solid white', height: '5rem' }}
              ></div>
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
        <Flex
          direction="row"
          justify="between"
          className="mt-4 mb-6"
          style={{ gap: '2rem' }}
        >
          <DataList.Root className="p-4">
            <FormattedDataListItem
              label="Duration"
              value={formatTime(toNumber(activity.moving_time), true)}
            />
            <FormattedDataListItem
              label="Distance"
              value={formatDistance(toNumber(activity.distance))}
            />
            <FormattedDataListItem
              label="Training Load"
              value={Math.round(toNumber(activity.icu_training_load))}
              unit="TSS"
            />
            <FormattedDataListItem
              label="Elevation Gain"
              value={Math.round(toNumber(activity.total_elevation_gain))}
              unit="m"
            />
            <FormattedDataListItem
              label="Intensity Factor"
              value={(toNumber(activity.icu_intensity) / 100).toFixed(2)}
              unit="IF"
            />
            <FormattedDataListItem
              label="Normalized Power"
              value={toNumber(activity.icu_weighted_avg_watts)}
              unit="W"
            />
            <FormattedDataListItem
              label="Work"
              value={Math.round(toNumber(activity.icu_joules) / 1000)}
              unit="kJ"
            />
            <FormattedDataListItem
              label="Calories"
              value={Math.round(toNumber(activity.calories))}
              unit="kcal"
            />
          </DataList.Root>

          <Theme accentColor="indigo">
            <div className="w-sm">
              <Table.Root size="1">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Avg</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Max</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>Heart Rate</Table.RowHeaderCell>
                    <Table.Cell>
                      {Math.round(toNumber(activity.average_heartrate))} bpm
                    </Table.Cell>
                    <Table.Cell>
                      {Math.round(toNumber(activity.max_heartrate))} bpm
                    </Table.Cell>
                  </Table.Row>

                  <FormattedTableRow
                    label="Power"
                    avgValue={`${Math.round(toNumber(activity.icu_average_watts))}W`}
                    maxValue={`${Math.round(toNumber(activity.icu_pm_p_max))}W`}
                  />

                  <FormattedTableRow
                    label="Cadence"
                    avgValue={`${Math.round(toNumber(activity.average_cadence))} rpm`}
                    maxValue={`${Math.round(toNumber(activity.icu_intervals?.[0].max_cadence))} rpm`}
                  />

                  <Table.Row>
                    <Table.RowHeaderCell>Speed</Table.RowHeaderCell>
                    <Table.Cell>
                      {toKph(toNumber(activity.average_speed))} km/h
                    </Table.Cell>
                    <Table.Cell>
                      {toKph(toNumber(activity.max_speed))} km/h
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </div>
          </Theme>
        </Flex>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

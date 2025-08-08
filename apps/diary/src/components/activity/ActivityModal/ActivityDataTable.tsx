'use client';

import { formatTime, formatDistance } from '@/utils/calendar';
import { DataList, Table, Theme } from '@radix-ui/themes';
import * as icu from '@intervals-icu/js-data-model';
import { FormattedDataListItem } from './FormattedDataListItem';
import { FormattedTableRow } from './FormattedTableRow';

interface ActivityDataTableProps {
  activity: icu.Activity;
}

export function ActivityDataTable({ activity }: ActivityDataTableProps) {
  // Helper function to safely convert to number
  const toNumber = (value: unknown): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
  };

  const toKph = (value: number) => {
    return value > 0 ? (value * 3.6).toFixed(1) : 'N/A';
  };

  return (
    <>
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
          <Table.Root size="3">
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
                maxValue="TODO"
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
    </>
  );
}

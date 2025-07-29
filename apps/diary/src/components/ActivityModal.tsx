'use client';

import * as icu from '@intervals-icu/js-data-model';
import * as Dialog from '@radix-ui/react-dialog';
import {
  formatTime,
  formatDistance,
  getActivityTypeConfig,
} from '@/utils/calendar';

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

  console.log(activity);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white p-6 rounded-lg shadow-xl z-50 w-96 max-w-[90vw]">
        <div className="flex justify-between items-start mb-4">
          <Dialog.Title className="text-lg font-semibold">
            {activity.name || 'Activity'}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="text-slate-400 hover:text-white w-6 h-6 flex items-center justify-center">
              ×
            </button>
          </Dialog.Close>
        </div>

        <div className="space-y-3">
          {/* Activity Type Badge */}
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: typeConfig.backgroundColor,
              color: typeConfig.color,
            }}
          >
            {activity.type || 'Activity'}
          </div>

          {/* Date */}
          <div>
            <span className="text-slate-400">Date: </span>
            <span>{formatDate(activity.start_date)}</span>
          </div>

          {/* Duration */}
          {activity.moving_time && (
            <div>
              <span className="text-slate-400">Duration: </span>
              <span>{formatTime(toNumber(activity.moving_time))}</span>
            </div>
          )}

          {/* Distance */}
          {activity.distance && toNumber(activity.distance) > 0 && (
            <div>
              <span className="text-slate-400">Distance: </span>
              <span>{formatDistance(toNumber(activity.distance))}</span>
            </div>
          )}

          {/* TSS */}
          {activity.icu_training_load && (
            <div>
              <span className="text-slate-400">Training Load (TSS): </span>
              <span>{Math.round(toNumber(activity.icu_training_load))}</span>
            </div>
          )}

          {/* Average Power */}
          {activity.icu_average_watts && (
            <div>
              <span className="text-slate-400">Average Power: </span>
              <span>{Math.round(toNumber(activity.icu_average_watts))}W</span>
            </div>
          )}

          {/* Average Heart Rate */}
          {activity.average_heartrate && (
            <div>
              <span className="text-slate-400">Average HR: </span>
              <span>
                {Math.round(toNumber(activity.average_heartrate))} bpm
              </span>
            </div>
          )}

          {/* Description */}
          {activity.description && (
            <div>
              <span className="text-slate-400">Description: </span>
              <p className="text-sm mt-1 text-slate-200">
                {activity.description}
              </p>
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

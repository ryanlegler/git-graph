import { Props } from 'react-activity-calendar';

// we can just infer the options like this - easier than trying to match them exactly
export type ActivityCalendarConfigProps = Omit<Props, 'data'>;

// export type ActivityCalendarConfigProps = {
//     blockMargin?: number;
//     blockRadius?: number;
//     blockSize?: number;
//     colorScheme?: 'light' | 'dark';
//     // eventHandlers?: EventHandlerMap;
//     fontSize?: number;
//     hideColorLegend?: boolean;
//     hideMonthLabels?: boolean;
//     hideTotalCount?: boolean;
//     maxLevel?: number;
//     // loading?: boolean;
//     showWeekdayLabels?: boolean;
//     // import { Day as WeekDay } from 'date-fns';
//     // weekStart?: WeekDay;
// };

export type ControlsProps = {
    years: number[];
    username: string;
};

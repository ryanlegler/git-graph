import { atom } from 'jotai';

import { ActivityCalendarConfigProps } from './components/controls/types';
export const hideColorLegendAtom = atom<boolean>(false);

export const OPTIONS_DEFAULTS: ActivityCalendarConfigProps = {
    showWeekdayLabels: false,
    colorScheme: 'dark',
    hideColorLegend: false,
    hideMonthLabels: false,
    hideTotalCount: false,
    blockMargin: 4,
    blockRadius: 2,
    blockSize: 12,
    fontSize: 14,
    maxLevel: 4,
    weekStart: 0,
};
export const optionsAtom = atom<ActivityCalendarConfigProps>(OPTIONS_DEFAULTS);

export const controlsVisibilityAtom = atom<boolean>(false);

export const selectedYearAtom = atom<number>(new Date().getFullYear());

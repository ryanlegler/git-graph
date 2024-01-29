import { Props as ActivityCalendarProps } from 'react-activity-calendar';

import { Contributions } from '@/dataLayer/getContributions';
export type GraphListProps = {
    contributions: Contributions;
    username: string;
    avatarUrl: string;
    currentYear: number;
    shouldResetYear?: boolean;
} & Omit<ActivityCalendarProps, 'data'>;

import { Activity } from 'react-activity-calendar';

export type BuilderProps = {
    data?: Activity[];
    years?: string[];
    year: string;
};

import { z } from 'zod';

export const userNameSchema = z
    .string()
    .min(1, 'Please enter at least 1 character')
    .regex(/^\S+$/, 'White space is not allowed');

export type UserNameSchema = z.infer<typeof userNameSchema>;

export type SearchParamOptions = {
    blockMargin?: string;
    blockRadius?: string;
    blockSize?: string;
    colorScheme?: 'dark' | 'light';
    fontSize?: string;
    showColorLegend?: 'true' | 'false';
    showMonthLabels?: 'true' | 'false';
    showTotalCount?: 'true' | 'false';
    showWeekdayLabels?: string;
    year?: string;
};

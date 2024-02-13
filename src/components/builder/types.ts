import { Activity } from 'react-activity-calendar';

export type BuilderProps = {
    data?: Activity[];
    year: string;
};

import { z } from 'zod';

export const userNameSchema = z
    .string()
    .min(1, 'Please enter at least 1 character')
    .regex(/^\S+$/, 'White space is not allowed');

export type UserNameSchema = z.infer<typeof userNameSchema>;

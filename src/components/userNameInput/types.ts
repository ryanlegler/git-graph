import { z } from 'zod';

export const userNameSchema = z
    .string()
    .min(1, 'Please enter at least 1 character')
    .regex(/^\S+$/, 'White space is not allowed');

export type UserNameSchema = z.infer<typeof userNameSchema>;

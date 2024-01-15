import { z } from 'zod';

export const userNameSchema = z.object({
    userName: z.string().min(1, 'at least 1 character'),
});

export type UserNameSchema = z.infer<typeof userNameSchema>;

export type UserNameInputState = {
    status: 'idle' | 'success' | 'error';
    message: string;
    data: string;
};

import { User } from '@/app/types';

export type UserResponse = User & { message: string };
export async function getProfile(username: string) {
    const dataFetch = await fetch(`https://api.github.com/users/${username}`);
    const profile: User = await dataFetch.json();
    return profile;
}

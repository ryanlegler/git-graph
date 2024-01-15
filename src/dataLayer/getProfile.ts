import { User } from '@/app/types';

export async function getProfile(username: string) {
    const dataFetch = await fetch(`https://api.github.com/users/${username}`);
    const profile: User | { message: string } = await dataFetch.json();
    return profile;
}

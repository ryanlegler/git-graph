import { User } from '@/app/types';
export type UserResponse = User & { message: string };

export async function getProfile(username: string) {
    const headers = new Headers();
    headers.append('Authorization', `token ${process.env.GITHUB_TOKEN}`);
    const dataFetch = await fetch(`https://api.github.com/users/${username}`, { headers });
    const profile: User = await dataFetch.json();
    return profile;
}

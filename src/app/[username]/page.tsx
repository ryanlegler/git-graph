'use client';
import { useParams } from 'next/navigation';
import GitHubCalendar from 'react-github-calendar';

export default function UserPage() {
    const { username } = useParams() as { username: string };
    return (
        <main>
            <GitHubCalendar username={username} />
        </main>
    );
}

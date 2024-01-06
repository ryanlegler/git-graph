'use client';
import GitHubCalendar from 'react-github-calendar';

export default function Home() {
    const colorScale = ['#00429d', '#1f58a6', '#376ead', '#ffa59e', '#dd4c65'];
    return (
        <main>
            <GitHubCalendar username='ryanlegler' />
            <GitHubCalendar
                username='rttnbrgr'
                theme={{
                    light: colorScale,
                    dark: colorScale,
                }}
            />
        </main>
    );
}

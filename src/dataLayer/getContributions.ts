import { Activity } from 'react-activity-calendar';
import { ContributionCalendar } from './types';
import { getLevel } from './utils';

export async function getContributions({
    userName,
    year,
}: {
    userName: string;
    year: string;
}): Promise<Activity[]> {
    try {
        const headers = {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        };
        const body = {
            query: `query {
               user(login: "${userName}") {
                contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                contributionLevel
                            }
                        }
                    }
                }
              }
            }`,
        };
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers,
        });
        const data = await response.json();

        const { contributionCalendar } = data?.data?.user?.contributionsCollection as {
            contributionYears: string[];
            contributionCalendar: ContributionCalendar;
        };

        return contributionCalendar.weeks.flatMap((week) =>
            week.contributionDays.map((day) => ({
                date: day.date,
                count: day.contributionCount,
                level: getLevel(day.contributionLevel),
            }))
        );
    } catch (e) {
        return [];
    }
}

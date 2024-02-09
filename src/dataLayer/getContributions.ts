import groupBy from 'lodash/groupBy';
import { Activity } from 'react-activity-calendar';

export type Contributions = {
    [key: string]: Activity[];
};

export async function getContributions({
    userName,
    year,
}: {
    userName: string;
    year: string | 'last' | 'all';
}) {
    console.log('year', year);
    const data = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${userName}?y=${year}`
    );
    const { contributions } = await data.json();
    const result: Contributions = groupBy(contributions, function (item) {
        return item.date.split('-')[0];
    });
    return result?.[year] || [];
}

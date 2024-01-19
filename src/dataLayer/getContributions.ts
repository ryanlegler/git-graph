import groupBy from 'lodash/groupBy';
import { Activity } from 'react-activity-calendar';

export type Contributions = {
    [key: string]: Activity[];
};

export async function getContributions(username: string) {
    const data = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
    const { contributions } = await data.json();
    const result: Contributions = groupBy(contributions, function (item) {
        return item.date.split('-')[0];
    });
    return result;
}

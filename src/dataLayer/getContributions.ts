import groupBy from 'lodash/groupBy';
import { Activity } from 'react-activity-calendar';

export type ContributionsByYear = {
    [key: string]: Activity[];
};
export type Contributions = Activity[];

export async function getContributions(username: string) {
    const data = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
    const { contributions }: { contributions: Contributions } = await data.json();

    const result: ContributionsByYear = groupBy(contributions, function (item) {
        return item.date.split('-')[0];
    });
    return { contributionsByYear: result, contributions };
}

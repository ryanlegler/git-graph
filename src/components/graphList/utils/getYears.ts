import { Contributions } from '@/dataLayer/getContributions';

export function getYears(contributions: Contributions) {
    return Object.keys(contributions)
        ?.map((year) => Number(year))
        .reverse();
}

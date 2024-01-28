import { ContributionsByYear } from '@/dataLayer/getContributions';

export function getYears(contributions: ContributionsByYear) {
    return Object.keys(contributions)
        ?.map((year) => Number(year))
        .reverse();
}

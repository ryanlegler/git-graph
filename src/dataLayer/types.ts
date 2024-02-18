export type ContributionDay = {
    date: string;
    contributionCount: number;
    contributionLevel:
        | 'NONE'
        | 'FIRST_QUARTILE'
        | 'SECOND_QUARTILE'
        | 'THIRD_QUARTILE'
        | 'FOURTH_QUARTILE';
    color: string;
};

export type ContributionCalendar = {
    weeks: Week[];
};

export interface Week {
    contributionDays: ContributionDay[];
}

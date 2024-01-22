import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getContributions } from '@/dataLayer/getContributions';
import { PageProps } from '@/app/types';
import { AtomProvider } from '../AtomProvider';
import { getYears } from '@/components/graphList/utils/getYears';

export type SearchParamOptions = {
    blockMargin?: string;
    blockRadius?: string;
    blockSize?: string;
    colorScheme?: 'dark' | 'light';
    fontSize?: string;
    hideColorLegend?: 'true' | 'false';
    hideMonthLabels?: 'true' | 'false';
    hideTotalCount?: 'true' | 'false';
    showWeekdayLabels?: string;
    years?: string;
};

type UsersPageProps = PageProps & {
    searchParams: SearchParamOptions;
    // need to type all the other searchParams here
};

export default async function UserPage({ params: { username }, searchParams }: UsersPageProps) {
    const profile = await getProfile(username);
    const contributions = await getContributions(username);
    const years = getYears(contributions);
    return (
        <AtomProvider searchParams={searchParams} years={years}>
            <GraphList
                contributions={contributions}
                username={username}
                avatarUrl={profile.avatar_url}
            />
        </AtomProvider>
    );
}

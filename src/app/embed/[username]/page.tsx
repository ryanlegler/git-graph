import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getContributions } from '@/dataLayer/getContributions';
import { PageProps } from '@/app/types';

type UsersPageProps = PageProps & {
    searchParams: { hideColorLegend: 'true' | 'false' };
    // need all the other options here
};
export default async function UserPage({ params: { username }, searchParams }: UsersPageProps) {
    const profile = await getProfile(username);
    const contributions = await getContributions(username);
    const { hideColorLegend } = searchParams;

    return (
        <GraphList
            hideColorLegend={hideColorLegend === 'true'}
            contributions={contributions}
            username={username}
            avatarUrl={profile.avatar_url}
        />
    );
}

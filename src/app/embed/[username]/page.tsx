import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getYears } from '@/dataLayer/getYears';

export default async function UserPage({
    params: { username },
    searchParams,
}: {
    params: { username: string };
    searchParams: { hideColorLegend: 'true' | 'false' };
}) {
    const profile = await getProfile(username);
    const years = await getYears(username);

    const { hideColorLegend } = searchParams;

    return (
        <GraphList
            hideColorLegend={hideColorLegend === 'true'}
            years={years}
            username={username}
            avatarUrl={profile.avatar_url}
        />
    );
}

import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getContributions } from '@/dataLayer/getContributions';
export default async function UserPage({
    params: { username },
    searchParams,
}: {
    params: { username: string };
    searchParams: { hideColorLegend: 'true' | 'false' };
}) {
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

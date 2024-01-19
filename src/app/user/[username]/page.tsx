import { GraphList } from '@/components/graphList';
import { getProfile } from '@/dataLayer/getProfile';
import { StyledFlex } from '@/components/ui/flex';
import { Controls } from '@/components/controls';
import { getContributions } from '@/dataLayer/getContributions';

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
    const profile = await getProfile(username);
    const contributions = await getContributions(username);

    return (
        <StyledFlex direction='vertical' hAlign='center'>
            <Controls />
            <GraphList
                contributions={contributions}
                username={username}
                avatarUrl={profile.avatar_url}
            />
        </StyledFlex>
    );
}

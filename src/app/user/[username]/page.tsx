import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getYears } from '@/dataLayer/getYears';
import { StyledFlex } from '@/components/ui/flex';
import { Controls } from '@/components/controls';

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
    const profile = await getProfile(username);
    const years = await getYears(username);

    return (
        <StyledFlex direction='vertical' hAlign='center'>
            <Controls />
            <GraphList years={years} username={username} avatarUrl={profile.avatar_url} />
        </StyledFlex>
    );
}

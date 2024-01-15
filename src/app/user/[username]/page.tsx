import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getYears } from '@/dataLayer/getYears';
import { StyledFlex } from '@/components/ui/flex';

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
    const profile = await getProfile(username);
    const years = await getYears(username);

    return (
        <StyledFlex direction='horizontal' hAlign='center'>
            <GraphList years={years} username={username} avatarUrl={profile.avatar_url} />
        </StyledFlex>
    );
}

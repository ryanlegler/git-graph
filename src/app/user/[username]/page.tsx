import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getYears } from '@/dataLayer/getYears';
import { StyledFlex } from '@/components/ui/flex';
import { GraphListWrapper } from '@/components/graphList/GraphList';

type Props = {
    params: { username: string };
};

export async function generateMetadata({ params }: Props) {
    return {
        title: `${params.username} (GitGraph)`,
    };
}

export default async function UserPage({ params: { username } }: Props) {
    const profile = await getProfile(username);
    const years = await getYears(username);

    return (
        <StyledFlex direction='vertical' hAlign='center'>
            <GraphListWrapper years={years} username={username} avatarUrl={profile.avatar_url} />
            {/* <GraphList years={years} username={username} avatarUrl={profile.avatar_url} /> */}
        </StyledFlex>
    );
}

import { GraphList } from '@/components/graphList';

import { getProfile } from '@/dataLayer/getProfile';
import { getYears } from '@/dataLayer/getYears';
import { StyledFlex } from '@/components/ui/flex';

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
            {years.map((year) => (
                <span key={year}>{year}</span>
            ))}
            <GraphList years={years} username={username} avatarUrl={profile.avatar_url} />
        </StyledFlex>
    );
}

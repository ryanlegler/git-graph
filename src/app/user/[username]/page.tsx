import { GraphList } from '@/components/graphList';
import { getProfile } from '@/dataLayer/getProfile';
import { StyledFlex } from '@/components/ui/flex';
import { Controls } from '@/components/controls';
import { getContributions } from '@/dataLayer/getContributions';
import { Suspense } from 'react';
import { PageProps } from '@/app/types';

export async function generateMetadata({ params }: PageProps) {
    return {
        title: `${params.username} (GitGraph)`,
    };
}

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
    const profile = await getProfile(username);
    const contributions = await getContributions(username);

    return (
        <StyledFlex direction='vertical' hAlign='center'>
            <Controls />
            <Suspense fallback={<div>loading...</div>}>
                <GraphList
                    contributions={contributions}
                    username={username}
                    avatarUrl={profile.avatar_url}
                />
            </Suspense>
        </StyledFlex>
    );
}

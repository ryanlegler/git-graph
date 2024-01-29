import { GraphList } from '@/components/graphList';
import { getProfile } from '@/dataLayer/getProfile';
import { StyledFlex } from '@/components/ui/flex';
import { Controls } from '@/components/controls';
import { getContributions } from '@/dataLayer/getContributions';
import { Suspense } from 'react';
import { PageProps } from '@/app/types';
import { getYears } from '@/components/graphList/utils/getYears';
import { YearsAtomProvider } from '../YearsAtomProvider';

export async function generateMetadata({ params }: PageProps) {
    return {
        title: `${params.username} (GitGraph)`,
    };
}

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
    const profile = await getProfile(username);
    const contributions = await getContributions(username);
    const availableYears = getYears(contributions);
    const currentYear = availableYears?.[0];

    return (
        <StyledFlex direction='vertical' hAlign='center'>
            <YearsAtomProvider initialYear={currentYear}>
                <Controls availableYears={availableYears} username={username} />
                <Suspense fallback={<div>loading...</div>}>
                    <GraphList
                        shouldResetYear
                        currentYear={currentYear}
                        contributions={contributions}
                        username={username}
                        avatarUrl={profile.avatar_url}
                    />
                </Suspense>
            </YearsAtomProvider>
        </StyledFlex>
    );
}

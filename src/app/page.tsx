import { Builder } from '@/components/builder';
import { getContributions } from '@/dataLayer/getContributions';
import { getContributionsYears } from '@/dataLayer/getContributionsYears';

import { getZeroFilledContributions } from '@/lib/utils';
import { Provider } from 'jotai';

export default async function Home({
    searchParams,
}: {
    searchParams: { userName: string; year: string };
}) {
    const { userName, year } = searchParams || {};

    // // this API only gives me the most recent two years of data
    // // we use this data
    // const { years, contributions } = await getContributions({ userName });

    const years = await getContributionsYears({ userName });

    const resolvedYear = year || years?.[0];

    const data = await getContributions({ userName, year: resolvedYear });

    const resolvedData = data?.length ? getZeroFilledContributions(data) : [];

    return (
        <Provider>
            <Builder data={userName ? resolvedData : undefined} year={resolvedYear} years={years} />
            ;
        </Provider>
    );
}

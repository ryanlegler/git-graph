// import { getContributions } from '@/dataLayer/getContributions';
// import { getContributionsYears } from '@/dataLayer/getContributionsYears';
import { getHydratedSearchParams } from '../hooks/useHydrateSearchParams';
import { Graph } from '@/components/graph';
import { SearchParamOptions } from '@/components/builder/types';
import { getContributions } from '@/dataLayer/getContributions';
import { getZeroFilledContributions } from '@/lib/utils';
import { InferredOptions } from '@/components/controls/types';

export default async function Embed({
    searchParams,
    params,
}: {
    params: { username: string };
    searchParams: SearchParamOptions;
}) {
    const { year, ...rest } = searchParams || {};
    const { username } = params || {};
    const options: InferredOptions = getHydratedSearchParams(rest) as InferredOptions;
    const resolvedYear = year || new Date().getFullYear().toString();
    const data = await getContributions({ userName: username, year: resolvedYear });

    const resolvedData = data?.length ? getZeroFilledContributions(data) : [];

    return <Graph data={resolvedData} options={options} />;
}

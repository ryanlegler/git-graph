import { getContributions } from '@/dataLayer/getContributions';
import { getHydratedSearchParams } from '../hooks/useHydrateSearchParams';
import { Graph } from '@/components/graph';
import { SearchParamOptions } from '@/components/builder/types';

export default async function Embed({
    searchParams,
    params,
}: {
    params: { userName: string };
    searchParams: SearchParamOptions;
}) {
    const { year, ...rest } = searchParams || {};
    const { userName } = params || {};
    const options = getHydratedSearchParams(rest);
    const resolvedYear = year || new Date().getFullYear().toString();
    const data = await getContributions({ userName, year: resolvedYear });
    return <Graph data={data} options={options} />;
}

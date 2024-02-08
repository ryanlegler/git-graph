import { getContributions } from '@/dataLayer/getContributions';
import { getHydratedSearchParams } from '../hooks/useHydrateSearchParams';
import { Graph } from '@/components/graph';
export type SearchParamOptions = {
    blockMargin?: string;
    blockRadius?: string;
    blockSize?: string;
    colorScheme?: 'dark' | 'light';
    fontSize?: string;
    hideColorLegend?: 'true' | 'false';
    hideMonthLabels?: 'true' | 'false';
    hideTotalCount?: 'true' | 'false';
    showWeekdayLabels?: string;
    year?: string;
};

export default async function Embed({
    searchParams,
    params,
}: {
    params: { username: string } & SearchParamOptions;
    searchParams: SearchParamOptions;
}) {
    const { year, ...rest } = searchParams || {};
    const { username } = params || {};
    const options = getHydratedSearchParams(rest);
    const resolvedYear = year || new Date().getFullYear().toString();
    const data = await getContributions({ userName: username, year: resolvedYear });
    return <Graph data={data} options={options} />;
}

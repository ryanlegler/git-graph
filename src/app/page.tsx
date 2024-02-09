import { Builder } from '@/components/builder';
import { getContributions } from '@/dataLayer/getContributions';

export default async function Home({
    searchParams,
}: {
    searchParams: { userName: string; year: string };
}) {
    const { userName, year } = searchParams || {};
    const resolvedYear = year || new Date().getFullYear().toString();
    const data = await getContributions({ userName, year: resolvedYear });

    return <Builder userName={userName} data={userName ? data : undefined} year={year} />;
}

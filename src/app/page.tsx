import { Builder } from "@/components/builder";
import { getContributions } from "@/dataLayer/getContributions";

export default async function Home({
    searchParams,
}: {
    searchParams: { userName: string; year: string };
}) {
    const { userName, year } = searchParams || {};
    const data = await getContributions({ userName, year });

    return <Builder userName={userName} data={data} />;
}

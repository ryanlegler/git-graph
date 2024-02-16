import { headers } from 'next/headers';
import { getHydratedSearchParams } from '../../embed/hooks/useHydrateSearchParams';
import { SearchParamOptions } from '@/components/builder/types';

export default async function Preview({
    params,
    searchParams,
}: {
    params: { username: string };
    searchParams: SearchParamOptions;
}) {
    const { username } = params;
    const headersList = headers();
    const domain = headersList.get('host') || '';
    const paramsString = new URLSearchParams(getHydratedSearchParams(searchParams)).toString();
    const url = `http://${domain}/embed/${username}?${paramsString}`;
    return (
        <div className='flex gap-10 flex-col justify-center items-center h-screen'>
            <h1 className='text-3xl font-bold'>Preview</h1>
            <iframe frameBorder='0' height='200px' width='692px' src={url}></iframe>
        </div>
    );
}

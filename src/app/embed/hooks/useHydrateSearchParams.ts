// TODO - add better type safe param tooling here. - this is gross
export function useHydrateSearchParams(searchParams: Record<string, string>): Record<string, any> {
    const params: Record<string, any> = {};
    for (const [key, value] of Object.entries(searchParams)) {
        if (value === 'true') {
            params[key] = true;
        } else if (value === 'false') {
            params[key] = false;
        } else if (!isNaN(Number(value))) {
            params[key] = Number(value);
        } else if (value.includes(',')) {
            params[key] = value.split(',').map((year) => Number(year));
        } else {
            params[key] = value;
        }
    }
    return params;
}

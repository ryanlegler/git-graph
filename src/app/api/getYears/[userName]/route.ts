import { NextRequest } from 'next/server';

// I should just use this to get all the data - put it up front and then filter it on the client side
export async function GET(_: NextRequest, { params }: any) {
    try {
        const { userName } = params;
        const headers = {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        };
        const body = {
            query: `query {
               user(login: "${userName}") {
                contributionsCollection {
                  contributionYears
                }
              }
            }`,
        };
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers,
        });
        const data = await response.json();

        const years = data?.data?.user?.contributionsCollection?.contributionYears;

        return new Response(JSON.stringify(years), {
            status: 200,
        });
    } catch (e) {
        return new Response('Request cannot be processed!', {
            status: 400,
        });
    }
}

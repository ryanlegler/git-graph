export async function getContributionsYears({ userName }: { userName: string }): Promise<string[]> {
    try {
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

        const { contributionYears } = data?.data?.user?.contributionsCollection as {
            contributionYears: string[];
        };

        return contributionYears.map((year) => year.toString());
    } catch (e) {
        return [];
    }
}

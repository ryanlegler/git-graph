export async function getYears(username: string) {
    const data = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
    const contributions = await data.json();

    const years =
        contributions?.total &&
        Object.keys(contributions.total)
            .map((year) => Number(year))
            .reverse();

    return years || [];
}

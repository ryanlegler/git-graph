/* eslint-disable @next/next/no-img-element */
'use client';
import ActivityCalendar, { Props as ActivityCalendarProps } from 'react-activity-calendar';
import { css } from 'styled-system/css';

import Link from 'next/link';
import { StyledFlex } from '@components/ui/flex';
import { useMemo } from 'react';
import { hideColorLegendAtom } from '@/atoms';
import { useAtom } from 'jotai';
import { Contributions } from '@/dataLayer/getContributions';

export function GraphList({
    username,
    avatarUrl,
    contributions,
    hideColorLegend: hideColorLegendStatic, // this static value is picked up by params in the /user routed as passed as props
}: {
    contributions: Contributions;
    username: string;
    avatarUrl: string;
} & Omit<ActivityCalendarProps, 'data'>) {
    const [hideColorLegend] = useAtom(hideColorLegendAtom);

    // we use the static value if it's passed in, otherwise we use the dynamic value from the atom
    const resolvedHideColorLegend = hideColorLegendStatic || hideColorLegend;

    const years = useMemo(
        () =>
            Object.keys(contributions)
                .map((year) => Number(year))
                .reverse(),
        [contributions]
    );

    const colorScale = ['#00429d', '#1f58a6', '#376ead', '#ffa59e', '#dd4c65'];

    return (
        <StyledFlex direction='vertical' gap={6}>
            <StyledFlex vAlign='middle' direction='horizontal' gap={4}>
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={username}
                        className={css({
                            height: '50px',
                            width: '50px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                        })}
                    />
                ) : null}
                <Link
                    target='_blank'
                    href={`https://github.com/${username}`}
                    className={css({
                        fontSize: 30,
                        fontWeight: 700,
                    })}>
                    {username}
                </Link>
            </StyledFlex>

            {years.map((year) => (
                <div key={year}>
                    <h3
                        className={css({
                            fontSize: 18,
                            fontWeight: 900,
                        })}>
                        {year}
                    </h3>
                    <ActivityCalendar
                        theme={{ light: colorScale, dark: colorScale }}
                        data={contributions[year]}
                        hideColorLegend={resolvedHideColorLegend}
                    />
                </div>
            ))}
        </StyledFlex>
    );
}

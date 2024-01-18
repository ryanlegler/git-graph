/* eslint-disable @next/next/no-img-element */
'use client';
import GitHubCalendar from 'react-github-calendar';
import { css } from 'styled-system/css';

import Link from 'next/link';
import { StyledFlex } from '@components/ui/flex';
import { ComponentProps } from 'react';
import { hideColorLegendAtom } from '@/atoms';
import { useAtom } from 'jotai';

export function GraphList({
    years,
    username,
    avatarUrl,
    hideColorLegend: hideColorLegendStatic, // this static value is picked up by params in the /user routed as passed as props
}: {
    years: number[];
    username: string;
    avatarUrl: string;
} & ComponentProps<typeof GitHubCalendar>) {
    const [hideColorLegend] = useAtom(hideColorLegendAtom);

    // we use the static value if it's passed in, otherwise we use the dynamic value from the atom
    const resolvedHideColorLegend = hideColorLegendStatic || hideColorLegend;

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
                    <GitHubCalendar
                        username={username}
                        year={year}
                        hideColorLegend={resolvedHideColorLegend}
                    />
                </div>
            ))}
        </StyledFlex>
    );
}

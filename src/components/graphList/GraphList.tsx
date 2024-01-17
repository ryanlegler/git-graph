'use client';
import GitHubCalendar from 'react-github-calendar';
import { css } from 'styled-system/css';

import Link from 'next/link';
import { StyledFlex } from '../ui/flex';
import { Button } from '../ui/button';

export function GraphList({
    years,
    username,
    avatarUrl,
}: {
    years: number[];
    username: string;
    avatarUrl: string;
}) {
    return (
        <StyledFlex direction='vertical' gap={6}>
            <Link href='/'>
                <Button variant='secondary'>Back</Button>
            </Link>
            <StyledFlex vAlign='middle' direction='horizontal' gap={4}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    <GitHubCalendar username={username} year={year} />
                </div>
            ))}
        </StyledFlex>
    );
}

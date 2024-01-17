'use client';
import GitHubCalendar from 'react-github-calendar';
import { css } from 'styled-system/css';

import Link from 'next/link';
import { StyledFlex } from '../ui/flex';
import { Button } from '../ui/button';
import { StyledButton } from '../userNameInput/styledComponents';
import { Switch, SwitchProps } from '@/components/ui/switch';
import { useState } from 'react';

type GraphListProps = {
    years: number[];
    username: string;
    avatarUrl: string;
};

export function GraphList({ years = [], username, avatarUrl }: GraphListProps) {
    const [renderYears, setRenderYears] = useState(years);

    return (
        <StyledFlex direction='vertical' gap={6}>
            <StyledFlex direction='vertical' gap={1} bg='red'>
                {years.map((year) => (
                    <div key={year}>
                        <Switch
                            defaultChecked
                            checked={renderYears.includes(year)}
                            onCheckedChange={(e) => {
                                setRenderYears((prev) => {
                                    const findIndex = prev.indexOf(year);
                                    console.log('checked', year, findIndex);

                                    // Copy state so we can modify
                                    const clonePrev = [...renderYears];

                                    // If year not included
                                    if (findIndex === -1) {
                                        // Add it
                                        clonePrev.push(year);
                                        // Sort
                                        clonePrev.sort((a, b) => b - a);
                                        return clonePrev;
                                    }
                                    // Otherwise
                                    else {
                                        // Remove
                                        clonePrev.splice(findIndex, 1);
                                        console.log('clonePrev', clonePrev, prev);
                                        // and return
                                        return clonePrev;
                                    }
                                });
                            }}>
                            {year}
                        </Switch>
                    </div>
                ))}
            </StyledFlex>
            <span>the render years</span>
            <StyledFlex direction='horizontal' gap={3} p={3} bg='blue.8'>
                {renderYears.map((year) => (
                    <span key={year}>{year}</span>
                ))}
            </StyledFlex>
            <Link href='/'>
                <StyledButton flavor='secondary'>Back</StyledButton>
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

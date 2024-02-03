'use client';

/* eslint-disable @next/next/no-img-element */
import { LegacyRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { useAtom, useAtomValue } from 'jotai/react';
import { optionsAtom, selectedYearAtom } from '@/atoms';
import ActivityCalendar from 'react-activity-calendar';
import { StyledFlex } from '@components/ui/flex';
import { GraphListProps } from './types';
import { useMeasure } from 'react-use';

export function GraphList({
    username,
    avatarUrl,
    contributions,
    currentYear,
    shouldResetYear,
}: GraphListProps) {
    // I Started getting hydration errors - not sure why it wasn't happening before.
    // This component is marked as "use client" but the component but next will still pre-rendering it on the server.
    // This is a hack to get around it for now, as recommended here:
    // https://nextjs.org/docs/messages/react-hydration-error
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const controlsOptions = useAtomValue(optionsAtom);
    const [selectedYear, setYears] = useAtom(selectedYearAtom);

    // username changes we need to resync the years to the current years
    // this is because the years are stored in the jotai provider and don't get reset when we change user.
    // shouldResetYear - is a hack to get around the fact that this was also running on the embed page
    useEffect(() => {
        if (username && shouldResetYear) {
            setYears(currentYear);
        }
    }, [username, currentYear, setYears, shouldResetYear]);

    const colorScaleDark = ['#00429d', '#1f58a6', '#376ead', '#ffa59e', '#dd4c65'];
    const colorScaleLight = ['#f9ed69', '#f08a5d', '#b83b5e', '#6a2c70', '#3c1642'];

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
                    })}
                >
                    {username}
                </Link>
            </StyledFlex>

            {isClient ? (
                <ActivityCalendar
                    theme={{ light: colorScaleLight, dark: colorScaleDark }}
                    data={contributions?.[selectedYear] || []}
                    {...controlsOptions}
                />
            ) : null}
        </StyledFlex>
    );
}

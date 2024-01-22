'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { useAtomValue } from 'jotai/react';
import { optionsAtom, renderYearsAtom } from '@/atoms';

import ActivityCalendar, { Props as ActivityCalendarProps } from 'react-activity-calendar';

import { StyledFlex } from '@components/ui/flex';
import { Contributions } from '@/dataLayer/getContributions';

export function GraphList({
    username,
    avatarUrl,
    contributions,
}: {
    contributions: Contributions;
    username: string;
    avatarUrl: string;
} & Omit<ActivityCalendarProps, 'data'>) {
    // I Started getting hydration errors - not sure why it wasn't happening before.
    // This component is marked as "use client" but the component but next will still pre-rendering it on the server.
    // This is a hack to get around it for now, as recommended here:
    // https://nextjs.org/docs/messages/react-hydration-error
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const controlsOptions = useAtomValue(optionsAtom);
    const years = useAtomValue(renderYearsAtom) || [];

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

            {years?.map((year) => (
                <div key={year}>
                    <h3
                        className={css({
                            fontSize: 18,
                            fontWeight: 900,
                        })}
                    >
                        {year}
                    </h3>

                    {isClient ? (
                        <ActivityCalendar
                            theme={{ light: colorScaleLight, dark: colorScaleDark }}
                            data={contributions[year]}
                            {...controlsOptions}
                        />
                    ) : null}
                </div>
            ))}
        </StyledFlex>
    );
}

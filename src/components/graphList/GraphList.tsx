'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { useAtomValue } from 'jotai/react';
import { optionsAtom, selectedYearsAtom } from '@/atoms';

import ActivityCalendar, { Props as ActivityCalendarProps } from 'react-activity-calendar';

import { StyledFlex } from '@components/ui/flex';
import { Contributions, ContributionsByYear } from '@/dataLayer/getContributions';

export function GraphList({
    username,
    avatarUrl,
    contributionsByYear,
    contributions,
}: {
    contributionsByYear: ContributionsByYear;
    contributions: Contributions;
    username: string;
    avatarUrl: string;
} & Omit<ActivityCalendarProps, 'data'>) {
    // I Started getting hydration errors - not sure why it wasn't happening before.
    // This component is marked as "use client" but the component but next will still pre-render it on the server
    // and the component is unsafely accessing a dom API
    // This is a hack to get around it for now, as recommended here:
    // https://nextjs.org/docs/messages/react-hydration-error
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const controlsOptions = useAtomValue(optionsAtom);
    const years = useAtomValue(selectedYearsAtom) || [];

    const currentContributionsByLast365 = contributions.filter((contribution) => {
        // from data should be one year before the to date
        const today = new Date();

        const todayNumber = today.valueOf();
        const fromDateNumber = today.setFullYear(today.getFullYear() - 1).valueOf();
        const currentDateNumber = new Date(contribution.date).valueOf();
        return currentDateNumber >= fromDateNumber && currentDateNumber <= todayNumber;
    });

    const currentContributionsBySelectedYear = contributionsByYear?.[years?.[0]];

    console.log('currentContributionsBySelectedYear', currentContributionsBySelectedYear);

    console.log('currentContributionsByLast365', currentContributionsByLast365);

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
                    data={currentContributionsByLast365}
                    // data={currentContributionsByLast365}
                    {...controlsOptions}
                />
            ) : null}
        </StyledFlex>
    );
}

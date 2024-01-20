'use client';
import GitHubCalendar, { Props as GitHubCalendarProps } from 'react-github-calendar';
import { Props as ActivityCalendarProps } from 'react-activity-calendar';
import { css } from 'styled-system/css';

import Link from 'next/link';
import { StyledFlex } from '../ui/flex';
import { Button } from '../ui/button';
import { StyledButton } from '../userNameInput/styledComponents';
import { Switch, SwitchProps } from '@/components/ui/switch';
import { Slider, type SliderProps } from '@/components/ui/slider';
import { ReactNode, useState } from 'react';
import { Box, Flex, Grid } from 'styled-system/jsx';

type GraphListWrapperProps = {
    years: number[];
    username: string;
    avatarUrl: string;
};

type ActivityCalendarConfigProps = {
    blockMargin?: number;
    blockRadius?: number;
    blockSize?: number;
    colorScheme?: 'light' | 'dark';
    // eventHandlers?: EventHandlerMap;
    fontSize?: number;
    hideColorLegend?: boolean;
    hideMonthLabels?: boolean;
    hideTotalCount?: boolean;
    maxLevel?: number;
    // loading?: boolean;
    showWeekdayLabels?: boolean;
    // import { Day as WeekDay } from 'date-fns';
    // weekStart?: WeekDay;
};

const SwitchLabel = ({ children }: { children: string | ReactNode }) => (
    <span
        className={css({
            fontSize: 'md',
            color: 'white',
        })}>
        {children}
    </span>
);

// Not sure what to call;
// this allows us to manage page level state
// Would put in the page, but app routing
export function GraphListWrapper(props: GraphListWrapperProps) {
    const { years = [], username, avatarUrl } = props;

    const [renderYears, setRenderYears] = useState(years);

    // Boolean Controls
    const [showWeekdayLabels, setShowWeekdayLabels] = useState(false);
    const [useLightMode, setUseLightMode] = useState<'light' | 'dark'>('dark');
    const [hideColorLegend, setHideColorLegend] = useState(false);
    const [hideMonthLabels, setHideMonthLabels] = useState(false);
    const [hideTotalCount, setHideTotalCount] = useState(false);

    // Slider Controls
    const [blockMargin, setBlockMargin] = useState(4);
    const [blockRadius, setBlockRadius] = useState(2);
    const [blockSize, setBlockSize] = useState(12);
    const [fontSize, setFontSize] = useState(14); // 32
    const [maxLevel, setMaxLevel] = useState(4); // Seems to not be updating
    const [weekStart, setWeekStart] = useState(0);

    // All controls
    const allConfigProps = {
        showWeekdayLabels,
        colorScheme: useLightMode,
        hideColorLegend,
        hideMonthLabels,
        hideTotalCount,
        blockMargin,
        blockRadius,
        blockSize,
        fontSize,
        maxLevel,
        // TS unhappy with this right now; control does seem to work
        // weekStart,
    };

    return (
        <StyledFlex direction='vertical' gap={6}>
            <StyledFlex direction='vertical' gap={1} bg='red'>
                <Grid gridTemplateColumns={[1, 2, 4]}>
                    {years.map((year) => {
                        const isDisabled = renderYears.includes(year) && renderYears.length === 1;
                        return (
                            <Box key={year} display={'flex'} flexDir={'row'} gap={1}>
                                <Switch
                                    defaultChecked
                                    disabled={isDisabled}
                                    checked={renderYears.includes(year)}
                                    onCheckedChange={(e) => {
                                        setRenderYears((prev) => {
                                            if (prev.length === 1) {
                                                console.log('🚨 1 Year Required');
                                            }

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
                                {/* I'm done fighting panda/park ui */}
                                {isDisabled && <span>this is disabled</span>}
                            </Box>
                        );
                    })}
                </Grid>
            </StyledFlex>
            <div>hey</div>
            <div>
                <h2 className={css({ fontSize: 30, fontWeight: 700 })}>Controls</h2>
                <Grid gridTemplateColumns={[1, 2]}>
                    {/* Booleans */}
                    <Box display={'flex'} flexDir='column' gap={2}>
                        <Switch
                            checked={showWeekdayLabels}
                            onCheckedChange={(e) => {
                                setShowWeekdayLabels((prev) => !prev);
                            }}>
                            Show Weekday Labels
                        </Switch>
                        <Switch
                            checked={useLightMode === 'dark' ? false : true}
                            onCheckedChange={(e) => {
                                setUseLightMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
                            }}>
                            Light Mode
                        </Switch>
                        <Switch
                            checked={hideColorLegend}
                            onCheckedChange={(e) => {
                                setHideColorLegend((prev) => !prev);
                            }}>
                            Hide Color Legend
                        </Switch>
                        <Switch
                            checked={hideMonthLabels}
                            onCheckedChange={(e) => {
                                setHideMonthLabels((prev) => !prev);
                            }}>
                            Hide Month Labels
                        </Switch>
                        <Switch
                            checked={hideTotalCount}
                            onCheckedChange={(e) => {
                                setHideTotalCount((prev) => !prev);
                            }}>
                            Hide Total Count
                        </Switch>
                    </Box>
                    {/* Sliders */}
                    <Box display={'flex'} flexDir='column' gap={4}>
                        <Slider
                            min={2}
                            max={20}
                            step={2}
                            value={[blockMargin]}
                            onValueChange={(details) => console.log(details.value)}
                            onValueChangeEnd={(details) => {
                                console.log(details.value);
                                setBlockMargin(details.value[0]);
                            }}>
                            <SwitchLabel>Block Margin</SwitchLabel>
                        </Slider>
                        <Slider
                            min={2}
                            max={20}
                            step={2}
                            value={[blockRadius]}
                            onValueChangeEnd={(details) => {
                                setBlockRadius(details.value[0]);
                            }}>
                            <SwitchLabel>Block Radius</SwitchLabel>
                        </Slider>
                        <Slider
                            min={2}
                            max={20}
                            step={2}
                            value={[blockSize]}
                            onValueChangeEnd={(details) => {
                                setBlockSize(details.value[0]);
                            }}>
                            <SwitchLabel>Block Size</SwitchLabel>
                        </Slider>

                        <Slider
                            min={6}
                            max={32}
                            step={2}
                            value={[fontSize]}
                            onValueChangeEnd={(details) => {
                                setFontSize(details.value[0]);
                            }}>
                            <SwitchLabel>Font Size</SwitchLabel>
                        </Slider>

                        <Slider
                            min={1}
                            max={9}
                            value={[maxLevel]}
                            onValueChangeEnd={(details) => {
                                setMaxLevel(details.value[0]);
                            }}>
                            <SwitchLabel>Max Level</SwitchLabel>
                        </Slider>
                        <Slider
                            min={0}
                            max={6}
                            value={[weekStart]}
                            onValueChangeEnd={(details) => {
                                setWeekStart(details.value[0]);
                            }}>
                            <SwitchLabel>Week Start {weekStart.toString()}</SwitchLabel>
                        </Slider>
                    </Box>
                </Grid>
            </div>
            <div>before graphlist</div>
            {/* Graphlist */}
            <GraphList {...props} {...allConfigProps} renderYears={renderYears} />
        </StyledFlex>
    );
}

// add all boolean controls
// add all slider props

// add slider
// pull out header

// pull out controls

const linkStyles = { lineHeight: 1, fontSize: 24, fontWeight: 700 };

type GraphListProps = GraphListWrapperProps &
    ActivityCalendarConfigProps & { renderYears: number[] };

export function GraphList({
    years = [],
    username,
    avatarUrl,
    renderYears,
    ...rest
}: GraphListProps) {
    return (
        <StyledFlex direction='vertical' gap={6}>
            <div>before header</div>
            {/* header */}
            <Flex alignItems='center' justifyContent='space-between'>
                <Flex gap={2} justifyContent='flex-start'>
                    <Link href='/' className={css(linkStyles)}>
                        home
                    </Link>
                    <span className={css(linkStyles)}>/</span>
                    <Link
                        target='_blank'
                        href={`https://github.com/${username}`}
                        className={css(linkStyles)}>
                        {username}
                    </Link>
                </Flex>
                <Flex gap='2'>
                    <StyledButton flavor='secondary'>Controls</StyledButton>
                    <StyledButton flavor='outline'>Embed</StyledButton>
                </Flex>
            </Flex>
            {renderYears.map((year) => (
                <div key={year}>
                    <h3
                        className={css({
                            fontSize: 18,
                            fontWeight: 900,
                        })}>
                        {year}
                    </h3>
                    <GitHubCalendar username={username} year={year} {...rest} />
                </div>
            ))}
        </StyledFlex>
    );
}

/* Alt Image Version */

// <Flex alignItems='middle' gap={2}>
//     {/* eslint-disable-next-line @next/next/no-img-element  */}
//     <img
//         src={avatarUrl}
//         alt={username}
//         className={css({
//             height: '8',
//             width: '8',
//             borderRadius: '50%',
//             overflow: 'hidden',
//         })}
//     />
//     <Link
//         target='_blank'
//         href={`https://github.com/${username}`}
//         className={css({
//             lineHeight: 1,
//             fontSize: 24,
//             fontWeight: 700,
//         })}>
//         {username}
//     </Link>
// </Flex>;

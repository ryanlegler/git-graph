'use client';
import GitHubCalendar from 'react-github-calendar';
import { css } from 'styled-system/css';

import Link from 'next/link';
import { StyledFlex } from '../ui/flex';
import { Button } from '../ui/button';
import { StyledButton } from '../userNameInput/styledComponents';
import { Switch, SwitchProps } from '@/components/ui/switch';
import { Slider, type SliderProps } from '@/components/ui/slider';
import { useState } from 'react';
import { Box, Grid } from 'styled-system/jsx';

type GraphListProps = {
    years: number[];
    username: string;
    avatarUrl: string;
};
{
    /* Props
    blockMargin
    blockRadius
    blockSize
    colorScheme	'light' | 'dark'		Use a specific color scheme instead of the system one.
    fontSize	number	14	Font size for text in pixels.
    loading
    showWeekdayLabels
    weekStart 
    */
}

// add all boolean controls
// add all slider props

export function GraphList({ years = [], username, avatarUrl }: GraphListProps) {
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
            <div>
                <h2 className={css({ fontSize: 30, fontWeight: 700 })}>Controls</h2>
                {/* Booleans */}
                <Grid gridTemplateColumns={[1, 2]}>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Switch
                            checked={showWeekdayLabels}
                            onCheckedChange={(e) => {
                                setShowWeekdayLabels((prev) => !prev);
                            }}>
                            Show Weekday Labels
                        </Switch>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Switch
                            checked={useLightMode === 'dark' ? false : true}
                            onCheckedChange={(e) => {
                                setUseLightMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
                            }}>
                            Light Mode
                        </Switch>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Switch
                            checked={hideColorLegend}
                            onCheckedChange={(e) => {
                                setHideColorLegend((prev) => !prev);
                            }}>
                            Hide Color Legend
                        </Switch>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Switch
                            checked={hideMonthLabels}
                            onCheckedChange={(e) => {
                                setHideMonthLabels((prev) => !prev);
                            }}>
                            Hide Month Labels
                        </Switch>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Switch
                            checked={hideTotalCount}
                            onCheckedChange={(e) => {
                                setHideTotalCount((prev) => !prev);
                            }}>
                            Hide Total Count
                        </Switch>
                    </Box>
                </Grid>
                <Grid gridTemplateColumns={[1, 2]}>
                    <Box display={'flex'} flexDir={'row'} gap={1} py='2'>
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
                            <span
                                className={css({
                                    fontSize: 'md',
                                    color: 'white',
                                })}>
                                Block Margin
                            </span>
                        </Slider>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Slider
                            min={2}
                            max={20}
                            step={2}
                            value={[blockRadius]}
                            onValueChangeEnd={(details) => {
                                setBlockRadius(details.value[0]);
                            }}>
                            <span
                                className={css({
                                    fontSize: 'md',
                                    color: 'white',
                                })}>
                                Block Radius
                            </span>
                        </Slider>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Slider
                            min={2}
                            max={20}
                            step={2}
                            value={[blockSize]}
                            onValueChangeEnd={(details) => {
                                setBlockSize(details.value[0]);
                            }}>
                            <span
                                className={css({
                                    fontSize: 'md',
                                    color: 'white',
                                })}>
                                Block Size
                            </span>
                        </Slider>
                    </Box>
                    fontSize, maxLevel, weekStart,
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Slider
                            min={6}
                            max={32}
                            step={2}
                            value={[fontSize]}
                            onValueChangeEnd={(details) => {
                                setFontSize(details.value[0]);
                            }}>
                            <span
                                className={css({
                                    fontSize: 'md',
                                    color: 'white',
                                })}>
                                Font Size
                            </span>
                        </Slider>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Slider
                            min={1}
                            max={9}
                            value={[maxLevel]}
                            onValueChangeEnd={(details) => {
                                setMaxLevel(details.value[0]);
                            }}>
                            <span
                                className={css({
                                    fontSize: 'md',
                                    color: 'white',
                                })}>
                                Max Level
                            </span>
                        </Slider>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}>
                        <Slider
                            min={0}
                            max={6}
                            value={[weekStart]}
                            onValueChangeEnd={(details) => {
                                setWeekStart(details.value[0]);
                            }}>
                            <span
                                className={css({
                                    fontSize: 'md',
                                    color: 'white',
                                })}>
                                Week Start {weekStart}
                            </span>
                        </Slider>
                    </Box>
                    <Box display={'flex'} flexDir={'row'} gap={1}></Box>
                </Grid>
            </div>
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
            {renderYears.map((year) => (
                <div key={year}>
                    <h3
                        className={css({
                            fontSize: 18,
                            fontWeight: 900,
                        })}>
                        {year}
                    </h3>
                    <GitHubCalendar username={username} year={year} {...allConfigProps} />
                </div>
            ))}
        </StyledFlex>
    );
}

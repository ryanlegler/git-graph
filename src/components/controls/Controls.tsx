'use client';
import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { Flex } from 'styled-system/jsx/flex';
import { Box, Grid } from 'styled-system/jsx';

// components
import { Button } from '@components/ui/button';
import { Switch } from '@/components/ui/Switch';
import { StyledFlex } from '@/components/ui/flex';
import { Slider } from '@/components/ui/Slider';
import { PageHeaderBar } from '@/components/pageHeaderBar';
import { EmbedCodeModal } from '@components/embedCodeModal';
import { YearsSelect } from '@components/controls/yearsSelect';
import { SwitchLabel } from '@components/controls/switchLabel';

// atoms
import { controlsVisibilityAtom, optionsAtom, selectedYearAtom } from '@/atoms';
import { ActivityCalendarConfigProps, ControlsProps } from './types';

import { css } from 'styled-system/css';
import { useDayString } from './hooks/useDayString';

import { Day } from './types';

export function Controls({ availableYears, username }: ControlsProps) {
    const [controlsOptions, setControlsOptions] = useAtom(optionsAtom);
    const [showControls, setShowControls] = useAtom(controlsVisibilityAtom);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);

    const {
        hideColorLegend,
        showWeekdayLabels,
        colorScheme,
        hideMonthLabels,
        hideTotalCount,
        blockMargin,
        blockRadius,
        blockSize,
        fontSize,
        maxLevel, // not using this - it was blowing things up
        weekStart,
    } = controlsOptions;

    const weekStartString = useDayString(weekStart as Day);

    const useLightMode = colorScheme === 'light' ? 'light' : 'dark';

    const handleSetBooleanOption = useCallback(
        (key: keyof ActivityCalendarConfigProps) => {
            setControlsOptions((prev) => ({
                ...prev,
                [key]: !prev[key],
            }));
        },
        [setControlsOptions]
    );

    return (
        <StyledFlex direction='vertical' py={4} w='full' maxW={850}>
            <PageHeaderBar username={username}>
                <Flex gap='2'>
                    <YearsSelect
                        availableYears={availableYears}
                        setSelected={setSelectedYear}
                        selected={selectedYear}
                    />
                    <Button
                        onClick={() => {
                            setShowControls((prev) => !prev);
                        }}
                    >
                        Controls
                    </Button>
                    <EmbedCodeModal />
                </Flex>
            </PageHeaderBar>

            {showControls ? (
                <StyledFlex gap={3} direction='vertical'>
                    <StyledFlex direction='vertical' gap={3}>
                        <Box>
                            <h2 className={css({ fontSize: 30, fontWeight: 700 })}>Controls</h2>
                            <Grid gridTemplateColumns={[1, 2]}>
                                {/* Booleans */}
                                <Box display={'flex'} flexDir='column' gap={2}>
                                    <Switch
                                        checked={showWeekdayLabels}
                                        onCheckedChange={() => {
                                            handleSetBooleanOption('showWeekdayLabels');
                                        }}
                                    >
                                        Show Weekday Labels
                                    </Switch>
                                    <Switch
                                        checked={useLightMode === 'dark' ? false : true}
                                        onCheckedChange={() => {
                                            setControlsOptions((prev) => ({
                                                ...prev,
                                                colorScheme:
                                                    prev.colorScheme === 'dark' ? 'light' : 'dark',
                                            }));
                                        }}
                                    >
                                        Light Mode
                                    </Switch>
                                    <Switch
                                        checked={hideColorLegend}
                                        onCheckedChange={(e) => {
                                            handleSetBooleanOption('hideColorLegend');
                                        }}
                                    >
                                        Hide Color Legend
                                    </Switch>
                                    <Switch
                                        checked={hideMonthLabels}
                                        onCheckedChange={() => {
                                            handleSetBooleanOption('hideMonthLabels');
                                        }}
                                    >
                                        Hide Month Labels
                                    </Switch>
                                    <Switch
                                        checked={hideTotalCount}
                                        onCheckedChange={() => {
                                            handleSetBooleanOption('hideTotalCount');
                                        }}
                                    >
                                        Hide Total Count
                                    </Switch>
                                </Box>
                                {/* Sliders */}
                                <Box display={'flex'} flexDir='column' gap={4}>
                                    <Slider
                                        min={2}
                                        max={20}
                                        step={2}
                                        value={[blockMargin as number]}
                                        onValueChange={(details) => console.log(details.value)}
                                        onValueChangeEnd={(details) => {
                                            setControlsOptions((prev) => ({
                                                ...prev,
                                                blockMargin: details.value[0],
                                            }));
                                        }}
                                    >
                                        <SwitchLabel>Block Margin</SwitchLabel>
                                    </Slider>
                                    <Slider
                                        min={2}
                                        max={20}
                                        step={2}
                                        value={[blockRadius as number]}
                                        onValueChangeEnd={(details) => {
                                            setControlsOptions((prev) => ({
                                                ...prev,
                                                blockRadius: details.value[0],
                                            }));
                                        }}
                                    >
                                        <SwitchLabel>Block Radius</SwitchLabel>
                                    </Slider>
                                    <Slider
                                        min={2}
                                        max={20}
                                        step={2}
                                        value={[blockSize as number]}
                                        onValueChangeEnd={(details) => {
                                            setControlsOptions((prev) => ({
                                                ...prev,
                                                blockSize: details.value[0],
                                            }));
                                        }}
                                    >
                                        <SwitchLabel>Block Size</SwitchLabel>
                                    </Slider>

                                    <Slider
                                        min={6}
                                        max={32}
                                        step={2}
                                        value={[fontSize as number]}
                                        onValueChangeEnd={(details) => {
                                            setControlsOptions((prev) => ({
                                                ...prev,
                                                fontSize: details.value[0],
                                            }));
                                        }}
                                    >
                                        <SwitchLabel>Font Size</SwitchLabel>
                                    </Slider>

                                    {/* max level seems to interact with potentially both the color scales and the "level" key on the Activity data..
                                        Need to investigate further how we are supposed to account for this if we actually want to support this tunable   */}
                                    {/* <Slider
                                            min={1}
                                            max={9}
                                            value={[maxLevel as number]}
                                            onValueChangeEnd={(details) => {
                                                setControlsOptions((prev) => ({
                                                    ...prev,
                                                    maxLevel: details.value[0],
                                                }));
                                            }}>
                                            <SwitchLabel>Max Level</SwitchLabel>
                                        </Slider> */}

                                    {/* we should maybe use a select for this */}
                                    <Slider
                                        min={0}
                                        max={6}
                                        value={[Number(weekStart) as number]}
                                        onValueChangeEnd={(details) => {
                                            setControlsOptions((prev) => ({
                                                ...prev,
                                                weekStart: details.value[0] as Day,
                                            }));
                                        }}
                                    >
                                        <SwitchLabel>Week Start: {weekStartString}</SwitchLabel>
                                    </Slider>
                                </Box>
                            </Grid>
                        </Box>
                    </StyledFlex>
                </StyledFlex>
            ) : null}
        </StyledFlex>
    );
}

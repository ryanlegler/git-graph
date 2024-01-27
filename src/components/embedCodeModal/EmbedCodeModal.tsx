'use client';
import { Button } from '@components/ui/button';
import * as Dialog from '@/components/ui/Dialog';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { useParams } from 'next/navigation';
import { optionsAtom, selectedYearsAtom } from '@/atoms';
import { useAtomValue } from 'jotai';

export function EmbedCodeModal() {
    const { username } = useParams<{ username: string }>();

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
    } = useAtomValue(optionsAtom);

    const years = useAtomValue(selectedYearsAtom);

    const embedString = useMemo(
        () =>
            `<iframe height="800px" width="100%" src="https://git-graph.vercel.app/embed/${username}?hideColorLegend=${hideColorLegend}&showWeekdayLabels=${showWeekdayLabels}&colorScheme=${colorScheme}&hideMonthLabels=${hideMonthLabels}&hideTotalCount=${hideTotalCount}&blockMargin=${blockMargin}&blockRadius=${blockRadius}&blockSize=${blockSize}&fontSize=${fontSize}&weekStart=${weekStart}&years=${years}"></iframe>`,
        [
            hideColorLegend,
            username,
            showWeekdayLabels,
            colorScheme,
            hideMonthLabels,
            hideTotalCount,
            blockMargin,
            blockRadius,
            blockSize,
            fontSize,
            weekStart,
            years,
        ]
    );

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>Embed</Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content maxW='1/3'>
                    <Stack gap='8' p='6'>
                        <Stack gap='4'>
                            <Dialog.Title>Embed Code</Dialog.Title>
                            <Dialog.Description p={3} bg='background' borderRadius='l3'>
                                <code className={css({ bg: 'transparent' })}>{embedString}</code>
                            </Dialog.Description>
                        </Stack>
                    </Stack>
                    <Dialog.CloseTrigger asChild position='absolute' top='2' right='2'>
                        <Button variant='ghost'>❌</Button>
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

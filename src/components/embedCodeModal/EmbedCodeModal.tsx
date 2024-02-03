'use client';
import { Button } from '@components/ui/button';
import * as Dialog from '@/components/ui/Dialog';
import { useCallback, useMemo, useState } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { useParams } from 'next/navigation';
import { dimensionsAtom, optionsAtom, selectedYearAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import { useCopyToClipboard } from 'react-use';

export function EmbedCodeModal() {
    const { username } = useParams<{ username: string }>();

    const [copied, setCopied] = useState(false);

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

    const years = useAtomValue(selectedYearAtom);
    const dimensions = useAtomValue(dimensionsAtom);


    // &colorScheme=${colorScheme}
    const embedString = useMemo(
        () =>
            `<iframe frameBorder="0" height="${dimensions.height}px" width="${dimensions.width}px" src="https://git-graph.vercel.app/embed/${username}?hideColorLegend=${hideColorLegend}&showWeekdayLabels=${showWeekdayLabels}&hideMonthLabels=${hideMonthLabels}&hideTotalCount=${hideTotalCount}&blockMargin=${blockMargin}&blockRadius=${blockRadius}&blockSize=${blockSize}&fontSize=${fontSize}&weekStart=${weekStart}&year=${years}"></iframe>`,
        [
            hideColorLegend,
            username,
            showWeekdayLabels,
            // colorScheme,
            hideMonthLabels,
            hideTotalCount,
            blockMargin,
            blockRadius,
            blockSize,
            fontSize,
            weekStart,
            years,
            dimensions,
        ]
    );

    const [_, copyToClipboard] = useCopyToClipboard();

    const handleCopy = useCallback(() => {
        copyToClipboard(embedString);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }, [copyToClipboard, embedString]);

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
                                <Stack>
                                    <code className={css({ maxWidth: '100%', bg: 'transparent' })}>
                                        {embedString}
                                    </code>

                                    {copied ? (
                                        <Button className={css({ bg: 'github.300' })}>
                                            ✅ Copied!
                                        </Button>
                                    ) : (
                                        <Button variant='ghost' onClick={handleCopy}>
                                            💾 Copy to Clipboard
                                        </Button>
                                    )}
                                </Stack>
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

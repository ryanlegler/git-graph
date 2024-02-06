'use client';

import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCopyToClipboard } from 'react-use';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

export function EmbedCodeModal({
    options,
    dimensions,
    year,
}: {
    options?: any;
    dimensions?: any;
    year?: any;
}) {
    const { username } = useParams<{ username: string }>();
    const [copied, setCopied] = useState(false);

    const {
        hideColorLegend,
        showWeekdayLabels,
        hideMonthLabels,
        hideTotalCount,
        blockMargin,
        blockRadius,
        blockSize,
        fontSize,
        weekStart,
    } = options || {};

    const embedString = useMemo(
        () =>
            `<iframe frameBorder="0" height="${dimensions?.height}px" width="${dimensions?.width}px" src="https://git-graph.vercel.app/embed/${username}?hideColorLegend=${hideColorLegend}&showWeekdayLabels=${showWeekdayLabels}&hideMonthLabels=${hideMonthLabels}&hideTotalCount=${hideTotalCount}&blockMargin=${blockMargin}&blockRadius=${blockRadius}&blockSize=${blockSize}&fontSize=${fontSize}&weekStart=${weekStart}&year=${year}"></iframe>`,
        [
            hideColorLegend,
            username,
            showWeekdayLabels,
            hideMonthLabels,
            hideTotalCount,
            blockMargin,
            blockRadius,
            blockSize,
            fontSize,
            weekStart,
            year,
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
        <DialogContent>
            <DialogHeader className='flex gap-8 flex-col'>
                <DialogTitle>Embed Code</DialogTitle>
                <DialogDescription className='max-w-full break-all'>
                    <code>{embedString}</code>
                </DialogDescription>
                {copied ? (
                    <Button>✅ Copied!</Button>
                ) : (
                    <Button onClick={handleCopy}>💾 Copy to Clipboard</Button>
                )}
            </DialogHeader>
        </DialogContent>
    );
}

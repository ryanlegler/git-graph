'use client';

import { useCallback, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
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
    dimensions?: { width: number; height: number };
    year: string;
}) {
    const resolvedYear = year || new Date().getFullYear().toString();
    const searchParams = useSearchParams();
    const userName = searchParams.get('userName');

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
            `<iframe frameBorder="0" height="${dimensions?.height}px" width="${dimensions?.width}px" src="https://git-graph.vercel.app/embed/${userName}?hideColorLegend=${hideColorLegend}&showWeekdayLabels=${showWeekdayLabels}&hideMonthLabels=${hideMonthLabels}&hideTotalCount=${hideTotalCount}&blockMargin=${blockMargin}&blockRadius=${blockRadius}&blockSize=${blockSize}&fontSize=${fontSize}&weekStart=${weekStart}&year=${resolvedYear}"></iframe>`,
        [
            hideColorLegend,
            userName,
            showWeekdayLabels,
            hideMonthLabels,
            hideTotalCount,
            blockMargin,
            blockRadius,
            blockSize,
            fontSize,
            weekStart,
            resolvedYear,
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

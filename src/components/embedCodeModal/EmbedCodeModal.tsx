import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCopyToClipboard } from 'react-use';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { EmbedCodeModalProps } from './types';

export function EmbedCodeModal({ options, dimensions, year, setDialogOpen }: EmbedCodeModalProps) {
    // falls back to current year
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
        // setTimeout(() => {
        //     setCopied(false);
        // }, 2000);
        setTimeout(() => {
            setDialogOpen(false);
            setTimeout(() => {
                setCopied(false);
            }, 100);
        }, 2000);
    }, [copyToClipboard, embedString, setDialogOpen]);

    return (
        <DialogContent>
            <DialogHeader className='flex gap-8 flex-col'>
                <DialogTitle>Embed Code</DialogTitle>
                <DialogDescription className='max-w-full break-all px-4'>
                    <code>{embedString}</code>
                </DialogDescription>
                {copied ? (
                    <Button className='pointer-events-none'>Copied!</Button>
                ) : (
                    <Button variant='secondary' onClick={handleCopy}>
                        Copy to Clipboard
                    </Button>
                )}
            </DialogHeader>
        </DialogContent>
    );
}

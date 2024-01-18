'use client';
import { Button } from '@components/ui/button';
import * as Dialog from '@/components/ui/Dialog';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { useParams } from 'next/navigation';
import { hideColorLegendAtom } from '@/atoms';
import { useAtom } from 'jotai';

export function EmbedCodeModal() {
    const { username } = useParams<{ username: string }>();

    const [hideColorLegend] = useAtom(hideColorLegendAtom);

    const embedString = useMemo(
        () =>
            `<iframe height="800px" width="100%" src="https://git-graph.vercel.app/embed/${username}?hideColorLegend=${Boolean(
                hideColorLegend
            )}"></iframe>`,
        [hideColorLegend, username]
    );

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>Get Embed Code</Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content maxW='1/3'>
                    <Stack gap='8' p='6'>
                        <Stack gap='4'>
                            <Dialog.Title color='black'>Embed Code</Dialog.Title>
                            <Dialog.Description
                                p={3}
                                bg='lightgrey'
                                borderRadius='l3'
                                color='black'>
                                <code className={css({ bg: 'transparent' })}>{embedString}</code>
                            </Dialog.Description>
                        </Stack>
                    </Stack>
                    <Dialog.CloseTrigger asChild position='absolute' top='2' right='2'>
                        <Button variant='outline'>❌</Button>
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

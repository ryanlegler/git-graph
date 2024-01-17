'use client';
import Link from 'next/link';
import { Button } from '@components/ui/button';
import { Switch } from '@/components/ui/Switch';
import { EmbedCodeModal } from '@components/embedCodeModal';
import { StyledFlex } from '@/components/ui/flex';
import { useCallback, useState } from 'react';

export function Controls() {
    const [hideColorLegend, setHideColorLegend] = useState(false);

    const handleSwitch = useCallback(() => {
        setHideColorLegend((prev) => !prev);
    }, []);
    return (
        <StyledFlex direction='horizontal' hAlign='between' py={4} w='full' maxW={850}>
            <Link href='/'>
                <Button variant='secondary'>Back</Button>
            </Link>

            <StyledFlex gap={3}>
                <Switch checked={hideColorLegend} onChange={handleSwitch}>
                    Legend
                </Switch>

                <EmbedCodeModal hideColorLegend={hideColorLegend} />
            </StyledFlex>
        </StyledFlex>
    );
}

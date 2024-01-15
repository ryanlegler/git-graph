'use client';
import { css } from 'styled-system/css';
import { useFormState } from 'react-dom';

// types
import { UserNameInputState } from './types';

// components
import { StyledFlex } from '../ui/flex';
import { Submit } from './Submit';

// actions
import { validateProfile } from '@/app/actions/validateProfile';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StyledInput } from './styledComponents';

export function UserNameInput() {
    const router = useRouter();

    const [showStatus, setShowStatus] = useState(false);

    const [state, formAction] = useFormState(validateProfile, {
        status: 'idle',
        message: 'Enter a GitHub user name',
        data: '',
    } satisfies UserNameInputState);

    const handleResetDirty = useCallback(() => {
        // this is a  to prevents a stale status messages from showing.
        // I could get around this if i had a way of imperatively resetting the form state
        setTimeout(() => {
            setShowStatus(true);
        }, 500);
    }, []);

    // we only need this id we want to delay the redirect to let the user see the success message
    useEffect(() => {
        if (showStatus && state.status === 'success') {
            setTimeout(() => {
                router.push(`/user/${state.data}`);
            }, 1000); // we intentionally delay the redirect to give the user a chance to see the success message
        }
    }, [state.status, showStatus, state.data, router]);

    return (
        <form
            onChange={() => setShowStatus(true)}
            onSubmit={handleResetDirty}
            action={formAction}
            className={css({
                display: 'flex',
                gap: 3,
            })}>
            <StyledFlex vAlign='middle' hAlign='center' direction='vertical' gap={4}>
                <StyledFlex vAlign='middle' direction='horizontal' gap={4}>
                    <StyledInput type='text' name='userName' placeholder='GitHub User Name' />
                    <Submit />
                </StyledFlex>

                {/* this means that the form has been submitted and the users hasn't yet interacted with the form*/}
                {showStatus ? (
                    <StyledFlex
                        data-testid='status-messages'
                        vAlign='middle'
                        hAlign='center'
                        direction='vertical'
                        gap={4}
                        className={css({ textAlign: 'center' })}>
                        {state.status === 'error' ? (
                            <span data-testid='status-message-error'> ⚠️ {state.message}</span>
                        ) : null}
                        {state.status === 'success' ? (
                            <span data-testid='status-message-success'>✅ {state.message}</span>
                        ) : null}
                    </StyledFlex>
                ) : null}
            </StyledFlex>
        </form>
    );
}

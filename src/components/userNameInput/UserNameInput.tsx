'use client';
import { useCallback, useState } from 'react';
import { css } from 'styled-system/css';
import { useFormState } from 'react-dom';

// types
import { userNameSchema } from './types';

// components
import { StyledFlex } from '../ui/flex';
import { Submit } from './Submit';

// styled components
import { StyledInput } from './styledComponents';

// actions
import { validateProfile } from '@/app/actions/validateProfile';

export function UserNameInput() {
    const [showFormError, setShowFormError] = useState(true);
    const [clientErrorMessage, setClientErrorMessage] = useState('');
    const [formErrorMessage, formAction] = useFormState(validateProfile, '');

    // client side validation on input change
    const handleInputOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setShowFormError(false);
        const validation = userNameSchema.safeParse(event.target.value);
        if (!validation.success) {
            setClientErrorMessage(JSON.parse(validation?.error?.message)?.[0]?.message);
        } else {
            setClientErrorMessage('');
        }
    }, []);

    // show form error message on submit
    const handleOnFormSubmit = useCallback(() => {
        setShowFormError(true);
    }, []);

    // show client side error message or server side error message
    const errorMessage = clientErrorMessage || (showFormError && formErrorMessage);

    return (
        <form
            action={formAction}
            onSubmit={handleOnFormSubmit}
            className={css({
                display: 'flex',
                gap: 3,
            })}>
            <StyledFlex vAlign='middle' hAlign='center' direction='vertical' gap={4}>
                <StyledFlex vAlign='middle' direction='horizontal' gap={4}>
                    <StyledInput
                        type='text'
                        name='userName'
                        placeholder='GitHub User Name'
                        onChange={handleInputOnChange}
                    />
                    <Submit disabled={!!clientErrorMessage} />
                </StyledFlex>
                {errorMessage ? (
                    <StyledFlex
                        data-testid='status-messages'
                        vAlign='middle'
                        hAlign='center'
                        direction='vertical'
                        gap={4}
                        className={css({ textAlign: 'center' })}>
                        <span data-testid='status-message-error'> ⚠️ {errorMessage}</span>
                    </StyledFlex>
                ) : null}
            </StyledFlex>
        </form>
    );
}

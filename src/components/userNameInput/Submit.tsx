'use client';
import { useFormStatus } from 'react-dom';
import { StyledButton } from './styledComponents';

// this has to be in a child component because of the way the useFormStatus hook works
// https://react.dev/reference/react-dom/hooks/useFormStatus#usage
export function Submit() {
    const { pending } = useFormStatus();
    return <StyledButton disabled={pending}>{!pending ? 'Submit' : 'Pending...'}</StyledButton>;
}

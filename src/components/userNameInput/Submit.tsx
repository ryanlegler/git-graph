'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

// this has to be in a child component because of the way the useFormStatus hook works
// https://react.dev/reference/react-dom/hooks/useFormStatus#usage
export function Submit({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();
    return <Button disabled={pending || disabled}>{!pending ? 'Submit' : 'Pending...'}</Button>;
}

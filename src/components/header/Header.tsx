'use client';
import React, { useCallback, useState } from 'react';

// types
import { HeaderProps } from './types';
import { useSearchParams, useRouter } from 'next/navigation';

function Header({}: HeaderProps) {
    const searchParams = useSearchParams();
    const userName = searchParams.get('userName');
    const router = useRouter();

    // this is just so the username holds the value while we animate it out
    const [derivedUserName] = useState(userName);

    const handleClickHome = useCallback(() => {
        router.push(`/`);
    }, [router]);
    return (
        <header data-testid='header'>
            <div
                data-testid='breadcrumb'
                className=' bg-background flex gap-1 p-1 pr-4 rounded-full items-center'
            >
                <div
                    onClick={handleClickHome}
                    className='rounded-full flex justify-center items-center bg-secondary hover:bg-accent size-9 text-2xl cursor-pointer'
                >
                    🐙
                </div>
                <div>/ {derivedUserName}</div>
            </div>
        </header>
    );
}

export { Header };

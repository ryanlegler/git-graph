'use client';
import React, { useCallback } from 'react';

// types
import { HeaderProps } from './types';
import { useRouter } from 'next/navigation';

function Header({ userName, setSelectedYear, onGoHome }: HeaderProps) {
    const router = useRouter();
    const handleClickHome = useCallback(() => {
        setSelectedYear(null); // clear out the state for the year
        router.push(`/`);
        onGoHome(); // this sets the state immediately
    }, [setSelectedYear, onGoHome, router]);

    return (
        <header data-testid='header'>
            <div
                data-testid='breadcrumb'
                className=' bg-black flex gap-1 p-1 pr-4 rounded-full items-center'
            >
                <div
                    onClick={handleClickHome}
                    className='rounded-full flex justify-center items-center bg-github.100 hover:bg-github.400 size-9 text-2xl cursor-pointer'
                >
                    🐙
                </div>
                <div>/ {userName}</div>
            </div>
        </header>
    );
}

export { Header };

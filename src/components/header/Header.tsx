'use client';
import React, { useCallback } from 'react';

// types
import { HeaderProps } from './types';
import { useSearchParams, useRouter } from 'next/navigation';

function Header({ onResetData }: HeaderProps) {
    const searchParams = useSearchParams();
    const userName = searchParams.get('userName');
    const router = useRouter();
    const handleClickHome = useCallback(() => {
        // Because we mix the source of truth for the year between the url and the state
        // We need to make sure we clear out the state when we navigate to the home page
        // Maybe this should be a jotai atom
        // can we rely only on the url for the year and still get the same experience?
        // setSelectedYear(null);

        // this pushes the router stack to the empty state.
        // When this happens the root server component will render on the server and the Builder component will receive the empty data
        // The builder then knows to render the username input form
        router.push(`/`);

        // PROBLEM: the above router.push(`/`); is not immediate... some time passes before he url is even updated. Iv'e seen this before...
        // Not sure if it's a bug or a side effect of how we are using the router.
        // GROSS SOLUTION: this sets the state immediately to the empty data state... triggers the animation to the username input form
        onResetData?.();
    }, [onResetData, router]);

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

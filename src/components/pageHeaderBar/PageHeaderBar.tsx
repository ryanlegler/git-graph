import Link from 'next/link';

import { Flex } from 'styled-system/jsx';

import { PageHeaderBarProps } from './types';
import { css } from 'styled-system/css';

const linkStyles = { lineHeight: 1, fontSize: 24, fontWeight: 700 };

export function PageHeaderBar({ username, children }: PageHeaderBarProps) {
    return (
        <Flex alignItems='center' justifyContent='space-between' py='3'>
            <Flex gap={2} justifyContent='flex-start'>
                <Link href='/' className={css(linkStyles)}>
                    home
                </Link>
                <span className={css(linkStyles)}>/</span>
                <Link
                    target='_blank'
                    href={`https://github.com/${username}`}
                    className={css(linkStyles)}
                >
                    {username}
                </Link>
            </Flex>
            {children}
        </Flex>
    );
}

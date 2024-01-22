import { StyledFlex } from '@/components/ui/flex';
import { UserNameInput } from '@/components/userNameInput/UserNameInput';

import { css } from 'styled-system/css';

export default function Home() {
    return (
        <StyledFlex
            direction='vertical'
            hAlign='center'
            vAlign='middle'
            gap={4}
            className={css({
                h: '100vh',
            })}
        >
            <span
                className={css({
                    fontSize: 100,
                })}
            >
                🐙
            </span>
            <h1
                className={css({
                    fontSize: 40,
                    fontWeight: 900,
                })}
            >
                Git Graph
            </h1>

            <UserNameInput />
        </StyledFlex>
    );
}

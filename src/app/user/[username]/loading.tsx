import { StyledFlex } from '@/components/ui/flex';
import { css } from 'styled-system/css';

export default function LoadingPage() {
    return (
        <StyledFlex
            direction='vertical'
            hAlign='center'
            vAlign='middle'
            gap={4}
            className={css({
                h: '100vh',
            })}>
            <StyledFlex direction='horizontal' vAlign='middle' gap={5}>
                <span
                    className={css({
                        fontSize: 80,
                    })}>
                    🚧
                </span>
                <h2
                    className={css({
                        fontSize: 50,
                        fontWeight: 900,
                    })}>
                    Loading...
                </h2>
            </StyledFlex>
        </StyledFlex>
    );
}

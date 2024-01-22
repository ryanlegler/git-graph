import { SwitchLabelProps } from './types';
import { css } from 'styled-system/css';

export function SwitchLabel({ children }: SwitchLabelProps) {
    return (
        <span
            className={css({
                fontSize: 'md',
                color: 'white',
            })}
        >
            {children}
        </span>
    );
}

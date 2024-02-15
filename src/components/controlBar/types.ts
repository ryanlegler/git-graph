import { ControlsProps } from '../controls/types';

export type ControlBarProps = ControlsProps & {
    dimensions: { width: number; height: number };
    setControlsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    controlsOpen: boolean;
};

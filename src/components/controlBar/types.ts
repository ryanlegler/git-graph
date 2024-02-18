import { ControlsProps } from '../controls/types';

export type ControlBarProps = Omit<ControlsProps, 'handleToggleControls' | 'onReset'> & {
    dimensions: { width: number; height: number };
    setControlsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    controlsOpen: boolean;
};

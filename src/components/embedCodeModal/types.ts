import { InferredOptions } from '../controls/types';

export type EmbedCodeModalProps = {
    options?: InferredOptions;
    dimensions?: { width: number; height: number };
    year: string;
    setDialogOpen: (open: boolean) => void;
};

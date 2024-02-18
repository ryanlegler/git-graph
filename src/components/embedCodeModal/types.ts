import { Options } from '@/types';

export type EmbedCodeModalProps = {
    options?: Options;
    dimensions?: { width: number; height: number };
    year: string;
    setDialogOpen: (open: boolean) => void;
};

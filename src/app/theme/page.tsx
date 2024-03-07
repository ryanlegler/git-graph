import React from 'react';
import './styles.css';
import { ButtonSheet } from '@/components/ui/component-sheet';
import { ColorSheet } from '@/components/ui/color-sheet';

export default function ThemePage() {
    return (
        <div className='o'>
            <ColorSheet />
            <ButtonSheet />
        </div>
    );
}

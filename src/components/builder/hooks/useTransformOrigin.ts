import { useMemo, useRef } from 'react';
import { useMeasure, useMouse } from 'react-use';

// experimenting with the spotlight effect - and how to make it follow the mouse smoothly
// I think framer has a way to have a animated interpolated value.
// It would look more like the show chases the mouse with a little delay and easing / spring
// style={{ transformOrigin, transition: 'transform-origin .1s ease' }}

export function useTransformOrigin() {
    const [pageRef, { width, height }] = useMeasure();
    const mouseRef = useRef(null);
    const { docX: x, docY: y } = useMouse(mouseRef as any);

    const transformOrigin = useMemo(() => {
        const centerX = width / 2;
        const centerY = height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        return `${50 - (deltaX / centerX) * 20}% ${50 - (deltaY / centerY) * 20}%`;
    }, [x, y, width, height]);

    return { pageRef, mouseRef, transformOrigin, width, height };
}

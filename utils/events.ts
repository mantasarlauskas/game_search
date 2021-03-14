import { MouseEvent, KeyboardEvent } from 'react';

export type ElementEvent = MouseEvent | KeyboardEvent;

export function onEnter(fn?: (e: ElementEvent) => void) {
    return (e: ElementEvent) => {
        if ((e as KeyboardEvent).key === 'Enter') {
            fn?.(e);
        }
    };
}

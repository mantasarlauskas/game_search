import React, { ReactNode, AllHTMLAttributes, forwardRef, RefObject } from 'react';
import { onEnter, ElementEvent } from 'utils/events';

function DivButton({ children, onClick, ...props }: DivButtonProps, ref: RefObject<HTMLDivElement>) {
    return (
        <div
            ref={ref}
            tabIndex={0}
            role="button"
            onClick={onClick}
            onKeyDown={onEnter(onClick)}
            {...props}
        >
            {children}
        </div>
    );
}

interface DivButtonProps extends AllHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    onClick?: (e: ElementEvent) => void;
}

export default forwardRef(DivButton);

import { LinkProps } from 'next/dist/client/link';
import { PropsWithChildren } from 'react';
import '@testing-library/jest-dom/extend-expect';

delete (window as any).location;
(window as any).location = {
    href: '',
};

const mockLocation = (window as any).location;
jest.mock('next/link', () => ({ children, href }: PropsWithChildren<LinkProps>) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
        onClick={(e) => {
            e.stopPropagation();
            mockLocation.href = href;
        }}
    >
        {children}
    </div>
));

Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
    set: () => {},
});

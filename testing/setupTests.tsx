import { LinkProps } from 'next/dist/client/link';
import { ImageProps } from 'next/image';
import { PropsWithChildren } from 'react';
import IntersectionObserver from 'testing/intersectionObserverMock';
import '@testing-library/jest-dom/extend-expect';

delete (window as any).location;
(window as any).location = {
    href: '',
};

const matchMedia = () => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
});

window.matchMedia = window.matchMedia || matchMedia;

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

// eslint-disable-next-line jsx-a11y/alt-text,@typescript-eslint/no-unused-vars
jest.mock('next/image', () => ({ priority, ...props }: ImageProps) => <img {...props} />);

Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
    set: () => {},
});

Object.defineProperty(window, 'IntersectionObserver', {
    value: IntersectionObserver,
});

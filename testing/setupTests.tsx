import { LinkProps } from 'next/dist/client/link';
import { PropsWithChildren } from 'react';
import '@testing-library/jest-dom/extend-expect';

window.open = jest.fn();
const mockOpen = window.open;
jest.mock('next/link', () => ({ children, href }: PropsWithChildren<LinkProps>) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={() => mockOpen(href as string)}>
        {children}
    </div>
));

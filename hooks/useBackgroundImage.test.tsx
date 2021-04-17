import { render } from '@testing-library/react';
import useBackgroundImage from 'hooks/useBackgroundImage';

function Component({ url }: { url?: string }) {
    useBackgroundImage(url);
    return <span />;
}

describe('useBackgroundImage', () => {
    it('appends background image to body', () => {
        render(<Component url="url" />);
        expect(document.body.lastChild).toHaveClass('root');
    });

    it('does not append background image to body', () => {
        render(<Component />);
        expect(document.body.lastChild).not.toHaveClass('root');
    });
});

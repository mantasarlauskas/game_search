import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BackToTopButton from 'components/BackToTopButton';

describe('<BackToTopButton />', () => {
    window.scrollTo = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('does not show button when it is not enabled', () => {
        const { container } = render(<BackToTopButton isEnabled={false} />);
        expect(container.getElementsByClassName('hidden').length).toEqual(1);
    });

    it('does not show button when it is not visible', () => {
        const { container } = render(<BackToTopButton isEnabled />);
        expect(container.getElementsByClassName('hidden').length).toEqual(1);
    });

    it('on click does not scroll if button is hidden', () => {
        const { container } = render(<BackToTopButton isEnabled />);
        expect(container.getElementsByClassName('hidden').length).toEqual(1);
        userEvent.click(screen.getByRole('button'));
        expect(window.scrollTo).not.toBeCalled();
    });

    it('shows button when scrolling to top and on click scrolls to top', () => {
        const { container } = render(<BackToTopButton isEnabled />);
        fireEvent.scroll(window, { target: { scrollY: 100 } });
        fireEvent.scroll(window, { target: { scrollY: 50 } });
        expect(container.getElementsByClassName('hidden').length).toEqual(0);
        userEvent.click(screen.getByRole('button'));
        expect(window.scrollTo).toBeCalledTimes(1);
    });
});

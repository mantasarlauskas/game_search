import { render, screen, fireEvent } from '@testing-library/react';
import DivButton from 'components/DivButton';
import userEvent from '@testing-library/user-event';

describe('<DivButton />', () => {
    const onClick = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('on click calls onClick function', () => {
        render(<DivButton onClick={onClick}>button</DivButton>);
        userEvent.click(screen.getByText('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('on ENTER key down calls onClick function', () => {
        render(<DivButton onClick={onClick}>button</DivButton>);
        fireEvent.keyDown(screen.getByText('button'), { key: 'Enter' });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('on SPACE key down calls onClick function', () => {
        render(<DivButton onClick={onClick}>button</DivButton>);
        fireEvent.keyDown(screen.getByText('button'), { key: 'Space' });
        expect(onClick).toHaveBeenCalledTimes(0);
    });
});

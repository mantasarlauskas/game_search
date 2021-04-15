import { render, screen } from '@testing-library/react';
import PaginatorButton from 'components/PaginatorButton';
import userEvent from '@testing-library/user-event';

jest.mock('components/Spinner', () => () => <span>Spinner</span>);

describe('<PaginatorButton />', () => {
    const props = {
        isFetching: false,
        isVisible: true,
        onClick: jest.fn(),
    };

    it('does not show anything', () => {
        const { container } = render(<PaginatorButton {...props} isVisible={false} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('shows button', () => {
        render(<PaginatorButton {...props} />);
        expect(screen.getByRole('button', { name: 'Load more' })).toBeInTheDocument();
    });

    it('on click calls callback', () => {
        render(<PaginatorButton {...props} />);
        userEvent.click(screen.getByRole('button', { name: 'Load more' }));
        expect(props.onClick).toBeCalledTimes(1);
    });

    it('shows spinner', () => {
        render(<PaginatorButton {...props} isFetching />);
        expect(screen.getByRole('button', { name: 'Spinner' })).toBeInTheDocument();
    });
});

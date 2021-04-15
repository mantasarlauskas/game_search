import { render, screen } from '@testing-library/react';
import PaginationButtons from 'components/PaginationButtons';
import { createRef } from 'react';

describe('<PaginationButtons />', () => {
    const props = {
        hasNextPage: true,
        hasPreviousPage: true,
        isFetching: false,
        paginatorRef: createRef<HTMLButtonElement>(),
        onClick: jest.fn(),
    };

    it('matches snapshot', () => {
        const { container } = render(<PaginationButtons {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows both buttons', () => {
        render(<PaginationButtons {...props} />);
        expect(screen.getByRole('button', { name: 'Load more' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument();
    });
});

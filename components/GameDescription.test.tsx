import GameDescription from 'components/GameDescription';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<GameDescription />', () => {
    const props = {
        description: 'description',
        slug: 'slug',
    };

    it('matches snapshot', () => {
        const { container } = render(<GameDescription {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows description without button', () => {
        render(<GameDescription {...props} />);
        expect(screen.getByText('description')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('shows cropped description with button button', () => {
        render(<GameDescription {...props} letterCount={4} />);
        expect(screen.getByText('desc...')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('expands and collapses description on click', () => {
        render(<GameDescription {...props} letterCount={4} />);
        expect(screen.getByText('desc...')).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: 'Read more' }));
        expect(screen.getByText('description')).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: 'Show less' }));
        expect(screen.getByText('desc...')).toBeInTheDocument();
    });
});

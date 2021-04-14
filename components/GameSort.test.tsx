import { render, screen } from '@testing-library/react';
import GameSort from 'components/GameSort';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: { ordering: 'added' },
            push: mockPush,
        };
    },
}));

describe('<GameSort />', () => {
    it('matches snapshot', () => {
        const { container } = render(<GameSort />);
        expect(container).toMatchSnapshot();
    });

    it('shows correct sort value', () => {
        render(<GameSort />);
        expect(screen.getByText('Date added')).toBeInTheDocument();
    });

    it('changes sort value', () => {
        render(<GameSort />);
        userEvent.click(screen.getByText('Date added'));
        userEvent.click(screen.getByText('Average rating'));
        expect(mockPush).toBeCalledTimes(1);
        expect(mockPush).toBeCalledWith(expect.objectContaining({
            query: { ordering: '-rating' },
        }), undefined, { shallow: true });
    });
});

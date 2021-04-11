import { render, screen } from '@testing-library/react';
import CategoryPage from 'components/CategoryPage';
import { getGames } from 'testing/testFactories';

jest.mock('hooks/usePaginatedQuery');
jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: '',
        };
    },
}));

describe('<CategoryPage />', () => {
    const props = {
        games: getGames(),
        count: 120,
        title: 'Developers',
        queryParams: { developers: '123' },
    };

    it('matches snapshot', () => {
        const { container } = render(<CategoryPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows name and games', () => {
        render(<CategoryPage {...props} />);
        expect(screen.getByText('Developers')).toBeInTheDocument();
        expect(screen.getByText('Total 120 games')).toBeInTheDocument();
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
    });
});

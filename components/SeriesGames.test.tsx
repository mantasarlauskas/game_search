import { render, screen } from '@testing-library/react';
import SeriesGames from 'components/SeriesGames';
import { getGames } from 'testing/testFactories';
import usePaginatedQuery from 'hooks/usePaginatedQuery';

jest.mock('hooks/usePaginatedQuery');

describe('<SeriesGames />', () => {
    const props = {
        games: getGames(),
        name: 'Game',
        slug: 'game',
    };

    it('matches snapshot', () => {
        const { container } = render(<SeriesGames {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('renders content', () => {
        render(<SeriesGames {...props} />);
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
        expect(screen.getByText('Load more')).toBeInTheDocument();
    });

    it('does not render anything', () => {
        (usePaginatedQuery as jest.Mock).mockReturnValue({ data: [] });
        const { container } = render(<SeriesGames {...props} />);
        expect(container).toBeEmptyDOMElement();
    });
});

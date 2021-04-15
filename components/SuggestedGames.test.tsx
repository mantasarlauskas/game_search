import { render, screen } from '@testing-library/react';
import SuggestedGames from 'components/SuggestedGames';
import { getGames } from 'testing/testFactories';
import usePaginatedQuery from 'hooks/usePaginatedQuery';

jest.mock('hooks/usePaginatedQuery');

describe('<SuggestedGames />', () => {
    const props = {
        initialGames: getGames(),
        name: 'Game',
        slug: 'game',
    };

    it('matches snapshot', () => {
        const { container } = render(<SuggestedGames {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('renders content', () => {
        render(<SuggestedGames {...props} />);
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
        expect(screen.getByText('Load more')).toBeInTheDocument();
    });

    it('does not render anything', () => {
        (usePaginatedQuery as jest.Mock).mockReturnValue({ data: [] });
        const { container } = render(<SuggestedGames {...props} />);
        expect(container).toBeEmptyDOMElement();
    });
});

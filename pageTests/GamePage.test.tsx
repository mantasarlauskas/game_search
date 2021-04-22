import { render, screen } from '@testing-library/react';
import GamePage, { getServerSideProps } from 'pages/games/[id]';
import { getGames } from 'testing/testFactories';
import { fetchData } from 'utils/fetch';
import { NextPageContextWithID } from 'utils/types';

jest.mock('hooks/usePaginatedQuery');
jest.mock('utils/fetch');
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/games',
        };
    },
}));

describe('<GamePage />', () => {
    const props = {
        game: getGames()[0],
        suggestedGames: [getGames()[1]],
    };

    it('matches snapshot', () => {
        const { container } = render(<GamePage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<GamePage {...props} />);
        expect(screen.getAllByText('2011-04-18').length).toEqual(2);
        expect(screen.getByText('Portal 2'));
        expect(screen.getByText('Tomb Raider (2013)'));
        expect(screen.getByText(/Shooter/));
        expect(screen.getByText('Puzzle'));
        expect(screen.getByText('Singleplayer'));
        expect(screen.getByText('Everyone 10+'));
        expect(screen.getByText('Games like Portal 2'));
    });

    describe('getServerSideProps', () => {
        it('returns server side props', async () => {
            const res = await getServerSideProps({ params: { id: '123' } } as NextPageContextWithID);
            expect(res).toEqual({
                props: {
                    game: expect.objectContaining({ results: getGames() }),
                    suggestedGames: getGames(),
                    suggestedGamesNextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(2);
            expect(fetchData).toBeCalledWith('games/123');
            expect(fetchData).toBeCalledWith('games/123/suggested', {
                page: 1,
                page_size: 6,
            });
        });
    });
});

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
    const games = getGames();
    const props = {
        game: games[0],
        movieUrl:
            'https://media.rawg.io/media/stories-640/fde/fde8aaeeab956f6b705bbb4161b09004.mp4',
        seriesGames: [games[1]],
        screenshots: [{ image: '/imageUrl' }],
    };

    it('matches snapshot', () => {
        const { container } = render(<GamePage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<GamePage {...props} />);
        expect(screen.getAllByText('2011-04-18').length).toEqual(2);
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
        expect(screen.getByText(/Shooter/)).toBeInTheDocument();
        expect(screen.getByText('Puzzle')).toBeInTheDocument();
        expect(screen.getByText('Singleplayer')).toBeInTheDocument();
        expect(screen.getByText('Everyone 10+')).toBeInTheDocument();
        expect(
            screen.getByText('Games from the same series')
        ).toBeInTheDocument();
    });

    describe('getServerSideProps', () => {
        it('returns server side props', async () => {
            const res = await getServerSideProps({
                params: { id: '123' },
            } as NextPageContextWithID);

            expect(res).toEqual({
                props: {
                    movieUrl: null,
                    moviePreview: null,
                    game: expect.objectContaining({ results: games }),
                    seriesGames: games,
                    screenshots: games,
                    seriesGamesNextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(4);
            expect(fetchData).toBeCalledWith('games/123');
            expect(fetchData).toBeCalledWith('games/123/movies');
            expect(fetchData).toBeCalledWith('games/123/screenshots');
            expect(fetchData).toBeCalledWith('games/123/game-series', {
                page: 1,
                page_size: 6,
            });
        });
    });
});

import { render, screen } from '@testing-library/react';
import GenrePage, { getServerSideProps } from 'pages/genres/[id]';
import { getCategories, getGames } from 'testing/testFactories';
import { fetchData } from 'utils/fetch';
import { NextPageContextWithID } from 'utils/types';

jest.mock('hooks/usePaginatedQuery');
jest.mock('utils/fetch');
jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: '',
        };
    },
}));

const mockedCategories = getCategories();
jest.mock('pages/_app', () => ({
    useAppContext() {
        return {
            genres: mockedCategories,
        };
    },
}));

describe('<GenrePage />', () => {
    const props = {
        games: getGames(),
        count: 100,
        id: '18893',
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<GenrePage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<GenrePage {...props} />);
        expect(screen.getByText('Feral Interactive Games')).toBeInTheDocument();
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('Total 100 games')).toBeInTheDocument();
    });

    describe('getServerSideProps', () => {
        it('returns server side props', async () => {
            const res = await getServerSideProps({ params: { id: '123' } } as NextPageContextWithID);
            expect(res).toEqual({
                props: {
                    id: '123',
                    count: 100,
                    games: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(1);
            expect(fetchData).toBeCalledWith('games', expect.objectContaining({
                genres: '123',
            }));
        });
    });
});

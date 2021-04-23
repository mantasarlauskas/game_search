import { render, screen } from '@testing-library/react';
import TagPage, { getServerSideProps } from 'pages/tags/[id]';
import { getGames } from 'testing/testFactories';
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

describe('<TagPage />', () => {
    const props = {
        games: getGames(),
        count: 100,
        id: '123',
        name: 'Ubisoft',
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<TagPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<TagPage {...props} />);
        expect(screen.getByText('Ubisoft Games')).toBeInTheDocument();
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
                    name: 'name',
                    games: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(2);
            expect(fetchData).toBeCalledWith('tags/123');
            expect(fetchData).toBeCalledWith('games', expect.objectContaining({
                tags: '123',
            }));
        });
    });
});

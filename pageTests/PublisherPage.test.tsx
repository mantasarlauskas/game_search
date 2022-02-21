import { render, screen } from '@testing-library/react';
import PublisherPage, { getServerSideProps } from 'pages/publishers/[id]';
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

describe('<PublisherPage />', () => {
    const props = {
        games: getGames(),
        count: 100,
        id: '123',
        name: 'Ubisoft',
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<PublisherPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<PublisherPage {...props} />);
        expect(screen.getByText('Published by Ubisoft')).toBeInTheDocument();
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('Total 100 games')).toBeInTheDocument();
    });

    describe('getServerSideProps', () => {
        it('returns server side props', async () => {
            const res = await getServerSideProps({
                params: { id: '123' },
            } as NextPageContextWithID);

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
            expect(fetchData).toBeCalledWith('publishers/123');
            expect(fetchData).toBeCalledWith(
                'games',
                expect.objectContaining({
                    publishers: '123',
                })
            );
        });
    });
});

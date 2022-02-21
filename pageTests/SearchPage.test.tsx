import { render, screen } from '@testing-library/react';
import SearchPage, { getServerSideProps } from 'pages/search/[id]';
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

describe('<SearchPage />', () => {
    const props = {
        initialResults: getGames(),
        count: 100,
        id: '123',
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<SearchPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<SearchPage {...props} />);
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('100 games found')).toBeInTheDocument();
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
                    initialResults: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(1);
            expect(fetchData).toBeCalledWith(
                'games',
                expect.objectContaining({
                    search: '123',
                })
            );
        });
    });
});

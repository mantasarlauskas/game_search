import { render, screen } from '@testing-library/react';
import HomePage, { getServerSideProps } from 'pages';
import { getGames } from 'testing/testFactories';
import { fetchData } from 'utils/fetch';

jest.mock('hooks/usePaginatedQuery');
jest.mock('utils/fetch');
jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: '',
        };
    },
}));

describe('<HomePage />', () => {
    const props = {
        games: getGames(),
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<HomePage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<HomePage {...props} />);
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
    });

    describe('getServerSideProps', () => {
        it('returns server side props', async () => {
            const res = await getServerSideProps({ query: '' } as any);
            expect(res).toEqual({
                props: {
                    games: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(1);
            expect(fetchData).toBeCalledWith('games', {
                ordering: '',
                page: 1,
                page_size: 20,
            });
        });
    });
});

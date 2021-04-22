import { render, screen } from '@testing-library/react';
import PlatformPage, { getServerSideProps } from 'pages/platforms/[id]';
import { getCategories, getGames } from 'testing/testFactories';
import { fetchData } from 'utils/fetch';
import { NextPageContextWithID } from 'utils/types';

jest.mock('utils/fetch');
jest.mock('hooks/usePaginatedQuery');
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
            platforms: mockedCategories,
        };
    },
}));

describe('<PlatformPage />', () => {
    const props = {
        games: getGames(),
        count: 100,
        id: '18893',
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<PlatformPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<PlatformPage {...props} />);
        expect(screen.getByText('Games for Feral Interactive'));
        expect(screen.getByText('Tomb Raider (2013)'));
        expect(screen.getByText('Portal 2'));
        expect(screen.getByText('Total 100 games'));
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
                platforms: '123',
            }));
        });
    });
});

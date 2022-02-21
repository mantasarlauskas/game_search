import {
    getCategoryAndGamesServerSideProps,
    getCategoryName,
    getCategoryPageServerSideProps,
    getCategoriesPageServerSideProps,
} from 'utils/categories';
import { getCategories, getGames } from 'testing/testFactories';
import { ApiPath, fetchData } from 'utils/fetch';
import { Route } from 'utils/routes';

jest.mock('utils/fetch');

describe('categories', () => {
    const categories = getCategories();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCategoryName', () => {
        it('returns category name', () => {
            expect(getCategoryName(categories, '18893')).toEqual(
                'Feral Interactive'
            );

            expect(getCategoryName(categories, '405')).toEqual('Ubisoft');
            expect(getCategoryName(categories, '406')).toEqual(undefined);
        });
    });

    describe('getCategoryPageServerSideProps', () => {
        it('returns data and calls fetchData', async () => {
            const res = await getCategoryPageServerSideProps(
                { ordering: 'name' },
                '123',
                { genres: '123' }
            );

            expect(res).toEqual({
                props: {
                    id: '123',
                    count: 100,
                    games: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(1);
            expect(fetchData).toBeCalledWith(
                'games',
                expect.objectContaining({
                    ordering: 'name',
                    genres: '123',
                })
            );
        });

        it('redirects to not found page when there are no results', async () => {
            (fetchData as jest.Mock).mockResolvedValueOnce({});
            const res = await getCategoryPageServerSideProps(
                { ordering: 'name' },
                '123',
                { genres: '123' }
            );

            expect(res).toEqual({
                redirect: {
                    destination: Route.NOT_FOUND,
                    permanent: false,
                },
            });
        });
    });

    describe('getCategoryAndGamesServerSideProps', () => {
        it('returns data and calls fetchData', async () => {
            const res = await getCategoryAndGamesServerSideProps(
                { ordering: 'name' },
                ApiPath.PUBLISHERS,
                '123',
                { genres: '123' }
            );

            expect(res).toEqual({
                props: {
                    name: 'name',
                    id: '123',
                    count: 100,
                    games: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(2);
            expect(fetchData).toBeCalledWith('publishers/123');
            expect(fetchData).toBeCalledWith(
                'games',
                expect.objectContaining({
                    ordering: 'name',
                    genres: '123',
                })
            );
        });

        it('redirects to not found page when there are no results', async () => {
            (fetchData as jest.Mock).mockResolvedValueOnce({});
            const res = await getCategoryAndGamesServerSideProps(
                { ordering: 'name' },
                ApiPath.PUBLISHERS,
                '123',
                { genres: '123' }
            );

            expect(res).toEqual({
                redirect: {
                    destination: Route.NOT_FOUND,
                    permanent: false,
                },
            });
        });
    });

    describe('getCategoriesPageServerSideProps', () => {
        it('returns data and calls fetchData', async () => {
            const res = await getCategoriesPageServerSideProps(
                ApiPath.DEVELOPERS
            );

            expect(res).toEqual({
                props: {
                    categories: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(1);
            expect(fetchData).toBeCalledWith('developers', {
                page: 1,
                page_size: 20,
            });
        });
    });
});

import { getFetchUrl, getQueryParams, handleServerResponse, fetchData } from 'utils/fetch';
import { SortMode } from 'components/GameSort';
import { getGames } from 'testing/testFactories';

describe('fetch', () => {
    describe('getFetchUrl', () => {
        it('returns url', () => {
            expect(getFetchUrl('url')).toEqual('https://api.rawg.io/api/url');
            expect(getFetchUrl('url', { ordering: SortMode.NAME })).toEqual(
                'https://api.rawg.io/api/url?ordering=name',
            );

            expect(getFetchUrl('url', { ordering: SortMode.NAME, genres: '123' })).toEqual(
                'https://api.rawg.io/api/url?ordering=name&genres=123',
            );
        });
    });

    describe('getQueryParams', () => {
        it('returns query params', () => {
            expect(getQueryParams()).toEqual('');
            expect(getQueryParams({})).toEqual('');
            expect(getQueryParams({ ordering: SortMode.NAME })).toEqual('ordering=name');
            expect(getQueryParams({ ordering: SortMode.NAME, genres: '123' })).toEqual(
                'ordering=name&genres=123',
            );
        });
    });

    describe('handleServerResponse', () => {
        it('handles server response', async () => {
            expect(await handleServerResponse(Promise.resolve({
                json: getGames,
                ok: true,
            } as any))).toEqual(getGames());
            expect(await handleServerResponse(Promise.resolve({
                json: getGames,
                ok: false,
            } as any))).toEqual(null);
            expect(await handleServerResponse(Promise.resolve({
                ok: true,
            } as any))).toEqual(null);
        });
    });

    describe('fetchData', () => {
        it('returns data', async () => {
            window.fetch = jest.fn().mockResolvedValue({ json: getGames, ok: true });
            const res = await fetchData('url', { platforms: '123' });
            expect(res).toEqual(getGames());
            expect(window.fetch).toBeCalledTimes(1);
            expect(window.fetch).toBeCalledWith('https://api.rawg.io/api/url?platforms=123');
        });
    });
});

/* eslint-disable no-underscore-dangle */
import { createMocks } from 'node-mocks-http';
import handler from 'pages/api/[...path]';
import { getGames } from 'testing/testFactories';

const data = {
    results: getGames(),
    next: 'https://api.rawg.io/api/games?key=9132131212421&page=3&page_size=6',
    previous: null,
};

window.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => data });

describe('path API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns 200 response with results', async () => {
        const { req, res } = createMocks({
            query: {
                path: ['games', '123'],
            },
        });

        await handler(req, res);
        expect(window.fetch).toBeCalledTimes(1);
        expect(window.fetch).toBeCalledWith('https://api.rawg.io/api/games/123');
        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toEqual({
            ...data,
            next: expect.stringContaining('/api/games?page=3&page_size=6'),
        });
    });

    it('returns 200 response with results and uses correct query', async () => {
        const { req, res } = createMocks({
            query: {
                path: ['games', '123'],
                search: 'search',
                developers: 'developer',
            },
        });

        await handler(req, res);
        expect(window.fetch).toBeCalledTimes(1);
        expect(window.fetch).toBeCalledWith(
            'https://api.rawg.io/api/games/123?search=search&developers=developer',
        );

        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toEqual({
            ...data,
            next: expect.stringContaining('/api/games?page=3&page_size=6'),
        });
    });

    it('returns 400 response with fetch error message', async () => {
        const { req, res } = createMocks({
            query: {
                path: ['games', '123'],
            },
        });

        (window.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        await handler(req, res);
        expect(window.fetch).toBeCalledTimes(1);
        expect(window.fetch).toBeCalledWith('https://api.rawg.io/api/games/123');
        expect(res.statusCode).toEqual(400);
        expect(res._getData()).toEqual('Fetch error');
    });

    it('returns 400 response with error message', async () => {
        const { req, res } = createMocks({
            query: {
                path: ['games', '123'],
            },
        });

        (window.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        await handler(req, res);
        expect(window.fetch).toBeCalledTimes(1);
        expect(window.fetch).toBeCalledWith('https://api.rawg.io/api/games/123');
        expect(res.statusCode).toEqual(400);
        expect(res._getData()).toEqual('response.json is not a function');
    });
});

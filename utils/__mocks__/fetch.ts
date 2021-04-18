import { getGames } from 'testing/testFactories';

module.exports = {
    fetchData: jest.fn().mockResolvedValue({
        results: getGames(),
        count: 100,
        next: '2',
        name: 'name',
    }),
    ApiPath: {
        GAMES: 'games',
        GENRES: 'genres',
        PLATFORMS: 'platforms',
        TAGS: 'tags',
        DEVELOPERS: 'developers',
        PUBLISHERS: 'publishers',
        STORES: 'stores',
    },
};

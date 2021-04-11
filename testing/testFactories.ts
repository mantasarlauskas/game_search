import { Category, Game } from 'utils/types';

export function getCategories(): Category[] {
    return [
        {
            id: 18893,
            name: 'Feral Interactive',
            slug: 'feral-interactive',
            games_count: 107,
            image_background: 'https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg',
            games: [
                {
                    slug: 'rise-of-the-tomb-raider',
                    name: 'Rise of the Tomb Raider',
                },
                {
                    slug: 'shadow-of-mordor',
                    name: 'Middle-earth: Shadow of Mordor',
                },
                {
                    slug: 'hitman',
                    name: 'Hitman',
                },
                {
                    slug: 'bioshock-2',
                    name: 'BioShock 2',
                },
                {
                    slug: 'bioshock-remastered',
                    name: 'BioShock Remastered',
                },
                {
                    slug: 'xcom-enemy-unknown',
                    name: 'XCOM: Enemy Unknown',
                },
            ],
        },
        {
            id: 405,
            name: 'Ubisoft',
            slug: 'ubisoft',
            games_count: 297,
            image_background: 'https://media.rawg.io/media/games/5e4/5e4bff02098b2b6f824c68286d5da1a6.jpg',
            games: [
                {
                    slug: 'far-cry-3',
                    name: 'Far Cry 3',
                },
                {
                    slug: 'for-honor',
                    name: 'For Honor',
                },
                {
                    slug: 'watch-dogs',
                    name: 'Watch Dogs',
                },
                {
                    slug: 'far-cry-5',
                    name: 'Far Cry 5',
                },
                {
                    slug: 'assassins-creed-origins',
                    name: 'Assassin\'s Creed Origins',
                },
                {
                    slug: 'rayman-legends',
                    name: 'Rayman Legends',
                },
            ],
        },
    ];
}

export function getGames(): Game[] {
    return [{
        slug: 'portal-2',
        name: 'Portal 2',
        platforms: [
            {
                platform: {
                    id: 4,
                    name: 'PC',
                },
            },
            {
                platform: {
                    id: 1,
                    name: 'Xbox One',
                },
            },
        ],
        released: '2011-04-18',
        background_image: 'https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg',
        rating: 4.62,
        ratings: [
            {
                title: 'exceptional',
                count: 2726,
            },
            {
                title: 'recommended',
                count: 985,
            },
            {
                title: 'meh',
                count: 104,
            },
            {
                title: 'skip',
                count: 72,
            },
        ],
        ratings_count: 3854,
        metacritic: 95,
        clip: {
            clip: 'https://media.rawg.io/media/stories-640/fde/fde8aaeeab956f6b705bbb4161b09004.mp4',
        },
        tags: [
            {
                id: 31,
                name: 'Singleplayer',
            },
        ],
        esrb_rating: {
            id: 2,
            name: 'Everyone 10+',
        },
        genres: [
            {
                id: 2,
                name: 'Shooter',
            },
            {
                id: 7,
                name: 'Puzzle',
            },
        ],
        developers: [],
        publishers: [],
    },
    {
        slug: 'tomb-raider',
        name: 'Tomb Raider (2013)',
        developers: [],
        publishers: [],
        platforms: [
            {
                platform: {
                    id: 4,
                    name: 'PC',
                },
            },
            {
                platform: {
                    id: 1,
                    name: 'Xbox One',
                },
            },
        ],
        released: '2013-03-05',
        background_image: 'https://media.rawg.io/media/games/ad2/ad2ffdf80ba993654f31da045bc02456.jpg',
        rating: 4.06,
        ratings: [
            {
                title: 'recommended',
                count: 1643,
            },
            {
                title: 'exceptional',
                count: 700,
            },
        ],
        ratings_count: 2709,
        metacritic: 86,
        clip: {
            clip: 'https://media.rawg.io/media/stories-640/02a/02ae488ef3392f85c002070b76fd6e37.mp4',
        },
        tags: [
            {
                id: 31,
                name: 'Singleplayer',
            },
        ],
        esrb_rating: {
            id: 4,
            name: 'Mature',
        },
        genres: [
            {
                id: 3,
                name: 'Adventure',
            },
            {
                id: 4,
                name: 'Action',
            },
        ],
    }];
}

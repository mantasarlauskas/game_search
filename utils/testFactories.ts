import { Category } from 'utils/types';

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

import { NextPageContext } from 'next';

export interface Info {
    id: number;
    name: string;
    url?: string;
}

export interface Game {
    name: string;
    slug: string;
    website?: string;
    background_image?: string;
    released?: string;
    platforms?: { platform: Info }[];
    genres: Info[];
    rating: number;
    ratings: { title: string, count: number }[];
    description?: string;
    background_image_additional?: string;
    ratings_count: number;
    metacritic?: number;
    developers: Info[];
    publishers: Info[];
    tags: Info[];
    esrb_rating?: Info;
    clip?: { clip: string };
}

export interface Movie {
    data: {
        480: string,
        max: string,
    }
}

export interface Screenshot {
    image: string;
}

export interface NextPageContextWithID extends NextPageContext {
    params: { id: string }
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image_background: string;
    games_count: number;
    games: { name: string; slug: string; }[];
}

export interface CategoriesPageProps {
    categories: Category[];
    nextPage?: string;
}

export interface CategoryPageProps {
    id: string;
    games: Game[];
    count: number;
    nextPage?: string;
}

export interface CategoryPageWithNameProps extends CategoryPageProps {
    name: string;
}

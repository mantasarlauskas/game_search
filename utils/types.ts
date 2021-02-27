import { NextPageContext } from 'next';

export interface Info {
    name: string;
    slug: string;
}

export interface Game {
    name: string;
    background_image?: string;
    released?: string;
    platforms: Info[];
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
}

export interface SearchResult {
    background_image: string;
    name: string;
    rating: number;
    slug: string;
}

export interface NextPageContextWithID extends NextPageContext {
    params: { id: string }
}

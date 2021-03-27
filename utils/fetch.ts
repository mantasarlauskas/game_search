import { SortMode } from 'components/GameSort';

export enum ApiPath {
    GAMES = 'games',
    GENRES = 'genres',
    PLATFORMS = 'platforms',
    TAGS = 'tags',
    DEVELOPERS = 'developers',
    PUBLISHERS = 'publishers',
    STORES = 'stores',
}

export interface QueryParams {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: SortMode;
    genres?: string;
    platforms?: string;
    tags?: string;
    developers?: string;
    publishers?: string;
    stores?: string;
}

export function fetchData(path: string, query?: QueryParams) {
    return fetch(
        `https://api.rawg.io/api/${path}?${getQueryParams(query)}`,
    ).then((res) => {
        if (!res.ok) {
            return null;
        }

        return res.json();
    }).catch(() => null);
}

function getQueryParams(query?: QueryParams) {
    if (!query || !Object.keys(query).length) {
        return '';
    }

    return Object.keys(query).reduce((params, key: keyof QueryParams) => (
        query[key] ? (params + (!params ? `${key}=${query[key]}` : `&${key}=${query[key]}`)) : params
    ), '');
}

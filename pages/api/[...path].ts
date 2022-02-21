import { NextApiRequest, NextApiResponse } from 'next';
import NodeCache from 'node-cache';

export const cache = new NodeCache();

const CACHE_SECONDS = 3600;

interface ApiResponse {
    next?: string;
    previous?: string;
}

function parseUrl(oldUrl: string) {
    const { pathname, searchParams } = new URL(oldUrl);
    const params = new URLSearchParams(searchParams);
    params.delete('key');
    return `${process.env.HOST}${pathname}${params ? `?${params}` : ''}`;
}

function formatPath(path: string[]) {
    return path.reduce((str, name) => `${str}/${name}`, '');
}

function getFinalUrl(path: string | string[], params: URLSearchParams) {
    const paramsString = params.toString();
    return `https://api.rawg.io/api${formatPath(
        Array.isArray(path) ? path : [path]
    )}${paramsString ? `?${paramsString}` : ''}`;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { path, ...queryParams } = req.query;
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key];
        if (!Array.isArray(value)) {
            params.append(key, value);
        }
    });

    const cacheKey = getFinalUrl(path, params);
    if (process.env.API_KEY) {
        params.append('key', process.env.API_KEY);
    }

    try {
        let data = cache.get<ApiResponse>(cacheKey);
        if (!data) {
            data = await fetch(getFinalUrl(path, params)).then<ApiResponse>(
                (response) => {
                    if (!response.ok) {
                        throw new Error('Fetch error');
                    }

                    return response.json();
                }
            );

            const next = data.next ? { next: parseUrl(data.next) } : {};
            const previous = data.previous
                ? { previous: parseUrl(data.previous) }
                : {};

            data = {
                ...data,
                ...next,
                ...previous,
            };

            cache.set<ApiResponse>(cacheKey, data, CACHE_SECONDS);
        }

        res.status(200).json(data);
    } catch (e) {
        res.status(400).send(e?.message);
    }
}

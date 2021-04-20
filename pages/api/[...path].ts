import { NextApiRequest, NextApiResponse } from 'next';

function parseUrl(oldUrl: string) {
    const { pathname, searchParams } = new URL(oldUrl);
    const params = new URLSearchParams(searchParams);
    params.delete('key');
    return `${process.env.HOST}${pathname}${params ? `?${params}` : ''}`;
}

function formatPath(path: string[]) {
    return path.reduce((str, name) => `${str}/${name}`, '');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { path, ...queryParams } = req.query;
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key];
        if (!Array.isArray(value)) {
            params.append(key, value);
        }
    });

    if (process.env.API_KEY) {
        params.append('key', process.env.API_KEY);
    }

    try {
        const data = await fetch(`https://api.rawg.io/api${formatPath(path as string[])}?${params.toString()}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fetch error');
                }

                return response.json();
            });
        const next = data.next ? { next: parseUrl(data.next) } : {};
        const previous = data.previous ? { previous: parseUrl(data.previous) } : {};
        res.status(200).json({
            ...data,
            ...next,
            ...previous,
        });
    } catch (e) {
        res.status(400).send(e?.message);
    }
}

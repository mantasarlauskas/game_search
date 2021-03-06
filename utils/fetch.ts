export enum API_PATH {
    GAMES = 'games',
}

export async function fetchData(path: string, query?: string) {
    return fetch(
        `https://api.rawg.io/api/${path}?${query || ''}`,
    ).then((res) => {
        if (!res.ok) {
            return null;
        }

        return res.json();
    });
}

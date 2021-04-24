import { Movie } from 'utils/types';

export function getCroppedImageUrl(imageUrl?: string) {
    if (!imageUrl) {
        return undefined;
    }

    const gamesIndex = imageUrl.indexOf('/games');
    const index = gamesIndex > 0 ? gamesIndex : imageUrl.indexOf('/screenshots');
    return [imageUrl.slice(0, index), '/crop/600/400', imageUrl.slice(index)].join('');
}

export function getMovieUrl(movies: Movie[]) {
    return movies[Math.floor(Math.random() * movies.length)]?.data?.[480] || null;
}

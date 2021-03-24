export function cropImageUrl(imageUrl?: string) {
    if (!imageUrl) {
        return undefined;
    }

    const gamesIndex = imageUrl.indexOf('/games');
    const index = gamesIndex > 0 ? gamesIndex : imageUrl.indexOf('/screenshots');
    return [imageUrl.slice(0, index), '/crop/600/400', imageUrl.slice(index)].join('');
}

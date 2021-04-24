import { getCroppedImageUrl, getMovieUrl } from 'utils/media';

describe('media', () => {
    describe('getCroppedImageUrl', () => {
        it('returns image url', () => {
            expect(getCroppedImageUrl()).toEqual(undefined);
            expect(getCroppedImageUrl(
                'https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg',
            )).toEqual(
                'https://media.rawg.io/media/crop/600/400/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg',
            );

            expect(getCroppedImageUrl(
                'https://media.rawg.io/media/screenshots/a95/a95e293cd9403f3c99666addd3d76341_TkdqnQe.jpg',
            )).toEqual(
                'https://media.rawg.io/media/crop/600/400/screenshots/a95/a95e293cd9403f3c99666addd3d76341_TkdqnQe.jpg',
            );
        });
    });

    describe('getMovieUrl', () => {
        it('returns movie url', () => {
            expect(getMovieUrl([])).toBeNull();
            expect(getMovieUrl([{ data: { 480: '480', max: 'max' } }])).toEqual('480');
        });
    });
});

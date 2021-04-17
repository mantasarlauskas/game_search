import { roundNumber } from 'utils/number';

describe('number', () => {
    describe('roundNumber', () => {
        it('returns rounded number', () => {
            expect(roundNumber(7.12)).toEqual(7.1);
            expect(roundNumber(8.67)).toEqual(8.7);
            expect(roundNumber(8.65)).toEqual(8.7);
        });
    });
});

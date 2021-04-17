import { getOrdering } from 'utils/ordering';
import { SortMode } from 'components/GameSort';

describe('ordering', () => {
    describe('getOrdering', () => {
        it('returns ordering value', () => {
            expect(getOrdering({ ordering: 'name' })).toEqual(SortMode.NAME);
            expect(getOrdering({ ordering: '-rating' })).toEqual(SortMode.RATING);
            expect(getOrdering({ ordering: '' })).toEqual(SortMode.RELEVANCE);
            expect(getOrdering({})).toEqual(SortMode.RELEVANCE);
        });
    });
});

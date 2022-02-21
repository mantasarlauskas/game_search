import { ParsedUrlQuery } from 'querystring';
import { SortMode } from 'components/GameSort';

export function getOrdering(query: ParsedUrlQuery) {
    const ordering = query?.ordering;
    return ordering && Object.values(SortMode).some((v) => v === ordering)
        ? (ordering as SortMode)
        : SortMode.RELEVANCE;
}

import { renderHook } from '@testing-library/react-hooks';
import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { getGames } from 'testing/testFactories';
import { useInfiniteQuery } from 'react-query';

jest.mock('react-query', () => ({
    useInfiniteQuery: jest.fn(),
}));

const mockFetchNextPage = jest.fn();
(useInfiniteQuery as jest.Mock).mockReturnValue({
    data: { pages: [{ results: [getGames()[0]] }, { results: [getGames()[1]] }] },
    fetchNextPage: mockFetchNextPage,
});

describe('usePaginatedQuery', () => {
    const props = {
        initialData: [],
        path: '/path',
    };

    it('returns correct data', () => {
        const { result } = renderHook(() => usePaginatedQuery(props));
        expect(result.current.data).toEqual(getGames());
    });
});

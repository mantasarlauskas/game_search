import { getFetchUrl, handleServerResponse, QueryParams } from 'utils/fetch';
import { useInfiniteQuery } from 'react-query';
import { DEFAULT_PAGE_SIZE } from 'utils/page';
import { useMemo } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

function usePaginatedQuery<T, P extends HTMLElement>({
    initialData,
    path,
    initialNextPage,
    queryParams = {},
    initialPageNumber = 1,
    pageSize = DEFAULT_PAGE_SIZE,
}: UsePaginatedQueryProps<T>) {
    const query = useInfiniteQuery<{
        results: T[],
        previous?: string,
        next?: string,
    }>([path, queryParams], ({
        pageParam = getFetchUrl(path, { page: initialPageNumber, page_size: pageSize, ...queryParams }),
    }) => handleServerResponse(fetch(pageParam)), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
        getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
        initialData: {
            pageParams: [],
            pages: [{
                results: initialData,
                next: initialNextPage,
            }],
        },
    });

    const elementRef = useIntersectionObserver<P>(query.fetchNextPage);
    const data = useMemo(() => query.data?.pages?.reduce((arr, response) => [
        ...arr,
        ...(response?.results || []),
    ], []) || [], [query.data]);

    return {
        ...query,
        data,
        paginatorRef: elementRef,
    };
}

interface UsePaginatedQueryProps<T> {
    initialData: T[];
    path: string;
    queryParams?: QueryParams;
    initialPageNumber?: number;
    pageSize?: number;
    disableIntersectionObserver?: boolean
    initialNextPage?: string;
}

export default usePaginatedQuery;

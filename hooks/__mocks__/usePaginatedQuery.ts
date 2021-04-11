import { createRef } from 'react';

const usePaginatedQuery = jest.fn(({ initialData }: any) => ({
    data: initialData,
    isFetching: false,
    paginatorRef: createRef(),
    hasNextPage: true,
    hasPreviousPage: true,
}));

export default usePaginatedQuery;

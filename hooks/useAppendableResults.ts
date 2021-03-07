import { useEffect, useState } from 'react';
import usePaginator, { UsePaginatorProps } from 'hooks/usePaginator';
import useValueChanged from 'hooks/useValueChanged';
import useFetch from 'hooks/useFetch';
import { QueryParams } from 'utils/fetch';

function useAppendableResults<T>({
    initialResults,
    path,
    query,
    initialPageNumber = 1,
    ...paginatorProps
}: UseAppendableResultsProps<T>) {
    const [results, setResults] = useState(initialResults);
    const [fetch, loading] = useFetch<{ results: T[] }>();
    const {
        pageNumber,
        paginatorVisible,
        incrementNumber,
        paginatorRef,
        setPageNumber,
    } = usePaginator({ ...paginatorProps, initialPageNumber });
    const pageNumberChanged = useValueChanged(pageNumber);
    const { pageSize } = paginatorProps;
    const shouldAppend = pageNumberChanged && pageNumber !== initialPageNumber;
    const initialResultsChanged = useValueChanged(initialResults);

    useEffect(() => {
        if (initialResultsChanged) {
            setResults(initialResults);
            setPageNumber(initialPageNumber);
        }
    }, [initialPageNumber, initialResults, initialResultsChanged, setPageNumber]);

    useEffect(() => {
        if (shouldAppend) {
            fetch(
                path,
                { page: pageNumber, page_size: pageSize, ...(query || {}) },
            ).then((response) => {
                if (response) {
                    setResults((prevResults) => [
                        ...prevResults,
                        ...response.results,
                    ]);
                }
            });
        }
    }, [fetch, pageNumber, pageSize, path, query, shouldAppend]);

    return {
        results,
        loading,
        pageNumber,
        paginatorVisible,
        incrementNumber,
        paginatorRef,
    };
}

interface UseAppendableResultsProps<T> extends UsePaginatorProps {
    initialResults: T[];
    path: string;
    query?: QueryParams;
}

export default useAppendableResults;

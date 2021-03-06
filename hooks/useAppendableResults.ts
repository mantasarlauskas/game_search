import { useEffect, useState } from 'react';
import { fetchData } from 'utils/fetch';
import usePaginator, { UsePaginatorProps } from 'hooks/usePaginator';
import useValueChanged from 'hooks/useValueChanged';

function useAppendableResults<T>({
    initialResults,
    path,
    query,
    initialPageNumber = 1,
    ...paginatorProps
}: UseAppendableResultsProps<T>) {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(initialResults);
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
            setLoading(true);
            fetchData(
                path,
                `page=${pageNumber}&page_size=${pageSize}${query ? `&${query}` : ''}`,
            ).then((response) => {
                setResults((prevResults) => [
                    ...prevResults,
                    ...response.results,
                ]);

                setLoading(false);
            });
        }
    }, [pageNumber, pageSize, path, query, shouldAppend]);

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
    query?: string;
}

export default useAppendableResults;

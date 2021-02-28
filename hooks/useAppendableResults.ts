import { useEffect, useState } from 'react';
import { fetchData } from 'utils/fetch';

function useAppendableResults<T>({
    initialResults,
    shouldAppend,
    path,
    query,
    reset,
}: UseAppendableResultsProps<T>): [T[], boolean] {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(initialResults);

    useEffect(() => {
        if (reset) {
            setResults(initialResults);
        }
    }, [initialResults, reset]);

    useEffect(() => {
        if (shouldAppend) {
            setLoading(true);
            fetchData(path, query).then((response) => {
                setResults((prevResults) => [
                    ...prevResults,
                    ...response.results,
                ]);

                setLoading(false);
            });
        }
    }, [path, query, shouldAppend]);

    return [results, loading];
}

interface UseAppendableResultsProps<T> {
    initialResults: T[];
    shouldAppend: boolean;
    path: string;
    query?: string;
    reset?: boolean;
}

export default useAppendableResults;

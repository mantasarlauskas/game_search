import { useCallback, useState } from 'react';
import { fetchData, QueryParams } from 'utils/fetch';

function useFetch<T>(): [fetch: (path: string, query?: QueryParams) => Promise<T | null>, loading: boolean] {
    const [loading, setLoading] = useState(false);

    const fetch = useCallback(async (path: string, query?: QueryParams) => {
        setLoading(true);
        const data = await fetchData(path, query);
        setLoading(false);
        return data;
    }, []);

    return [
        fetch,
        loading,
    ];
}

export default useFetch;

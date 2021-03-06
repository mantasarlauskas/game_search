import { useCallback, useEffect, useRef, useState } from 'react';

function usePaginator({
    pageSize,
    count,
    useIntersectionObserver = true,
    initialPageNumber = 1,
}: UsePaginatorProps) {
    const paginatorRef = useRef<HTMLButtonElement>(null);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const paginatorVisible = pageSize * pageNumber < count;

    useEffect(() => {
        let intersectionObserver: IntersectionObserver;
        if (paginatorRef.current && useIntersectionObserver) {
            intersectionObserver = new IntersectionObserver((entries) => {
                if (entries?.some(({ isIntersecting }) => isIntersecting)) {
                    setPageNumber((number) => number + 1);
                }
            }, { threshold: 1.0 });
            intersectionObserver.observe(paginatorRef.current);
        }

        return () => intersectionObserver?.disconnect();
    }, [useIntersectionObserver]);

    const incrementNumber = useCallback(() => {
        setPageNumber((number) => number + 1);
    }, []);

    return {
        paginatorRef,
        pageNumber,
        paginatorVisible,
        incrementNumber,
        setPageNumber,
    };
}

export interface UsePaginatorProps {
    pageSize: number;
    count: number;
    useIntersectionObserver?: boolean;
    initialPageNumber?: number;
}

export default usePaginator;

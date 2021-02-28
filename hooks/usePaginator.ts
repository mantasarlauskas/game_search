import { useCallback, useEffect, useRef, useState } from 'react';
import useValueChanged from 'hooks/useValueChanged';

function usePaginator({
    pageSize,
    count,
    reset,
    useIntersectionObserver = true,
    initialPageNumber = 1,
}: UsePaginatorProps) {
    const componentRef = useRef<HTMLButtonElement>(null);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const pageNumberChanged = useValueChanged(pageNumber);
    const visible = pageSize * pageNumber < count;
    const pageChanged = pageNumberChanged && visible && pageNumber !== initialPageNumber;

    useEffect(() => {
        if (reset) {
            setPageNumber(initialPageNumber);
        }
    }, [initialPageNumber, reset]);

    useEffect(() => {
        let intersectionObserver: IntersectionObserver;
        if (componentRef.current && useIntersectionObserver) {
            intersectionObserver = new IntersectionObserver((entries) => {
                if (entries?.some(({ isIntersecting }) => isIntersecting)) {
                    setPageNumber((number) => number + 1);
                }
            }, { threshold: 1.0 });
            intersectionObserver.observe(componentRef.current);
        }

        return () => intersectionObserver?.disconnect();
    }, [useIntersectionObserver]);

    const incrementNumber = useCallback(() => {
        setPageNumber((number) => number + 1);
    }, []);

    return {
        componentRef,
        pageNumber,
        visible,
        pageChanged,
        incrementNumber,
    };
}

interface UsePaginatorProps {
    pageSize: number;
    count: number;
    useIntersectionObserver?: boolean;
    reset?: boolean;
    initialPageNumber?: number;
}

export default usePaginator;

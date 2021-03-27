import { useEffect, useRef } from 'react';

function useIntersectionObserver<T extends HTMLElement>(onIntersect: () => void) {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        let intersectionObserver: IntersectionObserver;
        if (elementRef.current) {
            intersectionObserver = new IntersectionObserver((entries) => {
                if (entries?.some(({ isIntersecting }) => isIntersecting)) {
                    onIntersect();
                }
            }, { threshold: 1.0 });
            intersectionObserver.observe(elementRef.current);
        }

        return () => intersectionObserver?.disconnect();
    }, [onIntersect]);

    return elementRef;
}

export default useIntersectionObserver;

import { useRouter } from 'next/router';
import { useEffect } from 'react';

function useScrollToTop() {
    const { asPath } = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [asPath]);
}

export default useScrollToTop;

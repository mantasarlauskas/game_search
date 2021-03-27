import { useEffect, useState } from 'react';

function useDebouncedValue<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [delay, value]);

    return debouncedValue;
}

export default useDebouncedValue;

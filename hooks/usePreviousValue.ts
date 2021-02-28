import { useEffect, useRef } from 'react';

function usePreviousValue<T>(value: T) {
    const previousValue = useRef<T>();

    useEffect(() => {
        previousValue.current = value;
    });

    return previousValue.current;
}

export default usePreviousValue;

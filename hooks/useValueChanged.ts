import usePreviousValue from 'hooks/usePreviousValue';

function useValueChanged<T>(value: T) {
    const previousValue = usePreviousValue(value);
    return previousValue !== value && !!previousValue;
}

export default useValueChanged;

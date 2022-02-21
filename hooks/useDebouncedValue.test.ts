import { renderHook, act } from '@testing-library/react-hooks';
import useDebouncedValue from 'hooks/useDebouncedValue';

describe('useDebouncedValue', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('only shows update value after timer has passed', () => {
        let value = 'a';
        const { rerender, result } = renderHook(() =>
            useDebouncedValue(value, 300)
        );

        value = 'b';
        rerender();

        expect(result.current).toEqual('a');
        act(() => {
            jest.advanceTimersByTime(200);
        });

        expect(result.current).toEqual('a');
        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current).toEqual('b');
    });

    it('clears old timeout when value changes multiple times', () => {
        let value = 'a';
        const { rerender, result } = renderHook(() =>
            useDebouncedValue(value, 300)
        );

        value = 'b';
        rerender();

        expect(result.current).toEqual('a');
        act(() => {
            jest.advanceTimersByTime(200);
        });

        value = 'c';
        rerender();

        expect(result.current).toEqual('a');
        act(() => {
            jest.advanceTimersByTime(200);
        });

        expect(result.current).toEqual('a');
        act(() => {
            jest.advanceTimersByTime(200);
        });

        expect(result.current).toEqual('c');
    });
});

import { render } from '@testing-library/react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

function Component({ onIntersect, visible = true }: { onIntersect: () => void, visible?: boolean }) {
    const ref = useIntersectionObserver<HTMLDivElement>(onIntersect);
    if (!visible) {
        return null;
    }

    return <div ref={ref} />;
}

describe('useIntersectionObserver', () => {
    const onIntersect = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls onIntersect callback', () => {
        render(<Component onIntersect={onIntersect} />);
        expect(onIntersect).toBeCalledTimes(1);
    });

    it('does not call onIntersect callback when element does not exist', () => {
        render(<Component onIntersect={onIntersect} visible={false} />);
        expect(onIntersect).toBeCalledTimes(0);
    });
});

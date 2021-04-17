import { ElementEvent, onEnter } from 'utils/events';

describe('events', () => {
    const callback = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onEnter', () => {
        it('calls callback when enter is pressed', () => {
            onEnter(callback)({ key: 'Enter' } as ElementEvent);
            expect(callback).toBeCalledTimes(1);
        });

        it('does not call callback when other key is pressed', () => {
            onEnter(callback)({ key: 'Space' } as ElementEvent);
            expect(callback).toBeCalledTimes(0);
        });
    });
});

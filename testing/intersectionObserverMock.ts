class IntersectionObserver {
    cb: (e: Partial<IntersectionObserverEntry>[]) => void = () => {};

    constructor(cb: (e: Partial<IntersectionObserverEntry>[]) => void) {
        this.cb = cb;
    }

    observe() {
        this.cb([{ isIntersecting: true }]);
    }

    disconnect() {

    }
}

export default IntersectionObserver;

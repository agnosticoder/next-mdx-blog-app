import { useEffect, useRef, useState } from 'react';

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

const useInView = (
    { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: Args
) => {
    const [inView, setInVeiw] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const frozen = inView && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setInVeiw(entry.isIntersecting);
    };

    useEffect(() => {
        const node = elementRef?.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

    return {inView, elementRef};
};

export default useInView;

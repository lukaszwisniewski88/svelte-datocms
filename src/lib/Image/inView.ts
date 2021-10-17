type inViewOptions = {
	once: boolean;
	root: null | HTMLElement;
	rootMargin: string;
	threshold: number;
};
type ActionReturnType = {
	update: (options: inViewOptions) => void;
	destroy: () => void;
};

export default function (
	node: HTMLElement,
	options: inViewOptions = {
		threshold: 0,
		rootMargin: '0px',
		root: null,
		once: false
	}
): ActionReturnType {
    let observer : IntersectionObserver
	const dispatch = (isInView:boolean) => {
		const event = new CustomEvent<{isInView:boolean}>('inview', { detail: { isInView } });
		node.dispatchEvent(event);
	};
	const observerCallback: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry !== null) {
				dispatch( false);
				if (entry.isIntersecting) {
					dispatch(true);
					if (options.once) observer.unobserve(node);
				}
			}
		});
	};
    const initialize = ({root,rootMargin,threshold} = options)=>{
        observer = new IntersectionObserver(observerCallback, { root, rootMargin, threshold });
        observer.observe(node);
    }
    initialize()
	return {
		update(properties) {
            observer.disconnect()
            initialize(properties)
			console.log('update called!');
		},
		destroy() {
			observer && observer.disconnect();
		}
	};
}

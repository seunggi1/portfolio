import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(callback: () => void) {
	const element = useRef<Element>(undefined);
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						callback();
					}
				});
			},
			{
				threshold: 1,
			}
		);

		if (element.current) {
			observer.observe(element.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [element, callback]);

	const handleRef = (node: Element | null) => {
		if (node) {
			element.current = node;
		}
	};

	return {
		handleRef,
	};
}

import { useEffect, useRef } from 'react';

type Props = {
	callback: () => void;
	threshold: number;
};

export default function useIntersectionObserver({
	callback,
	threshold,
}: Props) {
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
				threshold: Math.max(threshold, 1),
			}
		);

		if (element.current) {
			observer.observe(element.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [element, callback, threshold]);

	const handleRef = (node: Element | null) => {
		if (node) {
			element.current = node;
		}
	};

	return {
		handleRef,
	};
}

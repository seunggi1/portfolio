import { useRef } from 'react';

type Props = {
	delaySeconds: number;
};

export default function useDebounce({ delaySeconds }: Props) {
	const timerId = useRef<number | undefined>(undefined);

	const handleDebounce = (callback: () => void) => {
		window.clearTimeout(timerId.current);
		timerId.current = window.setTimeout(callback, delaySeconds * 1000);
	};

	return {
		handleDebounce,
	};
}

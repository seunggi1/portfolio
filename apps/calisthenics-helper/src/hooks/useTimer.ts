import { useEffect, useState } from 'react';
import { getRemainSecondsFromUnixTime, getUnixTime } from '@/utils/time';

type Props = {
	seconds: number;
	onExpire: () => void;
};

const DELAY = 100;

export default function useTimer({ seconds, onExpire }: Props) {
	const [expireUnixTime, setExpireUnixTime] = useState<number>(
		getUnixTime(seconds)
	);
	const [maxSeconds, setMaxSeconds] = useState<number>(seconds);
	const [latestSeconds, setLastestSeconds] = useState<number>(seconds);
	const [isPause, setIsPause] = useState<boolean>(false);

	useEffect(() => {
		const timer = setInterval(() => {
			if (isPause) {
				return;
			}
			const remainSeconds = getRemainSecondsFromUnixTime(expireUnixTime);
			if (remainSeconds <= 0) {
				onExpire();
			} else {
				setLastestSeconds(remainSeconds);
			}
		}, DELAY);

		return () => {
			clearInterval(timer);
		};
	}, [isPause, latestSeconds, expireUnixTime, onExpire]);

	const start = () => {
		setIsPause(false);
		setExpireUnixTime(getUnixTime(latestSeconds));
	};
	const pause = () => {
		setIsPause(true);
	};
	const reset = (seconds: number) => {
		setExpireUnixTime(getUnixTime(seconds));
		setLastestSeconds(seconds);
		setMaxSeconds(seconds);
		setIsPause(false);
	};

	return {
		maxSeconds,
		latestSeconds,
		start,
		pause,
		reset,
	};
}

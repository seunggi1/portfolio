import { useEffect, useRef, useState } from 'react';
import { getRemainSecondsFromUnixTime, getUnixTime } from '@/utils/time';

type Props = {
	initIntervalSeconds: number;
	onInterval: () => void;
	initExpireSeconds: number;
	onExpire: () => void;
};

const DELAY = 100;

export default function useIntervalTimer({
	initIntervalSeconds,
	onInterval,
	initExpireSeconds,
	onExpire,
}: Props) {
	const [expireUnixTime, setExpireUnixTime] = useState<number>(
		getUnixTime(initExpireSeconds)
	);
	const [maxSeconds, setMaxSeconds] = useState<number>(initExpireSeconds);
	const [latestSeconds, setLastestSeconds] =
		useState<number>(initExpireSeconds);
	const [isPause, setIsPause] = useState<boolean>(false);

	const intervalExpireUnixTime = useRef<number>(
		getUnixTime(initIntervalSeconds)
	);
	const intervalLatestSeconds = useRef<number>(initIntervalSeconds);
	const expireIndex = useRef<number>(0);

	useEffect(() => {
		onInterval();
	}, [expireIndex.current]);

	useEffect(() => {
		const timer = setInterval(() => {
			if (isPause) {
				return;
			}

			const remainIntervalSeconds = getRemainSecondsFromUnixTime(
				intervalExpireUnixTime.current
			);

			if (remainIntervalSeconds <= 0) {
				onInterval();
			} else {
				intervalLatestSeconds.current = remainIntervalSeconds;
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
	}, [
		isPause,
		latestSeconds,
		expireUnixTime,
		onExpire,
		onInterval,
		intervalExpireUnixTime.current,
		intervalLatestSeconds.current,
	]);

	const start = () => {
		setIsPause(false);
		setExpireUnixTime(getUnixTime(latestSeconds));
		intervalExpireUnixTime.current = getUnixTime(intervalLatestSeconds.current);
	};

	const pause = () => {
		setIsPause(true);
	};

	const reset = (seconds: number) => {
		setExpireUnixTime(getUnixTime(seconds));
		setLastestSeconds(seconds);
		setMaxSeconds(seconds);
		expireIndex.current++;
	};

	const resetInterval = (intervalSeconds: number) => {
		intervalExpireUnixTime.current = getUnixTime(intervalSeconds);
		intervalLatestSeconds.current = intervalSeconds;
		setIsPause(false);
	};

	return {
		maxSeconds,
		latestSeconds,
		start,
		pause,
		reset,
		resetInterval,
	};
}

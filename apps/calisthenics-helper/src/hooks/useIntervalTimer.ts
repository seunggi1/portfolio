import { getRemainSecondsFromUnixTime, getUnixTime } from '@repo/utils';
import { useEffect, useRef, useState } from 'react';

type Props = {
	initIntervalSeconds: number;
	onInterval: (remainSeconds: number) => void;
	initExpireSeconds: number;
	onExpire: () => void;
	initPause: boolean;
};

const DELAY = 100;

export default function useIntervalTimer({
	initIntervalSeconds,
	onInterval,
	initExpireSeconds,
	onExpire,
	initPause,
}: Props) {
	const [expireUnixTime, setExpireUnixTime] = useState<number>(
		getUnixTime(initExpireSeconds)
	);
	const [maxSeconds, setMaxSeconds] = useState<number>(initExpireSeconds);
	const [latestSeconds, setLastestSeconds] =
		useState<number>(initExpireSeconds);
	const [isPause, setIsPause] = useState<boolean>(initPause);

	const intervalExpireUnixTime = useRef<number>(
		getUnixTime(initIntervalSeconds)
	);
	const intervalLatestSeconds = useRef<number>(initIntervalSeconds);

	useEffect(() => {
		const timer = setInterval(() => {
			if (isPause) {
				return;
			}

			const remainIntervalSeconds = getRemainSecondsFromUnixTime(
				intervalExpireUnixTime.current
			);

			const remainSeconds = getRemainSecondsFromUnixTime(expireUnixTime);
			if (remainIntervalSeconds <= 0) {
				onInterval(remainSeconds);
			} else {
				intervalLatestSeconds.current = remainIntervalSeconds;
			}

			if (remainSeconds <= 0) {
				onExpire();
			} else {
				setLastestSeconds(remainSeconds);
			}
		}, DELAY);

		return () => {
			clearInterval(timer);
		};
	}, [isPause, latestSeconds, expireUnixTime, onExpire, onInterval]);

	const handleStart = () => {
		setIsPause(false);
		setExpireUnixTime(getUnixTime(latestSeconds));
		intervalExpireUnixTime.current = getUnixTime(intervalLatestSeconds.current);
	};

	const handlePause = () => {
		setIsPause(true);
	};

	const handleReset = (seconds: number) => {
		setExpireUnixTime(getUnixTime(seconds));
		setLastestSeconds(seconds);
		setMaxSeconds(seconds);
	};

	const handleIntervalReset = (intervalSeconds: number) => {
		intervalExpireUnixTime.current = getUnixTime(intervalSeconds);
		intervalLatestSeconds.current = intervalSeconds;
		setIsPause(false);
	};

	return {
		maxSeconds,
		latestSeconds,
		handleStart,
		handlePause,
		handleReset,
		handleIntervalReset,
	};
}

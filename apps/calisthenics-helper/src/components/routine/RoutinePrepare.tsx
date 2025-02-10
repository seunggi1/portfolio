import useTimer from '@/hooks';
import Timer from './Timer';

type Props = {
	prepareSeconds: number;
	onPrepare: () => void;
};

export default function RoutinePrepare({ prepareSeconds, onPrepare }: Props) {
	const { maxSeconds, latestSeconds } = useTimer({
		seconds: prepareSeconds,
		onExpire: onPrepare,
	});

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 text-4xl font-bold text-white bg-sky-300">
			<p>잠시후 운동이 시작됩니다. </p>
			<p>준비해주세요!</p>
			<Timer seconds={latestSeconds} maxSeconds={maxSeconds} />
		</div>
	);
}

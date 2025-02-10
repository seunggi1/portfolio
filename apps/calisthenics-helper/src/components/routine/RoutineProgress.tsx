import { ExerciseSet } from '@/types/routine';
import Timer from './Timer';
import useTimer from '@/hooks';
import { Button } from '@repo/ui/common';

type Props = {
	exerciseSet: ExerciseSet;
	isPause: boolean;
	currentSet: number;
	isRest: boolean;
	onToggleIsPause: () => void;
	onEnd: () => void;
	onNext: () => void;
};

export default function RoutineProgress({
	exerciseSet: {
		exerciseName,
		repetitionCount,
		sets,
		exerciseSeconds,
		restSeconds,
	},
	currentSet,
	isRest,
	isPause,
	onEnd,
	onToggleIsPause,
	onNext,
}: Props) {
	const { maxSeconds, latestSeconds, pause, start, reset } = useTimer({
		seconds: exerciseSeconds,
		onExpire,
	});

	function onExpire() {
		onNext();
		reset(isRest ? exerciseSeconds : restSeconds);
	}

	const onPause = () => {
		if (isPause) {
			return;
		}
		onToggleIsPause();
		pause();
	};

	const onStart = () => {
		if (!isPause) {
			return;
		}
		onToggleIsPause();
		start();
	};

	return (
		<section className="flex flex-col items-center justify-center h-full gap-4 ">
			<Button onClick={onEnd}>운동종료</Button>
			{isPause ? (
				<Button onClick={onStart}>재시작</Button>
			) : (
				<Button onClick={onPause}>일시정지</Button>
			)}
			{isPause && <h2 className="text-5xl font-bold">일시정지</h2>}
			<h2 className="text-5xl font-bold">{exerciseName}</h2>
			<h3 className="text-3xl font-bold">{`${currentSet}/${sets}`}</h3>
			<h3 className="text-3xl font-bold">{repetitionCount}회</h3>
			{isRest && <h3 className="text-sky-400">휴식시간</h3>}
			<Timer seconds={latestSeconds} maxSeconds={maxSeconds} />
		</section>
	);
}

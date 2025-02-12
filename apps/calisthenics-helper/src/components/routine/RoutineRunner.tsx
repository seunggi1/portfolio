import { ExerciseSet } from '@/types/routine';
import useTimer from '@/hooks';
import { Button } from '@repo/ui/common';
import RoutineProgressBar from './RoutineProgressBar';
import { CirclePause, CirclePlay, CircleStop } from 'lucide-react';
import StopIcon from '../common/icon/StopIcon';
import PlayIcon from '../common/icon/PlayIcon';
import PauseIcon from '../common/icon/PauseIcon';

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
		<section
			className={`flex flex-col items-center justify-center gap-4 h-full`}
		>
			<h2 className="text-8xl font-bold">{exerciseName}</h2>
			<div className="flex gap-4">
				<h3 className="text-5xl font-bold">{`${currentSet}/${sets}`}</h3>
				<h3 className="text-5xl font-bold">{repetitionCount}회</h3>
			</div>
			<div>
				<span className="text-5xl font-bold">{`${Math.ceil(latestSeconds)}`}</span>
			</div>
			<RoutineProgressBar
				seconds={latestSeconds}
				maxSeconds={maxSeconds}
				isRest={isRest}
				isPause={isPause}
			/>
			<div>
				<Button className="mr-4" onClick={onEnd} color={'error'}>
					<StopIcon />
				</Button>
				{isPause ? (
					<Button onClick={onStart} color={'primary'}>
						<PlayIcon />
					</Button>
				) : (
					<Button onClick={onPause} color={'warning'}>
						<PauseIcon />
					</Button>
				)}
			</div>
		</section>
	);
}

import useTimer from '@/hooks';
import { Button } from '@repo/ui/common';
import RoutineProgressBar from './RoutineProgressBar';
import { PauseIcon, PlayIcon, StopIcon } from '@/components/common/icon';
import { RoutineState } from '@/hooks/useRoutine';

type Props = {
	initSeconds: number;
	isPause: boolean;
	statusName: string;
	setInfo: string;
	secondsPerRep: number;
	repetitionCount: number;
	status: RoutineState['currentExercise']['status'];
	onToggleIsPause: () => void;
	onEnd: () => void;
	onNext: () => number;
};

export default function RotineProgress({
	initSeconds,
	isPause,
	statusName,
	repetitionCount,
	setInfo,
	status,
	onEnd,
	onToggleIsPause,
	onNext,
}: Props) {
	const { maxSeconds, latestSeconds, pause, start, reset } = useTimer({
		seconds: initSeconds,
		onExpire: () => {
			reset(onNext());
		},
	});

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
			<p className="text-5xl font-bold">{setInfo}</p>
			<p className="text-8xl font-bold">{statusName}</p>
			<p className="text-5xl font-bold">{repetitionCount}회</p>
			<div>
				<span className="text-5xl font-bold">{`${Math.ceil(latestSeconds)}`}</span>
			</div>
			<RoutineProgressBar
				seconds={latestSeconds}
				maxSeconds={maxSeconds}
				status={status}
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

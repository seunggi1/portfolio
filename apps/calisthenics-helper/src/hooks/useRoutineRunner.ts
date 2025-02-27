import { RoutineDetail } from '../types/routine';
import { useRef, useState } from 'react';
import useRoutineSound from './useRoutineSound';
import {
	ExerciseState,
	RoutineController,
	RoutineState,
} from '@/utils/routine';
import useIntervalTimer from './useIntervalTimer';

export type RoutineResult = {
	routineState: RoutineState;
	maxSeconds: number;
	latestSeconds: number;
	onEnd: () => void;
	onToggleIsPause: () => void;
};

export default function useRoutineRunner(
	routineDetail: RoutineDetail
): RoutineResult {
	const routineRunner = useRef<RoutineController>(
		new RoutineController(routineDetail)
	);
	const [routineState, setRoutineState] = useState<RoutineState>(
		routineRunner.current.createState()
	);
	const { playCount, playStatus } = useRoutineSound();

	const {
		latestSeconds,
		maxSeconds,
		pause: pauseTimer,
		reset,
		resetInterval,
		start: startTimer,
	} = useIntervalTimer({
		initExpireSeconds: routineState.state.totalSeconds,
		initIntervalSeconds: (routineState.state as ExerciseState).secondsPerRep,

		onExpire: () => {
			if (routineState.isEnd) {
				return;
			}

			const nextRoutineState = routineRunner.current.nextState();
			setRoutineState(nextRoutineState);
			if (
				(nextRoutineState.state.status === 'delay' ||
					nextRoutineState.state.status === 'rest') &&
				!nextRoutineState.isEnd
			) {
				playStatus(nextRoutineState.state.status);
			}
			reset(nextRoutineState.state.totalSeconds);
		},
		onInterval: () => {
			if (routineState.isEnd || routineState.state.status !== 'exercise') {
				return;
			}
			const nextState = routineRunner.current.nextExerciseCount();
			const state = nextState.state as ExerciseState;
			console.log(state.count);
			playCount(state.count);
			setRoutineState(nextState);
			resetInterval(state.secondsPerRep);
		},
	});

	const onEnd = () => {
		routineRunner.current.changeEnd(true);
		setRoutineState(routineRunner.current.createState());
	};

	const onToggleIsPause = () => {
		routineRunner.current.toggleIsPause();
		setRoutineState(routineRunner.current.createState());
		if (routineState.isPause) {
			startTimer();
		} else {
			pauseTimer();
		}
	};

	return {
		routineState,
		maxSeconds,
		latestSeconds,
		onEnd,
		onToggleIsPause,
	};
}

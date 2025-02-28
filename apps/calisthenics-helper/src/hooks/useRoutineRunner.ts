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
	remainSeconds: number;
	onEnd: () => void;
	onToggleIsPause: () => void;
};

const INIT_INTERVAL_SECONDS = 1;

export default function useRoutineRunner(
	routineDetail: RoutineDetail
): RoutineResult {
	const { current: routineController } = useRef<RoutineController>(
		new RoutineController(routineDetail)
	);
	const [routineState, setRoutineState] = useState<RoutineState>(
		routineController.createState()
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
		initIntervalSeconds: INIT_INTERVAL_SECONDS,

		onExpire: () => {
			if (routineState.isEnd) {
				return;
			}

			const nextRoutineState = routineController.nextState();
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
			const nextState = routineController.nextExerciseCount();
			const state = nextState.state as ExerciseState;
			playCount(state.count);
			setRoutineState(nextState);
			resetInterval(state.secondsPerRep);
		},
	});

	const onEnd = () => {
		routineController.changeEnd(true);
		setRoutineState(routineController.createState());
	};

	const onToggleIsPause = () => {
		routineController.toggleIsPause();
		setRoutineState(routineController.createState());
		if (routineState.isPause) {
			startTimer();
		} else {
			pauseTimer();
		}
	};

	return {
		routineState,
		maxSeconds,
		remainSeconds: latestSeconds,
		onEnd,
		onToggleIsPause,
	};
}

import { useRef, useState } from 'react';
import {
	ExerciseState,
	RoutineDetail,
	RoutineRunStep,
	RoutineState,
} from '@/types/routine';
import useRoutineSound from './useRoutineSound';
import useIntervalTimer from './useIntervalTimer';
import { RoutineController } from '@/utils/routine';

export type RoutineResult = {
	routineState: RoutineState;
	maxSeconds: number;
	remainSeconds: number;
	isMute: boolean;
	handleEnd: () => void;
	handlePauseToggle: () => void;
	handleMuteToggle: () => void;
	routineRunStep: RoutineRunStep;
};

const INIT_INTERVAL_SECONDS = 1;

export default function useRoutineRunner(
	routineDetail: RoutineDetail
): RoutineResult {
	const { current: routineController } = useRef<RoutineController>(
		new RoutineController(routineDetail, true)
	);
	const [routineState, setRoutineState] = useState<RoutineState>(
		routineController.createState()
	);
	const { playCount, playStatus, playBeep, isMute, handleMuteToggle } =
		useRoutineSound();
	const [routineRunStep, setRoutineRunStep] = useState<RoutineRunStep>(
		routineController.getRoutineRunStep()
	);
	const beepSeconds = useRef<number>(0);

	const {
		latestSeconds,
		maxSeconds,
		handlePause: onTimerPause,
		handleReset: onTimerReset,
		handleIntervalReset: onTimerIntervalReset,
		handleStart: onTimerStart,
	} = useIntervalTimer({
		initExpireSeconds: routineState.state.totalSeconds,
		initIntervalSeconds: INIT_INTERVAL_SECONDS,
		initPause: routineState.isPause,
		onExpire: () => {
			if (routineState.isEnd) {
				return;
			}

			const nextRoutineState = routineController.nextState();
			setRoutineState(nextRoutineState);
			setRoutineRunStep(routineController.getRoutineRunStep());
			if (
				nextRoutineState.state.status === 'delay' ||
				nextRoutineState.state.status === 'rest'
			) {
				playStatus(nextRoutineState.state.status);
			}
			onTimerReset(nextRoutineState.state.totalSeconds);
		},
		onInterval: (remainSeconds: number) => {
			if (routineState.isEnd) {
				return;
			}

			if (
				routineState.state.status === 'delay' ||
				routineState.state.status === 'rest'
			) {
				const seconds = Math.ceil(remainSeconds);
				if (beepSeconds.current !== seconds && seconds >= 1 && seconds <= 5) {
					beepSeconds.current = seconds;
					playBeep();
				}
			}

			if (routineState.state.status === 'exercise') {
				const nextState = routineController.nextExerciseCount();
				const state = nextState.state as ExerciseState;
				playCount(state.count);
				setRoutineState(nextState);
				onTimerIntervalReset(state.secondsPerRep);
			}
		},
	});

	const handleEnd = () => {
		routineController.changeEnd(true);
		setRoutineState(routineController.createState());
	};

	const handlePauseToggle = () => {
		routineController.toggleIsPause();
		setRoutineState(routineController.createState());
		if (routineState.isPause) {
			onTimerStart();
		} else {
			onTimerPause();
		}
	};

	return {
		routineState,
		maxSeconds,
		remainSeconds: latestSeconds,
		isMute,
		handleEnd,
		handlePauseToggle,
		handleMuteToggle,
		routineRunStep,
	};
}

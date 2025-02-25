import { useState } from 'react';
import useRoutineDetail from './useRoutineDetail';

export type RoutineState = {
	isPrepare: boolean;
	isPause: boolean;
	isEnd: boolean;
	currentExercise: {
		selectedExercise: number;
		set: number;
		status: 'exercise' | 'delay' | 'rest';
	};
};

const DEFAULT_STATE: RoutineState = {
	isPrepare: false,
	isPause: false,
	isEnd: false,
	currentExercise: {
		selectedExercise: 0,
		set: 1,
		status: 'exercise',
	},
};

const PREPARE_SECONDS = 5;

export default function useRoutine(id: string) {
	const { routineDetail, isLoading, error } = useRoutineDetail(id);
	const [routineState, setRoutineState] = useState<RoutineState>(DEFAULT_STATE);
	const { selectedExercise, set, status } = routineState.currentExercise;

	const initSeconds =
		routineState.isPrepare === false
			? PREPARE_SECONDS
			: routineDetail!.exercises[selectedExercise].totalExerciseSeconds;

	const exerciseInfo = {
		setInfo: `${set}/${routineDetail?.totalSets}`,
		secondsPerRep: routineDetail!.exercises[selectedExercise].secondsPerRep,
		repetitionCount: routineDetail!.exercises[selectedExercise].repetitionCount,
		statusName:
			status === 'rest' || status === 'delay'
				? `다음 : ${routineDetail?.exercises[selectedExercise].name}`
				: `${routineDetail?.exercises[selectedExercise].name}`,
	};

	const onChangeIsPrepare = (isPrepare: boolean) => {
		setRoutineState((r) => ({ ...r, isPrepare }));
	};

	const onChangeIsEnd = (isEnd: boolean) => {
		setRoutineState((r) => ({ ...r, isEnd }));
	};

	const onToggleIsPause = () => {
		setRoutineState((r) => ({ ...r, isPause: !r.isPause }));
	};

	const onNext = (): number => {
		if (!routineDetail) {
			return 0;
		}

		const changeExerciseState = (
			selectedExercise: number,
			set: number,
			status: RoutineState['currentExercise']['status']
		) => {
			setRoutineState((r) => ({
				...r,
				currentExercise: { selectedExercise, set, status },
			}));
		};

		const { exercises, totalSets } = routineDetail;
		const nextExercise = selectedExercise + 1;
		const nextSet = set + 1;
		const NEW = 0;

		// 휴식시간 후 혹은 모든 운동이 끝났을 때 남은 세트가 없다면
		if (
			(status === 'rest' && nextSet > totalSets) ||
			(status === 'exercise' &&
				nextExercise === exercises.length &&
				nextSet > totalSets)
		) {
			onChangeIsEnd(true);
			return 0;
		}

		// 휴식 시간이 끝난 후 세트가 남아있을 때
		if (status === 'rest' && nextSet <= totalSets) {
			const nextTimeSeconds = routineDetail.exercises[NEW].totalExerciseSeconds;
			changeExerciseState(NEW, nextSet, 'exercise');
			return nextTimeSeconds;
		}

		// 세트 내 모든 운동이 끝났을 때
		if (status === 'exercise' && nextExercise === exercises.length) {
			const nextTimeSeconds = routineDetail.restSeconds;
			console.log('rest in ', nextTimeSeconds);
			changeExerciseState(NEW, set, 'rest');
			return nextTimeSeconds;
		}

		// 다음 운동 대기시간
		if (status === 'exercise' && nextExercise < exercises.length) {
			const nextTimeSeconds =
				routineDetail.exercises[selectedExercise].nextDelaySeconds;
			changeExerciseState(nextExercise, set, 'delay');
			return nextTimeSeconds;
		}

		// 대기시간이 끝난 후 다음 운동 세팅
		if (status === 'delay') {
			const nextTimeSeconds =
				routineDetail.exercises[selectedExercise].totalExerciseSeconds;
			changeExerciseState(selectedExercise, set, 'exercise');
			return nextTimeSeconds;
		}

		return 0;
	};

	return {
		routineDetail,
		isLoading,
		error,
		isPrepare: routineState.isPrepare,
		isPause: routineState.isPause,
		isEnd: routineState.isEnd,
		exerciseInfo,
		status,
		initSeconds,
		onChangeIsPrepare,
		onToggleIsPause,
		onChangeIsEnd,
		onNext,
	};
}

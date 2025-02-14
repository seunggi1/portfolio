import { useState } from 'react';
import useRoutineDetail from './useRoutineDetail';

export type RoutineState = {
	isPrepare: boolean;
	isPause: boolean;
	isEnd: boolean;
	currentExercise: { selectedIndex: number; set: number; isRest: boolean };
};

const DEFAULT_STATE: RoutineState = {
	isPrepare: false,
	isPause: false,
	isEnd: false,
	currentExercise: { selectedIndex: 0, set: 1, isRest: false },
};

export default function useRoutine(id: string) {
	const { routineDetail, isLoading, error } = useRoutineDetail(id);
	const [routineState, setRoutineState] = useState<RoutineState>(DEFAULT_STATE);
	const { selectedIndex, set, isRest } = routineState.currentExercise;

	const onChangeIsPrepare = (isPrepare: boolean) => {
		setRoutineState((r) => ({ ...r, isPrepare }));
	};

	const onChangeIsEnd = (isEnd: boolean) => {
		setRoutineState((r) => ({ ...r, isEnd }));
	};

	const onToggleIsPause = () => {
		setRoutineState((r) => ({ ...r, isPause: !r.isPause }));
	};

	const onNext = () => {
		if (!routineDetail) {
			return;
		}

		const changeCurrentExercise = (
			selectedIndex: number,
			set: number,
			isRest: boolean
		) => {
			setRoutineState((r) => ({
				...r,
				currentExercise: { selectedIndex, set, isRest },
			}));
		};

		const nextSet = set + 1;
		const maxSets = routineDetail.exerciseSets[selectedIndex].sets;

		const nextSelectedIndex = selectedIndex + 1;
		const maxIndex = routineDetail?.exerciseSets.length;

		if (isRest && nextSet > maxSets && nextSelectedIndex === maxIndex) {
			onChangeIsEnd(true);
			return;
		}

		if (isRest && nextSet > maxSets && nextSelectedIndex < maxIndex) {
			changeCurrentExercise(nextSelectedIndex, 1, !isRest);
			return;
		}

		if (isRest && nextSet <= maxSets) {
			changeCurrentExercise(selectedIndex, nextSet, !isRest);
			return;
		}

		if (!isRest) {
			changeCurrentExercise(selectedIndex, set, !isRest);
		}
	};

	return {
		isLoading,
		error,
		routine: routineDetail?.exerciseSets[selectedIndex],
		isPrepare: routineState.isPrepare,
		isPause: routineState.isPause,
		isEnd: routineState.isEnd,
		currentSet: set,
		isRest,
		onChangeIsPrepare,
		onToggleIsPause,
		onChangeIsEnd,
		onNext,
	};
}

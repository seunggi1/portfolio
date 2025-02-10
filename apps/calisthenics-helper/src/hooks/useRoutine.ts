import { RoutineDetail } from '@/types/routine';
import { createHttpClient } from '@/utils/httpClient';
import { useEffect, useState } from 'react';

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
	const [routine, setRoutine] = useState<RoutineDetail>();
	const [routineState, setRoutineState] = useState<RoutineState>(DEFAULT_STATE);
	const { selectedIndex, set, isRest } = routineState.currentExercise;

	useEffect(() => {
		createHttpClient<RoutineDetail>(`/routines/api/${id}`)
			.get()
			.then((routine) => {
				setRoutine(routine);
			});
	}, []);

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
		if (!routine) {
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
		const maxSets = routine.exerciseSets[selectedIndex].sets;

		const nextSelectedIndex = selectedIndex + 1;
		const maxIndex = routine?.exerciseSets.length;

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
		routine: routine?.exerciseSets[selectedIndex],
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

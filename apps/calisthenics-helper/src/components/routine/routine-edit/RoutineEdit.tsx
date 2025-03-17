'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { NewExercise, NewRoutineBase, RoutineFormData } from '@/types/routine';
import RoutineEditFinish from './RoutineEditFinish';
import RoutineBaseForm from './RoutineBaseForm';
import { useRoutineCategories, useRoutineEditFunnel } from '@/hooks';
import ExeciseForm from './ExerciseForm';

type Props = {
	updateRoutineBase?: NewRoutineBase;
	updateExercises?: NewExercise[];
};

const DEFAULT_STATE = {
	routineBase: {
		id: '',
		name: '',
		restSeconds: 10,
		totalSets: 1,
		difficultyLevel: 2,
		categoryIDs: [],
		description: '',
	},
	exercise: {
		name: '',
		nextDelaySeconds: 10,
		order: 0,
		repetitionCount: 10,
		secondsPerRep: 3,
	},
};

export default function RoutineEdit({
	updateRoutineBase,
	updateExercises,
}: Props) {
	const [routineBase, SetRoutineBase] = useState<NewRoutineBase>(
		updateRoutineBase ?? DEFAULT_STATE.routineBase
	);
	const [exercises, setExercises] = useState<NewExercise[]>(
		updateExercises ?? [DEFAULT_STATE.exercise]
	);
	const { routineCategories } = useRoutineCategories();
	const { step, exerciseOrder, changeStep } = useRoutineEditFunnel();

	const handleRoutineBaseComplete = (data: RoutineFormData) => {
		SetRoutineBase((prev) => ({ id: prev.id, ...data }));
		changeStep({ type: 'exercise', order: exerciseOrder });
	};

	const handleExerciseComplete = (exercise: NewExercise) => {
		setExercises((prev) =>
			prev.map((e) => (e.order === exercise.order ? { ...exercise } : { ...e }))
		);
		handleFinishClick();
	};

	const handleExerciseAddClick = () => {
		const nextOrder = exerciseOrder + 1;
		if (nextOrder === exercises.length) {
			setExercises((e) => [
				...e,
				{ ...DEFAULT_STATE.exercise, order: nextOrder },
			]);
		}
		changeStep({ type: 'exercise', order: nextOrder });
	};

	const handleFinishClick = () => {
		changeStep({ type: 'finish' });
	};

	return (
		<>
			{step === 'routine' && (
				<RoutineBaseForm
					defaultValue={routineBase}
					routineCategories={routineCategories}
					onSubmit={(data: RoutineFormData) => {
						handleRoutineBaseComplete(data);
					}}
				/>
			)}
			{step === 'exercise' && (
				<ExeciseForm
					defaultValue={exercises[exerciseOrder]}
					onSubmit={handleExerciseComplete}
				/>
			)}
			{step === 'finish' && (
				<RoutineEditFinish newRoutine={{ ...routineBase, exercises }} />
			)}
		</>
	);
}

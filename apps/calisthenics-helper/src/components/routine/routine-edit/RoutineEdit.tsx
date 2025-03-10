'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { NewExercise, NewRoutineBase, Routine } from '@/types/routine';
import RoutineBaseEdit from './RoutineBaseEdit';
import ExerciseEdit from './ExerciseEdit';
import RoutineEditFinish from './RoutineEditFinish';

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

	const [step, setStep] = useState<Step>('routine');
	const params = useSearchParams();
	const exerciseOrder = +(params.get('order') || 0);

	useEffect(() => {
		const progress = params.get('progress');
		if (progress) {
			setStep(progress as Step);
		} else {
			setStep('routine');
		}
	}, [params]);

	const handleRoutineBaseComplete = (routineBase: NewRoutineBase) => {
		setStep('exercise');
		SetRoutineBase(routineBase);
		changeSearchParams({ type: 'exercise', order: exerciseOrder });
	};

	const handleExerciseComplete = (exercise: NewExercise) => {
		setExercises((prev) =>
			prev.map((e) => (e.order === exercise.order ? { ...exercise } : { ...e }))
		);
	};

	const handleExerciseAddClick = () => {
		const nextOrder = exerciseOrder + 1;
		if (nextOrder === exercises.length) {
			setExercises((e) => [
				...e,
				{ ...DEFAULT_STATE.exercise, order: nextOrder },
			]);
		}
		changeSearchParams({ type: 'exercise', order: nextOrder });
	};

	const handleFinishClick = () => {
		setStep('finish');
		changeSearchParams({ type: 'finish' });
	};

	return (
		<>
			{step === 'routine' && (
				<RoutineBaseEdit
					data={routineBase}
					onComplete={handleRoutineBaseComplete}
				/>
			)}
			{step === 'exercise' && (
				<ExerciseEdit
					data={exercises[exerciseOrder]}
					onComplete={handleExerciseComplete}
					onAddClick={handleExerciseAddClick}
					onFinishClick={handleFinishClick}
				/>
			)}
			{step === 'finish' && (
				<>
					<RoutineEditFinish newRoutine={{ ...routineBase, exercises }} />
				</>
			)}
		</>
	);
}

type Step = 'routine' | 'exercise' | 'finish';

type RoutineProgress = {
	type: 'routine';
};

type ExerciseProgress = {
	type: 'exercise';
	order: number;
};

type FinishProgress = {
	type: 'finish';
};

type Progress = RoutineProgress | ExerciseProgress | FinishProgress;

function changeSearchParams(progress: Progress) {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set('progress', progress.type);

	if (progress.type === 'exercise') {
		urlSearchParams.set('order', progress.order.toString());
	}

	window.history.pushState(null, '', `?${urlSearchParams}`);
}

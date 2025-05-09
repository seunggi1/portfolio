'use client';

import { ReactElement, useState } from 'react';
import { NewExercise, NewRoutineBase, RoutineFormData } from '@/types/routine';
import { Button } from '@repo/ui/common';
import { useModal, useRoutineCategories, useRoutineEditFunnel } from '@/hooks';
import RoutineEditFinish from './RoutineEditFinish';
import RoutineBaseForm from './RoutineBaseForm';
import ExeciseForm from './ExerciseForm';
import RoutineEditActions from './RoutineEditActions';

type Props = {
	updateRoutineBase?: NewRoutineBase;
	updateExercises?: NewExercise[];
};

const DEFAULT_STATE = {
	routineBase: {
		id: '',
		name: '',
		restSeconds: 60,
		totalSets: 3,
		difficultyLevel: 2,
		categoryIDs: [],
		description: '',
		image: '',
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
	const [routineBase, setRoutineBase] = useState<NewRoutineBase>(
		updateRoutineBase ?? DEFAULT_STATE.routineBase
	);
	const [exercises, setExercises] = useState<NewExercise[]>(
		updateExercises ?? [DEFAULT_STATE.exercise]
	);
	const { routineCategories } = useRoutineCategories();
	const { step, exerciseOrder, changeStep, backStep } = useRoutineEditFunnel();
	const { Modal, showModal, hideModal } = useModal();

	const handleRoutineBaseComplete = (data: RoutineFormData) => {
		setRoutineBase((prev) => ({ id: prev.id, ...data }));
		changeStep({ type: 'exercise', order: exerciseOrder });
	};

	const handleExerciseComplete = (exercise: NewExercise) => {
		setExercises((prev) =>
			prev.map((e) => (e.order === exercise.order ? { ...exercise } : { ...e }))
		);

		const nextOrder = exercise.order + 1;
		if (exercises[nextOrder]) {
			changeStep({ type: 'exercise', order: nextOrder });
		} else {
			showModal();
		}
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
		hideModal();
	};

	const handleFinishClick = () => {
		changeStep({ type: 'finish' });
		hideModal();
	};

	const ActionsComponent = ({
		nextButton,
	}: {
		nextButton: ReactElement<HTMLButtonElement>;
	}) =>
		RoutineEditActions({
			onPrevClick: backStep,
			nextButton,
			hasPrevButton: step !== 'routine',
		});

	return (
		<section className="flex flex-col items-center justify-center w-full h-full bg-gray-100 gap-4">
			<div className="w-3/4 m-auto mt-10 bg-white rounded-lg md:w-1/2">
				{step === 'routine' && (
					<RoutineBaseForm
						defaultValue={routineBase}
						routineCategories={routineCategories}
						onSubmit={(data: RoutineFormData) => {
							handleRoutineBaseComplete(data);
						}}
						ActionsComponent={ActionsComponent}
					/>
				)}
				{step === 'exercise' && (
					<>
						<ExeciseForm
							defaultValue={{ ...exercises[exerciseOrder] }}
							onSubmit={handleExerciseComplete}
							ActionsComponent={ActionsComponent}
						/>
						<Modal title="운동을 추가 하시겠습니까?">
							<Button onClick={handleExerciseAddClick}>예</Button>
							<Button autoFocus={true} onClick={handleFinishClick}>
								아니오
							</Button>
						</Modal>
					</>
				)}
				{step === 'finish' && (
					<RoutineEditFinish
						routineCategories={routineCategories}
						newRoutine={{ ...routineBase, exercises: exercises.slice() }}
						ActionsComponent={ActionsComponent}
					/>
				)}
			</div>
		</section>
	);
}

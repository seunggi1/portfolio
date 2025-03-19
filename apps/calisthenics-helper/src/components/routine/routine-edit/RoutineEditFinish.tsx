import { RefObject, useState } from 'react';
import { useRoutineEdit } from '@/hooks/useRoutineEdit';
import { NewExercise, NewRoutine, RoutineCategory } from '@/types/routine';
import { Button } from '@repo/ui/common';
import RoutineEditFinishExercises from './RoutineEditFinishExercises';
import RoutineEditFinishRoutineBase from './RoutineEditFinishRoutineBase';

type Props = {
	newRoutine: NewRoutine;
	routineCategories: RoutineCategory[];
	ref: RefObject<HTMLButtonElement | null>;
};

export default function RoutineEditFinish({
	newRoutine,
	routineCategories,
	ref,
}: Props) {
	const [routine, setRoutine] = useState<NewRoutine>(newRoutine);
	const { handleRoutineEdit, data: result, isPending } = useRoutineEdit();

	const handleExerciseDelete = (exercise: NewExercise) => {
		if (routine.exercises.length === 1) {
			return;
		}

		const updateExercises = routine.exercises
			.filter((e) => e !== exercise)
			.map((e, i) => ({ ...e, order: i }));

		setRoutine((r) => ({ ...r, exercises: updateExercises }));
	};

	const handleExerciseOrderChange = (order1: number, order2: number) => {
		const updateExercises = routine.exercises
			.map((e) => {
				if (e.order === order1) {
					return { ...e, order: order2 };
				} else if (e.order === order2) {
					return { ...e, order: order1 };
				}

				return e;
			})
			.sort((a, b) => a.order - b.order);
		setRoutine((r) => ({ ...r, exercises: updateExercises }));
	};

	const handleSaveClick = () => {
		handleRoutineEdit(routine);
	};

	return (
		<>
			<RoutineEditFinishRoutineBase
				routine={routine}
				routineCategories={routineCategories}
			/>
			<RoutineEditFinishExercises
				exercises={routine.exercises}
				onExerciseDelete={handleExerciseDelete}
				onExercisesOrderChange={handleExerciseOrderChange}
			/>
			<Button
				color="primary"
				className="!hidden"
				onClick={handleSaveClick}
				disabled={result}
				ref={ref}
			>
				저장
			</Button>
		</>
	);
}

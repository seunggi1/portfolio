'use client';

import {
	ReactElement,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { useRoutineEdit } from '@/hooks/useRoutineEdit';
import {
	NewExercise,
	NewRoutine,
	Routine,
	RoutineCategory,
} from '@/types/routine';
import { Button } from '@repo/ui/common';
import RoutineEditFinishExercises from './RoutineEditFinishExercises';
import RoutineEditFinishRoutineBase from './RoutineEditFinishRoutineBase';
import { useModal } from '@/hooks';
import Loading from '@/components/common/ui/Loading';

type Props = {
	newRoutine: NewRoutine;
	routineCategories: RoutineCategory[];
	ActionsComponent: ({
		nextButton,
	}: {
		nextButton: ReactElement<HTMLButtonElement>;
	}) => ReactNode;
};

export default function RoutineEditFinish({
	newRoutine,
	routineCategories,
	ActionsComponent,
}: Props) {
	const [routine, setRoutine] = useState<NewRoutine>(newRoutine);
	const { handleRoutineEdit, data: result, isPending } = useRoutineEdit();
	const { Modal, showModal, hideModal } = useModal();
	const router = useRouter();
	const isShowModal = useRef<boolean>(false);

	const handleRoutineDetailGoClick = useCallback(
		(routineID: Routine['id']) => {
			router.push(`/routines/${routineID}`);
			hideModal();
		},
		[hideModal, router]
	);

	useEffect(() => {
		let timer;
		if (result && !isShowModal.current) {
			showModal();
			isShowModal.current = true;
			setTimeout(() => handleRoutineDetailGoClick(result), 3000);
		}
		return () => clearTimeout(timer);
	}, [result, showModal, handleRoutineDetailGoClick]);

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
			<ActionsComponent
				nextButton={
					<Button
						color="primary"
						className="w-full"
						onClick={handleSaveClick}
						disabled={isPending || !!result}
					>
						{isPending ? <Loading /> : '저장'}
					</Button>
				}
			/>

			{result && (
				<Modal title="저장에 성공했습니다! 3초 후 저장된 루틴 페이지로 이동합니다.">
					<div className="flex flex-col">
						<Button onClick={() => handleRoutineDetailGoClick(result)}>
							지금 이동하기
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
}

import { useRoutineEdit } from '@/hooks/useRoutineEdit';
import { NewExercise, NewRoutine, RoutineCategory } from '@/types/routine';
import { useState } from 'react';
import RoutineLevel from '../ui/RoutineLevel';
import RoutineCategories from '../ui/RoutineCategories';
import RoutineEditFinishItem from './RoutineEditFinishItem';
import { X } from 'lucide-react';
import { Button } from '@repo/ui/common';
import DragContainer from '../ui/DragContainer';

type Props = {
	newRoutine: NewRoutine;
	routineCategories: RoutineCategory[];
};

export default function RoutineEditFinish({
	newRoutine,
	routineCategories,
}: Props) {
	const [routine, setRoutine] = useState<NewRoutine>(newRoutine);
	const { handleRoutineEdit, data: result, isPending } = useRoutineEdit();

	const handleExerciseDelete = (exercise: NewExercise) => {
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
		<div className="w-3/4">
			<h2 className="mb-4 text-2xl font-bold">루틴 기본정보</h2>
			<article className="flex flex-col w-full gap-4">
				<RoutineEditFinishItem title="루틴 이름">
					<p>{routine.name}</p>
				</RoutineEditFinishItem>
				<RoutineEditFinishItem title="루틴 설명">
					<p>{routine.description}</p>
				</RoutineEditFinishItem>
				<RoutineEditFinishItem title="루틴 난이도">
					<RoutineLevel level={routine.difficultyLevel} />
				</RoutineEditFinishItem>
				<RoutineEditFinishItem title="휴식시간">
					<p>{routine.restSeconds}초</p>
				</RoutineEditFinishItem>
				<RoutineEditFinishItem title="세트 수">
					<p>{routine.totalSets}</p>
				</RoutineEditFinishItem>
				<RoutineEditFinishItem title="루틴 카테고리">
					<RoutineCategories
						categoryNames={routineCategories
							.filter((c) => routine.categoryIDs.includes(c.id))
							.map((c) => c.name)}
					/>
				</RoutineEditFinishItem>
			</article>
			<h2 className="my-4 text-2xl font-bold">운동 정보</h2>
			<div>
				{routine.exercises.map((exercise) => {
					const {
						name,
						nextDelaySeconds,
						repetitionCount,
						secondsPerRep,
						order,
					} = exercise;

					return (
						<DragContainer
							className="mb-4"
							key={name + nextDelaySeconds + order + repetitionCount}
							onDragStart={(e) => {
								e.dataTransfer.setData('order', order.toString());
							}}
							onDrop={(e) => {
								if (e.dataTransfer.getData('order')) {
									handleExerciseOrderChange(
										order,
										+e.dataTransfer.getData('order')
									);
								}
							}}
						>
							<article className="relative p-2 mb-4">
								<span>{order + 1}번째 운동</span>
								<RoutineEditFinishItem title="운동 이름">
									<p>{name}</p>
								</RoutineEditFinishItem>
								<RoutineEditFinishItem title="1회당 반복시간(초)">
									<p>{secondsPerRep}초</p>
								</RoutineEditFinishItem>
								<RoutineEditFinishItem title="반복 횟수">
									<p>{repetitionCount}</p>
								</RoutineEditFinishItem>
								<RoutineEditFinishItem title="다음 운동 준비 시간(초)">
									<p>{nextDelaySeconds}초</p>
								</RoutineEditFinishItem>
								<Button
									className="absolute right-1 top-1"
									color="ghost"
									onClick={() => handleExerciseDelete(exercise)}
								>
									<X className="text-error" />
								</Button>
							</article>
						</DragContainer>
					);
				})}
			</div>
			<Button
				color="primary"
				className="w-full"
				onClick={handleSaveClick}
				disabled={result}
			>
				저장
			</Button>
		</div>
	);
}

import { useState } from 'react';
import { Button } from '@repo/ui/common';
import { DeleteIcon } from '@/components/common/icon';
import { NewExercise } from '@/types/routine';
import DragContainer from '../../common/ui/DragContainer';
import RoutineEditFormGroup from './RoutineEditFormGroup';
import RoutineEditFormHeading from './RoutineEditFormHeading';
import RoutineEditFormText from './RoutineEditFormText';

type Props = {
	exercises: NewExercise[];
	onExerciseDelete: (exercise: NewExercise) => void;
	onExercisesOrderChange: (order1: number, order2: number) => void;
};

export default function RoutineEditFinishExercises({
	exercises,
	onExerciseDelete,
	onExercisesOrderChange,
}: Props) {
	const [swapStartIndex, setSwapStartIndex] = useState<number | null>(null);

	return (
		<>
			<RoutineEditFormHeading>운동 정보</RoutineEditFormHeading>
			<p className="w-full mb-2 text-xs text-center text-secondary text-pretty">
				운동 정보를 드래그해서 순서 변경을 할 수 있습니다. <br />
				모바일의 경우 잠시 아이템을 누르고 있으면 <br />
				드래그가 가능합니다.
			</p>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
				{exercises.map((exercise) => {
					const {
						name,
						nextDelaySeconds,
						repetitionCount,
						secondsPerRep,
						order,
					} = exercise;

					return (
						<DragContainer
							key={name + nextDelaySeconds + order + repetitionCount}
							data-order={order}
							onDragStart={(e) => {
								if (e.currentTarget.dataset['order']) {
									setSwapStartIndex(+e.currentTarget.dataset['order']);
								}
							}}
							onDrop={(e) => {
								if (
									swapStartIndex !== null &&
									e.currentTarget.dataset['order']
								) {
									onExercisesOrderChange(
										swapStartIndex,
										+e.currentTarget.dataset['order']
									);
									setSwapStartIndex(null);
								}
							}}
						>
							<article className="relative">
								<div className="flex justify-between p-4 mb-4 bg-slate-100">
									<span className="text-info">{order + 1}번째 운동</span>
									<Button
										className="absolute right-1 top-1"
										color="ghost"
										onClick={() => onExerciseDelete(exercise)}
									>
										<DeleteIcon />
									</Button>
								</div>
								<RoutineEditFormGroup displayName="운동 이름">
									<RoutineEditFormText>{name}</RoutineEditFormText>
								</RoutineEditFormGroup>
								<RoutineEditFormGroup displayName="1회당 반복시간(초)">
									<RoutineEditFormText>{secondsPerRep}초</RoutineEditFormText>
								</RoutineEditFormGroup>
								<RoutineEditFormGroup displayName="반복 횟수">
									<RoutineEditFormText>{repetitionCount}</RoutineEditFormText>
								</RoutineEditFormGroup>
								<RoutineEditFormGroup displayName="다음 운동 준비 시간(초)">
									<RoutineEditFormText>
										{nextDelaySeconds}초
									</RoutineEditFormText>
								</RoutineEditFormGroup>
							</article>
						</DragContainer>
					);
				})}
			</div>
		</>
	);
}

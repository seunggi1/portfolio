import type { RoutineDetail } from '@/types/routine';

type Props = Pick<RoutineDetail, 'exerciseSets'>;

export default function ExerciseSetDetails({ exerciseSets }: Props) {
	return (
		<>
			<h2 className="p-2 text-2xl font-bold">운동 구성</h2>
			<ul>
				{exerciseSets.map(
					({
						id,
						exerciseName,
						repetitionCount,
						restSeconds,
						sets,
						exerciseSeconds,
					}) => (
						<li key={id} className="flex flex-col p-2 border-t">
							<span className="font-bold">{exerciseName}</span>
							<span>{`총 ${sets}세트`}</span>
							<span>{`반복 횟수 : ${repetitionCount}회`}</span>
							<span>{`운동 시간 : ${exerciseSeconds}초`}</span>
							<span>{`휴식 시간 : ${restSeconds}초`}</span>
						</li>
					)
				)}
			</ul>
		</>
	);
}

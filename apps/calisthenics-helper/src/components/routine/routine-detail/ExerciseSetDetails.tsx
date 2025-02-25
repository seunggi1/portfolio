import type { RoutineDetail } from '@/types/routine';

type Props = Pick<RoutineDetail, 'exercises'>;

export default function ExerciseSetDetails({ exercises }: Props) {
	return (
		<>
			<h2 className="p-2 text-2xl font-bold">운동 구성</h2>
			<ul>
				{exercises.map(
					({ id, name, repetitionCount, secondsPerRep, nextDelaySeconds }) => (
						<li key={id} className="flex flex-col p-2 border-t">
							<span className="font-bold">{name}</span>
							<span>{`반복 횟수 : ${repetitionCount}회`}</span>
							<span>{`운동 시간 : ${secondsPerRep * repetitionCount}초`}</span>
						</li>
					)
				)}
			</ul>
		</>
	);
}

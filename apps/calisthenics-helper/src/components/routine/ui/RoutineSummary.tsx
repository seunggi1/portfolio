import type { Routine } from '@/types/routine';

type Props = Pick<Routine, 'name' | 'totalMinutes' | 'totalExerciseCount'>;

export default function RoutineSummary({
	name,
	totalMinutes,
	totalExerciseCount,
}: Props) {
	return (
		<>
			<p className="font-bold">{name}</p>
			<p>{`약 ${totalMinutes}분 총 ${totalExerciseCount}개의 운동 `}</p>
		</>
	);
}

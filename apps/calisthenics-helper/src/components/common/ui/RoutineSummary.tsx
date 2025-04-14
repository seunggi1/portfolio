import type { Routine } from '@/types/routine';

type Props = Pick<
	Routine,
	| 'name'
	| 'totalMinutes'
	| 'totalExerciseCount'
	| 'totalSets'
	| 'restSeconds'
	| 'description'
>;

export default function RoutineSummary({
	name,
	totalMinutes,
	totalExerciseCount,
	restSeconds,
	description,
	totalSets,
}: Props) {
	return (
		<>
			<p className="font-bold">{name}</p>
			<p className="truncate">{description}</p>
			<p>{`약 ${totalMinutes}분 총 ${totalExerciseCount}개의 운동 `}</p>
			<p>{`총 ${totalSets}세트`}</p>
			<p>{`세트 당 ${restSeconds}초 휴식`}</p>
		</>
	);
}

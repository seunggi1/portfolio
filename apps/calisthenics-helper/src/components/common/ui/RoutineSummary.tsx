import type { Routine } from '@/types/routine';

type Props = Pick<
	Routine,
	'name' | 'totalMinutes' | 'totalSets' | 'restSeconds'
>;

export default function RoutineSummary({
	name,
	totalMinutes,
	restSeconds,
	totalSets,
}: Props) {
	return (
		<>
			<p className="font-bold">{name}</p>
			<p>{`운동시간 ${totalMinutes}분`}</p>
			<p>{`${totalSets}세트 (${restSeconds}초 휴식)`}</p>
		</>
	);
}

import { TotalStats } from '@/types/stats';
import { ExerciseIcon, UserIcon } from './ui/icon';

type Props = {
	totalStats: TotalStats;
};

export default function TotalStatsInfo({ totalStats }: Props) {
	return (
		<div className="flex w-3/4 gap-4">
			<div className="bg-sky-100 basis-1/2 h-[170px] rounded-md p-4">
				<UserIcon />
				<p className="text-xl font-bold">{totalStats.totalUserCount}</p>
				<p className="text-gray-500">유저 수</p>
			</div>
			<div className="bg-red-100 basis-1/2 h-[170px] rounded-md p-4">
				<ExerciseIcon />
				<p className="text-xl font-bold">{totalStats.totalRoutineCount}</p>
				<p className="text-gray-500">루틴 수</p>
			</div>
		</div>
	);
}

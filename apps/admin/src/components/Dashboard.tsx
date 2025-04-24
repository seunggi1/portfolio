import Chart from './Chart';
import DatePickerForm from './DateForm';
import useStats from '@/hooks/useStats';
import TotalStatsInfo from './TotalStatsInfo';

export default function Dashboard() {
	const { data, updateStats } = useStats();

	return (
		<div className="flex flex-col items-center justify-center gap-4 bg-gray-100">
			<DatePickerForm onSubmit={updateStats} />
			<TotalStatsInfo
				totalStats={
					data?.totalStats ?? { totalRoutineCount: 0, totalUserCount: 0 }
				}
			/>
			<Chart
				chartName="회원 가입 통계"
				data={
					data?.stats.map((s) => ({ date: s.date, count: s.userCount })) ?? []
				}
				label="회원 가입 수"
			/>
			<Chart
				chartName="루틴 등록 통계"
				data={
					data?.stats?.map((s) => ({ date: s.date, count: s.routineCount })) ??
					[]
				}
				label="루틴 등록 수"
			/>
		</div>
	);
}

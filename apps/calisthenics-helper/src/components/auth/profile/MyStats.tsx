import { UserStatsResult } from '@/types/routine';
import ProfileContainer from './ProfileContainer';
import DatePicker from './DatePicker';
import MyStatsChart from './MyStatsChart';

type Props = {
	stats: UserStatsResult[];
	startDate: string;
	endDate: string;
};

export default function MyStats({ stats, startDate, endDate }: Props) {
	return (
		<ProfileContainer path="stats">
			<div className="bg-white rounded-lg ">
				<DatePicker startDate={startDate} endDate={endDate} />
				<MyStatsChart stats={stats} />
			</div>
		</ProfileContainer>
	);
}

'use client';

import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { UserStatsResult } from '@/types/routine';

type Props = {
	stats: UserStatsResult[];
};

export default function MyStatsChart({ stats }: Props) {
	return (
		<ResponsiveContainer width={'100%'} height={400}>
			<BarChart
				width={250}
				height={250}
				data={stats}
				margin={{
					top: 5,
					right: 10,
					left: -15,
					bottom: 5,
				}}
			>
				<XAxis dataKey="name" />
				<YAxis dataKey="count" />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Legend />
				<Bar
					dataKey="count"
					name="운동 횟수"
					fill="#4D6FFF"
					activeBar={<Rectangle fill="#009689" stroke="#4D6FFF" />}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}

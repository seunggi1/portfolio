import { getStats } from '@/api/stats';
import { DEFAULT_DATE } from '@/constant/stats';
import { StatsRequest, StatsResult } from '@/types/stats';
import { useEffect, useState } from 'react';

export default function useStats() {
	const [data, setData] = useState<StatsResult>();

	useEffect(() => {
		getStats({
			startDate: DEFAULT_DATE.start,
			endDate: DEFAULT_DATE.end,
		}).then((data) => {
			setData(data);
		});
	}, []);

	const updateStats = async (requestData: StatsRequest) => {
		const data = await getStats(requestData);
		setData(data);
	};

	return {
		data,
		updateStats,
	};
}

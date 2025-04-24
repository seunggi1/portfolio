import { AdminSignIn, StatsRequest, StatsResult } from '@/types/stats';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function getStats({
	startDate,
	endDate,
}: StatsRequest): Promise<StatsResult> {
	const response = await fetch(
		`${SERVER_URL}/api/admin/stats?startDate=${startDate}&endDate=${endDate}`,
		{
			method: 'GET',
		}
	);

	const result = await response.json();
	console.log(result);
	return result.data ?? { stats: [] };
}

export async function login(request: AdminSignIn) {
	console.log(request);
	const response = await fetch(`${SERVER_URL}/api/admin`, {
		body: JSON.stringify(request),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();
	console.log(data);
	return data.success ? true : false;
}

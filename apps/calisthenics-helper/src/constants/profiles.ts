import { UserStatsRequest } from '@/types/routine';

export const myStatsSearchParam = {
	startDate: 'startDate',
	endDate: 'endDate',
	create: ({ startDate, endDate }: UserStatsRequest) => {
		const result = [];

		result.push(`${myStatsSearchParam.startDate}=${startDate}`);
		result.push(`${myStatsSearchParam.endDate}=${endDate}`);
		return '?' + result.join('&');
	},
} as const;

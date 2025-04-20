import { RoutinesRequest } from '@/types/routine';

export const routineSearchParam = {
	categoryID: 'category',
	searchQuery: 'search',
	createRoutineSearchParam: ({
		categoryID,
		searchQuery,
	}: Partial<Omit<RoutinesRequest, 'nextCursor'>>) => {
		const result = [];

		if (categoryID !== null && categoryID !== '') {
			result.push(`${routineSearchParam.categoryID}=${categoryID}`);
		}

		if (searchQuery !== null && searchQuery !== '') {
			result.push(`${routineSearchParam.searchQuery}=${searchQuery}`);
		}
		return '?' + result.join('&');
	},
} as const;

import { RoutinesRequest } from '@/types/routine';

export const routineKeys = {
	base: 'routines' as const,
	listBase: 'list' as const,
	userListBase: 'user' as const,
	list: ({ categoryID, searchQuery }: Omit<RoutinesRequest, 'nextCursor'>) =>
		[routineKeys.base, routineKeys.listBase, categoryID, searchQuery] as const,
	detail: (id: string) => [routineKeys.base, id] as const,
	categories: () => [routineKeys.base, 'categories'] as const,
	listByUser: () => [
		routineKeys.base,
		routineKeys.listBase,
		routineKeys.userListBase,
	],
};

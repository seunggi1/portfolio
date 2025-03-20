export const routineKeys = {
	base: 'routines' as const,
	listBase: 'list' as const,
	list: (categoryID: string) =>
		[routineKeys.base, routineKeys.listBase, categoryID] as const,
	detail: (id: string) => [routineKeys.base, id] as const,
	categories: () => [routineKeys.base, 'categories'] as const,
};

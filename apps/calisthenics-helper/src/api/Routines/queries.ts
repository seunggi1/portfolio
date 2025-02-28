export const routineKeys = {
	all: ['routines'] as const,
	detail: (id: string) => [...routineKeys.all, id] as const,
	categories: () => [...routineKeys.all, 'categories'] as const,
};

import { Routine } from '@/types/routine';

export const commentKeys = {
	base: 'comments' as const,
	list: (id: Routine['id']) => [commentKeys.base, id] as const,
};

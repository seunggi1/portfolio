import { z } from 'zod';
import { CommentEditBase, CommentEditErrors } from '@/types/comment';

const comment: z.ZodType<CommentEditBase> = z.object({
	comment: z
		.string()
		.min(1, { message: '댓글은 최소 1글자 이상 이어야 합니다' }),
	recommendation: z
		.number()
		.min(1, { message: '추천 점수는 1점 이상 이어야 합니다' })
		.max(5, {
			message: '추천 점수는 5점을 초과할 수 없습니다.',
		}),
});

export function validateComment(
	data: Partial<CommentEditBase>
): Partial<CommentEditErrors> | null {
	const result = comment.safeParse(data);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	const errors = Object.fromEntries(
		Object.entries(format.fieldErrors).map(([name, value]) => [
			name,
			value.join(','),
		])
	);

	return errors;
}

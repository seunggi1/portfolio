import { z } from 'zod';
import { CommentEditBase, CommentEditErrors } from '@/types/comment';
import { commentErrorMessages } from '@/constants/messages';

const comment: z.ZodType<CommentEditBase> = z.object({
	comment: z
		.string()
		.min(1, { message: commentErrorMessages.MIN_COMMENT_ERROR }),
	recommendation: z
		.number()
		.min(1, { message: commentErrorMessages.MIN_RECOMMENDATION_ERROR })
		.max(5, {
			message: commentErrorMessages.MAX_RECOMMENDATION_ERROR,
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

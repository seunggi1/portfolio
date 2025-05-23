import { ChangeEvent, FormEvent, useState } from 'react';
import { FormInput } from '@/components/common/ui';
import { validateComment } from '@/schemas/comment';
import { CommentEditBase, CommentEditFormData } from '@/types/comment';
import { nameofFactory } from '@/utils/type';
import { Button } from '@repo/ui/common';
import RecommandationInput from './RecommandationInput';

type Props = {
	defaultValue?: CommentEditBase;
	onSubmit: (commentBase: CommentEditBase) => void;
};

const commentDefaultValue = { comment: '', recommendation: 5 };

export default function CommentForm({
	defaultValue = commentDefaultValue,
	onSubmit,
}: Props) {
	const [commentFormData, setCommentFormData] = useState<CommentEditFormData>({
		inputs: {
			...defaultValue,
		},
	});
	const nameof = nameofFactory<CommentEditBase>();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!commentFormData.inputs) {
			return;
		}

		const errors = validateComment(commentFormData.inputs);

		if (errors) {
			setCommentFormData((prev) => ({ ...prev, errors }));
			return;
		}

		const comment = commentFormData.inputs.comment!;
		const recommendation = commentFormData.inputs.recommendation!;
		setCommentFormData((prev) => ({ ...prev, inputs: commentDefaultValue }));
		onSubmit({ comment, recommendation });
	};

	const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentFormData((prev) => ({
			...prev,
			inputs: {
				...prev.inputs,
				comment: e.target.value,
			},
		}));
	};

	const handleRecommandationChange = (recommendation: number) => {
		setCommentFormData((prev) => ({
			...prev,
			inputs: {
				...prev.inputs,
				recommendation,
			},
		}));
	};

	return (
		<form className="flex flex-col w-full py-2 gap-4" onSubmit={handleSubmit}>
			<div>
				<RecommandationInput
					onChange={handleRecommandationChange}
					error={commentFormData.errors?.recommendation}
					defaultValue={commentFormData.inputs?.recommendation}
				/>
			</div>
			<FormInput
				displayName="내용"
				type="text"
				name={nameof('comment')}
				value={commentFormData.inputs?.comment ?? ''}
				onChange={handleCommentChange}
				error={commentFormData.errors?.comment}
			/>
			<Button type="submit">저장</Button>
		</form>
	);
}

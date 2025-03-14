import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '@/components/common/input/FormInput';
import { validateComment } from '@/schemas/comment';
import { CommentEditBase, CommentEditFormData } from '@/types/comment';
import { nameofFactory } from '@/utils/type';
import { Button } from '@repo/ui/common';

type Props = {
	onSubmit: (commentBase: CommentEditBase) => void;
};

export default function CommentForm({ onSubmit }: Props) {
	const [commentFormData, setCommentFormData] = useState<CommentEditFormData>({
		inputs: {
			comment: '',
			recommendation: 5,
		},
	});
	const nameof = nameofFactory<CommentEditBase>();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!commentFormData.inputs) {
			return;
		}

		console.log(commentFormData.inputs);
		const errors = validateComment(commentFormData.inputs);

		if (errors) {
			setCommentFormData((prev) => ({ ...prev, errors }));
			return;
		}

		const comment = commentFormData.inputs.comment!;
		const recommendation = commentFormData.inputs.recommendation!;

		onSubmit({ comment, recommendation });
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const propName = e.target.name;
		console.log(e.target.type);
		setCommentFormData((prev) => ({
			...prev,
			inputs: {
				...prev.inputs,
				[propName]:
					e.target.type === 'number' && e.target.value !== ''
						? +e.target.value
						: e.target.value,
			},
		}));
	};

	return (
		<form className="w-full flex gap-4" onSubmit={handleSubmit}>
			<FormInput
				displayName="추천도"
				type="number"
				name={nameof('recommendation')}
				value={commentFormData.inputs?.recommendation ?? ''}
				onChange={handleInputChange}
				error={commentFormData.errors?.recommendation}
			/>
			<FormInput
				displayName="내용"
				type="text"
				name={nameof('comment')}
				value={commentFormData.inputs?.comment ?? ''}
				onChange={handleInputChange}
				error={commentFormData.errors?.comment}
			/>
			<Button type="submit">저장</Button>
		</form>
	);
}

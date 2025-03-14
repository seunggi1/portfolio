import { useState } from 'react';
import { Comment, UpdateComment } from '@/types/comment';
import { Button } from '@repo/ui/common';
import CommentForm from './CommentForm';

type Props = {
	commentData: Comment;
	isCurrentUserComment: boolean;
	onUpdate: (updateComment: UpdateComment) => void;
	onDelete: () => void;
};

export default function CommentItem({
	commentData: { id, recommendation, comment, updatedDate },
	isCurrentUserComment,
	onUpdate,
	onDelete,
}: Props) {
	const [updateMode, setUpdateMode] = useState<boolean>(false);

	return (
		<div className="flex items-center">
			{updateMode ? (
				<>
					<CommentForm
						onSubmit={(commentBase) => {
							onUpdate({ id, ...commentBase });
							setUpdateMode(false);
						}}
					/>
					<Button color="info" onClick={() => setUpdateMode(false)}>
						취소
					</Button>
				</>
			) : (
				<>
					<span>{recommendation}</span>
					<span>{comment}</span>
					<span>{String(updatedDate)}</span>
					{isCurrentUserComment ? (
						<Button color="warning" onClick={() => setUpdateMode(true)}>
							수정
						</Button>
					) : null}
					{isCurrentUserComment ? (
						<Button color="error" onClick={onDelete}>
							삭제
						</Button>
					) : null}
				</>
			)}
		</div>
	);
}

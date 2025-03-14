'use client';

import { Routine } from '@/types/routine';
import { useAuth, useCommentEdit, useComments } from '@/hooks';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

type Props = {
	routineID: Routine['id'];
};

export default function Comments({ routineID }: Props) {
	const { comments } = useComments(routineID);
	const { create, update, remove } = useCommentEdit(routineID);
	const { user } = useAuth();

	return (
		<div>
			<CommentForm
				onSubmit={(commentBase) => {
					create.handleCommentCreate({ routineID, ...commentBase });
				}}
			/>
			<ul>
				{create.isPending && (
					<li>
						<span>{create.varialbes?.recommendation}</span>
						<span>{create.varialbes?.comment}</span>
					</li>
				)}
				{comments.map((comment) => (
					<li key={comment.id}>
						<CommentItem
							commentData={comment}
							isCurrentUserComment={user?.id === comment.userID}
							onDelete={() => remove.handleCommentDelete(comment.id)}
							onUpdate={update.handleCommentUpdate}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

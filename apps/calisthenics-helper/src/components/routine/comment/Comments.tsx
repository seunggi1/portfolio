'use client';

import { Routine } from '@/types/routine';
import { useAuth, useCommentEdit, useComments } from '@/hooks';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentItemDummy from './CommentItemDummy';

type Props = {
	routineID: Routine['id'];
};

export default function Comments({ routineID }: Props) {
	const { comments } = useComments(routineID);
	const { create, update, remove } = useCommentEdit(routineID);
	const { user } = useAuth();

	return (
		<div>
			<h3 className="text-xl font-bold">댓글 추가</h3>
			<CommentForm
				onSubmit={(commentBase) => {
					create.handleCommentCreate({ routineID, ...commentBase });
				}}
			/>
			<ul>
				{create.isPending && create.varialbes && (
					<li>
						<CommentItemDummy
							recommendation={create.varialbes.recommendation}
							comment={create.varialbes.comment}
							displayName={user!.displayName}
						/>
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

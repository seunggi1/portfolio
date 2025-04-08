'use client';

import { Routine } from '@/types/routine';
import {
	useAuth,
	useCommentEdit,
	useComments,
	useIntersectionObserver,
} from '@/hooks';
import CommentForm from './CommentForm';
import EditableCommentItem from './EditableCommentItem';
import Loading from '@/components/common/ui/Loading';

type Props = {
	routineID: Routine['id'];
};

export default function Comments({ routineID }: Props) {
	const { comments, handleNextComments, isFetching } = useComments(routineID);
	const { create, update, remove } = useCommentEdit(routineID);
	const { user } = useAuth();
	const { handleRef } = useIntersectionObserver({
		callback: handleNextComments,
		threshold: 1,
	});

	return (
		<div>
			<h3 className="mb-4 text-xl font-bold">댓글</h3>
			{user && (
				<CommentForm
					onSubmit={(commentBase) => {
						create.handleCommentCreate(
							{ routineID, ...commentBase },
							user.displayName
						);
					}}
				/>
			)}
			<ul>
				{comments.map((comment) => (
					<li key={comment.id}>
						<EditableCommentItem
							commentData={comment}
							isCurrentUserComment={user?.id === comment.userID}
							onDelete={() => remove.handleCommentDelete(comment.id)}
							onUpdate={update.handleCommentUpdate}
						/>
					</li>
				))}
			</ul>
			<div className="h-2 text-center" ref={handleRef}>
				{isFetching && <Loading />}
			</div>
		</div>
	);
}

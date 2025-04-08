import { useState } from 'react';
import { Comment, UpdateComment } from '@/types/comment';
import { Button } from '@repo/ui/common';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import PenOffIcon from '@/components/common/icon/PenOffIcon';

type Props = {
	commentData: Comment;
	isCurrentUserComment: boolean;
	onUpdate: (updateComment: UpdateComment) => void;
	onDelete: () => void;
};

export default function EditableCommentItem({
	commentData: { id, recommendation, comment },
	commentData,
	isCurrentUserComment,
	onUpdate,
	onDelete,
}: Props) {
	const [updateMode, setUpdateMode] = useState<boolean>(false);

	return (
		<div className="flex items-center mb-2">
			{updateMode ? (
				<div className="relative w-full">
					<CommentForm
						onSubmit={(commentBase) => {
							onUpdate({ id, ...commentBase });
							setUpdateMode(false);
						}}
						defaultValue={{
							comment,
							recommendation,
						}}
					/>
					<Button
						className="absolute top-2 right-2"
						color="ghost"
						size="xs"
						onClick={() => setUpdateMode(false)}
					>
						<PenOffIcon />
					</Button>
				</div>
			) : (
				<CommentItem
					commentData={commentData}
					isCurrentUserComment={isCurrentUserComment}
					onDelete={onDelete}
					onUpdateModeClick={() => setUpdateMode(true)}
				/>
			)}
		</div>
	);
}

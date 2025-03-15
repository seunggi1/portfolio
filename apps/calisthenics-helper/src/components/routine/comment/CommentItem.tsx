import { useState } from 'react';
import { Comment, UpdateComment } from '@/types/comment';
import { Button } from '@repo/ui/common';
import CommentForm from './CommentForm';
import { getBeforeDate } from '@/utils/time';
import CommentRecommandation from './CommentRecommandation';
import CommentContent from './CommentContent';
import CommentAvatar from './CommentAvatar';
import { Pencil, PenOff, X } from 'lucide-react';

type Props = {
	commentData: Comment;
	isCurrentUserComment: boolean;
	onUpdate: (updateComment: UpdateComment) => void;
	onDelete: () => void;
};

export default function CommentItem({
	commentData: { id, recommendation, comment, createdDate, displayName },
	isCurrentUserComment,
	onUpdate,
	onDelete,
}: Props) {
	const [updateMode, setUpdateMode] = useState<boolean>(false);

	return (
		<div className="flex items-center">
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
						<PenOff className="text-secondary" />
					</Button>
				</div>
			) : (
				<>
					<article className="relative flex items-start w-full gap-2">
						<div>
							<CommentAvatar displayName={displayName} />
						</div>
						<div className="flex flex-col gap-y-1">
							<span className="font-bold text-md">{displayName}</span>
							<CommentRecommandation
								key={id + recommendation}
								id={id}
								recommandation={recommendation}
							/>
							<CommentContent comment={comment} />
						</div>
						<div className="absolute flex items-center top-2 right-2">
							{isCurrentUserComment ? (
								<Button
									color="ghost"
									size="xs"
									onClick={() => setUpdateMode(true)}
								>
									<Pencil className="text-secondary" />
								</Button>
							) : null}
							{isCurrentUserComment ? (
								<Button color="ghost" size="xs" onClick={onDelete}>
									<X className="text-error" />
								</Button>
							) : null}
							<span className="text-right select-none text-secondary w-14">
								{getBeforeDate(createdDate)}
							</span>
						</div>
					</article>
				</>
			)}
		</div>
	);
}

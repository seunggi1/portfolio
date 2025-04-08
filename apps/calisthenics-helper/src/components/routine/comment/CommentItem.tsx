import { Button } from '@repo/ui/common';
import { getBeforeDate } from '@/utils/time';
import CommentRecommandation from './CommentRecommandation';
import CommentContent from './CommentContent';
import CommentAvatar from './CommentAvatar';
import { Comment } from '@/types/comment';
import { DeleteIcon, PenIcon } from '@/components/common/icon';

type Props = {
	commentData: Comment;
	isCurrentUserComment: boolean;
	onDelete: () => void;
	onUpdateModeClick: () => void;
};

export default function CommentItem({
	commentData: { id, recommendation, comment, createdDate, displayName },
	isCurrentUserComment,
	onDelete,
	onUpdateModeClick,
}: Props) {
	return (
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
					<Button color="ghost" size="xs" onClick={onUpdateModeClick}>
						<PenIcon />
					</Button>
				) : null}
				{isCurrentUserComment ? (
					<Button color="ghost" size="xs" onClick={onDelete}>
						<DeleteIcon />
					</Button>
				) : null}
				<span className="text-right select-none text-secondary w-14">
					{getBeforeDate(createdDate)}
				</span>
			</div>
		</article>
	);
}

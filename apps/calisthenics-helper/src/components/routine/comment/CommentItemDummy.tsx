import { Comment } from '@/types/comment';

import CommentRecommandation from './CommentRecommandation';
import CommentContent from './CommentContent';
import CommentAvatar from './CommentAvatar';

type Props = Pick<Comment, 'comment' | 'displayName' | 'recommendation'>;

export default function CommentItemDummy({
	comment,
	displayName,
	recommendation,
}: Props) {
	return (
		<article className="relative flex items-start w-full gap-2">
			<div>
				<CommentAvatar displayName={displayName} />
			</div>
			<div className="flex flex-col gap-y-1">
				<span className="font-bold text-md">{displayName}</span>
				<CommentRecommandation
					key={recommendation}
					id={'dummy'}
					recommandation={recommendation}
				/>
				<CommentContent comment={comment} />
			</div>
		</article>
	);
}

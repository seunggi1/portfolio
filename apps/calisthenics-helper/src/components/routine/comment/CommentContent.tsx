import { Comment } from '@/types/comment';

type Props = {
	comment: Comment['comment'];
};

export default function CommentContent({ comment }: Props) {
	return <p>{comment}</p>;
}

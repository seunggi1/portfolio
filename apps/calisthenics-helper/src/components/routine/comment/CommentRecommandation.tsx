import { Comment } from '@/types/comment';

type Props = {
	id: Comment['id'];
	recommandation: Comment['recommendation'];
};

const MAXIMUM = 5;

export default function CommentRecommandation({ id, recommandation }: Props) {
	return (
		<div className="rating">
			{Array.from({ length: MAXIMUM }, (_, i) => (
				<input
					key={i}
					type="radio"
					name={`rating-${id}-${i}`}
					className="bg-orange-400 mask mask-star-2"
					disabled
					defaultChecked={recommandation - 1 === i}
				/>
			))}
		</div>
	);
}

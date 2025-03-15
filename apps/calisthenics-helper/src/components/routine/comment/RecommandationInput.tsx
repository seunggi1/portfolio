import { Comment } from '@/types/comment';
import { MouseEvent } from 'react';

type Props = {
	defaultValue?: number;
	error?: string;
	onChange: (recommendation: Comment['recommendation']) => void;
};

const MAXIMUM = 5;

export default function RecommandationInput({
	defaultValue,
	error,
	onChange,
}: Props) {
	return (
		<>
			<div
				className="rating"
				onClick={(e: MouseEvent<HTMLDivElement>) => {
					const target = e.target;
					if (
						target instanceof HTMLInputElement &&
						target.dataset['recommandation']
					) {
						onChange(+target.dataset['recommandation']);
					}
				}}
			>
				{Array.from({ length: MAXIMUM }, (_, i) => (
					<input
						key={i}
						data-recommandation={i + 1}
						type="radio"
						name="rating"
						className="bg-orange-400 mask mask-star-2"
						defaultChecked={
							defaultValue !== undefined && defaultValue - 1 === i
						}
					/>
				))}
			</div>
			<span className="text-error">{error}</span>
		</>
	);
}

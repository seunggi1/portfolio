import type { Routine } from '@/types/routine';
import { Button } from '@repo/ui/common';

type Props = Pick<Routine, 'categoryNames'>;

export default function RoutineCategories({ categoryNames }: Props) {
	const categories = categoryNames.map((categoryName) => (
		<Button
			key={categoryName}
			color="secondary"
			borderRadius="full"
			size="xs"
			className="max-w-10"
		>
			{categoryName}
		</Button>
	));

	return <div className="flex flex-wrap gap-1 mt-2">{categories}</div>;
}

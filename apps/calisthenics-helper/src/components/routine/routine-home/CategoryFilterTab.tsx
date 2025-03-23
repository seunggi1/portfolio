import Link from 'next/link';
import { RoutineCategory } from '@/types/routine';

type Props = {
	categories: RoutineCategory[];
	selectedCategory: RoutineCategory['id'];
};

const allCategory: RoutineCategory = { id: 'all', name: '전체' };

export default function CategoryFilterTab({
	categories,
	selectedCategory,
}: Props) {
	const typeItems = [allCategory, ...categories].map(({ id, name }) => (
		<li
			key={id}
			className={
				selectedCategory === id
					? getSelectedListItemStyleClass()
					: getListItemStyleClass()
			}
			data-category={id}
		>
			<Link href={`/?category=${id}`}>{name}</Link>
		</li>
	));

	return (
		<section className="h-full border-b">
			<ul className="flex items-center justify-center max-w-screen-xl gap-2 py-4 m-auto text-sm text-pretty md:text-xl md:gap-4">
				{typeItems}
			</ul>
		</section>
	);
}

function getListItemStyleClass() {
	return 'p-2 border-b-2 border-b-transparent hover:border-b-black hover:cursor-pointer';
}

function getSelectedListItemStyleClass() {
	return 'p-2 border-b-2 border-b-primary hover:cursor-pointer';
}

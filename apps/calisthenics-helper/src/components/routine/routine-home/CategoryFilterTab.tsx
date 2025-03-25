import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RoutineCategory } from '@/types/routine';
import { useRoutineCategories } from '@/hooks';
import CategoryFilterTabSkeleton from './CategoryFilterTabSkeleton';

const allCategory: RoutineCategory = { id: 'all', name: '전체' };

export default function CategoryFilterTab() {
	const params = useSearchParams();
	const selectedCategory = params.get('category') ?? 'all';
	const { routineCategories, isLoading } = useRoutineCategories();

	if (isLoading) {
		return <CategoryFilterTabSkeleton />;
	}

	const typeItems = [allCategory, ...routineCategories].map(({ id, name }) => (
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

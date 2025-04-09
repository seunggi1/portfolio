import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RoutineCategory, RoutinesRequest } from '@/types/routine';
import { useRoutineCategories } from '@/hooks';
import CategoryFilterTabSkeleton from './CategoryFilterTabSkeleton';

const allCategory: RoutineCategory = { id: 'all', name: '전체' };

export default function CategoryFilterTab() {
	const params = useSearchParams();
	const selectedCategory = params.get('category') ?? 'all';
	const searchQuery = params.get('search');
	const { routineCategories, isLoading } = useRoutineCategories();

	if (isLoading) {
		return <CategoryFilterTabSkeleton />;
	}

	const typeItems = [allCategory, ...routineCategories].map(({ id, name }) => (
		<li key={id} data-category={id}>
			<Link
				className={
					selectedCategory === id
						? getSelectedListItemStyleClass()
						: getListItemStyleClass()
				}
				href={createSearchParam({ categoryID: id, searchQuery })}
			>
				{name}
			</Link>
		</li>
	));

	return (
		<section className="h-full border-b">
			<ul className="flex items-center justify-center h-full py-4 m-auto text-sm max-w-screen-xl gap-4 text-pretty md:text-xl">
				{typeItems}
			</ul>
		</section>
	);
}

function getListItemStyleClass() {
	return 'pb-2 border-b-2 border-b-transparent hover:border-b-black hover:cursor-pointer';
}

function getSelectedListItemStyleClass() {
	return 'pb-2 border-b-2 border-b-primary hover:cursor-pointer';
}

function createSearchParam({
	categoryID,
	searchQuery,
}: Omit<RoutinesRequest, 'nextCursor'>) {
	const result = [];

	if (categoryID !== null && categoryID !== '') {
		result.push(`category=${categoryID}`);
	}

	if (searchQuery !== null && searchQuery !== '') {
		result.push(`search=${searchQuery}`);
	}

	return '?' + result.join('&');
}

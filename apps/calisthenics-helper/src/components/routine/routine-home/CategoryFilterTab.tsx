import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RoutineCategory } from '@/types/routine';
import { useRoutineCategories } from '@/hooks';
import CategoryFilterTabSkeleton from './CategoryFilterTabSkeleton';
import { routineSearchParam } from '@/constants/routines';

const allCategory: RoutineCategory = { id: 'all', name: '전체' };

export default function CategoryFilterTab() {
	const params = useSearchParams();
	const selectedCategory = params.get(routineSearchParam.categoryID) ?? 'all';
	const searchQuery = params.get(routineSearchParam.searchQuery);
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
				href={routineSearchParam.createRoutineSearchParam({
					categoryID: id,
					searchQuery,
				})}
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

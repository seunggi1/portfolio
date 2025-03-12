'use client';

import { useSearchParams } from 'next/navigation';
import {
	useIntersectionObserver,
	useRoutineCategories,
	useRoutines,
} from '@/hooks';
import RoutineBanners from './RoutineBanners';
import CategoryFilterTab from './CategoryFilterTab';
import RoutineCards from './RoutineCards';
import RoutineCardsSkeleton from './RoutineCardsSkeleton';
import CategoryFilterTabSkeleton from './CategoryFilterTabSkeleton';

export default function Routines() {
	const searchParam = useSearchParams();
	const categoryID = searchParam.get('category') || 'all';
	const {
		routines,
		error,
		isLoading,
		isFetching,
		handleNextPage,
		hasNextPage,
	} = useRoutines(categoryID || 'all');
	const { routineCategories, isLoading: isLoadingRoutineCategories } =
		useRoutineCategories();

	const { handleRef } = useIntersectionObserver(() => {
		handleNextPage();
	});

	return (
		<>
			<RoutineBanners />
			{isLoadingRoutineCategories ? (
				<CategoryFilterTabSkeleton />
			) : (
				<CategoryFilterTab
					categories={routineCategories}
					selectedCategory={categoryID}
				/>
			)}
			<RoutineCards routines={routines} />
			{isLoading || isFetching ? <RoutineCardsSkeleton /> : null}
			<div className="w-full h-3 mt-4 text-center " ref={handleRef}>
				{!hasNextPage && (
					<span className="p-2 text-2xl font-bold">
						불러올 데이터가 없습니다.
					</span>
				)}
			</div>
		</>
	);
}

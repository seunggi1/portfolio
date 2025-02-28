'use client';

import { useRoutineCategories, useRoutines } from '@/hooks';
import RecommandRoutineBanner from './RecommandRoutineBanner';
import CategoryFilterTab from './CategoryFilterTab';
import RoutineCards from './RoutineCards';
import RoutineCardsSkeleton from './RoutineCardsSkeleton';
import CategoryFilterTabSkeleton from './CategoryFilterTabSkeleton';

export default function Routines() {
	const { routines, error, isLoading } = useRoutines();
	const { routineCategories, isLoading: isLoadingRoutineCategories } =
		useRoutineCategories();

	return (
		<>
			<RecommandRoutineBanner />
			{isLoadingRoutineCategories ? (
				<CategoryFilterTabSkeleton />
			) : (
				<CategoryFilterTab categories={routineCategories} />
			)}
			{isLoading ? (
				<RoutineCardsSkeleton />
			) : (
				<RoutineCards routines={routines} />
			)}
		</>
	);
}

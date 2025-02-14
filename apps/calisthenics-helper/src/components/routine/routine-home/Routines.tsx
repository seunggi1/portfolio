'use client';

import { useRoutines } from '@/hooks';
import RecommandRoutineBanner from './RecommandRoutineBanner';
import CategoryFilterTab from './CategoryFilterTab';
import RoutineCards from './RoutineCards';
import RoutineCardsSkeleton from './RoutineCardsSkeleton';

export default function Routines() {
	const { routines, error, isLoading } = useRoutines();

	const categories: string[] = ['전체', '등', '가슴', '다리', '어깨', '전신'];

	return (
		<>
			<RecommandRoutineBanner />
			<CategoryFilterTab categories={categories} />
			{isLoading ? (
				<RoutineCardsSkeleton />
			) : (
				<RoutineCards routines={routines} />
			)}
		</>
	);
}

'use client';

import { use } from 'react';
import RoutineEdit from '@/components/routine/routine-edit/RoutineEdit';
import useRoutineDetail from '@/hooks/useRoutineDetail';
import { useRoutineCategories } from '@/hooks';

type Props = {
	params: Promise<{ id: string }>;
};

export default function page({ params }: Props) {
	const { id } = use(params);
	const { isLoading, routineDetail } = useRoutineDetail(id);
	const { isLoading: categoriesLoading, routineCategories } =
		useRoutineCategories();

	if (isLoading || !routineDetail || categoriesLoading) {
		<span>데이터를 불러오는 중입니다...</span>;
	}

	const categoryNames = new Set<string>(routineDetail?.categoryNames);
	const categoryIDs = routineCategories
		.filter((c) => categoryNames.has(c.name))
		.map((c) => c.id);

	return (
		<>
			<RoutineEdit
				updateRoutineBase={{ ...routineDetail!, categoryIDs }}
				updateExercises={routineDetail?.exercises}
			/>
		</>
	);
}

'use client';

import { Suspense } from 'react';
import { Routine } from '@/types/routine';
import RoutineEdit from './RoutineEdit';
import useRoutineDetail from '@/hooks/useRoutineDetail';
import RoutineEditSkeleton from './RoutineEditSkeleton';

type Props = {
	routineID: Routine['id'];
};

export default function RoutineUpdateContainer({ routineID }: Props) {
	const { isLoading, routineDetail } = useRoutineDetail(routineID);

	if (isLoading || !routineDetail) {
		return <RoutineEditSkeleton />;
	}

	return (
		<Suspense fallback={<RoutineEditSkeleton />}>
			<RoutineEdit
				updateRoutineBase={{ ...routineDetail, id: routineID }}
				updateExercises={routineDetail.exercises}
			/>
		</Suspense>
	);
}

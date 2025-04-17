'use client';

import { Suspense } from 'react';
import { Routine } from '@/types/routine';
import RoutineEdit from './RoutineEdit';
import RoutineEditSkeleton from './RoutineEditSkeleton';
import { useRoutineDetail } from '@/hooks';

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
				updateRoutineBase={{
					...routineDetail,
					id: routineID,
					image: routineDetail.imageURL,
				}}
				updateExercises={routineDetail.exercises}
			/>
		</Suspense>
	);
}

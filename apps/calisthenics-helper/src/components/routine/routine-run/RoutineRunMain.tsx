'use client';

import { useRoutineDetail } from '@/hooks';
import RoutineRunner from './RoutineRunner';
import RoutineRunnerSkeleton from './RoutineRunnerSkeleton';

type Props = {
	id: string;
};

export default function RoutineRunMain({ id }: Props) {
	const { isLoading, routineDetail } = useRoutineDetail(id);

	if (isLoading || !routineDetail) {
		return <RoutineRunnerSkeleton />;
	}

	return (
		<>
			<RoutineRunner routineDetail={routineDetail} />
		</>
	);
}

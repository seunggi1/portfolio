import { Suspense } from 'react';
import RoutineEdit from './RoutineEdit';
import RoutineEditSkeleton from './RoutineEditSkeleton';

export default function RoutineEditContainer() {
	return (
		<Suspense fallback={<RoutineEditSkeleton />}>
			<RoutineEdit />
		</Suspense>
	);
}

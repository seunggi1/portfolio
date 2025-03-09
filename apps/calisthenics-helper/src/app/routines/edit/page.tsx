import RoutineEdit from '@/components/routine/routine-edit/RoutineEdit';
import { Suspense } from 'react';

export default async function RoutineEditPage() {
	return (
		<>
			<Suspense fallback={<span>Loading...</span>}>
				<RoutineEdit />
			</Suspense>
		</>
	);
}

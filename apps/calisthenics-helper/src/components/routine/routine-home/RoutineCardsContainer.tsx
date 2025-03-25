'use client';

import { Suspense } from 'react';

import RoutineCardsSkeleton from './RoutineCardsSkeleton';
import RoutineCards from './RoutineCards';

export default function RoutineCardsContainer() {
	return (
		<Suspense fallback={<RoutineCardsSkeleton />}>
			<RoutineCards />
		</Suspense>
	);
}

'use client';

import { lazy, Suspense } from 'react';
import CategoryFilterTabSkeleton from './CategoryFilterTabSkeleton';

const CategoryFilterTab = lazy(() => import('./CategoryFilterTab'));

export default function CategoryFilterContainer() {
	return (
		<div className="sticky top-0 z-10 bg-white h-[4.5rem] min-h-[4.5rem] ">
			<Suspense fallback={<CategoryFilterTabSkeleton />}>
				<CategoryFilterTab />
			</Suspense>
		</div>
	);
}

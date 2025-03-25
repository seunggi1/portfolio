'use client';

import { Suspense } from 'react';
import CategoryFilterTabSkeleton from './CategoryFilterTabSkeleton';
import CategoryFilterTab from './CategoryFilterTab';

export default function CategoryFilterContainer() {
	return (
		<div className="h-[4.5rem] min-h-[4.5rem]">
			<Suspense fallback={<CategoryFilterTabSkeleton />}>
				<CategoryFilterTab />
			</Suspense>
		</div>
	);
}

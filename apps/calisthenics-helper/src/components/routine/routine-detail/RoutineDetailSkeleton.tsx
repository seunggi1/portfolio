'use client';

import { Skeleton } from '@repo/ui/common';

const skeletonInfo = {
	MAX_EXERCISE_SETS: 5,
	MAX_CATEGORIES: 4,
};

export default function RoutineDetailSkeleton() {
	return (
		<section className="max-w-screen-xl m-auto md:flex gap-x-2">
			<div className="basis-[60%]">
				<Skeleton className="h-80" />
				<div className="p-2 space-y-2">
					<Skeleton className="w-64 h-4" />
					<Skeleton className="h-4 w-80" />
					<Skeleton className="h-4 w-11" />
					<Skeleton className="h-4 w-11" />
					<div className="flex gap-2">
						{Array.from({ length: skeletonInfo.MAX_CATEGORIES }, (_, i) => (
							<Skeleton key={i} className="w-6 h-[1rem]" />
						))}
					</div>
					<Skeleton className="h-10" />
				</div>
			</div>
			<div className="basis-[40%]">
				<div className="flex justify-center pt-2 mb-2">
					<Skeleton className="h-10 w-36" />
				</div>
				{Array.from({ length: skeletonInfo.MAX_EXERCISE_SETS }, (_, i) => (
					<div key={i} className="p-2 border-t-2">
						<Skeleton className="h-[8.5rem] w-full" />
					</div>
				))}
			</div>
		</section>
	);
}

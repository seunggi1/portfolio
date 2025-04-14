'use client';

import { Skeleton } from '@repo/ui/common';

export default function CommentsSkeleton() {
	return (
		<section className="flex flex-col gap-4">
			<Skeleton className="w-full h-8" />
			<Skeleton className="w-full h-8" />
		</section>
	);
}

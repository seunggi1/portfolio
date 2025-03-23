import { Skeleton } from '@repo/ui/common';

export default function RoutineRunnerSkeleton() {
	return (
		<section
			className={`flex flex-col items-center justify-center gap-4 h-full`}
		>
			<Skeleton className="w-1/2 h-60" />
			<Skeleton className="w-1/2 h-10" />
			<Skeleton className="w-1/2 h-10 mt-4" />
		</section>
	);
}

import { Skeleton } from '@repo/ui/common';

export default function RoutineRunnerSkeleton() {
	return (
		<section
			className={`flex flex-col items-center justify-center gap-4 h-full`}
		>
			<p className="text-xl font-bold">루틴을 불러오고 있습니다...</p>
			<Skeleton className="w-1/2 h-60" />
			<Skeleton className="w-1/2 h-10" />
			<Skeleton className="w-1/2 h-10 mt-4" />
		</section>
	);
}

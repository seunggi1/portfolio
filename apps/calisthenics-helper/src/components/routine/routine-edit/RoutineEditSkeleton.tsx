import { Skeleton } from '@repo/ui/common';

const MAX = 5;

export default function RoutineEditSkeleton() {
	const skeletons = Array.from({ length: MAX }, (_, i) => (
		<div className="w-full" key={i}>
			<Skeleton className="w-3/4 mx-auto h-11" />
			<div className="divider" />
		</div>
	));

	return (
		<section className="flex flex-col items-center justify-center w-full h-full bg-gray-100 gap-4">
			<div className="flex flex-col items-center justify-center w-3/4 py-4 m-auto mt-10 bg-white rounded-lg gap-4 md:w-1/2">
				{skeletons}
			</div>
		</section>
	);
}

import { Skeleton } from '@repo/ui/common';

export default function CategoryFilterTabSkeleton() {
	return (
		<section className="border-b p-2 h-full">
			<ul className="max-w-screen-xl m-auto flex items-center justify-center gap-4 py-4 text-xl  p-2">
				<Skeleton className="w-32 h-7" />
				<Skeleton className="w-32 h-7" />
				<Skeleton className="w-32 h-7" />
			</ul>
		</section>
	);
}

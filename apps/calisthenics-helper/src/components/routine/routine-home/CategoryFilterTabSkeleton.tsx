import { Skeleton } from '@repo/ui/common';

export default function CategoryFilterTabSkeleton() {
	return (
		<section className="h-full p-2 border-b">
			<ul className="flex items-center justify-center p-2 py-4 m-auto text-xl max-w-screen-xl gap-4 ">
				<Skeleton className="w-32 h-7" />
				<Skeleton className="w-32 h-7" />
				<Skeleton className="w-32 h-7" />
			</ul>
		</section>
	);
}

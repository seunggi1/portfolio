import { useMemo } from 'react';
import { Card, Skeleton } from '@repo/ui/common';

const skeletonInfo = {
	MAX: 10,
	MAX_CATEGORIES: 4,
};

export default function RoutineCardsSkeleton() {
	const skeletons = useMemo(
		() =>
			Array.from({ length: skeletonInfo.MAX }, (_, parentIndex) => (
				<Card key={parentIndex}>
					<Card.CardHeader>
						<Skeleton className="w-full h-[8rem]" />
					</Card.CardHeader>
					<Card.CardBody>
						<div className="flex flex-col gap-2">
							<Skeleton className="w-full h-[1rem]" />
							<Skeleton className="w-full h-[1rem]" />
							<Skeleton className=" w-11 h-[1rem]" />
							<div className="flex gap-2">
								{Array.from(
									{ length: skeletonInfo.MAX_CATEGORIES },
									(_, categoryIndex) => (
										<Skeleton key={categoryIndex} className="w-6 h-[1rem]" />
									)
								)}
							</div>
						</div>
					</Card.CardBody>
				</Card>
			)),
		[]
	);

	return (
		<section className="px-8 pt-4 m-auto grid max-w-screen-xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{skeletons}
		</section>
	);
}

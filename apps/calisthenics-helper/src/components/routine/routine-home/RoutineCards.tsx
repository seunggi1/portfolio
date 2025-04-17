import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card } from '@repo/ui/common';
import {
	ImageContainer,
	Loading,
	RoutineCategories,
	RoutineLevel,
	RoutineSummary,
} from '@/components/common/ui';
import { useIntersectionObserver, useRoutines } from '@/hooks';
import RoutineCardsSkeleton from './RoutineCardsSkeleton';

export default function RoutineCards() {
	const searchParam = useSearchParams();
	const categoryID = searchParam.get('category');
	const searchQuery = searchParam.get('search');
	const { routines, isLoading, isFetching, handleNextPage, hasNextPage } =
		useRoutines({ categoryID, searchQuery });

	const { handleRef } = useIntersectionObserver({
		callback: handleNextPage,
		threshold: 1,
	});

	if (isLoading) {
		return <RoutineCardsSkeleton />;
	}

	return (
		<>
			<section className="grid max-w-screen-xl grid-cols-2 px-8 pt-4 m-auto gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{routines.map((routine) => (
					<Link key={routine.id} href={`/routines/${routine.id}`}>
						<Card>
							<Card.CardHeader>
								<ImageContainer
									image={routine.imageURL}
									alt={routine.name}
									className="w-full h-[8rem]"
									sizes="230px"
									fallbackContent={<span>{routine.name}</span>}
								/>
							</Card.CardHeader>
							<Card.CardBody>
								<RoutineSummary {...routine} />
								<RoutineLevel level={routine.difficultyLevel} />
								<RoutineCategories categoryNames={routine.categoryNames} />
							</Card.CardBody>
						</Card>
					</Link>
				))}
			</section>
			<div className="w-full pt-4 text-center" ref={handleRef}>
				{hasNextPage && isFetching ? <Loading /> : null}
			</div>
		</>
	);
}

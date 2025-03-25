import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card } from '@repo/ui/common';
import RoutineLevel from '../../common/ui/RoutineLevel';
import RoutineCategories from '../../common/ui/RoutineCategories';
import RoutineSummary from '../../common/ui/RoutineSummary';
import { useIntersectionObserver, useRoutines } from '@/hooks';
import RoutineCardsSkeleton from './RoutineCardsSkeleton';

export default function RoutineCards() {
	const searchParam = useSearchParams();
	const categoryID = searchParam.get('category');
	const searchQuery = searchParam.get('search');
	const {
		routines,
		error,
		isLoading,
		isFetching,
		handleNextPage,
		hasNextPage,
	} = useRoutines({ categoryID, searchQuery });

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
								<div className="text-white w-full h-[8rem] flex items-center justify-center relative">
									<Image
										src={routine.imageURL ? routine.imageURL : '/push-up.png'}
										alt="doing pull-up man"
										className="absolute"
										fill={true}
									/>
								</div>
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
			{isLoading || isFetching ? <RoutineCardsSkeleton /> : null}
			<div className="w-full h-3 mt-4 text-center " ref={handleRef}>
				{!hasNextPage && (
					<span className="p-2 text-2xl font-bold">
						불러올 데이터가 없습니다.
					</span>
				)}
			</div>
		</>
	);
}

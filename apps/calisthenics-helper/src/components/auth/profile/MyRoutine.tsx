'use client';

import Link from 'next/link';
import Image from 'next/image';
import useRoutineByUser from '@/hooks/useRoutinesByUser';
import ProfileSkeleton from './ProfileSkeleton';
import Loading from '@/components/common/ui/Loading';
import RoutineLevel from '@/components/common/ui/RoutineLevel';
import RoutineCategories from '@/components/common/ui/RoutineCategories';
import { useIntersectionObserver } from '@/hooks';
import ProfileContainer from './ProfileContainer';

export default function MyRoutine() {
	const { routines, isFetching, hasNextPage, isLoading, handleNextPage } =
		useRoutineByUser();

	const { handleRef } = useIntersectionObserver({
		callback: handleNextPage,
		threshold: 1,
	});

	return (
		<ProfileContainer path="routines">
			<section className="px-2 py-4 bg-white rounded-lg">
				{isLoading && <ProfileSkeleton />}
				<div className="grid grid-cols-[repeat(auto-fit,minmax(150px,350px))]">
					{routines.map((r) => (
						<article key={r.id} className="mb-2">
							<Link className="flex gap-2" href={`/routines/${r.id}`}>
								<div>
									<div className="flex items-center justify-center text-white bg-black rounded-md w-[125px] h-[125px] relative border-primary border-2 overflow-hidden  ">
										{r.imageURL ? (
											<Image
												className="relative"
												src={r.imageURL}
												alt={`${r.name} image`}
												fill={true}
											/>
										) : (
											<span>{r.name}</span>
										)}
									</div>
								</div>
								<div className="flex flex-col overflow-hidden ">
									<h2 className="font-bold truncate">{r.name}</h2>
									<RoutineLevel level={r.difficultyLevel} />
									<RoutineCategories categoryNames={r.categoryNames} />
									<span className="truncate">{r.description}</span>
								</div>
							</Link>
						</article>
					))}
				</div>
				<div className="h-2 text-center" ref={handleRef}>
					{hasNextPage && isFetching && <Loading />}
				</div>
			</section>
		</ProfileContainer>
	);
}

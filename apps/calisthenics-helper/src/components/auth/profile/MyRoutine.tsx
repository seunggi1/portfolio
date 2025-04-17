'use client';

import Link from 'next/link';
import ProfileSkeleton from './ProfileSkeleton';
import {
	ImageContainer,
	Loading,
	RoutineCategories,
	RoutineLevel,
} from '@/components/common/ui';
import { useIntersectionObserver, useRoutinesByUser } from '@/hooks';
import ProfileContainer from './ProfileContainer';

type Props = {
	email: string;
};

export default function MyRoutine({ email }: Props) {
	const { routines, isFetching, hasNextPage, isLoading, handleNextPage } =
		useRoutinesByUser(email);

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
									<ImageContainer
										className="w-[125px] h-[125px] rounded-md overflow-hidden"
										image={r.imageURL}
										alt={`${r.name} image`}
										fallbackContent={<span>{r.name}</span>}
										sizes="125px"
									/>
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

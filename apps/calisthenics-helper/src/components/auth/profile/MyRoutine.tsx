import Link from 'next/link';
import Image from 'next/image';
import useRoutineByUser from '@/hooks/useRoutinesByUser';
import ProfileSkeleton from './ProfileSkeleton';
import Loading from '@/components/common/ui/Loading';
import RoutineLevel from '@/components/common/ui/RoutineLevel';
import RoutineCategories from '@/components/common/ui/RoutineCategories';
import { useIntersectionObserver } from '@/hooks';

export default function MyRoutine() {
	const { routines, hasNextPage, isFetching, isLoading, handleNextPage } =
		useRoutineByUser();

	const { handleRef } = useIntersectionObserver({
		callback: handleNextPage,
		threshold: 1,
	});

	return (
		<section className="px-2 py-4 bg-white rounded-lg">
			{isLoading && <ProfileSkeleton />}
			{routines.map((r) => (
				<article key={r.id} className="flex flex-col gap-2 mb-2">
					<div className="flex gap-2">
						<div>
							<Link className="block w-full" href={`/routines/${r.id}`}>
								<div className="flex items-center justify-center text-white bg-black rounded-md w-[125px] h-[125px] relative border-primary border-2 overflow-hidden">
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
							</Link>
						</div>
						<div className="flex flex-col overflow-hidden ">
							<h2 className="font-bold truncate">{r.name}</h2>
							<RoutineLevel level={r.difficultyLevel} />
							<RoutineCategories categoryNames={r.categoryNames} />
							<div className="truncate">{r.description}</div>
						</div>
					</div>
				</article>
			))}
			<div className="h-2 text-center" ref={handleRef}>
				{isFetching && <Loading />}
			</div>
		</section>
	);
}

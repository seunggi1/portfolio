import { useInfiniteQuery } from '@tanstack/react-query';
import { routineKeys } from '@/api/routines';
import { fetchRoutinesByUser } from '@/api/routines/routines';

export default function useRoutineByUser(email: string) {
	const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: routineKeys.listByUser(email),
			queryFn: ({ pageParam }) =>
				fetchRoutinesByUser({ nextCursor: pageParam }),
			initialPageParam: '',
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		});

	const handleNextPage = () => {
		if (isFetching || !hasNextPage) {
			return;
		}
		fetchNextPage();
	};

	return {
		routines:
			data && data.pages.length
				? data.pages.map((group) => group.routines).flat()
				: [],
		isLoading,
		error,
		isFetching,
		handleNextPage,
		hasNextPage,
	};
}

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRoutines, routineKeys } from '@/api/routines';

export default function useRoutines(categoryID: string) {
	const {
		data,
		isLoading,
		error,
		isFetching,
		fetchNextPage,
		hasNextPage,
		refetch,
	} = useInfiniteQuery({
		queryKey: [routineKeys.all, categoryID],
		queryFn: ({ pageParam }) =>
			fetchRoutines({ nextCursor: pageParam, categoryID }),
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

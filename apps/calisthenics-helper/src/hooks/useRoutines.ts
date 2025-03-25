import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRoutines, routineKeys } from '@/api/routines';
import { RoutinesRequest } from '@/types/routine';

type Props = Pick<RoutinesRequest, 'categoryID' | 'searchQuery'>;

export default function useRoutines({ categoryID, searchQuery }: Props) {
	const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: routineKeys.list({ categoryID, searchQuery }),
			queryFn: ({ pageParam }) =>
				fetchRoutines({ nextCursor: pageParam, categoryID, searchQuery }),
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

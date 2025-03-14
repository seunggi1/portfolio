import { useInfiniteQuery } from '@tanstack/react-query';
import { commentKeys, fetchComments } from '@/api/comments';
import { Routine } from '@/types/routine';

export default function useComments(routineID: Routine['id']) {
	const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: commentKeys.list(routineID),
			queryFn: ({ pageParam }) =>
				fetchComments({ nextCursor: pageParam, routineID }),
			initialPageParam: '',
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		});

	const handleNextComments = () => {
		if (isFetching || !hasNextPage) {
			return;
		}

		fetchNextPage();
	};

	return {
		comments:
			data && data.pages.length
				? data.pages.map((group) => group.comments).flat()
				: [],
		isLoading,
		error,
		isFetching,
		handleNextComments,
		hasNextPage,
	};
}

import { useRef } from 'react';
import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import {
	Comment,
	CommentsResponse,
	NewComment,
	UpdateComment,
} from '@/types/comment.d';
import {
	commentKeys,
	createComment,
	deleteComment,
	updateComment,
} from '@/api/comments';
import { Routine } from '@/types/routine';

export default function useCommentEdit(routineID: Routine['id']) {
	const createUser = useRef<string>('');
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: createComment,
		onMutate: (variable) => {
			const commentListKey = commentKeys.list(routineID);
			const comments = queryClient.getQueryData(
				commentListKey
			) as InfiniteData<CommentsResponse>;

			if (comments.pages[0]) {
				const currentDate = new Date().toISOString();
				const optimisticComment = {
					...variable,
					id: createUser.current + variable.comment + variable.recommendation,
					userID: createUser.current,
					displayName: createUser.current,
					createdDate: currentDate,
					updatedDate: currentDate,
				};
				comments.pages[0].comments = [
					optimisticComment,
					...comments.pages[0].comments,
				];
			}
		},
		onSettled: invalidateCommentsQuery,
	});

	const updateMutation = useMutation({
		mutationFn: updateComment,
		onMutate: (updateComment) => {
			const commentListKey = commentKeys.list(routineID);
			const comments = queryClient.getQueryData(
				commentListKey
			) as InfiniteData<CommentsResponse>;

			if (!comments) {
				return updateComment;
			}

			comments.pages = comments.pages.map((page) => {
				return {
					comments: page.comments.map((comment) =>
						comment.id === updateComment.id
							? { ...comment, ...updateComment }
							: comment
					),
					nextCursor: page.nextCursor,
				};
			});

			queryClient.setQueryData(commentListKey, comments);
		},
		onSettled: invalidateCommentsQuery,
	});

	const deleteMutation = useMutation({
		mutationFn: deleteComment,
		onMutate: (id) => {
			const commentListKey = commentKeys.list(routineID);
			const comments = queryClient.getQueryData(
				commentListKey
			) as InfiniteData<CommentsResponse>;

			if (!comments) {
				return id;
			}

			comments.pages = comments.pages.map((page) => {
				return {
					comments: page.comments.filter((comment) => comment.id !== id),
					nextCursor: page.nextCursor,
				};
			});
			queryClient.setQueryData(commentListKey, comments);
		},
		onSettled: invalidateCommentsQuery,
	});

	function invalidateCommentsQuery() {
		queryClient.invalidateQueries({
			queryKey: commentKeys.list(routineID),
		});
	}

	const handleCommentCreate = (
		newComment: NewComment,
		displayName: Comment['displayName']
	) => {
		createMutation.mutate(newComment);
		createUser.current = displayName;
	};

	const handleCommentUpdate = (updateComment: UpdateComment) => {
		updateMutation.mutate(updateComment);
	};

	const handleCommentDelete = (commentID: Comment['id']) => {
		deleteMutation.mutate(commentID);
	};

	return {
		create: {
			data: createMutation.data,
			isPending: createMutation.isPending,
			varialbes: createMutation.variables,
			handleCommentCreate,
		},
		update: {
			data: updateMutation.data,
			isPending: updateMutation.isPending,
			handleCommentUpdate,
		},
		remove: {
			data: deleteMutation.data,
			isPending: deleteMutation.isPending,
			handleCommentDelete,
		},
	};
}

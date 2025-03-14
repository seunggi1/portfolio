import { HttpClientBuilder } from '../httpClient';
import {
	CommentsResponse,
	CommentsRequest,
	NewComment,
	UpdateComment,
	Comment,
} from '@/types/comment';

function getCommentURL(...paths: string[]) {
	const ROUTINE_URL = 'api/comments';

	const urls = [ROUTINE_URL];

	for (const path of paths) {
		urls.push(path);
	}

	return urls.join('/');
}

export async function fetchComments({
	nextCursor,
	routineID,
}: CommentsRequest): Promise<CommentsResponse> {
	const { data } = await HttpClientBuilder.get(
		`${getCommentURL()}?routineID=${routineID}&cursor=${nextCursor}`
	).call<CommentsResponse>();

	return data;
}

export async function createComment(
	comment: NewComment
): Promise<Comment['id']> {
	console.log('createComment api func call');

	const { data } = await HttpClientBuilder.post(`${getCommentURL()}`)
		.data(comment)
		.call<Comment['id']>();

	return data;
}

export async function updateComment(comment: UpdateComment): Promise<boolean> {
	const { data } = await HttpClientBuilder.put(`${getCommentURL(comment.id)}`)
		.data(comment)
		.call<boolean>();

	return data;
}

export async function deleteComment(
	commentID: Comment['id']
): Promise<boolean> {
	const { data } = await HttpClientBuilder.delete(
		getCommentURL(commentID)
	).call<boolean>();

	return data;
}

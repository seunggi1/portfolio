import { getServiceClient } from '@/services';
import { Comment, CommentsRequest, UpdateComment } from '@/types/comment';

export async function getComments(request: CommentsRequest) {
	const client = await getServiceClient();

	return client.getComments(request);
}

export async function createComment(comment: Comment) {
	const client = await getServiceClient();

	return client.createComment(comment);
}

export async function updateComment(updateComment: UpdateComment) {
	const client = await getServiceClient();

	return client.updateComment(updateComment);
}

export async function deleteComment(id: Comment['id']) {
	const client = await getServiceClient();

	return client.deleteComment(id);
}

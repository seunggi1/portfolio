import { getServiceClient } from '@/lib/service';
import { ServiceClient } from '@/lib/service/base/serviceClient';
import { Comment, CommentsRequest, UpdateComment } from '@/types/comment';

export class CommentBusiness {
	constructor(private client: ServiceClient) {}
	async getComments(request: CommentsRequest) {
		return this.client.getComments(request);
	}

	async createComment(comment: Comment) {
		return this.client.createComment(comment);
	}

	async updateComment(updateComment: UpdateComment) {
		return this.client.updateComment(updateComment);
	}

	async deleteComment(id: Comment['id']) {
		return this.client.deleteComment(id);
	}
}

export async function createCommentBusiness() {
	return new CommentBusiness(await getServiceClient());
}

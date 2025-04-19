import { serverHttpErrorMessages } from '@/constants/messages';
import { getServiceClient } from '@/lib/service';
import { ServiceClient } from '@/lib/service/base/serviceClient';
import { Comment, CommentsRequest, UpdateComment } from '@/types/comment';
import { UnauthorizedError } from '@/types/error';

export class CommentBusiness {
	constructor(private client: ServiceClient) {}
	async getComments(request: CommentsRequest) {
		return this.client.getComments(request);
	}

	async createComment(comment: Comment) {
		const user = await this.client.getUser();

		if (!user) {
			throw new UnauthorizedError(serverHttpErrorMessages.UNAUTHORIZED_ERROR);
		}

		return this.client.createComment({
			newComment: comment,
			user,
		});
	}

	async updateComment(updateComment: UpdateComment) {
		const user = await this.client.getUser();

		if (!user) {
			throw new UnauthorizedError(serverHttpErrorMessages.UNAUTHORIZED_ERROR);
		}

		return this.client.updateComment({
			user,
			updateComment,
		});
	}

	async deleteComment(id: Comment['id']) {
		const user = await this.client.getUser();

		if (!user) {
			throw new UnauthorizedError(serverHttpErrorMessages.UNAUTHORIZED_ERROR);
		}

		return this.client.deleteComment({
			commentID: id,
			user,
		});
	}
}

export async function createCommentBusiness() {
	return new CommentBusiness(await getServiceClient());
}

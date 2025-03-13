import { User } from './auth';
import { Routine } from './routine.d';

export type Comment = {
	id: string;
	routineID: Routine['id'];
	comment: string;
	recommendation: number;
	userID: User['id'];
	createdDate: Date;
	updatedDate: Date;
};

export type CommentsRequest = {
	nextCursor: string | null;
	routineID: Routine['id'];
};

export type CommentsResponse = {
	comments: Comment[];
	nextCursor: CommentsRequest['nextCursor'];
};

export type CommentEditBase = Pick<Comment, 'comment' | 'recommendation'>;
export type CommentEditErrors = Record<keyof CommentEditBase, string>;

export type NewComment = CommentEditBase & {
	routineID: Routine['id'];
};

export type NewCommentErrors = Record<keyof NewComment, string>;

export type NewCommentFormData = {
	success?: boolean;
	inputs?: Partial<NewComment>;
	errors?: Partial<NewCommentErrors>;
};

export type UpdateComment = CommentEditBase & {
	id: Comment['id'];
};

export type UpdateCommentErrors = Record<keyof UpdateComment, string>;

export type UpdateCommentFormData = {
	success?: boolean;
	inputs?: Partial<UpdateComment>;
	errors?: Partial<UpdateCommentErrors>;
};

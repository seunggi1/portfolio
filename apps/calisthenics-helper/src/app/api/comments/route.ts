import { NextRequest, NextResponse } from 'next/server';
import { Comment, CommentsRequest, CommentsResponse } from '@/types/comment';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { ValidatorError } from '@/types/error';
import { validateComment } from '@/schemas/comment';
import { createCommentBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor: CommentsRequest['nextCursor'] =
		searchParams.get('cursor') || null;
	const routineID: string = searchParams.get('routineID') || '';
	let commentResponse: CommentsResponse | null;

	if (!routineID) {
		return handleErrorResponse(
			new ValidatorError(serverHttpErrorMessages.INPUT_ERROR)
		);
	}

	try {
		const commentBusiness = await createCommentBusiness();
		commentResponse = await commentBusiness.getComments({
			nextCursor: cursor,
			routineID,
		});

		if (!commentResponse) {
			throw new Error(serverHttpErrorMessages.SERVER_ERROR);
		}

		return NextResponse.json<CommentsResponse>(commentResponse);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const inputError = validateComment(data);

	if (inputError) {
		return handleErrorResponse(
			new ValidatorError(serverHttpErrorMessages.INPUT_ERROR)
		);
	}

	try {
		const commentBusiness = await createCommentBusiness();
		const result = await commentBusiness.createComment(data);

		return NextResponse.json<Comment['id']>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

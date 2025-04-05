import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import { Comment, CommentsRequest, CommentsResponse } from '@/types/comment';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { ValidatorError } from '@/types/error';
import { validateComment } from '@/schemas/comment';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor: CommentsRequest['nextCursor'] =
		searchParams.get('cursor') || null;
	const routineID: string = searchParams.get('routineID') || '';
	let commentResponse: CommentsResponse | null;

	if (!routineID) {
		return handleErrorResponse(new ValidatorError('Invalid routine'));
	}

	try {
		const client = await getServiceClient();
		commentResponse = await client.getComments({
			nextCursor: cursor,
			routineID,
		});

		if (!commentResponse) {
			throw new Error('Server Error');
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
		return handleErrorResponse(new ValidatorError('Invalid input data'));
	}

	try {
		const client = await getServiceClient();
		const result = await client.createComment(data);

		return NextResponse.json<Comment['id']>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

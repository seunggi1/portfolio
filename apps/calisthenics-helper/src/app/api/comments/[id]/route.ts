import { NextRequest, NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { ValidatorError } from '@/types/error';
import { validateComment } from '@/schemas/comment';
import { createCommentBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const data = await request.json();
	const inputError = validateComment(data);

	if (inputError) {
		return handleErrorResponse(
			new ValidatorError(serverHttpErrorMessages.INPUT_ERROR)
		);
	}

	try {
		const id = (await params).id;
		const commentBusiness = await createCommentBusiness();
		const result = await commentBusiness.updateComment({ ...data, id });

		return NextResponse.json<boolean>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = (await params).id;
		const commentBusiness = await createCommentBusiness();
		const result = await commentBusiness.deleteComment(id);
		return NextResponse.json<boolean>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

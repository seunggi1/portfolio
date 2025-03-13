import { NextRequest, NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/error';
import { getServiceClient } from '@/services';
import { ValidatorError } from '@/types/error';
import { validateComment } from '@/schemas/comment';

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const data = await request.json();
	const inputError = validateComment(data);

	if (inputError) {
		return handleErrorResponse(new ValidatorError('Invalid input data'));
	}

	try {
		const id = (await params).id;
		const client = await getServiceClient();
		const result = await client.updateComment({ ...data, id });

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
		const client = await getServiceClient();
		const result = await client.deleteComment(id);
		return NextResponse.json<boolean>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

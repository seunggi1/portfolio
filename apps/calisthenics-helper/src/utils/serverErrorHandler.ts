import { NextRequest, NextResponse } from 'next/server';
import {
	UnauthorizedError,
	ErrorName,
	ErrorResult,
	NotFoundError,
	ValidatorError,
} from '@/types/error';
import { HttpStatus } from './httpStatus';
import { serverHttpErrorMessages } from '@/constants/messages';
import { environments } from '@/constants/environments';

export function handleErrorResponse(error: unknown): NextResponse {
	if (error instanceof ValidatorError) {
		return NextResponse.json<ErrorResult>(
			{
				name: error.name,
				error: serverHttpErrorMessages.INPUT_ERROR,
				details: error.message,
			},
			{ status: HttpStatus.BadRequest }
		);
	}

	if (error instanceof NotFoundError) {
		return NextResponse.json<ErrorResult>(
			{
				name: error.name,
				error: serverHttpErrorMessages.NOT_FOUND_ERROR,
				details: error.message,
			},
			{ status: HttpStatus.NotFound }
		);
	}

	if (error instanceof UnauthorizedError) {
		return NextResponse.json<ErrorResult>(
			{
				name: error.name,
				error: serverHttpErrorMessages.UNAUTHORIZED_ERROR,
				details: error.message,
			},
			{ status: HttpStatus.Unauthorized }
		);
	}

	return NextResponse.json<ErrorResult>(
		{
			name: ErrorName.serverError,
			error: serverHttpErrorMessages.SERVER_ERROR,
			details: (error as Error).message,
		},
		{ status: HttpStatus.InternalServerError }
	);
}

export function IsAdminClient(request: NextRequest) {
	return request.headers.get('origin') === environments.ADMIN_CLIENT_URL;
}

import { NextResponse } from 'next/server';
import {
	UnauthorizedError,
	ErrorName,
	ErrorResult,
	NotFoundError,
	ValidatorError,
} from '@/types/error';
import { HttpStatus } from './httpStatus';

export function handleErrorResponse(error: unknown): NextResponse {
	if (error instanceof ValidatorError) {
		return NextResponse.json<ErrorResult>(
			{
				name: error.name,
				error: 'Input not valid',
				details: error.message,
			},
			{ status: HttpStatus.BadRequest }
		);
	}

	if (error instanceof NotFoundError) {
		console.log(error.name);
		return NextResponse.json<ErrorResult>(
			{
				name: error.name,
				error: 'Not found resource',
				details: error.message,
			},
			{ status: HttpStatus.NotFound }
		);
	}

	if (error instanceof UnauthorizedError) {
		return NextResponse.json<ErrorResult>(
			{
				name: error.name,
				error: 'Unauthorized user',
				details: error.message,
			},
			{ status: HttpStatus.Unauthorized }
		);
	}

	return NextResponse.json<ErrorResult>(
		{
			name: ErrorName.serverError,
			error: 'Internal Server Error',
			details: (error as Error).message,
		},
		{ status: HttpStatus.InternalServerError }
	);
}

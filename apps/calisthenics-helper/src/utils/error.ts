import {
	AuthError,
	ErrorResult,
	NotFoundError,
	ValidatorError,
} from '@/types/error';
import { NextResponse } from 'next/server';

export function ensureError(value: unknown): Error {
	if (value instanceof Error) {
		return value;
	}

	let stringify = '[Unable to stringify the thrown value]';
	try {
		stringify = JSON.stringify(value);
	} finally {
		return new Error(
			`This value was thrown as is, not through an Error: ${stringify}`
		);
	}
}

export function handleErrorResponse(error: Error): NextResponse {
	if (error instanceof ValidatorError) {
		return NextResponse.json<ErrorResult>(
			{
				error: 'Validator Error',
				details: error.message,
			},
			{ status: 400 }
		);
	}

	if (error instanceof NotFoundError) {
		return NextResponse.json<ErrorResult>(
			{
				error: 'Not Found Error',
				details: error.message,
			},
			{ status: 404 }
		);
	}

	if (error instanceof AuthError) {
		return NextResponse.json<ErrorResult>(
			{
				error: 'Auth Error',
				details: error.message,
			},
			{ status: 404 }
		);
	}

	return NextResponse.json<ErrorResult>(
		{
			error: 'Internal Server Error',
			details: error.message,
		},
		{ status: 500 }
	);
}

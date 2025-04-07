import { AxiosError } from 'axios';

declare module '@tanstack/react-query' {
	interface Register {
		defaultError: AxiosError<ErrorResult>;
	}
}

export type ErrorResult = {
	name: string;
	error: string;
	details?: string;
};

export const ErrorName = {
	inputValid: 'inputValid',
	unauthorized: 'unauthorized',
	notfound: 'notfound',
	serverError: 'serverError',
} as const;

export class ValidatorError extends Error {
	constructor(message: string) {
		super(message);
		this.name = ErrorName.inputValid;
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = ErrorName.notfound;
	}
}

export class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = ErrorName.unauthorized;
	}
}

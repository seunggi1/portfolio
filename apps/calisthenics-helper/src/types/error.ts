import { AxiosError } from 'axios';

declare module '@tanstack/react-query' {
	interface Register {
		defaultError: AxiosError;
	}
}

export type ErrorResult = {
	error: string;
	details?: string;
};

export class ValidatorError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
	}
}

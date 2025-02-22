import {
	SignInData,
	SignInFormResponse,
	SignUpData,
	SignUpFormResponse,
} from '@/types/auth';
import { z } from 'zod';

const signUpUser = z.object({
	displayName: z
		.string()
		.min(3, {
			message: '별명은 최소 3글자 이상 이어야 합니다.',
		})
		.max(8, {
			message: '별명은 최대 8글자까지 가능합니다.',
		}),
	email: z.string().email({
		message: '이메일 형식이 올바르지않습니다.',
	}),
});

const signInUser = signUpUser.pick({ email: true });

export function validateSignUpData(
	data: SignUpData
): SignUpFormResponse['errors'] | null {
	const result = signUpUser.safeParse(data);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	return {
		displayName: format.fieldErrors.displayName?.join(' '),
		email: format.fieldErrors.email?.join(' '),
	};
}

export function validateSignInData(
	data: SignInData
): SignInFormResponse['errors'] | null {
	const result = signInUser.safeParse(data);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	return {
		email: format.fieldErrors.email?.join(' '),
	};
}

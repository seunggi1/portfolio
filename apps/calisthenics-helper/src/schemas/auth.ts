import {
	SignInData,
	SignInFormResponse,
	SignUpData,
	SignUpFormResponse,
	UpdateDisplayNameData,
	UpdatePasswordData,
	UpdateProfilePasswordData,
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
	password: z
		.string()
		.min(6, {
			message: '비밀번호는 최소 6자 이상 이어야 합니다.',
		})
		.max(15, {
			message: '비밀번호는 최대 15자 까지 가능합니다.',
		})
		.regex(/[\w\S]/, {
			message: '비밀번호는 소문자, 대문자, 숫자, 특수문자로 이루어져야 합니다.',
		})
		.regex(/[^\w]/, {
			message: '비밀번호에 특수문자가 포함되어야 합니다.',
		}),
	confirmPassword: z.string(),
});

const signInUser = signUpUser.pick({ email: true });

export function validateSignUpData(
	data: SignUpData
): SignUpFormResponse['errors'] | null {
	const result = signUpUser
		.refine((data) => data.password === data.confirmPassword, {
			message: '비밀번호가 일치하지 않습니다.',
			path: ['confirmPassword'],
		})
		.safeParse(data);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	return Object.fromEntries(
		Object.entries(format.fieldErrors).map(([key, value]) => [
			key,
			value.join(' '),
		])
	);
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

export function validataPassword(data: UpdatePasswordData) {
	const result = signUpUser
		.pick({ password: true, confirmPassword: true })
		.refine((data) => data.password === data.confirmPassword, {
			message: '비밀번호가 일치하지 않습니다.',
			path: ['confirmPassword'],
		})
		.safeParse(data);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	return Object.fromEntries(
		Object.entries(format.fieldErrors).map(([key, value]) => [
			key,
			value.join(' '),
		])
	);
}

export function validateDisplayName(data: UpdateDisplayNameData) {
	const result = signUpUser.pick({ displayName: true }).safeParse(data);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	return {
		displayName: format.fieldErrors.displayName?.join(''),
	};
}

export function validateProfilePassword(data: UpdateProfilePasswordData) {
	const newPasswordResult = validataPassword({
		password: data.newPassword,
		confirmPassword: data.newConfirmPassword,
	});

	if (data.password !== data.newPassword && newPasswordResult === null) {
		return null;
	}

	return {
		password:
			data.password === data.newPassword
				? '현재 비밀번호와 새 비밀번호는 달라야합니다.'
				: undefined,
		newPassword: newPasswordResult?.password,
		newConfirmPassword: newPasswordResult?.confirmPassword,
	};
}

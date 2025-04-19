import { z } from 'zod';
import {
	SignUpData,
	SignUpFormResponse,
	UpdateDisplayNameData,
	UpdatePasswordData,
	UpdateProfilePasswordData,
	User,
} from '@/types/auth';
import { authErrorMessages } from '@/constants/messages';

const signUpUser = z.object({
	displayName: z
		.string()
		.min(3, {
			message: authErrorMessages.MIN_DISPLAY_NAME_ERROR,
		})
		.max(8, {
			message: authErrorMessages.MAX_DISPLAY_NAME_ERROR,
		}),
	email: z.string().email({
		message: authErrorMessages.EMAIL_ERROR,
	}),
	password: z
		.string()
		.min(6, {
			message: authErrorMessages.MIN_PASSWORD_ERROR,
		})
		.max(15, {
			message: authErrorMessages.MAX_PASSWORD_ERROR,
		})
		.regex(/[\w\S]/, {
			message: authErrorMessages.BASE_CHARACTER_PASSWORD_ERROR,
		})
		.regex(/[^\w]/, {
			message: authErrorMessages.SPECIAL_CHARACTER_PASSWORD_ERROR,
		}),
	confirmPassword: z.string(),
});

const userEmail = signUpUser.pick({ email: true });

export function validateSignUpData(
	data: SignUpData
): SignUpFormResponse['errors'] | null {
	const passwordResult = validataPassword(data);

	if (passwordResult) {
		return passwordResult;
	}

	const result = signUpUser.safeParse(data);

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

export function validateEmail(email: User['email']): string | null {
	const result = userEmail.safeParse(email);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	return format.fieldErrors.email?.join(' ') ?? null;
}

export function validataPassword(data: UpdatePasswordData) {
	const result = signUpUser
		.pick({ password: true, confirmPassword: true })
		.refine((data) => data.password === data.confirmPassword, {
			message: authErrorMessages.NOT_MATCH_PASSWORD_ERROR,
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
				? authErrorMessages.NEW_PASSWORD_ERROR
				: undefined,
		newPassword: newPasswordResult?.password,
		newConfirmPassword: newPasswordResult?.confirmPassword,
	};
}

export function validateWithdraw(
	email: User['email'],
	confirmEmail: User['email']
) {
	const result = z
		.object({
			email: z.string().email(),
			confirmEmail: z.string().email(),
		})
		.safeParse({ email, confirmEmail });

	if (result.success) {
		if (email !== confirmEmail) {
			return {
				confirmEmail: authErrorMessages.EMAIL_ERROR,
			};
		}
		return null;
	}

	const format = result.error.format();

	return {
		confirmEmail: format.confirmEmail?._errors.join(''),
	};
}

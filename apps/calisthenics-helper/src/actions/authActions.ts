'use server';

import { createAuthBusiness } from '@/business';
import {
	validataPassword,
	validateDisplayName,
	validateProfilePassword,
	validateEmail,
	validateSignUpData,
	validateWithdraw,
} from '@/schemas/auth';
import type {
	ResetEmailResponse,
	SignInFormResponse,
	SignUpFormResponse,
	UpdateDisplayNameResponse,
	UpdatePasswordResponse,
	UpdateProfilePasswordResponse,
	User,
	WithdrawResponse,
} from '@/types/auth';
import { SERVER_ERROR_MESSAGE } from '@/constants/messages';

export async function signUpAction(
	prevState: SignUpFormResponse,
	formData: FormData
): Promise<SignUpFormResponse> {
	const {
		displayName,
		email,
		password,
		confirmPassword,
	}: SignUpFormResponse['inputs'] = {
		displayName: formData.get('displayName') as string,
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirm-password') as string,
	};

	const state: SignUpFormResponse = {
		success: prevState.success,
		inputs: { displayName, email, password, confirmPassword },
		errors: {},
	};

	const errors = validateSignUpData({
		displayName,
		email,
		password,
		confirmPassword,
	});

	if (errors) {
		return {
			...state,
			errors: errors,
		};
	}

	const authBusiness = await createAuthBusiness();

	try {
		if (await authBusiness.checkDisplayName(displayName)) {
			state.errors.displayName = '이미 존재하는 별명입니다.';
			return state;
		}

		if (await authBusiness.checkEmail(email)) {
			state.errors.email = '이미 존재하는 이메일입니다.';
			return state;
		}

		state.success = await authBusiness.signUp(displayName, email, password);
	} catch {
		state.errors.password = SERVER_ERROR_MESSAGE;
		return state;
	}

	if (state.success) {
		state.errors = {};
	}
	return state;
}

export async function signInAction(
	prevState: SignInFormResponse,
	formData: FormData
): Promise<SignInFormResponse> {
	const { email, password }: SignInFormResponse['inputs'] = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};
	const state: SignInFormResponse = {
		success: prevState.success,
		errors: {},
		inputs: { email, password },
	};

	const emailError = validateEmail(email);

	if (emailError) {
		state.errors.email = emailError;

		return state;
	}

	const authBusiness = await createAuthBusiness();

	try {
		if ((await authBusiness.checkEmail(email)) === false) {
			state.errors.email = '존재하지않는 계정입니다.';
			return state;
		}

		state.success = await authBusiness.signIn(email, password);
	} catch {
		state.errors.password = SERVER_ERROR_MESSAGE;
		return state;
	}

	if (state.success) {
		state.errors = {};
	} else {
		state.errors = {
			password: '계정 정보가 올바르지 않습니다.',
		};
	}

	return state;
}

export async function resetPasswordAction(
	prevState: ResetEmailResponse,
	formData: FormData
): Promise<ResetEmailResponse> {
	const { email }: ResetEmailResponse['inputs'] = {
		email: formData.get('email') as string,
	};

	const state: ResetEmailResponse = {
		success: prevState.success,
		errors: {},
		inputs: { email },
	};

	const emailError = validateEmail(email);

	if (emailError) {
		state.errors.email = emailError;

		return state;
	}

	const authBusiness = await createAuthBusiness();

	try {
		if ((await authBusiness.checkEmail(email)) === false) {
			state.errors.email = '존재하지않는 계정입니다.';
			return state;
		}

		state.success = await authBusiness.sendResetPasswordEmail(email);
	} catch {
		state.errors.email = SERVER_ERROR_MESSAGE;
		return state;
	}

	if (state.success) {
		state.errors = {};
	} else {
		state.errors = {
			email: SERVER_ERROR_MESSAGE,
		};
	}

	return state;
}

export async function updatePasswordAction(
	token: string,
	email: string,
	prevState: UpdatePasswordResponse,
	formData: FormData
): Promise<UpdatePasswordResponse> {
	const { password, confirmPassword }: UpdatePasswordResponse['inputs'] = {
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirm-password') as string,
	};

	const state: UpdatePasswordResponse = {
		success: prevState.success,
		errors: {},
		inputs: { password, confirmPassword },
	};

	const errors = validataPassword({ password, confirmPassword });

	if (errors) {
		state.errors = errors;

		return state;
	}

	try {
		const authBusiness = await createAuthBusiness();
		const updateResult = await authBusiness.resetPassword(
			token,
			email,
			password
		);

		if (updateResult !== 'success') {
			state.errors.password =
				updateResult === 'samePassword'
					? '이전 비밀번호와 같은 비밀번호로는 변경할 수 없습니다.'
					: SERVER_ERROR_MESSAGE;
		} else {
			state.success = true;
			state.errors = {};
		}
	} catch {
		state.errors.confirmPassword = SERVER_ERROR_MESSAGE;
		return state;
	}

	return state;
}

export async function updateDisplayNameAction(
	prevState: UpdateDisplayNameResponse,
	formData: FormData
) {
	const { displayName }: UpdateDisplayNameResponse['inputs'] = {
		displayName: formData.get('displayName') as string,
	};

	const state: UpdateDisplayNameResponse = {
		success: prevState.success,
		errors: {},
		inputs: { displayName },
	};

	const errors = validateDisplayName({ displayName });

	if (errors) {
		state.errors = errors;

		return state;
	}

	try {
		const authBusiness = await createAuthBusiness();
		const isExist = await authBusiness.checkDisplayName(displayName);

		if (isExist) {
			state.errors.displayName = '이미 존재하는 별명입니다.';

			return state;
		}
	} catch {
		state.errors.displayName = SERVER_ERROR_MESSAGE;
		return state;
	}

	const authBusiness = await createAuthBusiness();
	state.success = await authBusiness.updateUserDisplayName(displayName);

	if (state.success) {
		state.errors = {};
	} else {
		state.errors = {
			displayName: SERVER_ERROR_MESSAGE,
		};
	}

	return state;
}

export async function updateProfilePasswordAction(
	email: User['email'],
	prevState: UpdateProfilePasswordResponse,
	formData: FormData
) {
	const {
		password,
		newPassword,
		newConfirmPassword,
	}: UpdateProfilePasswordResponse['inputs'] = {
		password: formData.get('password') as string,
		newPassword: formData.get('new-password') as string,
		newConfirmPassword: formData.get('new-confirm-password') as string,
	};

	const state: UpdateProfilePasswordResponse = {
		success: prevState.success,
		errors: {},
		inputs: { password, newPassword, newConfirmPassword },
	};

	const errors = validateProfilePassword({
		password,
		newPassword,
		newConfirmPassword,
	});

	if (errors) {
		state.errors = errors;
		return state;
	}

	try {
		const authBusiness = await createAuthBusiness();
		const isCurrentPasswordValid = await authBusiness.checkPassword(
			email,
			password
		);

		if (!isCurrentPasswordValid) {
			state.errors.password = '현재 비밀번호가 올바르지 않습니다.';

			return state;
		}

		const updateResult = await authBusiness.updatePassword(newPassword);

		if (updateResult !== 'success') {
			state.errors.password =
				updateResult === 'samePassword'
					? '이전 비밀번호와 같은 비밀번호로는 변경할 수 없습니다.'
					: SERVER_ERROR_MESSAGE;
		} else {
			state.success = true;
			state.errors = {};
		}
	} catch {
		state.errors.newConfirmPassword = SERVER_ERROR_MESSAGE;
		return state;
	}

	return state;
}

export async function withdrawAction(
	email: User['email'],
	prevState: WithdrawResponse,
	formData: FormData
) {
	const { confirmEmail }: WithdrawResponse['inputs'] = {
		confirmEmail: formData.get('confirm-email') as string,
	};

	const state: WithdrawResponse = {
		success: prevState.success,
		errors: {},
		inputs: { confirmEmail },
	};

	const errors = validateWithdraw(email, confirmEmail);

	if (errors) {
		state.errors = errors;
		return state;
	}

	try {
		const authBusiness = await createAuthBusiness();
		state.success = await authBusiness.deleteUser(confirmEmail);

		if (state.success) {
			state.errors = {};
		} else {
			state.errors = {
				confirmEmail: SERVER_ERROR_MESSAGE,
			};
		}
	} catch {
		state.errors.confirmEmail = SERVER_ERROR_MESSAGE;
		return state;
	}

	return state;
}

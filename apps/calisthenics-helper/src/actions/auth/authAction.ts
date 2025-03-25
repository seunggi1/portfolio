'use server';

import {
	checkDisplayName,
	checkEmail,
	signUp,
	signIn,
	sendResetPasswordEmail,
	updatePassword,
} from '@/actions/auth/authBusiness';
import {
	validataPassword,
	validateSignInData,
	validateSignUpData,
} from '@/schemas/auth';
import type {
	ResetEmailResponse,
	SignInFormResponse,
	SignUpFormResponse,
	UpdatePasswordResponse,
} from '@/types/auth';

export async function createUser(
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

	if (await checkDisplayName(displayName)) {
		state.errors.displayName = '이미 존재하는 별명입니다.';
		return state;
	}

	if (await checkEmail(email)) {
		state.errors.email = '이미 존재하는 이메일입니다.';
		return state;
	}

	state.success = await signUp(displayName, email, password);

	if (state.success) {
		state.errors = {};
	}
	return state;
}

export async function requestSignIn(
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

	const errors = validateSignInData({ email, password });

	if (errors) {
		state.errors = errors;

		return state;
	}

	if ((await checkEmail(email)) === false) {
		state.errors.email = '존재하지않는 계정입니다.';
		return state;
	}

	state.success = await signIn(email, password);

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

	const errors = validateSignInData({ email });

	if (errors) {
		state.errors = errors;

		return state;
	}

	if ((await checkEmail(email)) === false) {
		state.errors.email = '존재하지않는 계정입니다.';
		return state;
	}

	state.success = await sendResetPasswordEmail(email);

	if (state.success) {
		state.errors = {};
	} else {
		state.errors = {
			email: '서버 오류가 발생했습니다.',
		};
	}

	return state;
}

export async function updatePasswordAction(
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

	state.success = await updatePassword(password);

	if (state.success) {
		state.errors = {};
	} else {
		state.errors = {
			password: '서버 오류가 발생했습니다.',
		};
	}

	return state;
}

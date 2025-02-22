'use server';

import {
	checkDisplayName,
	checkEmail,
	signUp,
	signIn,
} from '@/actions/auth/authBusiness';
import { validateSignInData, validateSignUpData } from '@/schemas/auth';
import type { SignInFormResponse, SignUpFormResponse } from '@/types/auth';

export async function createUser(
	prevState: SignUpFormResponse,
	formData: FormData
): Promise<SignUpFormResponse> {
	const { displayName, email } = {
		displayName: formData.get('displayName') as string,
		email: formData.get('email') as string,
	};

	const state: SignUpFormResponse = {
		success: prevState.success,
		inputs: { displayName, email },
		errors: {},
	};

	const errors = validateSignUpData({ displayName, email });

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

	state.success = await signUp(displayName, email);

	if (state.success) {
		state.errors = {};
	}

	return state;
}

export async function sendSignInEmail(
	prevState: SignInFormResponse,
	formData: FormData
): Promise<SignInFormResponse> {
	const { email } = {
		email: formData.get('email') as string,
	};
	const state: SignUpFormResponse = {
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
		state.errors.email = '존재하지않는 이메일입니다.';
		return state;
	}

	state.success = await signIn(email);

	if (state.success) {
		state.errors = {};
	}

	return state;
}

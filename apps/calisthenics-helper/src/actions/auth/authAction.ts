'use server';

import {
	checkDisplayName,
	checkEmail,
	signUp,
	signIn,
} from '@/actions/auth/authBusiness';
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
		...prevState,
		errors: { ...prevState.errors },
		inputs: { ...prevState.inputs },
	};

	state.inputs.displayName = displayName;
	state.inputs.email = email;

	if (!displayName || displayName.length <= 2 || displayName.length > 8) {
		state.errors.displayName = '별명은 최소 3자이상 8미만으로 작성해야합니다.';
		return state;
	}

	if (!email) {
		state.errors.email = '이메일 형식이 올바르지않습니다.';
		return state;
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
		...prevState,
		errors: { ...prevState.errors },
		inputs: { ...prevState.inputs },
	};

	if (!email) {
		state.errors.email = '이메일 형식이 올바르지않습니다.';
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

'use server';

import { checkDisplayName, checkEmail, signUp } from '@/api/auth/auth';

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

	console.log(displayName, email);

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

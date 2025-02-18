import { HttpClientBuilder } from '../httpClient';

enum AuthType {
	SIGN_IN = 1,
	SIGN_OUT = 2,
}

function getAuthURL(type: AuthType) {
	switch (type) {
		case AuthType.SIGN_IN:
			return 'api/signin';
		case AuthType.SIGN_OUT:
			return 'api/signout';
		default:
			throw new Error('올바르지않은 타입입니다.');
	}
}

export async function signIn(email: string): Promise<boolean> {
	const result = await HttpClientBuilder.post(getAuthURL(AuthType.SIGN_IN))
		.data({ email })
		.call<boolean>();

	return true;
}

export async function signOut(): Promise<boolean> {
	const result = await HttpClientBuilder.post(
		getAuthURL(AuthType.SIGN_OUT)
	).call<boolean>();

	return true;
}

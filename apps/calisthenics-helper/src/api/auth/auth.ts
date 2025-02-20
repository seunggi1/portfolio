import { getServiceClient } from '@/services';
import { HttpClientBuilder } from '../httpClient';

enum AuthType {
	SIGN_UP = 1,
	SIGN_IN,
	SIGN_OUT,
}

function getAuthURL(type: AuthType) {
	switch (type) {
		case AuthType.SIGN_UP:
			return 'api/signup';
		case AuthType.SIGN_IN:
			return 'api/signin';
		case AuthType.SIGN_OUT:
			return 'api/signout';
		default:
			throw new Error('올바르지않은 타입입니다.');
	}
}

export async function checkDisplayName(displayName: string): Promise<boolean> {
	const client = await getServiceClient();

	return client.checkDisplayNameExists(displayName);
}

export async function checkEmail(email: string): Promise<boolean> {
	const client = await getServiceClient();

	return client.checkEmailExists(email);
}

export async function signUp(
	displayName: string,
	email: string
): Promise<boolean> {
	// const result = await HttpClientBuilder.post(getAuthURL(AuthType.SIGN_IN))
	// 	.data({ email })
	// 	.call<boolean>();

	// return true;
	const client = await getServiceClient();

	return client.signUp(email, displayName);
}

export async function signIn(email: string): Promise<boolean> {
	// const result = await HttpClientBuilder.post(getAuthURL(AuthType.SIGN_IN))
	// 	.data({ email })
	// 	.call<boolean>();

	// return true;
	const client = await getServiceClient();

	return client.signIn(email);
}

export async function signOut(): Promise<boolean> {
	// const result = await HttpClientBuilder.post(
	// 	getAuthURL(AuthType.SIGN_OUT)
	// ).call<boolean>();

	const client = await getServiceClient();
	client.signOut();

	return true;
}

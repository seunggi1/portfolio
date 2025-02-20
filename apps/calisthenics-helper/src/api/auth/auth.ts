import { getServiceClient } from '@/services';

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
	const client = await getServiceClient();

	return client.signUp(email, displayName);
}

export async function signIn(email: string): Promise<boolean> {
	const client = await getServiceClient();

	return client.signIn(email);
}

export async function signOut(): Promise<boolean> {
	const client = await getServiceClient();
	client.signOut();

	return true;
}

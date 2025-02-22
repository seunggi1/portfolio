import { getServiceClient } from '@/services';
import { User } from '@/types/auth';

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

export async function getUser(): Promise<User | null> {
	try {
		const client = await getServiceClient();
		const user = await client.getUser();

		return user;
	} catch (error) {
		return null;
	}
}

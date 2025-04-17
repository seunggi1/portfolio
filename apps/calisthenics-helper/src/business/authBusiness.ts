import { getServiceClient } from '@/services';
import { ResetPasswordResult, UpdatePasswordResult, User } from '@/types/auth';
import { Routine } from '@/types/routine';

export async function checkDisplayName(displayName: string): Promise<boolean> {
	const client = await getServiceClient();

	return client.checkDisplayNameExists(displayName);
}

export async function checkEmail(email: string): Promise<boolean> {
	const client = await getServiceClient();

	return client.checkEmailExists(email);
}

export async function checkPassword(
	email: User['email'],
	password: User['password']
): Promise<boolean> {
	const client = await getServiceClient();

	return client.signIn(email, password);
}

export async function signUp(
	displayName: string,
	email: string,
	password: string
): Promise<boolean> {
	const client = await getServiceClient();

	return client.signUp(email, displayName, password);
}

export async function signIn(
	email: string,
	password: string
): Promise<boolean> {
	const client = await getServiceClient();

	return client.signIn(email, password);
}

export async function signOut(): Promise<boolean> {
	const client = await getServiceClient();
	await client.signOut();

	return true;
}

export async function sendResetPasswordEmail(email: string): Promise<boolean> {
	const client = await getServiceClient();

	return await client.resetPasswordForEmail(email);
}

export async function resetPassword(
	token: string,
	email: string,
	password: string
): Promise<ResetPasswordResult> {
	const client = await getServiceClient();

	const canLogin = await client.signIn(email, password);

	if (canLogin) {
		await client.signOut();
		return 'samePassword';
	}

	const codeResult = await client.verifyToken(token);

	if (!codeResult) {
		return 'tokenError';
	}

	return await client.updatePassword(password);
}

export async function updatePassword(
	password: string
): Promise<UpdatePasswordResult> {
	const client = await getServiceClient();

	return await client.updatePassword(password);
}

export async function updateUserDisplayName(displayName: User['displayName']) {
	const client = await getServiceClient();

	return await client.updateDisplayName(displayName);
}

export async function deleteUser(email: User['email']) {
	const client = await getServiceClient();

	return await client.deleteUser(email);
}

export async function canAccessRoutineEdit(id: Routine['id']) {
	const client = await getServiceClient();

	const user = await client.getUser();

	if (!user) {
		return false;
	}

	const routine = await client.getRoutineById(id);

	if (!routine) {
		return false;
	}

	return routine.userID === user.id;
}

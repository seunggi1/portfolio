import { HttpClientBuilder } from './../httpClient';
import { User } from '@/types/auth';

function getAuthURL(...paths: string[]) {
	const BASE_URL = 'api';

	return [BASE_URL, ...paths].join('/');
}

export async function fetchUser(): Promise<User | null> {
	const { data: user } = await HttpClientBuilder.get(
		getAuthURL('profile')
	).call<User | null>();

	return user;
}

export async function signout(): Promise<boolean> {
	const { data } = await HttpClientBuilder.get(
		getAuthURL('signout')
	).call<boolean>();

	return data;
}

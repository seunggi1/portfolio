import { ServiceClient } from '@/lib/service/base/serviceClient';
import { getServiceClient } from '@/lib/service';
import {
	ResetPasswordData,
	ResetPasswordEmailResponse,
	ResetPasswordResult,
	SignInData,
	SignInFormResponse,
	SignUpData,
	SignUpFormResponse,
	UpdatePasswordResult,
	User,
} from '@/types/auth';
import { Routine } from '@/types/routine';
import { authErrorMessages } from '@/constants/messages';

export class AuthBusiness {
	constructor(private client: ServiceClient) {}

	async checkDisplayName(displayName: string): Promise<boolean> {
		return this.client.checkDisplayNameExists(displayName);
	}

	async checkEmail(email: string): Promise<boolean> {
		return this.client.checkEmailExists(email);
	}

	async checkPassword(
		email: User['email'],
		password: User['password']
	): Promise<boolean> {
		return this.client.signIn({ email, password });
	}

	async signUp({
		displayName,
		email,
		password,
	}: SignUpData): Promise<Pick<SignUpFormResponse, 'success' | 'errors'>> {
		const result: Pick<SignUpFormResponse, 'success' | 'errors'> = {
			success: false,
			errors: {},
		};

		if (await this.checkDisplayName(displayName)) {
			result.errors.displayName = authErrorMessages.EXISTS_DISPLAY_NAME_ERROR;
			return result;
		}

		if (await this.checkEmail(email)) {
			result.errors.email = authErrorMessages.EXISTS_EMAIL_ERROR;
			return result;
		}

		result.success = await this.client.signUp({
			displayName,
			email,
			password,
		});

		return result;
	}

	async signIn({
		email,
		password,
	}: SignInData): Promise<Pick<SignInFormResponse, 'success' | 'errors'>> {
		const result: Pick<SignInFormResponse, 'success' | 'errors'> = {
			success: false,
			errors: {},
		};

		if ((await this.checkEmail(email)) === false) {
			result.errors.password = authErrorMessages.AUTH_ERROR;
			return result;
		}

		result.success = await this.client.signIn({
			email,
			password,
		});

		return result;
	}

	async signOut(): Promise<boolean> {
		return this.client.signOut();
	}

	async sendResetPasswordEmail(
		email: string
	): Promise<Pick<ResetPasswordEmailResponse, 'success' | 'errors'>> {
		const result: Pick<ResetPasswordEmailResponse, 'success' | 'errors'> = {
			success: false,
			errors: {},
		};

		if ((await this.checkEmail(email)) === false) {
			result.errors.email = authErrorMessages.AUTH_ERROR;
			return result;
		}

		result.success = await this.client.resetPasswordForEmail(email);

		return result;
	}

	async resetPassword({
		email,
		password,
		token,
	}: ResetPasswordData): Promise<ResetPasswordResult> {
		const canLogin = await this.client.signIn({ email, password });

		if (canLogin) {
			await this.client.signOut();
			return 'samePassword';
		}

		const codeResult = await this.client.verifyToken(token);

		if (!codeResult) {
			return 'tokenError';
		}

		return await this.client.updatePassword(password);
	}

	async updatePassword(password: string): Promise<UpdatePasswordResult> {
		return await this.client.updatePassword(password);
	}

	async updateUserDisplayName(displayName: User['displayName']) {
		return await this.client.updateDisplayName(displayName);
	}

	async deleteUser(email: User['email']) {
		return await this.client.deleteUser(email);
	}

	async canAccessRoutineEdit(id: Routine['id']) {
		const user = await this.client.getUser();

		if (!user) {
			return false;
		}

		const routine = await this.client.getRoutineById(id);

		if (!routine) {
			return false;
		}

		return routine.userID === user.id;
	}

	async verifyToken(token: string) {
		return this.client.verifyToken(token);
	}

	async getUser() {
		return this.client.getUser();
	}
}

export async function createAuthBusiness() {
	return new AuthBusiness(await getServiceClient());
}

import { ServiceClient } from '@/lib/service/base/serviceClient';
import { getServiceClient } from '@/lib/service';
import { ResetPasswordResult, UpdatePasswordResult, User } from '@/types/auth';
import { Routine } from '@/types/routine';

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
		return this.client.signIn(email, password);
	}

	async signUp(
		displayName: string,
		email: string,
		password: string
	): Promise<boolean> {
		return this.client.signUp(email, displayName, password);
	}

	async signIn(email: string, password: string): Promise<boolean> {
		return this.client.signIn(email, password);
	}

	async signOut(): Promise<boolean> {
		return this.client.signOut();
	}

	async sendResetPasswordEmail(email: string): Promise<boolean> {
		return this.client.resetPasswordForEmail(email);
	}

	async resetPassword(
		token: string,
		email: string,
		password: string
	): Promise<ResetPasswordResult> {
		const canLogin = await this.client.signIn(email, password);

		if (canLogin) {
			await this.client.signOut();
			return 'samePassword';
		}

		const codeResult = this.client.verifyToken(token);

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

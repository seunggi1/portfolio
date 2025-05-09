import { FormResponse } from './common';

export type User = {
	id: string;
	displayName: string;
	email: string;
	password: string;
};

export type RequiredUserData<T> = T & {
	user: User;
};

export type SignUpFormData = Pick<
	User,
	'email' | 'displayName' | 'password'
> & {
	confirmPassword: string;
};
export type SignUpFormResponse = FormResponse<SignUpFormData>;

export type SignUpData = Pick<User, 'email' | 'displayName' | 'password'>;

export type SignInData = Pick<User, 'email' | 'password'>;
export type SignInFormResponse = FormResponse<SignInData>;

export type ResetPasswordEmailData = Pick<User, 'email'>;
export type ResetPasswordEmailResponse = FormResponse<ResetPasswordEmailData>;

export type ResetPasswordData = Pick<User, 'email' | 'password'> & {
	token: string;
};

export type UpdatePasswordData = Pick<
	SignUpFormData,
	'password' | 'confirmPassword'
>;
export type UpdatePasswordResponse = FormResponse<UpdatePasswordData>;

export type UpdateDisplayNameData = Pick<User, 'displayName'>;
export type UpdateDisplayNameResponse = FormResponse<UpdateDisplayNameData>;

export type UpdateProfilePasswordData = Pick<User, 'password'> & {
	newPassword: string;
	newConfirmPassword: string;
};
export type UpdateProfilePasswordResponse =
	FormResponse<UpdateProfilePasswordData>;

export type WithdrawData = { confirmEmail: User['email'] };
export type WithdrawResponse = FormResponse<WithdrawData>;

export type UpdatePasswordResult = 'success' | 'samePassword' | 'serverError';
export type ResetPasswordResult = UpdatePasswordResult | 'tokenError';

export type Contact = {
	title: string;
	contents: string;
};

export type ContactResponse = FormResponse<Contact>;

export type AdminSignIn = {
	id: string;
	password: string;
};

export type StatsRequest = {
	startDate: string;
	endDate: string;
};

export type Stats = {
	date: string;
	routineCount: number;
	userCount: number;
};

export type TotalStats = {
	totalUserCount: number;
	totalRoutineCount: number;
};

export type StatsResult = {
	stats: Stats[];
	totalStats: TotalStats;
};

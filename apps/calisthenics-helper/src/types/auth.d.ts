import { FormResponse } from './common';

export type User = {
	id: string;
	displayName: string;
	email: string;
	password: string;
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

export type ResetEmailData = Pick<User, 'email'>;
export type ResetEmailResponse = FormResponse<ResetEmailData>;

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

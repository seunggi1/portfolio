export type User = {
	id: string;
	displayName: string;
	email: string;
	password: string;
};

export type SignUpData = Partial<
	Pick<User, 'email' | 'displayName' | 'password'> & { confirmPassword: string }
>;

export type SignUpFormResponse = {
	success: boolean;
	errors: SignUpData;
	inputs: SignUpData;
};

export type SignInData = Partial<Pick<User, 'email' | 'password'>>;

export type SignInFormResponse = {
	success: boolean;
	errors: SignInData;
	inputs: SignInData;
};

export type ResetEmailData = Partial<Pick<User, 'email'>>;

export type ResetEmailResponse = {
	success: boolean;
	errors: ResetEmailData;
	inputs: ResetEmailData;
};

export type UpdatePasswordData = Pick<
	SignUpData,
	'password' | 'confirmPassword'
>;

export type UpdatePasswordResponse = {
	success: boolean;
	errors: UpdatePasswordData;
	inputs: UpdatePasswordData;
};

export type UpdateDisplayNameData = Partial<Pick<User, 'displayName'>>;

export type UpdateDisplayNameResponse = {
	success: boolean;
	errors: UpdateDisplayNameData;
	inputs: UpdateDisplayNameData;
};

export type UpdateProfilePasswordData = Partial<
	Pick<User, 'password'> & { newPassword: string; newConfirmPassword: string }
>;

export type UpdateProfilePasswordResponse = {
	success: boolean;
	errors: UpdateProfilePasswordData;
	inputs: UpdateProfilePasswordData;
};

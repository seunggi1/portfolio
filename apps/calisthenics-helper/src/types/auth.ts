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

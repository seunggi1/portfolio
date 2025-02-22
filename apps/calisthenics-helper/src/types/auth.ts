export type User = {
	id: string;
	displayName: string;
	email: string;
};

export type SignUpData = Partial<Pick<User, 'email' | 'displayName'>>;

export type SignUpFormResponse = {
	success: boolean;
	errors: SignUpData;
	inputs: SignUpData;
};

export type SignInData = Partial<Pick<User, 'email'>>;

export type SignInFormResponse = {
	success: boolean;
	errors: SignInData;
	inputs: SignInData;
};

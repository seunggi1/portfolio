type User = {
	id: string;
	displayName: string;
	email: string;
};

type SignUpData = Partial<Pick<User, 'email' | 'displayName'>>;

type SignUpFormResponse = {
	success: boolean;
	errors: SignUpData;
	inputs: SignUpData;
};

type SignInData = Partial<Pick<User, 'email'>>;

type SignInFormResponse = {
	success: boolean;
	errors: SignInData;
	inputs: SignInData;
};

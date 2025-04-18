export type FormResponse<T> = {
	success: boolean;
	errors: Partial<T>;
	inputs: Partial<T>;
};

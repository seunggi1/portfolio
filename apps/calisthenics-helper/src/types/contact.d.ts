export type Contact = {
	title: string;
	contents: string;
};

type ContactData = Partial<Contact>;

export type ContactResponse = {
	success: boolean;
	inputs: ContactData;
	errors: ContactData;
};

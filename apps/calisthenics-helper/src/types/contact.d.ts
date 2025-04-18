import { FormResponse } from './common';

export type Contact = {
	title: string;
	contents: string;
};

export type ContactResponse = FormResponse<Contact>;

import { z } from 'zod';
import { contactErrorMessages } from '@/constants/messages';
import { Contact, ContactResponse } from '@/types/contact';

export const contact: z.ZodType<Contact> = z.object({
	title: z.string().min(2, {
		message: contactErrorMessages.MIN_TITLE_ERROR,
	}),
	contents: z.string().min(5, {
		message: contactErrorMessages.MIN_CONTENTS_ERROR,
	}),
});

export function validateContact(contactInput: ContactResponse['inputs']) {
	const { success, error } = contact.safeParse(contactInput);

	if (success) {
		return null;
	}

	const format = error.format();

	return {
		title: format.title?._errors.join(''),
		contents: format.contents?._errors.join(''),
	};
}

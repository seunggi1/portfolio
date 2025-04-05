import { Contact, ContactResponse } from '@/types/contact';
import { z } from 'zod';

export const contact: z.ZodType<Contact> = z.object({
	title: z.string().min(2, {
		message: '제목은 최소 2글자 이상이어야 합니다.',
	}),
	contents: z.string().min(5, {
		message: '내용은 최소 5글자 이상이어야 합니다.',
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

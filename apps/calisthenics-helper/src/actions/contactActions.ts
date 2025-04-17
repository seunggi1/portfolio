'use server';

import { createContact } from '@/business';
import { validateContact } from '@/schemas/contact';
import { ContactResponse } from '@/types/contact';
import { SERVER_ERROR_MESSAGE } from '@/constants/messages';

export async function createContactAction(
	prevState: ContactResponse,
	formData: FormData
) {
	const { title, contents } = {
		title: formData.get('title') as string,
		contents: formData.get('contents') as string,
	};

	const state: ContactResponse = {
		success: prevState.success,
		errors: {},
		inputs: {
			title,
			contents,
		},
	};

	const errors = validateContact({ title, contents });

	if (errors) {
		state.errors = errors;
		return state;
	}
	try {
		state.success = await createContact({
			title,
			contents,
		});
	} catch {
		state.errors.contents = SERVER_ERROR_MESSAGE;
	}

	return state;
}

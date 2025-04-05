'use server';

import { validateContact } from '@/schemas/contact';
import { ContactResponse } from '@/types/contact';
import { createContact } from './contactBusiness';

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

	state.success = await createContact({
		title,
		contents,
	});

	return state;
}

'use server';

import { validateContact } from '@/schemas/contact';
import { ContactResponse } from '@/types/contact';
import { authErrorMessages } from '@/constants/messages';
import { createContactBusiness } from '@/business';

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
		const contactBusiness = await createContactBusiness();
		state.success = await contactBusiness.createContact({
			title,
			contents,
		});
	} catch {
		state.errors.contents = authErrorMessages.SERVER_ERROR;
	}

	return state;
}

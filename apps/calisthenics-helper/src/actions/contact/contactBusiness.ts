import { getServiceClient } from '@/services';
import { Contact } from '@/types/contact';

export async function createContact(contact: Contact) {
	const client = await getServiceClient();

	return client.createContact(contact);
}

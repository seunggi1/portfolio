import { getServiceClient } from '@/lib/service';
import { ServiceClient } from '@/lib/service/base/serviceClient';
import { Contact } from '@/types/contact';

export class ContactBusiness {
	constructor(private client: ServiceClient) {}

	async createContact(contact: Contact) {
		return this.client.createContact(contact);
	}
}

export async function createContactBusiness() {
	return new ContactBusiness(await getServiceClient());
}

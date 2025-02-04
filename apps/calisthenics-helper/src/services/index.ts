import { ServiceClient } from './base/serviceClient';
import { MockServiceClient } from './mock/mockServiceClient';
import { SupabaseServiceClient } from './supabase/supabaseServiceClient';
import { createClient as createSupabaseClient } from './supabase/server';

export async function getServiceClient(): Promise<ServiceClient> {
	const service = process.env.DB_SERVICE || 'supabase';

	switch (service) {
		case 'supabase':
			return new SupabaseServiceClient(await createSupabaseClient());
		case 'test':
			return new MockServiceClient();
		default:
			throw new Error('Unsupported service');
	}
}

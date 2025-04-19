import { ServiceClient } from './base/serviceClient';
import { SupabaseServiceClient } from './supabase/supabaseServiceClient';
import { createClient as createSupabaseClient } from './supabase/server';
import { environments } from '@/constants/environments';

export async function getServiceClient(): Promise<ServiceClient> {
	const service = environments.DB_SERVICE;

	switch (service) {
		case 'supabase':
			return new SupabaseServiceClient(await createSupabaseClient());
		default:
			throw new Error('Unsupported service');
	}
}

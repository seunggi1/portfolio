import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { environments } from '@/constants/environments';

export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(
		environments.SUPABASE_URL,
		environments.SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options)
						);
					} catch {
						return;
					}
				},
			},
			auth: {
				detectSessionInUrl: true,
			},
		}
	);
}

export const environments = {
	SUPABASE_URL: process.env.SUPABASE_URL!,
	SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
	SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME ?? 'image',
	DB_SERVICE: process.env.DB_SERVICE || 'supabase',
	SITE_URL: process.env.SITE_URL,
} as const;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@repo/ui'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'snvoclkontfqeiatywxv.supabase.co',
			},
		],
	},
};

export default nextConfig;

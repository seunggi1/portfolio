import { environments } from '@/constants/environments';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@repo/ui'],
	async headers() {
		return [
			{
				source: '/api/:admin*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: environments.ADMIN_CLIENT_URL,
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,POST',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		];
	},
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

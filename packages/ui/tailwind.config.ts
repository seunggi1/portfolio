import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'prefix' | 'presets' | 'content' | 'plugins'> = {
	content: ['./src/**/*.tsx'],
	presets: [sharedConfig],
	plugins: [],
};

export default config;

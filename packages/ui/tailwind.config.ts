import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';
import daisyUI from 'daisyui';

const config: Pick<
	Config,
	'prefix' | 'presets' | 'content' | 'plugins' | 'daisyui'
> = {
	content: ['./src/**/*.tsx'],
	presets: [sharedConfig],
	daisyui: {
		themes: ['light', 'dark', 'corporate'],
	},
	plugins: [daisyUI],
};

export default config;

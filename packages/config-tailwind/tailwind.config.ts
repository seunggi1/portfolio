import type { Config } from 'tailwindcss';
import daisyUI from 'daisyui';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content' | 'theme'> = {
	daisyui: {
		themes: ['light', 'dark', 'corporate'],
	},
	plugins: [daisyUI],
};
export default config;

import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
	theme: {
		extend: {
			keyframes: {
				fadeout: {
					'0%': {
						opacity: '1',
					},
					'100%': {
						opacity: '0',
					},
				},
			},
			animation: {
				fadeout: 'fadeout 3s linear forwards',
			},
		},
	},
	content: [
		'./src/app/**/*.tsx',
		'./src/components/**/*.tsx',
		'./src/lib/**/*.tsx',
	],
	presets: [sharedConfig],
};

export default config;

import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
	theme: {
		extend: {
			colors: {
				primary: '#2194f3',
				'primary-light': '#4da9f5',
				'primary-dark': '#1767aa',
				secondary: '#ffc928',
				'secondary-light': '#ffd353',
				'secondary-dark': '#b28c1c',
			},
		},
	},
	plugins: [],
};
export default config;

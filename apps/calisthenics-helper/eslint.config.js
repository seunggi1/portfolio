import { nextJsConfig } from '@repo/eslint-config/next-js';
import pluginQuery from '@tanstack/eslint-plugin-query';

/** @type {import("eslint").Linter.Config} */
export default [
	...nextJsConfig,
	{
		plugins: {
			'@tanstack/query': pluginQuery,
		},
		rules: {
			'@tanstack/query/exhaustive-deps': 'error',
		},
	},
];

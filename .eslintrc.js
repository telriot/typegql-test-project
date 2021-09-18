module.exports = {
	env: {
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
		// "project": './tsconfig.json',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off'
	},
	settings: {
		next: {
			rootDir: './client/'
		}
	}
};

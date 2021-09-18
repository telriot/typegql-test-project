const baseConfig = require('../.eslintrc.js');

module.exports = {
	...baseConfig,
	extends: ['next', 'next/core-web-vitals'],
	ignorePatterns: [
		'build',
		'*.config.js',
		'node_modules',
		'src/gql/types/',
		'src/generated-types.tsx'
	],
	plugins: ['react', '@typescript-eslint'],
	env: {
		browser: true,
		es6: true,
		jest: true
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	rules: {
		...baseConfig.rules,
		'import/no-extraneous-dependencies': 'off',
		'react/destructuring-assignment': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'react/prop-types': 'off',
		'linebreak-style': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': [
			1,
			{
				exceptions: ['Component']
			}
		],
		'react/display-name': 'off',
		'react/jsx-props-no-spreading': 'off'
	},
};

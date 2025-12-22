// https://eslint.org
module.exports = {
  extends: ['./node_modules/@sierra/agent/.eslintrc.cjs'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['web/**/*.{ts,tsx}'],
      parserOptions: {
        project: './web/tsconfig.json',
      },
    },
  ],
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        allowString: false,
        allowNumber: false,
        files: ["./**/*.{ts,tsx}"],
      },
    ],
  },
  ignorePatterns: ["src/**/*.test.ts", "dist/**", "rollup.config.js"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};

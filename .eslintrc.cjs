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
    "@typescript-eslint/strict-boolean-expressions": "error",
  },
  ignorePatterns: ["src/**/*.test.ts", "dist/**", "rollup.config.js", "*.cjs"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};

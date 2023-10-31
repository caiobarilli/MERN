module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // "no-console": ["error", { allow: ["warn", "error"] }],
    "no-undef": "off",
  },
};

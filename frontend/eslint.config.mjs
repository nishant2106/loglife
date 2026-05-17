import js from "@eslint/js"
import typescriptPlugin from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import preferArrow from "eslint-plugin-prefer-arrow"
import unicorn from "eslint-plugin-unicorn"
import globals from "globals"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["build", "dist"],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      preferArrow,
      unicorn,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",
      "no-console": ["warn", { allow: ["error"] }],
      "prefer-arrow/prefer-arrow-functions": "warn",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prefer-ternary": "off",
      "unicorn/prevent-abbreviations": [
        "warn",
        {
          allowList: {
            props: true,
          },
        },
      ],
    },
  },
]

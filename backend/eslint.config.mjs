import typescriptPlugin from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import preferArrow from "eslint-plugin-prefer-arrow"
import unicorn from "eslint-plugin-unicorn"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  {
    files: ["**/*.ts"],
    ignores: ["eslint.config.mjs", "dist"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      unicorn,
      preferArrow,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["error", "warn"] }],
      "prefer-arrow/prefer-arrow-functions": "warn",
      "unicorn/no-fn-reference-in-iterator": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-array-some": "off",
      "unicorn/consistent-destructuring": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prefer-spread": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/prefer-ternary": "off",
      "unicorn/prefer-node-protocol": "off",
      "unicorn/prevent-abbreviations": [
        "warn",
        {
          allowList: {
            req: true,
            res: true,
          },
        },
      ],
    },
  },
]

export default config

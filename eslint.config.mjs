import { defineConfig } from "eslint/config";

export default defineConfig({
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: [".next/**", "out/**", "build/**", "next-env.d.ts"],
});
